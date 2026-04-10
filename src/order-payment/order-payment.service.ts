import { Injectable } from '@nestjs/common';
import { CreateOrderPaymentDto } from './dto/create-order-payment.dto';
import { UpdateOrderPaymentDto } from './dto/update-order-payment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderPaymentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderPaymentDto) {
    const paymentId = data.paymentId;
    const orderId = data.orderId;

    const expectedAmounts = await this.prisma.orderItem.findMany({
      where: { orderId },
      include: {
        productVariantPrice: {
          select: {
            listPrice: true,
          },
        },
      },
    });

    const totalExpectedAmount = expectedAmounts.reduce(
      (acc, curr) => acc + curr.productVariantPrice.listPrice,
      0,
    );

    let transactions = [] as any[];

    // this.prisma.orderItemFulfillment.createManyAndReturn({
    //   data: fulfillmentData.orderFulfillment,
    // }),

    // transactions.push({
    //   update: {
    //     where: { id: paymentId },
    //     data: {
    //       unassignedAmount: {
    //         decrement: data.paidAmount,
    //       },
    //     },
    //   },
    // });

    transactions.push(
      this.prisma.payment.update({
        where: { id: paymentId },
        data: {
          unassignedAmount: {
            decrement: data.paidAmount,
          },
        },
      }),
    );

    transactions.push(
      this.prisma.order.update({
        where: { id: data.orderId },
        data: {
          isPartiallyPaid: true,
          isFullyPaid: totalExpectedAmount < data.paidAmount,
        },
      }),
    );

    transactions.push(
      this.prisma.orderPayment.create({
        data,
      }),
    );

    return this.prisma.$transaction(transactions);
  }

  createBulk(data: CreateOrderPaymentDto[]) {
    return this.prisma.orderPayment.createMany({
      data,
    });
  }

  findAll() {
    return this.prisma.orderPayment.findMany({
      include: {
        order: {
          include: {
            customer: true,
          },
        },
        // bank: true,
        payment: {
          include: {
            paymentOption: true,
            customer: true,
            bankAccount: {
              include: {
                bank: true,
              },
            },
          },
        },
        // paymentOption: true,
      },
    });
  }

  filter(query: any) {
    // console.log(query);

    if (typeof query.ids === 'string') {
      query.ids = [query.ids];
    }

    return this.prisma.orderPayment.findMany({
      where: {
        AND: [
          query.orderIds ? { orderId: { in: query.orderIds } } : {},
          // query.bankIds ? { bankId: { in: query.bankIds } } : {},
          query.paymentIds ? { paymentId: { in: query.paymentIds } } : {},
          // query.paymentOptionIds
          //   ? { paymentOptionId: { in: query.paymentOptionIds } }
          //   : {},
          // query.paymentOptionRefernce
          //   ? { paymentOptionRefernce: query.paymentOptionRefernce }
          //   : {},
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
        order: true,
        // bank: true,
        payment: {
          include: {
            paymentOption: true,
            customer: true,
            bankAccount: {
              include: {
                bank: true,
              },
            },
          },
        },
        // paymentOption: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.orderPayment.findUnique({
      where: { id },
      include: {
        order: true,
        // bank: true,
        payment: {
          include: {
            paymentOption: true,
            customer: true,
            bankAccount: {
              include: {
                bank: true,
              },
            },
          },
        },
        // paymentOption: true,
      },
    });
  }

  update(id: string, updateOrderPaymentDto: UpdateOrderPaymentDto) {
    return this.prisma.orderPayment.update({
      where: { id },
      data: updateOrderPaymentDto,
    });
  }

  enable(id: string) {
    return this.prisma.orderPayment.update({
      where: { id },
      data: { isEnabled: true },
    });
  }

  disable(id: string, disabledById: string) {
    return this.prisma.orderPayment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledById: disabledById,
        disabledDate: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prisma.orderPayment.update({
      where: { id },
      data: {
        isEnabled: false,
        disabledDate: new Date(),
      },
    });
  }
}
