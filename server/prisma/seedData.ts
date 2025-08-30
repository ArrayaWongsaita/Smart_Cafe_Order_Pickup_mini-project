export const userData = [
  {
    email: 'customer@example.com',
    password: 'password1', // Plain password to be hashed
    role: 'CUSTOMER' as const,
  },
  {
    email: 'barista@example.com',
    password: 'password2', // Plain password to be hashed
    role: 'BARISTA' as const,
  },
  {
    email: 'admin@example.com',
    password: 'password3', // Plain password to be hashed
    role: 'ADMIN' as const,
  },
];

export const menuCategoryData = [
  { name: 'Coffee', sortOrder: 1 },
  { name: 'Pastries', sortOrder: 2 },
  { name: 'Beverages', sortOrder: 3 },
  { name: 'Desserts', sortOrder: 4 },
];

export const menuItemData = [
  {
    name: 'Espresso',
    description: 'Strong coffee shot',
    price: 5000,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kawaii_paper_coffee_cup_clip_art.svg/1920px-Kawaii_paper_coffee_cup_clip_art.svg.png?20191207190614',
  },
  { name: 'Croissant', description: 'Buttery pastry', price: 3000 },
  {
    name: 'Latte',
    description: 'Smooth coffee with steamed milk',
    price: 6000,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kawaii_paper_coffee_cup_clip_art.svg/1920px-Kawaii_paper_coffee_cup_clip_art.svg.png?20191207190614',
  },
  { name: 'Muffin', description: 'Blueberry muffin', price: 4000 },
  { name: 'Iced Tea', description: 'Refreshing iced tea', price: 3500 },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate dessert',
    price: 5500,
  },
  {
    name: 'Cappuccino',
    description: 'Coffee with frothy milk',
    price: 5500,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kawaii_paper_coffee_cup_clip_art.svg/1920px-Kawaii_paper_coffee_cup_clip_art.svg.png?20191207190614',
  },
  {
    name: 'Bagel',
    description: 'Toasted bagel with cream cheese',
    price: 4500,
  },
];

export const toppingData = [
  { name: 'Milk', price: 500 },
  { name: 'Sugar', price: 200 },
  { name: 'Whipped Cream', price: 300 },
  { name: 'Caramel Syrup', price: 400 },
  { name: 'Vanilla Syrup', price: 400 },
  { name: 'Chocolate Chips', price: 600 },
];

export const orderData = [
  {
    orderCode: 'ABC123',
    status: 'PREPARING' as const,
    totalPrice: 5500,
    notes: 'Extra hot',
  },
];

export const orderItemData = [{ qty: 1, unitPrice: 5000, subtotal: 5000 }];

export const orderItemToppingData = [{ price: 500 }];

export const refreshTokenData = [
  {
    token: 'sampletoken123',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
];
