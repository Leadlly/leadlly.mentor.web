import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (): Socket | null => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    // Ensure we create a new socket connection if not already created
    const socket = io(process.env.NEXT_PUBLIC_CHAT_API_BASE_URL!, {
      transports: ['websocket', 'polling'], // Use both WebSocket and polling as fallback
      withCredentials: true, // Include credentials in the requests
    });

    setSocketInstance(socket);

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once

  return socketInstance;
};

export default useSocket;
