import { Avatar } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, SendOutlined } from "@ant-design/icons"; // Ant Design
import ChatCard from "./chatcard";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomNav from "../nav/topnav";

const ChatList = () => {
  const navigate = useNavigate();
  const { imageUrl, gender } = "";
  const renderProfileImage = () => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl} // Image URL from props
          alt="Profile"
          className="w-5 h-5 rounded-full border-4 border-gray-200" // Adjusted size
        />
      );
    } else {
      // Return gender-specific icons
      return (
        <Avatar
          size={30}
          icon={<UserOutlined />}
          className={gender === "male" ? "bg-blue-500" : "bg-pink-500"}
        />
      );
    }
  };
  const initialUsers = [
    {
      name: "John Doe",
      bio: "This is a short bio for John.",
      gender: "male",
      imageUrl: "", // Leave empty for default icon
    },
    {
      name: "Jane Smith",
      bio: "This is a short bio for Jane.",
      gender: "female",
      imageUrl: "", // Leave empty for default icon
    },
    {
      name: "Alice Johnson",
      bio: "Short bio for Alice.",
      gender: "female",
      imageUrl: "", // Leave empty for default icon
    },
    {
      name: "Bob Brown",
      bio: "This is a bio for Bob.",
      gender: "male",
      imageUrl: "", // Leave empty for default icon
    },
    {
      name: "Charlie Davis",
      bio: "Bio for Charlie.",
      gender: "male",
      imageUrl: "", // Leave empty for default icon
    },
  ];

  // State for users and loading
  const [users, setUsers] = useState(initialUsers);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreUsers = () => {
    // Simulate fetching more users
    setTimeout(() => {
      const newUsers = [
        {
          name: "David Lee",
          bio: "This is a short bio for David.",
          gender: "male",
          imageUrl: "", // Leave empty for default icon
        },
        {
          name: "Eva Green",
          bio: "This is a short bio for Eva.",
          gender: "female",
          imageUrl: "", // Leave empty for default icon
        },
        {
          name: "Frank White",
          bio: "Bio for Frank.",
          gender: "male",
          imageUrl: "", // Leave empty for default icon
        },
        {
          name: "Grace Black",
          bio: "Short bio for Grace.",
          gender: "female",
          imageUrl: "", // Leave empty for default icon
        },
        {
          name: "Henry Gray",
          bio: "Bio for Henry.",
          gender: "male",
          imageUrl: "", // Leave empty for default icon
        },
      ];

      // Append new users to the existing list
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);

      // Stop loading after appending
      if (newUsers.length === 0) {
        setHasMore(false);
      }
    }, 1500); // Simulate network delay
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
            className="cursor-pointer mb-2 pt-1"
          />
          <div className="flex justify-center">{renderProfileImage()}</div>
          <h2 className="text-xl font-semibold ml-2 text-white">
            {"Unknown User"}
          </h2>
        </div>
      </div>
      <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 30px)" }}>
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreUsers}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          style={{
            display: "flex",
            flexDirection: "column", // Change to column layout
            marginTop: "16px",
            width: "100%",
          }}
        >
          {users.map((user, index) => (
            <div className="w-full pl-2 pr-2 pt-1" key={index}>
              <ChatCard
                name={user.name}
                bio={user.bio}
                gender={user.gender}
                imageUrl={user.imageUrl}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <BottomNav />
    </div>
  );
};

export default ChatList;
