import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../redux/authreducer/action";
import { MainButton } from "../buttons/mainbutton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiErrorMessage, setApiErrorMessage] = useState(""); // State to hold backend error message
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.isLoading);
  const [genderError, setGenderError] = useState("");
  console.log(loading, "loaf");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setApiErrorMessage(""); // Clear backend error message

    let isValid = true;

    // Name validation
    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }
    if (!gender) {
      setGenderError("Gender is required.");
      isValid = false;
    }
    if (!isValid) return;

    const obj = { email, password, name, gender };

    try {
      console.log("api hit");
      await dispatch(SignUp(obj, navigate));

      // Show success message on signup success
      message.success("Signup successful! Please log in.");
    } catch (err) {
      const errorMessage = err.message;
      setApiErrorMessage(errorMessage);

      if (errorMessage === "Email already exists.") {
        setEmailError("Email already exists. Please use a different email.");
      } else if (errorMessage === "Name already exists.") {
        setNameError("Name already exists. Please use a different name.");
      } else {
        message.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col bg-primary bor h-[200px] w-full p-4 pt-[60px] rounded-2xl">
        <img
          src="/images/arrow.png"
          alt="Back"
          height={20}
          width={20}
          onClick={() => navigate("/")}
          className="cursor-pointer mb-2 pt-1"
        />
        <h1 className="text-white pt-3 text-left text-[28px] font-semibold leading-none ">
          Register
        </h1>
        <h5 className="text-white  text-left">
          Fill up your details to register.
        </h5>
      </div>

      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center justify-center space-y-1 w-full mt-4 rounded-lg"
      >
        <div className="flex flex-col mb-1">
          <label htmlFor="name" className="text-black mb-1 text-[14px]">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="text-black mb-1 text-[14px]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        </div>

        <div className="flex flex-col mb-2 relative">
          <label htmlFor="password" className="text-black mb-1 text-[14px]">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs">{passwordError}</p>
          )}
        </div>

        <div className="flex flex-col mb-[20px]">
          <label className="text-black mb-1 text-[14px]">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2">
            <label className="flex items-center text-[14px]">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label className="flex items-center text-[14px]">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Female
            </label>
          </div>
        </div>

        {/* Display Backend Error in UI */}
        {genderError && (
          <div className="text-red-500 text-sm mb-2">{genderError}</div>
        )}

        <div className="mt-[50px]">
          <MainButton
            type="submit"
            disabled={loading}
            loading={loading}
            text={"Signup"}
            onClick={handleSignup}
          >
            {loading ? "Registering..." : "Submit"}
          </MainButton>
        </div>
      </form>
      <div>
        <h5 className="text-black mt-3 text-[12px] leading-none">
          already have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer font-semibold"
          >
            login
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
