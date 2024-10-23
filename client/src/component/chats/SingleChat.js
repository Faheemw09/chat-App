import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Input } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import axios from "axios";

const SOCKET_SERVER_URL = "https://chatap-iqxt.onrender.com"; // Replace with your backend URL

const SingleChat = () => {
  const { receiverId } = useParams();
  const user = JSON.parse(localStorage.getItem("user")); // Get user object from localStorage
  const [userdata, setUserData] = useState({});
  const userId = user?.id;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch user data for the given receiverId
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://chatap-iqxt.onrender.com/api/user/user/${receiverId}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Set up Socket.IO connection on component mount
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("join", userId);
    });

    newSocket.on("receive_message", (data) => {
      console.log("Message received:", data);
      const direction = data.receiver === userId ? "received" : "sent";
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, direction }, // Add direction based on sender and receiver
      ]);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Fetch conversation
    if (userId && receiverId) {
      fetch(
        `http://localhost:8080/api/chat/get-conversation/${userId}/${receiverId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            setMessages(data.data);
          } else {
            console.error("Fetched conversation is not an array:", data.data);
            setMessages([]);
          }
        })
        .catch((error) => console.error("Error fetching conversation:", error));
    }

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [receiverId, userId]);

  const handleSendMessage = () => {
    console.log("handleSendMessage called"); // Check if the function is invoked
    console.log("Socket state:", socket);
    if (input.trim() && socket) {
      const newMessage = {
        sender: userId,
        receiver: receiverId,
        message: input,
        direction: "sent",
        read: false,
        timestamp: new Date().toISOString(),
      };

      console.log("Emitting message:", newMessage);
      socket.emit("send_message", newMessage, (response) => {
        console.log("Response from server:", response);
        if (response && response.status === "success") {
          // Only add the message here to prevent duplication
          console.log("Clearing input field"); // Add this line
          setInput("");
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          console.error("Message not acknowledged by server");
        }
      });
      setInput(""); // Clear input field
      // Send the message to the server via API call
      axios
        .post(
          "https://chatap-iqxt.onrender.com/api/chat/send-message",
          newMessage
        )
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col bg-primary border h-[70px] w-full p-4 pt-[20px] rounded-2xl">
        <div className="flex flex-row justify-start items-start space-x-2">
          <img
            src="/images/arrow.png"
            alt="Back"
            height={20}
            width={20}
            onClick={() => navigate("/chats")}
            className="cursor-pointer mb-2 mt-2 pt-1"
          />
          <div className="flex justify-center">
            {userdata?.profilePic ? (
              <img
                src={userdata.profilePic}
                alt="Profile"
                className="w-6 h-6 mt-2 rounded-full border-4 border-gray-200"
              />
            ) : (
              <Avatar
                size={30}
                icon={<UserOutlined />}
                className={
                  userdata?.gender === "male" ? "bg-blue-500" : "bg-pink-500"
                }
              />
            )}
          </div>
          <h2 className="text-xl mt-1 font-semibold ml-2 text-white">
            {userdata?.name}
          </h2>
        </div>
      </div>

      <ScrollToBottom className="scroll-container flex-1 overflow-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col items-start my-2 w-full">
            {message.direction === "sent" && (
              <div className="flex justify-end w-full">
                <div className="p-2 ml-2 mr-2 rounded-lg bg-bg text-white">
                  {message.message}
                </div>
                <span className="text-xs text-gray-500 self-end">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            )}
            {message.direction === "received" && (
              <div className="flex justify-start w-full">
                <div className="p-2 ml-2 mr-2 rounded-lg bg-bgg text-white">
                  {message.message}
                </div>
                <span className="text-xs text-gray-500 self-end">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </ScrollToBottom>

      <div className="flex p-4 rounded-b-2xl items-center">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSendMessage}
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
