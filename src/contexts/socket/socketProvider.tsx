'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';


const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_CHAT_API_BASE_URL!, {
      transports: ['websocket'], 
      withCredentials: true, 
    });

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};
