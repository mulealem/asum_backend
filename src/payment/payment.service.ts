import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma.service';
import { LedgerDirection } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePaymentDto) {
    const {
      customerId,
      paymentOptionId,
      bankAccountId,
      enabledById,
      orderPayments,
      ...rest
    } = data;

    const allocatedPayments = orderPayments ?? [];

    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          ...rest,
          unassignedAmount:
            rest.amount -
            allocatedPayments.reduce((acc, curr) => acc + curr.paidAmount, 0),
          paymentOption: {
            connect: { id: paymentOptionId },
          },
          customer: {
            connect: { id: customerId },
          },
          bankAccount: {
            connect: { id: bankAccountId },
          },
          OrderPayment: allocatedPayments.length
            ? {
                createMany: {
                  data: allocatedPayments,
                },
              }
            : undefined,
          enabledBy: {
            connect: { id: enabledById },
          },
        },
      });

      // Write a CREDIT ledger entry so the bank account balance reflects this receipt
      if (bankAccountId) {
        await tx.bankLedgerEntry.create({
          data: {
            direction: LedgerDirection.CREDIT,
            amount: rest.amount,
            note: rest.receiptNumber ?? `Payment ${payment.id}`,
            bankAccount: { connect: { id: bankAccountId } },
            payment: { connect: { id: payment.id } },
            enabledBy: { connect: { id: enabledById } },
          },
        });
      }

      if (allocatedPayments.length === 0) {
        return payment;
      }

      const orderIds = Array.from(
        new Set(allocatedPayments.map((orderPayment) => orderPayment.orderId)),
      );

      const orders = await tx.order.findMany({
        where: {
          id: {
            in: orderIds,
          },
        },
        include: {
          OrderPayment: true,
          OrderItem: true,
        },
      });

      for (const order of orders) {
        const totalPaidAmount = order.OrderPayment.reduce(
          (acc, curr) => acc + curr.paidAmount,
          0,
        );

        const expectedAmount = order.OrderItem.reduce(
          (acc, curr) => acc + curr.price * curr.purchasedQuantity,
          0,
        );

        await tx.order.update({
          where: { id: order.id },
          data: {
            isFullyPaid: totalPaidAmount >= expectedAmount,
            isPartiallyPaid:
              totalPaidAmount > 0 && totalPaidAmount < expectedAmount,
          },
        });
      }

      return tx.order.findMany({
        where: {
          id: {
            in: orderIds,
          },
        },
      });
    });
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        customer: true,
        paymentOption: true,
        bankAccount: {
          include: {
            bank: true,
          },
        },
      },
    });
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.payment.findMany({
      where: {
        AND: [
          query.customerIds ? { customerId: { in: query.customerIds } } : {},
          query.paymentOptionIds
            ? { paymentOptionId: { in: query.paymentOptionIds } }
            : {},
          query.referenceNumber
            ? { referenceNumber: query.referenceNumber }
            : {},
          query.ids ? { id: { in: query.ids } } : {},
          query.enabledByIds ? { enabledById: query.enabledByIds } : {},
          query.disabledByIds ? { disabledById: query.disabledByIds } : {},
          query.isEnabled ? { isEnabled: query.isEnabled } : {},
          query.enabledStartDate
            ? { createdAt: { gte: query.enabledStartDate } }
            : {},
          query.enabledEndDate
            ? { createdAt: { lte: query.enabledEndDate } }
            : {},
          query.disabledStartDate
            ? { disabledDate: { gte: query.disabledStartDate } }
            : {},
          query.disabledEndDate
            ? { disabledDate: { lte: query.disabledEndDate } }
            : {},
        ],
      },
      include: {
        customer: true,
        paymentOption: true,
        bankAccount: {
          include: {
            bank: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        customer: true,
        paymentOption: true,
        bankAccount: {
          include: {
            bank: true,
          },
        },
      },
    });
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  enable(id: string) {
    return this.prisma.payment.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}
