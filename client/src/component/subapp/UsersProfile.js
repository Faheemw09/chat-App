import React, { useState, useEffect } from "react";
import { Avatar, message, Spin } from "antd"; // Import Ant Design components
import { UserOutlined } from "@ant-design/icons"; // Icon for the avatar
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Axios for API requests
import { MainButton } from "../buttons/mainbutton";

const UsersProfile = () => {
  const params = useParams(); // Get all params
  const { receiverId } = params;
  const [name, setName] = useState(""); // User's name
  const [bio, setBio] = useState(""); // User's bio
  const [gender, setGender] = useState(""); // User's gender
  const [email, setEmail] = useState(""); // User's email (read-only)
  const [profilePic, setImage] = useState(null); // State to hold the profile image
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `https://chatap-iqxt.onrender.com/api/user/user/${receiverId}`
        );
        const userData = response.data.data;
        setName(userData.name);
        setBio(userData.bio);
        setGender(userData.gender);
        setEmail(userData.email);
        setImage(userData.profilePic);
      } catch (error) {
        message.error("Failed to fetch user data.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUserData();
  }, [receiverId]);

  const handlemessage = () => {
    navigate(`/chat/${receiverId}`);
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

  // Render only spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" /> {/* Ant Design Spinner */}
      </div>
    );
  }

  // Render user profile after loading
  return (
    <div className="flex flex-col h-screen">
      {/* Top Section: Image and Back Icon */}
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
        </div>
        <div className="flex justify-center mt-[100px]">
          <div className="relative">{renderProfileImage()}</div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="w-full flex flex-col p-4 mt-6">
        {/* Name Section */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Name</h3>
          <p className="text-primary">{name}</p>
        </div>

        {/* Bio Section */}
        <div className="w-full mb-4">
          <h3 className="text-sm font-semibold">Bio</h3>
          <p className="text-primary">{bio}</p>
        </div>

        {/* Gender Section */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Gender</h3>
          <p className="text-primary">{gender}</p>
        </div>
        <div className="mb-4 ml-4">
          <MainButton text={"Message"} onClick={handlemessage} />
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;
