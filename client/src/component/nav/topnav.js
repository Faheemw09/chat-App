import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons"; // Ant Design icons

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Get the current location

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background p-3 shadow-      lg">
      <div className="flex justify-around items-center">
        {/* Home Icon */}
        <div className="flex flex-col items-center">
          <HomeOutlined
            onClick={() => navigate("/home")}
            className={`text-2xl ${
              location.pathname === "/home" ? "text-hw" : "text-primary"
            }`}
          />
        </div>

        {/* Chat Icon */}
        <div className="flex flex-col items-center">
          <MessageOutlined
            onClick={() => navigate("/chats")}
            className={`text-2xl ${
              location.pathname === "/chats" ? "text-hw" : "text-primary"
            }`}
          />
        </div>

        {/* Profile Icon */}
        <div className="flex flex-col items-center">
          <UserOutlined
            onClick={() => navigate("/profile")}
            className={`text-2xl ${
              location.pathname === "/profile" ? "text-hw" : "text-primary"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
