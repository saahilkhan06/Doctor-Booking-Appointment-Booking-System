import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const { notifications, setNotifications } = useContext(SocketContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={22} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border z-50">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="p-3 border-b text-sm hover:bg-gray-50">
                <p>{n.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date(n.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
          {notifications.length > 0 && (
            <button
              onClick={() => setNotifications([])}
              className="w-full text-center py-2 text-xs text-blue-500 hover:bg-gray-50"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
