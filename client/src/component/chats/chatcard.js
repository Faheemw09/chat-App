import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons"; // Ant D
import React from "react";

const SingleMessageCard = ({ name, imageUrl, lastMessage, time }) => {
  const renderProfileImage = () => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-200"
        />
      );
    } else {
      return (
        <Avatar size={48} icon={<UserOutlined />} className="bg-blue-500" />
      );
    }
  };

  return (
    <div className="w-full p-4 flex flex-row items-center bg-white rounded-lg shadow-lg border border-gray-300">
      {/* Profile Image */}
      <div className="mr-4">{renderProfileImage()}</div>

      {/* User Info */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-black">
          {name || "Unknown User"}
        </h2>
        <p className="text-sm text-gray-500">
          {lastMessage || "No message available."}
        </p>
      </div>

      {/* Last Message Time */}
      <div className="text-xs text-gray-400">{time || "00:00"}</div>
    </div>
  );
};

export default SingleMessageCard;
