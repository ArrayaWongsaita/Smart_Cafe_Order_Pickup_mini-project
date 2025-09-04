// axios config

import { PUBLIC_ROUTE } from '@/shared/constants';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    // add token to headers if available
    const session = await getSession();

    if (session?.token.accessToken) {
      config.headers.Authorization = `Bearer ${session.token.accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    // if error 401 or 403, redirect to login page
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = PUBLIC_ROUTE.SIGN_IN;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
