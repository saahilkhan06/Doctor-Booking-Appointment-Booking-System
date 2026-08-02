import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AppContext } from "./AppContext"; // your existing context with userId/token

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { userId } = useContext(AppContext);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      query: { userId },
    });

    newSocket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};