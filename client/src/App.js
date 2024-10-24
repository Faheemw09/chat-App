import "./App.css";
import { Button } from "antd";
import { MainButton } from "./component/buttons/mainbutton";
import { Route, Routes, useNavigate } from "react-router-dom";
import Allroutes from "./component/route/routes";

function App() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="mobile-view h-scree flex flex-col justify-between">
      {/* Middle Section - Image and Text */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex flex-col items-center justify-center flex-grow mt-20">
                <div className="image-container">
                  <img
                    src="/images/image1.png"
                    alt="App Banner"
                    className="w-60 h-70"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center flex-grow mt-20">
                <h4 className="text-black font-bold text-[20px] leading-none">
                  Goftego
                </h4>
                <h6 className="text-black mt-2 text-center leading-none">
                  Welcome to Your Friendly <br /> Chat Companion!
                </h6>
              </div>

              <div className="mt-6 mb-3 flex justify-center">
                <MainButton text={"Get Started"} onClick={handleClick} />
              </div>
            </>
          }
        />
        <Route path="/*" element={<Allroutes />} />
      </Routes>
    </div>
  );
}

export default App;
