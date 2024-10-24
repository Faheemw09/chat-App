import { Route, Routes } from "react-router-dom";
import Login from "../authSection/login";
import Signup from "../authSection/signup";
import MainHome from "../subapp/mainHome";
import SingleChat from "../chats/SingleChat";
import ChatList from "../chats/ChatList";
import Profile from "../subapp/profile";
import UsersProfile from "../subapp/UsersProfile";
import Praviteroute from "./praviteroute";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <Praviteroute>
              <MainHome />
            </Praviteroute>
          }
        />
        <Route
          path="/chat/:receiverId"
          element={
            <Praviteroute>
              <SingleChat />
            </Praviteroute>
          }
        />

        <Route
          path="/chats"
          element={
            <Praviteroute>
              <ChatList />
            </Praviteroute>
          }
        />
        <Route
          path="/profile"
          element={
            <Praviteroute>
              <Profile />
            </Praviteroute>
          }
        />
        <Route
          path="/userprofile/:receiverId"
          element={
            <Praviteroute>
              <UsersProfile />
            </Praviteroute>
          }
        />
      </Routes>
    </div>
  );
};
export default Allroutes;
