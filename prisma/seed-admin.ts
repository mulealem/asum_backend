import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const ALL_ADMIN_PERMISSIONS = [
  'canViewDashboard',
  'canViewOrders',
  'canViewOrderDetail',
  'canApproveOrder',
  'canFulfillOrder',
  'canViewOrderPayment',
  'canAddOrderPayment',
  'canViewOrderShipment',
  'canAddOrderShipment',
  'canScheduleOrderShipment',
  'canStartOrderShipment',
  'canReceiveOrderShipment',
  'canAddShipmentDiscrepancy',
  'canCompleteShipment',
  'canViewReports',
  'canSales',
  'canViewPayment',
  'canAddPayment',
  'canViewShipment',
  'canViewInventory',
  'canAddInventory',
  'canViewInventoryDetail',
  'canViewProduct',
  'canAddProduct',
  'canEditProduct',
  'canDisableEnableProduct',
  'canViewProductGroup',
  'canAddProductGroup',
  'canEditProductGroup',
  'canDisableEnableProductGroup',
  'canViewProductVariant',
  'canAddProductVariant',
  'canEditProductVariant',
  'canDisableEnableProductVariant',
  'canViewUserManagement',
  'canAddUser',
  'canEditUser',
  'canChangeUserPassword',
  'canViewBankAccounts',
  'canAddBankAccount',
  'canEditBankAccount',
  'canManageConfiguration',
];

export function normalizePermissions(rawPermissions?: string) {
  if (
    !rawPermissions ||
    rawPermissions.trim() === '*' ||
    rawPermissions.trim() === ''
  ) {
    return JSON.stringify(ALL_ADMIN_PERMISSIONS);
  }

  const normalizedPermissions = rawPermissions.trim();

  if (normalizedPermissions.startsWith('[')) {
    return normalizedPermissions;
  }

  return JSON.stringify(
    normalizedPermissions
      .split(',')
      .map((permission) => permission.trim())
      .filter(Boolean),
  );
}

export async function seedAdmin(prismaClient: PrismaClient = prisma) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const adminName = process.env.ADMIN_NAME || 'System Admin';
  const adminRoleTitle = 'Admin';
  const adminPermissions = normalizePermissions(process.env.ADMIN_PERMISSIONS);

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const roles = await prismaClient.role.findMany();
  let adminRole = roles.find(
    ({ title }) => title.trim().toLowerCase() === adminRoleTitle.toLowerCase(),
  );

  if (!adminRole) {
    adminRole = await prismaClient.role.create({
      data: {
        title: adminRoleTitle,
        permissions: adminPermissions,
        isEnabled: true,
      },
    });
    console.log(`Created role: ${adminRoleTitle}`);
  } else {
    adminRole = await prismaClient.role.update({
      where: { id: adminRole.id },
      data: {
        permissions: adminPermissions,
        isEnabled: true,
      },
    });
    console.log(`Role already exists: ${adminRole.title}`);
  }

  let adminUser = await prismaClient.user.findFirst({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    adminUser = await prismaClient.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        isEnabled: true,
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    adminUser = await prismaClient.user.update({
      where: { id: adminUser.id },
      data: {
        name: adminName,
        password: hashedPassword,
        isEnabled: true,
      },
    });
    console.log(`Updated existing admin user: ${adminEmail}`);
  }

  const existingUserRole = await prismaClient.userRole.findFirst({
    where: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  if (!existingUserRole) {
    await prismaClient.userRole.create({
      data: {
        userId: adminUser.id,
        roleId: adminRole.id,
        isEnabled: true,
      },
    });
    console.log('Linked admin user to Admin role');
  } else {
    console.log('Admin user is already linked to Admin role');
  }

  console.log('Admin seeding completed successfully.');

  return { adminRole, adminUser };
}

if (require.main === module) {
  seedAdmin()
    .catch((error) => {
      console.error('Admin seeding failed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
