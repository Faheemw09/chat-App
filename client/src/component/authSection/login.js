import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { Form, Input } from "antd"; // Importing Ant Design components
import { MainButton } from "../buttons/mainbutton";
import "./login.css";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { SignIn } from "../redux/authreducer/action";

const Login = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    let isValid = true;

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

    if (!isValid) return;

    const obj = { email, password };

    try {
      console.log("api hit");
      await dispatch(SignIn(obj, navigate));

      // Show success message on login success
      message.success("Login successful! Redirecting...");
    } catch (err) {
      const errorMessage = err.message;

      // Display appropriate error messages based on backend response
      if (errorMessage === "Email not found") {
        setEmailError("Email does not exist. Please check and try again.");
      } else if (errorMessage === "Incorrect password") {
        setPasswordError("The password you entered is incorrect.");
      } else {
        message.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      {/* Header Section */}
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
          Login
        </h1>
        <h5 className="text-white  text-left">
          Fill up your details to login.
        </h5>
      </div>

      {/* Login Form */}
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSignup}
        autoComplete="off"
        className="form-item"
      >
        <Form.Item
          label="Email"
          name="email"
          validateStatus={emailError ? "error" : ""}
          help={emailError || ""}
        >
          <Input
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          <Input.Password
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item className="submit-button">
          {/* Submit button using the custom MainButton */}
          <MainButton text={"Submit"} onClick={handleSignup} />
        </Form.Item>
      </Form>

      <div>
        <h5 className="text-black text-[12px] leading-none">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primary cursor-pointer font-semibold"
          >
            Register
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Login;
