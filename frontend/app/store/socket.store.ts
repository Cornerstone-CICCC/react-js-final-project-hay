import { io, type Socket } from 'socket.io-client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/products.type';

let socketInstance: Socket | null = null;
const URL = process.env.NEXT_PUBLIC_ENDPOINT;

export type TrendingProductDetail = {
  name: string;
  price: number;
  image: string;
};
export interface TrendingProductItem {
  productId: string;
  productNum: number;
  productDetail: TrendingProductDetail;
}

interface initialItem {
  _id: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  count: number;
}
interface SocketStoreType {
  isConnected: boolean;
  shopperCounter: number | null;
  trendingProducts: TrendingProductItem[];
  initializeSocket: () => void;
  disconnect: () => void;
  joinItem: (data: { productId: string; userId: string }) => void;
  leaveItem: (data: { productId: string; userId: string }) => void;
  likedItem: (data: { productId: string }) => void;
  currentProductId: string | null;
}

const useSocketStore = create<SocketStoreType>()(
  persist(
    (set, get) => ({
      shopperCounter: null,
      isConnected: false,
      currentProductId: null,
      trendingProducts: [],

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

        socketInstance.on('initialTrending', (data: initialItem[]) => {
          // console.log("Initial", data);
          const formatted: TrendingProductItem[] = data.map((item) => ({
            productId: item._id._id,
            productNum: item.count,
            productDetail: {
              name: item._id.name,
              price: item._id.price,
              image: item._id.image,
            },
          }));
          set({ trendingProducts: formatted });
          // console.log("Formatted:", formatted)
        });

        // Listen for cart updates from other clients/sessions
        socketInstance.on('currentShoppers', (data: { productId: string; count: number }) => {
          console.log(data);
          set({ shopperCounter: data.count });
        });

        socketInstance.on(
          'ProductNumAndDetail',
          (data: {
            productId: string;
            results: {
              productNum: number;
              productDetail: TrendingProductDetail;
            };
          }) => {
            console.log('trending top 4:', data);
            set((state) => {
              const updated = [
                ...state.trendingProducts.filter((item) => item.productId !== data.productId),
                {
                  productId: data.productId,
                  productNum: data.results.productNum,
                  productDetail: data.results.productDetail,
                },
              ];
              updated.sort((a, b) => b.productNum - a.productNum);
              return {
                trendingProducts: updated.slice(0, 4),
              };
            });
          },
        );

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

      likedItem: (data: { productId: string }) => {
        if (!socketInstance) {
          console.log('no socket found');
          return;
        }
        socketInstance.emit('updateWish', data);
      },
    }),
    {
      name: 'socket-storage',
    },
  ),
);

export default useSocketStore;
