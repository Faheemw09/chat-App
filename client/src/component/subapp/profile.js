import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, Select, message } from "antd"; // Import Ant Design components
import { UserOutlined, EditOutlined } from "@ant-design/icons"; // Icons for the avatar and edit action
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API requests

const { Option } = Select;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [name, setName] = useState(""); // User's name
  const [bio, setBio] = useState(""); // User's bio
  const [gender, setGender] = useState(""); // User's gender
  const [email, setEmail] = useState(""); // User's email (read-only)
  const [profilePic, setImage] = useState(null); // State to hold the profile image
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  // Retrieve userId from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.id : null;
  // Fetch user data by ID when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          message.error("User ID not found in local storage.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/user/user/${userId}`
        );
        const userData = response.data.data;
        console.log(userData, "ud");
        setName(userData.name);
        setBio(userData.bio);
        setGender(userData.gender);
        setEmail(userData.email);
        setImage(userData.profilePic);

        console.log("Data retrieved:", userData);
      } catch (error) {
        message.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [userId]);

  // Handler to toggle edit mode
  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("gender", gender);
        formData.append("email", email);
        if (profilePic) {
          formData.append("profilePic", profilePic);
        }

        // Send theconsole.log(f) request to update the profile
        console.log("User ID:", userId);
        console.log(
          "Form Data before sending:",
          Array.from(formData.entries())
        );
        const response = await axios.patch(
          `http://localhost:8080/api/user/update-profile/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Update Response:", response.data);
        message.success("Profile updated successfully!");
      } catch (error) {
        message.error("Failed to update profile.");
      }
    }

    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const renderProfileImage = () => {
    if (profilePic) {
      return (
        <img
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200" // Styling for image
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
              onChange={handleProfilePicChange}
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
            <p className="text-primary">{name}</p>
          )}
        </div>

        {/* Email Section (Read-Only) */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Email:</h3>
          <input
            value={email}
            readOnly
            className="bg-white text-primary rounded-xl w-full p-2"
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
            <p className="text-primary">{bio}</p>
          )}
        </div>

        {/* Gender Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Gender:</h3>
          {isEditing ? (
            <Select value={gender} onChange={setGender} className="w-full">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          ) : (
            <p className="text-primary">{gender}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
