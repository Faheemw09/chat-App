import { Avatar } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomNav from "../nav/topnav";
import axios from "axios";
import SingleMessageCard from "./SingleMessageCard.js";
import SpinnerComponent from "../loading.js";

const SOCKET_SERVER_URL = "http://localhost:8080";

const ChatList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Fetch current user info
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://chatap-iqxt.onrender.com/api/user/user/${userId}`
        );
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Fetch chat list
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `https://chatap-iqxt.onrender.com/api/chat/get-chats/${userId}`
        );

        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, [userId]);

  // Fetch more users when scrolling
  const fetchMoreUsers = async () => {
    if (!hasMore) return;
    try {
      const response = await axios.get(
        `https://chatap-iqxt.onrender.com/api/chat/get-chats/${userId}`
      );
      const newUsers = response.data.data;
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      if (newUsers.length === 0) setHasMore(false);
    } catch (error) {
      console.error("Error fetching more users:", error);
    }
  };

  const renderProfileImage = (profilePic, gender) => {
    if (currentUser?.profilePic) {
      return (
        <img
          src={currentUser.profilePic}
          alt="Profile"
          className="w-5 h-5 rounded-full border-4 border-gray-200"
        />
      );
    } else {
      return (
        <Avatar
          size={30}
          icon={<UserOutlined />}
          className={gender === "male" ? "bg-blue-500" : "bg-pink-500"}
        />
      );
    }
  };

  const handleMessageClick = (messageId) => {
    // Update the read status locally
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === messageId ? { ...user, lastMessageRead: true } : user
      )
    );

    // Navigate to the chat with the specified messageId
    navigate(`/chat/${messageId}`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="flex flex-col bg-primary border h-[70px] w-full p-4 pt-[20px] rounded-2xl">
        <div className="flex flex-row justify-start items-start space-x-2">
          <img
            src="/images/arrow.png"
            alt="Back"
            height={20}
            width={20}
            onClick={() => navigate("/home")}
            className="cursor-pointer mt-2 mb-2 pt-1"
          />
          <div className="flex justify-center w-8 h-8 mt-2">
            {currentUser && renderProfileImage(currentUser.profilePic)}
          </div>
          <h2 className="text-xl font-semibold ml-2 mt-1 text-white">
            {currentUser?.name}
          </h2>
        </div>
      </div>

      {/* Chat List */}
      <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 30px)" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center", // Center the spinner horizontally
              alignItems: "center", // Center the spinner vertically
              height: "100px", // Set a height for the container to help with vertical centering
            }}
          >
            <SpinnerComponent />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={users.length}
            next={fetchMoreUsers}
            hasMore={hasMore}
            loader={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "16px",
                  width: "100%",
                }}
              >
                {/* <SpinnerComponent /> */}
              </div>
            }
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
              width: "100%",
            }}
          >
            {users.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>No chats available</h3>
              </div>
            ) : (
              users.map((user, index) => (
                <div className="w-full pl-2 pr-2 pt-1" key={index}>
                  <SingleMessageCard
                    name={user.userName}
                    imageUrl={user.userProfilePic}
                    lastMessage={user.lastMessage}
                    lastMessageDate={user.lastMessageDate}
                    unread={user.lastMessageRead} // Update the unread status
                    id={user._id} // New prop for unread status
                    handleMessageClick={handleMessageClick}
                  />
                </div>
              ))
            )}
          </InfiniteScroll>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChatList;
