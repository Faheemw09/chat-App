import UserCard from "./userCard";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserTop from "./userTop";
import Topnav from "../nav/topnav";
import BottomNav from "../nav/topnav";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { getUser } from "../redux/Userreducer/action"; // Adjust the import path
import SpinnerComponent from "../loading";

const MainHome = () => {
  const dispatch = useDispatch();
  const {
    users,
    isLoading: reduxLoading,
    isError,
  } = useSelector((state) => state.user);
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  console.log(storedUser.profilePic, "dd");
  const [searchQuery, setSearchQuey] = useState("");

  const [hasMore, setHasMore] = useState(true); // Manage infinite scroll state
  const [isLoading, setIsLoading] = useState(false); // Define local loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(getUser({ offset: 0 }, storedToken)); // Fetch initial users
    }
  }, [dispatch]);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve user data
    console.log(storedUser, "Stored User"); // Inspect the stored user
    if (storedUser) {
      dispatch(getUser({ offset: 0 }, storedUser.token)); // Use the token if needed
    }
  }, [dispatch]);

  // Function to handle loading more users
  const fetchMoreUsers = async () => {
    if (!reduxLoading && hasMore) {
      // Use redux loading state to check if still fetching
      setIsLoading(true); // Set loading state to true

      try {
        const storedToken = localStorage.getItem("token");
        const response = await dispatch(
          getUser({ offset: users.length }, storedToken)
        ); // Fetch more users with offset
        const newUsers = response.payload.users; // Assuming your action returns the user list in this structure

        // Update hasMore based on the response
        if (newUsers.length === 0) {
          setHasMore(false); // No more users to load
        }
      } catch (error) {
        console.error("Error fetching more users:", error);
        // Optionally handle error state
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };
  const filteruser = users.filter((ele) =>
    ele.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="flex flex-col bg-primary border h-[120px] w-full p-4 pt-[20px] rounded-2xl">
        <div>
          {users.length > 0 && (
            <UserTop
              name={storedUser.name}
              imageUrl={storedUser.profilePic}
              gender={storedUser.gender}
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
              value={searchQuery}
              onChange={(e) => setSearchQuey(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* User Cards in a Row with Infinite Scrolling */}
      <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}>
        {filteruser.length === 0 && searchQuery ? ( // Check if there are no filtered users and a search query is present
          <div className="text-center mt-4">No users found.</div> // Display message
        ) : (
          <InfiniteScroll
            dataLength={filteruser.length}
            next={fetchMoreUsers}
            hasMore={hasMore}
            loader={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                }}
              >
                <SpinnerComponent />
              </div>
            }
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "16px",
              width: "100%",
            }}
          >
            {filteruser.map((user, index) => (
              <div className="w-full sm:w-1/2 p-2" key={user._id || index}>
                <UserCard
                  name={user.name}
                  bio={user.bio}
                  gender={user.gender}
                  imageUrl={user.profilePic}
                  id={user._id}
                />
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default MainHome;
