export const PUBLIC_ROUTE = {
  HOME: '/',
  SIGN_OUT: '/signout',
  SIGN_IN: '/signin',
};

export const PRIVATE_ROUTE = {
  ORDERS: (page: number = 1) => `/orders/${page}`,
  DASHBOARD: '/dashboard',
};
