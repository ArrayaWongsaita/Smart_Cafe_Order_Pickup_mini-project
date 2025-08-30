import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcryptjs';
import {
  userData,
  menuCategoryData,
  menuItemData,
  toppingData,
  orderData,
  orderItemData,
  orderItemToppingData,
  refreshTokenData,
} from './seedData';

const prisma = new PrismaClient();

async function findOrCreateUser(u: (typeof userData)[number]) {
  const existing = await prisma.user.findUnique({ where: { email: u.email } });
  if (existing) return existing;
  const { password, ...rest } = u as any;
  return prisma.user.create({
    data: {
      ...rest,
      passwordHash: await bcrypt.hash(password, 10),
    },
  });
}

async function findOrCreateCategory(c: (typeof menuCategoryData)[number]) {
  const existing = await prisma.menuCategory.findUnique({
    where: { name: c.name },
  });
  if (existing) return existing;
  return prisma.menuCategory.create({ data: c });
}

async function findOrCreateMenuItem(
  mi: (typeof menuItemData)[number],
  categoryId?: string,
) {
  const existing = await prisma.menuItem.findUnique({
    where: { name: mi.name },
  });
  if (existing) return existing;
  return prisma.menuItem.create({
    data: {
      ...mi,
      categoryId,
    },
  });
}

async function findOrCreateTopping(t: (typeof toppingData)[number]) {
  const existing = await prisma.topping.findUnique({ where: { name: t.name } });
  if (existing) return existing;
  return prisma.topping.create({ data: t });
}

async function findOrCreateRefreshToken(
  rt: (typeof refreshTokenData)[number],
  userId: string,
) {
  const existing = await prisma.refreshToken.findUnique({
    where: { token: rt.token },
  });
  if (existing) return existing;
  return prisma.refreshToken.create({
    data: {
      ...rt,
      userId,
    },
  });
}

async function main() {
  // Seed Users (idempotent)
  const customer = await findOrCreateUser(userData[0]);
  await findOrCreateUser(userData[1]);
  const admin = await findOrCreateUser(userData[2]);

  // Seed MenuCategory (idempotent)
  const coffeeCategory = await findOrCreateCategory(menuCategoryData[0]);
  const pastryCategory = await findOrCreateCategory(menuCategoryData[1]);
  // create other categories if present
  for (let i = 2; i < menuCategoryData.length; i++) {
    await findOrCreateCategory(menuCategoryData[i]);
  }

  // Seed MenuItem (idempotent) -- attach to categories where available
  const espresso = await findOrCreateMenuItem(
    menuItemData[0],
    coffeeCategory.id,
  );
  await findOrCreateMenuItem(menuItemData[1], pastryCategory.id);
  // create remaining items and try to attach coffees to coffeeCategory
  for (let i = 2; i < menuItemData.length; i++) {
    const item = menuItemData[i];
    const attachCategory =
      item.imageUrl && coffeeCategory.id ? coffeeCategory.id : undefined;
    await findOrCreateMenuItem(item, attachCategory);
  }

  // Seed Topping (idempotent)
  const milk = await findOrCreateTopping(toppingData[0]);
  for (let i = 1; i < toppingData.length; i++) {
    await findOrCreateTopping(toppingData[i]);
  }

  // Seed Order (idempotent) with nested items/toppings
  const orderCode = orderData[0].orderCode;
  const existingOrder = await prisma.order.findUnique({
    where: { orderCode },
    include: { items: true },
  });
  if (!existingOrder) {
    // create order with nested item and topping using already created records
    await prisma.order.create({
      data: {
        orderCode,
        customer: { connect: { id: customer.id } },
        status: orderData[0].status,
        totalPrice: orderData[0].totalPrice,
        notes: orderData[0].notes,
        items: {
          create: [
            {
              item: { connect: { id: espresso.id } },
              qty: orderItemData[0].qty,
              unitPrice: orderItemData[0].unitPrice,
              subtotal: orderItemData[0].subtotal,
              toppings: {
                create: [
                  {
                    topping: { connect: { id: milk.id } },
                    price: orderItemToppingData[0].price,
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }

  // Seed RefreshToken (idempotent)
  await findOrCreateRefreshToken(refreshTokenData[0], admin.id);

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
