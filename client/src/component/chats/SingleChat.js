import { Avatar, Input } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons"; // Ant Design
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";

const SingleChat = () => {
  const navigate = useNavigate();
  const { imageUrl, gender } = ""; // Replace with your user data
  const [messages, setMessages] = useState([
    { text: "Hello! How are you?", sender: "receiver", time: "10:00 AM" },
    {
      text: "I'm good, thanks! How about you?",
      sender: "me",
      time: "10:01 AM",
    },
    {
      text: "Are you coming to the party?",
      sender: "receiver",
      time: "10:02 AM",
    },
    { text: "Yes, I will be there!", sender: "me", time: "10:03 AM" },
  ]); // Sample messages
  const [input, setInput] = useState(""); // State to store current input value

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

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add the message to the chat
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "me", time }, // Add timestamp for the sender
      ]);
      setInput(""); // Clear the input field
    }
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

      {/* Message Area */}
      <ScrollToBottom className="scroll-container flex-1 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 flex flex-col ${
              message.sender === "me" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-2 ml-2 mr-2 rounded-lg ${
                message.sender === "me"
                  ? "bg-bg text-white"
                  : "bg-bgg text-white"
              }`}
              style={{
                maxWidth: "60%", // Limit width of messages
              }}
            >
              {message.text}
            </div>
            <span
              className={`text-xs ml-2 mr-2 text-gray-500 ${
                message.sender === "me" ? "text-right" : "text-left"
              }`}
            >
              {message.time}
            </span>
          </div>
        ))}
      </ScrollToBottom>

      {/* Input Area */}
      <div className="flex p-4  rounded-b-2xl items-center">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSendMessage} // Send on Enter key press
          className="flex-grow p-2 border rounded-lg"
          placeholder="Type a message..."
          style={{
            borderRadius: "25px",
            borderColor: "#d9d9d9",
            marginRight: "10px",
            height: "40px",
          }}
        />
        <SendOutlined
          onClick={handleSendMessage}
          style={{ fontSize: "24px", color: "#36B8B8", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default SingleChat;
