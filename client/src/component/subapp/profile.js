import React, { useState } from "react";
import { Avatar, Button, Input, Select } from "antd"; // Import Ant Design components
import { UserOutlined, EditOutlined } from "@ant-design/icons"; // Icons for the avatar and edit action
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [name, setName] = useState("John Doe"); // Sample name
  const [bio, setBio] = useState("Software Engineer"); // Sample bio
  const [gender, setGender] = useState("Male"); // Sample gender
  const [email] = useState("john.doe@example.com"); // Sample email (read-only)
  const [image, setImage] = useState(null); // State to hold the profile image

  // Handler to toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handler for image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image state with the selected file
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const renderProfileImage = () => {
    if (image) {
      return (
        <img
          src={image} // Image URL from props
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200" // Width and height set to 100px
        />
      );
    } else {
      // Return gender-specific icons
      return (
        <Avatar
          size={100}
          icon={<UserOutlined />}
          className={gender === "Male" ? "bg-blue-500" : "bg-pink-500"}
        />
      );
    }
  };
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section: Image and Edit Icon */}
      <div className="relative w-full h-[200px] bg-primary flex flex-col items-center justify-center">
        <div className="flex flex-row justify-between place-items-center w-full px-2 mt-[70px]">
          <img
            src="/images/arrow.png"
            alt="Back"
            height={20}
            width={20}
            onClick={() => navigate("/home")}
            className="cursor-pointer mb-2 pt-1"
          />
          <button
            type="default"
            onClick={handleEditToggle}
            className="bg-primary text-white"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <div className="flex justify-center mt-[100px]">
          <div className="relative">
            {renderProfileImage()}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              onClick={(e) => (e.target.value = null)} // Reset file input
            />
            <EditOutlined
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
              className="absolute bottom-0 right-0 mb-5 mr-1 text-white cursor-pointer"
              style={{ fontSize: "16px", fontStyle: "italic" }}
            />
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="w-full flex flex-col p-4 mt-6">
        {/* Name Section */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Name:</h3>
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name on change
            />
          ) : (
            <p className="text-gray-700">{name}</p>
          )}
        </div>

        {/* Email Section (Read-Only) */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Email:</h3>
          <input
            value={email}
            readOnly
            className="bg-white rounded-xl w-full p-2"
          />
        </div>

        {/* Bio Section */}
        <div className="w-full mb-4">
          <h3 className="text-sm font-semibold">Bio:</h3>
          {isEditing ? (
            <textarea
              className="w-full border rounded p-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)} // Update bio on change
            />
          ) : (
            <p className="text-gray-700">{bio}</p>
          )}
        </div>

        {/* Gender Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Gender:</h3>
          {isEditing ? (
            <Select value={gender} onChange={setGender} className="w-full">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          ) : (
            <p className="text-gray-700">{gender}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
