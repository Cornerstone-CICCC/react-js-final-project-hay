import {create} from 'zustand'
import {io, Socket} from 'socket.io-client'
import { persist } from 'zustand/middleware'

let socket:Socket | null = null
const URL = process.env.NEXT_PUBLIC_ENDPOINT

interface SocketStoreType{
    socket:Socket| null,
    isConnected:boolean,
    shopperCounter:number|null,
    initializeSocket:()=>void,
    disconnectSocket:()=>void,
    watchingItem:(data:{productId:string, userId:string})=>void
}

const useSocketStore = create<SocketStoreType>()(
  persist(
    (set, get) => ({
      shopperCounter:null,
      socket: null,
      isConnected: false,

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
        socket.on('currentShoppers', (data:{ productId:string, count: number }) => {
          console.log(data);
          set({shopperCounter:data.count})
        });

        set({ socket });
      },

      // Disconnect socket
      disconnectSocket: () => {
        if (socket) {
          socket.disconnect();
          socket = null;
          set({ socket: null, isConnected: false });
        }
      },


      // Emit when enter product page
      watchingItem: (data:{
        productId:string,
        userId:string
      }) => {
        const socketInstance = get().socket;
        if (socketInstance && socketInstance.connected) {
          socketInstance.emit('shopProduct', data);
        } else {
          console.warn('Socket not connected');
        }
      },

    }),
    {
      name: 'socket-storage',
    }
  )
);

export default useSocketStore;