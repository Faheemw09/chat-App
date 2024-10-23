import React from "react";
import Button from "antd/es/button";
import "./mainButton.css";

export const MainButton = ({
  text,
  icon,
  onClick,
  disabled,
  loading,
  btnSize = "large-btn",
  ...props
}) => {
  console.log("MainButton rendered", text);
  return (
    <Button
      className={`primary-button ${btnSize}`}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      {...props}
    >
      {text}
    </Button>
  );
};
