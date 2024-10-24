import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Input } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import axios from "axios";
import SpinnerComponent from "../loading";

const SOCKET_SERVER_URL = "https://chatap-iqxt.onrender.com"; // Replace with your backend URL

const SingleChat = () => {
  const { receiverId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userdata, setUserData] = useState({});
  const userId = user?.id;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://chatap-iqxt.onrender.com/api/user/user/${receiverId}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

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
      const direction = data.receiver === userId ? "received" : "sent";
      setMessages((prevMessages) => [...prevMessages, { ...data, direction }]);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    if (userId && receiverId) {
      fetch(
        `https://chatap-iqxt.onrender.com/api/chat/get-conversation/${userId}/${receiverId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.data || []);
        })
        .catch((error) => console.error("Error fetching conversation:", error));
    }

    return () => {
      newSocket.disconnect();
    };
  }, [receiverId, userId]);

  const handleSendMessage = () => {
    if (input.trim() && socket) {
      const newMessage = {
        sender: userId,
        receiver: receiverId,
        message: input,
        direction: "sent",
        read: false,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send_message", newMessage, (response) => {
        if (response && response.status === "success") {
          setInput("");
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });
      setInput("");

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
      {/* Header */}
      <div className="flex items-center p-4 bg-primary border h-[70px] w-full">
        <img
          src="/images/arrow.png"
          alt="Back"
          height={20}
          width={20}
          onClick={() => navigate("/chats")}
          className="cursor-pointer"
        />
        <div className="ml-4 flex items-center">
          {userdata?.profilePic ? (
            <img
              src={userdata.profilePic}
              alt="Profile"
              className="w-6 h-6 rounded-full border-2 border-gray-200"
            />
          ) : (
            <Avatar
              size={30}
              icon={<UserOutlined />}
              className={`${
                userdata?.gender === "male" ? "bg-blue-500" : "bg-pink-500"
              }`}
            />
          )}
          <h2 className="ml-2 text-white font-semibold">{userdata?.name}</h2>
        </div>
      </div>

      {/* Chat Messages */}
      {loading ? (
        <div className="flex justify-center items-center flex-grow">
          <SpinnerComponent />
        </div>
      ) : (
        <ScrollToBottom className="flex-grow overflow-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col my-2">
              {message.direction === "sent" ? (
                <div className="self-end bg-bg p-2 rounded-lg text-white">
                  {message.message}
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ) : (
                <div className="self-start bg-bgg p-2 rounded-lg text-white">
                  {message.message}
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </ScrollToBottom>
      )}

      {/* Input Box */}
      <div className="flex items-center p-4 border-t bg-white">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
          className="flex-grow mr-4 border rounded-lg p-2"
          style={{ height: "40px", borderRadius: "20px" }}
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
