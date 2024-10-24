import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, Select, message, Spin } from "antd"; // Import Ant Design components
import { UserOutlined, EditOutlined } from "@ant-design/icons"; // Icons for the avatar and edit action
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API requests
import { MainButton } from "../buttons/mainbutton";
import SpinnerComponent from "../loading";

const { Option } = Select;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [name, setName] = useState(""); // User's name
  const [bio, setBio] = useState(""); // User's bio
  const [gender, setGender] = useState(""); // User's gender
  const [email, setEmail] = useState(""); // User's email (read-only)
  const [profilePic, setProfilePic] = useState(null); // State to hold the profile image
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();

  // Retrieve userId from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.id : null;

  // Fetch user data by ID when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Start loading
      try {
        if (!userId) {
          message.error("User ID not found in local storage.");
          return;
        }

        const response = await axios.get(
          `https://chatap-iqxt.onrender.com/api/user/user/${userId}`
        );
        const userData = response.data.data;
        setName(userData.name);
        setBio(userData.bio);
        setGender(userData.gender);
        setEmail(userData.email);
        setProfilePic(userData.profilePic);
        setImagePreview(userData.profilePic); // Set initial image preview
      } catch (error) {
        message.error("Failed to fetch user data.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, [userId]);

  // Handler to toggle edit mode
  const handleEditToggle = async () => {
    if (isEditing) {
      setIsLoading(true); // Start loading for update
      try {
        // Prepare the payload with user data
        const payload = {
          name,
          bio,
          gender,
          email,
          // Uncomment if you're also sending a profile picture URL
          // profilePic: profilePic,
        };

        console.log("Submitting update with:", payload); // Debug log for submitted data

        // Send the request to update the profile
        const response = await axios.patch(
          `http://localhost:8080/api/user/update-profile/${userId}`,
          payload, // Send the payload as JSON
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
          }
        );

        // Log the successful response for debugging
        console.log(response.data, "Response from server");

        // Show success message to the user
        message.success("Profile updated successfully!");
      } catch (error) {
        // Handle error gracefully
        console.error(
          "Update error:",
          error.response ? error.response.data : error.message
        );
        message.error("Failed to update profile."); // Notify user of the failure
      } finally {
        // Stop loading after the update operation is complete
        setIsLoading(false);
      }
    }

    // Toggle editing state
    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
      setProfilePic(file);
    }
  };

  const renderProfileImage = () => {
    if (imagePreview) {
      return (
        <img
          src={imagePreview}
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

  const handlesignout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <SpinnerComponent />
        </div>
      ) : (
        <>
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
                type="button" // Use type="button" for non-submit buttons
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MainButton text="Signout" onClick={handlesignout} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
