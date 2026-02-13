import { io, type Socket } from 'socket.io-client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let socketInstance: Socket | null = null;
const URL = process.env.NEXT_PUBLIC_ENDPOINT;

interface SocketStoreType {
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
      isConnected: false,
      currentProductId: null,

      // Initialize socket connection
      initializeSocket: () => {
        if (socketInstance) return; // Already initialized

        socketInstance = io(URL || 'http://localhost:5000', {
          transports: ['websocket', 'polling'],
        });

        socketInstance.on('connect', () => {
          console.log('Socket connected:', socketInstance?.id);
          set({ isConnected: true });
        });

        socketInstance.on('disconnect', () => {
          console.log('Socket disconnected');
          set({ isConnected: false });
        });

        // Listen for cart updates from other clients/sessions
        socketInstance.on('currentShoppers', (data: { productId: string; count: number }) => {
          console.log(data);
          set({ shopperCounter: data.count });
        });

        return socketInstance;
      },

      // Disconnect socket
      disconnect: () => {
        if (socketInstance) {
          socketInstance.disconnect();
          socketInstance = null;
          set({ isConnected: false });
        }
      },

      // Emit when enter product page
      joinItem: (data: { productId: string; userId: string }) => {
        const { currentProductId } = get();

        if (!socketInstance) {
          console.warn('Socket not initialized');
          return;
        }

        // Leave previous product if it's different
        if (currentProductId && currentProductId !== data.productId) {
          socketInstance.emit('leaveProduct', {
            productId: currentProductId,
            userId: data.userId,
          });
          console.log(`Left previous product: ${currentProductId}`);
        }

        // Join new product
        socketInstance.emit('shopProduct', data);
        set({ currentProductId: data.productId });
        console.log(`Joined product: ${data.productId}`);
      },

      leaveItem: (data: { productId: string; userId: string }) => {

        if (!socketInstance) {
          console.log('there is no socket');
          return;
        }

        socketInstance.emit('leaveProduct', data);

        set({ shopperCounter: null });
      },
    }),
    {
      name: 'socket-storage',
    },
  ),
);

export default useSocketStore;
