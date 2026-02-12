import { io, type Socket } from 'socket.io-client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let socket: Socket | null = null;
const URL = process.env.NEXT_PUBLIC_ENDPOINT;

interface SocketStoreType {
  socket: Socket | null;
  isConnected: boolean;
  shopperCounter: number | null;
  initializeSocket: () => void;
  disconnect: () => void;
  joinItem: (data: { productId: string; userId: string }) => void;
  leaveItem: (data: { productId: string; userId: string }) => void;
  currentProductId: string | null;
}

const useSocketStore = create<SocketStoreType>()(
  persist(
    (set, get) => ({
      shopperCounter: null,
      socket: null,
      isConnected: false,
      currentProductId: null,

      // Initialize socket connection
      initializeSocket: () => {
        if (socket) return; // Already initialized

        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
          transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
          console.log('Socket connected:', socket?.id);
          set({ socket, isConnected: true });
        });

        socket.on('disconnect', () => {
          console.log('Socket disconnected');
          set({ isConnected: false });
        });

        // Listen for cart updates from other clients/sessions
        socket.on('currentShoppers', (data: { productId: string; count: number }) => {
          console.log(data);
          set({ shopperCounter: data.count });
        });

        set({ socket });
      },

      // Disconnect socket
      disconnect: () => {
        if (socket) {
          socket.disconnect();
          socket = null;
          set({ socket: null, isConnected: false });
        }
      },

      // Emit when enter product page
      joinItem: (data: { productId: string; userId: string }) => {
        const { socket, currentProductId } = get();

        if (!socket) {
          console.warn('Socket not initialized');
          return;
        }

        // Leave previous product if it's different
        if (currentProductId && currentProductId !== data.productId) {
          socket.emit('leaveProduct', {
            productId: currentProductId,
            userId: data.userId,
          });
          console.log(`Left previous product: ${currentProductId}`);
        }

        // Join new product
        socket.emit('shopProduct', data);
        set({ currentProductId: data.productId });
        console.log(`Joined product: ${data.productId}`);
      },

      leaveItem: (data: { productId: string; userId: string }) => {
        const { socket } = get();
        if (!socket) {
          console.log('there is no socket');
          return;
        }

        socket.emit('leaveProduct', data);

        set({ shopperCounter: null });
      },
    }),
    {
      name: 'socket-storage',
    },
  ),
);

export default useSocketStore;
