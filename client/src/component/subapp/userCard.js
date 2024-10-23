import React from "react";
import { UserOutlined, MessageOutlined } from "@ant-design/icons"; // Ant Design icons
import { Avatar } from "antd"; // Ant Design Avatar for icons
import { useNavigate } from "react-router-dom";

const UserCard = ({ name, bio, gender, id, imageUrl }) => {
  const navigate = useNavigate();

  // Conditional rendering for the profile image or gender icon
  const renderProfileImage = () => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl} // Image URL from props
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200" // Width and height set to 100px
        />
      );
    } else {
      // Return gender-specific icons
      return (
        <Avatar
          size={100}
          icon={gender === "male" ? <UserOutlined /> : <UserOutlined />}
          className={gender === "male" ? "bg-blue-500" : "bg-pink-500"}
        />
      );
    }
  };
  const charLimit = 25;
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg border border-border overflow-hidden">
      {/* Profile Image */}
      <div className="flex justify-center mt-4">{renderProfileImage()}</div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-border">
          {name || "Unknown User"}
        </h2>
        <p className=" text-gray-300 px-4 text-sm">
          {bio && bio.length > charLimit
            ? `${bio.substring(0, charLimit)}...`
            : bio || "No bio available."}
        </p>{" "}
        {/* Added left and right padding */}
        {/* Gender with Icons */}
        <div className="flex justify-center items-center mt-2 text-border space-x-4 mb-3">
          {" "}
          {/* Added bottom margin */}
          {/* Gender Display */}
          <div className="flex items-center space-x-2">
            <span>{gender}</span>
          </div>
          {/* Chat and Profile Icons */}
          <UserOutlined
            className="text-primary text-lg"
            style={{ fontSize: "1.5rem" }}
            onClick={() => navigate(`/userprofile/${id}`)}
          />{" "}
          {/* Increased icon size */}
          <MessageOutlined
            className="text-primary text-lg"
            style={{ fontSize: "1.5rem" }}
            onClick={() => navigate(`/chat/${id}`)}
          />{" "}
          {/* Increased icon size */}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
