export const PUBLIC_ROUTE = {
  HOME: '/',
  MENU: (page: number) => `/menu/${page}`,
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_OUT: '/signout',
  CHECKOUT: '/order/checkout',
  SEARCH_ORDER: '/order',
  ORDER_STATUS: (orderCode: string) => `/order/status/${orderCode}`,
};

export const PRIVATE_ROUTE = {
  DASHBOARD: '/dashboard',
};
