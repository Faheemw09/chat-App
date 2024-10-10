import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../buttons/mainbutton"; // Custom button component
import "./signup.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    console.log("Success:", values);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="flex flex-col bg-primary h-[190px] w-full p-4 pt-[60px] rounded-2xl">
        <img
          src="/images/arrow.png"
          alt="Back"
          height={20}
          width={20}
          onClick={() => navigate("/")}
          className="cursor-pointer mb-2 pt-1"
        />
        <h1 className="text-white pt-3 text-left text-[28px] font-semibold leading-none">
          Register
        </h1>
        <h5 className="text-white text-left">
          Fill up your details to Register.
        </h5>
      </div>

      {/* Signup Form */}
      <form
        onSubmit={onFinish}
        className="flex flex-col items-center justify-center space-y-1 w-full mt-4 rounded-lg"
      >
        <div className="flex flex-col mb-1">
          <label htmlFor="name" className="text-black mb-1 text-[14px] ">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="input-field"
            required
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="text-black mb-1 text-[14px]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input-field"
            required
          />
        </div>

        <div className="flex flex-col mb-2 items-start justify-start relative">
          <label htmlFor="password" className="text-black mb-1 text-[14px]">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle between password and text
              className="input-field pr-10" // Add padding to the right for the eye icon
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 mb-3 cursor-pointer"
            >
              {showPassword ? (
                <EyeOutlined className="text-gray-400" /> // Visible eye icon
              ) : (
                <EyeInvisibleOutlined className="text-gray-400" /> // Hidden eye icon
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col mr-[160px] mb-[20px]">
          <label className="text-black mb-1 text-[14px]">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2">
            <label className="flex items-center text-[14px]">
              <input
                type="radio"
                name="gender"
                value="male"
                className="custom-radio text-[14px]"
                required
              />
              Male
            </label>
            <label className="flex items-center text-[14px]">
              <input
                type="radio"
                name="gender"
                value="female"
                className="custom-radio"
                required
              />
              Female
            </label>
          </div>
        </div>

        <div className="mt-[50px]">
          <MainButton text="Submit" />
        </div>
      </form>

      <div className="mt-4">
        <h5 className="text-black text-[12px] leading-none">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer font-semibold"
          >
            Login
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
