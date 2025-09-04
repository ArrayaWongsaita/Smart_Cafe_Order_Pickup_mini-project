import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

import { toast } from 'sonner';
import { SOCKET_EVENTS } from '@/shared/constants/socket.constant';
import { getSession } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { PUBLIC_ROUTE } from '@/shared/constants';
import envClientConfig from '@/shared/config/envClient.config';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  isCallingToConnect: boolean;
  socketId: string;
}

interface SocketActions {
  connect: (router: AppRouterInstance) => void;
  disconnect: () => void;
}

interface SocketStore extends SocketState, SocketActions {}

export const useSocket = create<SocketStore>((set) => ({
  // State หลัก
  socket: null, // เก็บ instance ของ socket
  isConnected: false, // true เมื่อเชื่อมต่อสำเร็จ
  isCallingToConnect: false, // ใช้สำหรับบอกว่ากำลังเชื่อมต่อ
  socketId: '', // เก็บ socket.id ล่าสุด

  // เชื่อมต่อ socket
  connect: async (router: AppRouterInstance) => {
    // สร้าง socket instance ใหม่ พร้อม auth token
    const session = await getSession();

    // Check for session errors
    if (session && session.error?.refreshToken) {
      router.push(PUBLIC_ROUTE.SIGN_OUT);
    }
    const socket: Socket = io(envClientConfig.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        token: session?.token?.accessToken || '',
      },
    });

    // ✅ 1) connect: Fired เมื่อเชื่อมต่อสำเร็จ
    socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('[SocketStore] ✅ Socket connected:', socket.id);

      set({
        socket,
        isConnected: true,
        socketId: socket.id || '',
        isCallingToConnect: false,
      });
    });

    // ✅ 2) disconnect: Fired เมื่อเชื่อมต่อหลุด
    socket.on(SOCKET_EVENTS.DISCONNECT, (reason: string) => {
      console.log('[SocketStore] ⚡️ Socket disconnected. Reason:', reason);

      set({
        socket: null,
        isConnected: false,
        socketId: '',
      });
    });

    // ✅ 3) connect_error: Fired เมื่อ handshake ล้มเหลว เช่น token ผิด
    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err: Error) => {
      console.error('[SocketStore] ❌ Socket connection error:', err.message);
      toast.error('Socket connection error: ' + err.message);
    });

    // ✅ 4) error: รับ custom error ถ้า server emit('error')
    socket.on(SOCKET_EVENTS.ERROR, (err: string | Error) => {
      console.error('[SocketStore] 🚨 Server sent error event:', err);
      toast.error('Server sent error event: ' + err);
    });

    socket.on(SOCKET_EVENTS.VALIDATION_ERROR, (err: Error) => {
      toast.error('Server sent validation error message: ' + err.message);
    });

    // เก็บ socket instance ลง state
    set({ socket, isCallingToConnect: true });
    console.log('[SocketStore] Connecting to socket...');
  },

  // ตัดการเชื่อมต่อ socket + ล้าง listener
  disconnect: () => {
    console.log('[SocketStore] Disconnecting socket...');
    set((state: SocketState) => {
      if (state.socket) {
        console.log('[SocketStore] Closing socket...');
        state.socket.off(); // ลบ listener ทั้งหมด (สำคัญ!)
        state.socket.disconnect();
      }

      return {
        socket: null,
        isConnected: false,
        socketId: '',
      };
    });
  },
}));
