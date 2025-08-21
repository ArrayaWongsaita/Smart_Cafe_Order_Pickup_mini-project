export type ACCESS_TOKEN_PAYLOAD = {
  sub: string;
  email: string;
  role: 'CUSTOMER' | 'BARISTA' | 'ADMIN';
};

export type REFRESH_TOKEN_PAYLOAD = {
  sub: string;
};
