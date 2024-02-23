import React, { useState } from "react";
import { Select } from "antd";
import { TagOutlined } from "@ant-design/icons";
import mapIcon from "../assets/images/mapIcon.svg";

export const StatusFilter = ({ optionsStatus, handleStatusFilterChange }) => {
  return (
    <Select
      size="large"
      style={{ width: "16rem", marginRight: "1rem" }}
      label="Status"
      placeholder={
        <span>
          <TagOutlined rotate="270" />
          <span style={{ marginLeft: "1rem" }}>Status</span>
        </span>
      }
      onChange={handleStatusFilterChange}
      allowClear
    >
      {optionsStatus.map((status, index) => (
        <Select.Option key={index} value={status}>
          {status}
        </Select.Option>
      ))}
    </Select>
  );
};

export const DistributionFilter = ({
  optionsDistribution,
  handleDistributionFilterChange,
}) => {
  return (
    <Select
      size="large"
      style={{ width: "16rem" }}
      onChange={handleDistributionFilterChange}
      placeholder={
        <span>
          <img src={mapIcon} width="15px" />
          <span style={{ marginLeft: "1rem" }}>Distribution</span>
        </span>
      }
      allowClear
    >
      {optionsDistribution.map((status, index) => (
        <Select.Option key={index} value={status}>
          {status}
        </Select.Option>
      ))}
    </Select>
  );
};
