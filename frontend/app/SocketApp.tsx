'use client';

import { useEffect } from 'react';
import useSocketStore from './store/socket.store';

const SocketApp = () => {
  const initializeSocket = useSocketStore((state) => state.initializeSocket);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    initializeSocket();

    return () => {
      disconnect();
    };
  }, []);
  return <></>;
};

export default SocketApp;
