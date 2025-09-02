export const PUBLIC_ROUTE = {
  HOME: '/',
  MENU: (page: number) => `/menu/${page}`,
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_OUT: '/signout',
};

export const PRIVATE_ROUTE = {
  DASHBOARD: '/dashboard',
};
