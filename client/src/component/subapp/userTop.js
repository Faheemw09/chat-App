import { Avatar } from "antd";
import { UserOutlined, MessageOutlined } from "@ant-design/icons"; // Ant D
const UserTop = ({ gender, name, imageUrl }) => {
  const renderProfileImage = () => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl} // Image URL from props
          alt="Profile"
          className="w-5 h-5 rounded-full border-4 border-gray-200" // Width and height set to 100px
        />
      );
    } else {
      // Return gender-specific icons
      return (
        <Avatar
          size={30}
          icon={gender === "male" ? <UserOutlined /> : <UserOutlined />}
          className={gender === "male" ? "bg-blue-500" : "bg-pink-500"}
        />
      );
    }
  };
  return (
    <div className="flex flex-row justify-start items-start ">
      <div className="flex justify-center ">{renderProfileImage()}</div>
      <h2 className="text-xl font-semibold ml-2 text-white">
        {name || "Unknown User"}
      </h2>
    </div>
  );
};

export default UserTop;
