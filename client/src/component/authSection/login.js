import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { Button, Checkbox, Form, Input } from "antd"; // Importing Ant Design components
import { MainButton } from "../buttons/mainbutton";
import "./login.css";
const Login = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handle form submission
  const onFinish = (values) => {
    console.log("Success:", values);
    // Add your login logic here
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          Fill up your details to Login.
        </h5>
      </div>

      {/* Login Form */}
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form-item"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input className="input-field" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="input-field" />
        </Form.Item>

        <Form.Item className="submit-button ">
          {/* Submit button using the custom MainButton */}
          <MainButton text={"Submit"} />
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
