import { Route, Routes } from "react-router-dom";
import Login from "../authSection/login";
import Signup from "../authSection/signup";
import MainHome from "../subapp/mainHome";
import SingleChat from "../chats/SingleChat";
import ChatList from "../chats/ChatList";
import Profile from "../subapp/profile";
import UsersProfile from "../subapp/UsersProfile";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<MainHome />} />
        <Route path="/chat/:receiverId" element={<SingleChat />} />

        <Route path="/chats" element={<ChatList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userprofile/:receiverId" element={<UsersProfile />} />
      </Routes>
    </div>
  );
};
export default Allroutes;
