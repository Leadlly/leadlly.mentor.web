import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (): Socket | null => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const socket = io(process.env.NEXT_PUBLIC_CHAT_API_BASE_URL!, {
      transports: ['websocket'],
      withCredentials: true,
    });

    setSocketInstance(socket);

    // Cleanup function to disconnect the socket when the component unmounts
    // return () => {
    //   if (socket) {
    //     socket.disconnect();
    //     console.log('Socket disconnected');
    //   }
    // };
  }, []);

  return socketInstance;
};

export default useSocket;
