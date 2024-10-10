import UserCard from "./userCard";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserTop from "./userTop";
import Topnav from "../nav/topnav";
import BottomNav from "../nav/topnav";

const MainHome = () => {
  // Initial user data
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

  // Function to fetch more users
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
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="flex flex-col bg-primary border h-[120px] w-full p-4 pt-[20px] rounded-2xl">
        <div>
          {users.length > 0 && (
            <UserTop
              name={users[0].name}
              imageUrl={users[0].imageUrl}
              gender={users[0].gender}
            />
          )}
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 top-2.6 left-2.5 text-border"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              className="w-full h-[40px] bg-white placeholder:text-border text-border text-sm border border-white rounded-2xl pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:bg-secondary focus:border-secondary hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search by name"
            />
          </div>
        </div>
      </div>

      {/* User Cards in a Row with Infinite Scrolling */}
      <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}>
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreUsers}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "16px",
            width: "100%",
          }}
        >
          {users.map((user, index) => (
            <div className="w-full sm:w-1/2 p-2" key={index}>
              <UserCard
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

export default MainHome;
