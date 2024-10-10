import React from "react";
import Button from "antd/es/button";
import "./mainButton.css";

export const MainButton = ({
  text,
  icon,
  onClick,
  disabled,
  btnSize = "large-btn",
  ...props
}) => (
  <Button
    className={`primary-button ${btnSize}`}
    icon={icon}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {text}
  </Button>
);
