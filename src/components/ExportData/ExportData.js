import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ExportData = ({ onClick }) => {
  return (
    <Button
      style={{ width: "10rem " }}
      type="primary"
      shape="round"
      onClick={onClick}
    >
      <DownloadOutlined />
      Export orders
    </Button>
  );
};

export default ExportData;
