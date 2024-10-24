import React from "react";
import { Alert, Flex, Spin } from "antd";

const contentStyle = {
  padding: 50,
  background: "#e9fefe",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const SpinnerComponent = () => (
  <Flex gap="middle" vertical>
    <Flex gap="middle">
      <Spin size="large">{content}</Spin>
    </Flex>
  </Flex>
);

export default SpinnerComponent;
