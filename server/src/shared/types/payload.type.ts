export type ACCESS_TOKEN_PAYLOAD = {
  sub: string;
  email: string;
  username: string;
  role: 'ADMIN';
};
export type REFRESH_TOKEN_PAYLOAD = {
  sub: string;
};
