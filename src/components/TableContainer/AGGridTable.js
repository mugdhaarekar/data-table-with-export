import React, { useRef, useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { mockData } from "../../utils/mockData";
import {
  StatusFilter,
  DistributionFilter,
} from "../ExternalCustomFilters/CustomFilters";
import { SearchOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import ExportData from "../ExportData/ExportData";
import { exportToExcel } from "react-json-to-excel";

const AGGridTable = () => {
  const [rowData, setRowData] = useState(mockData); // Pass in your data from api
  const [quickFilter, setQuickFilter] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const gridApiRef = useRef(null);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };
  const onSelectionChanged = useCallback((event) => {
    const rowCount = event.api.getSelectedNodes().length;
    setSelectedRowCount(rowCount);
  }, []);

  const columnDefs = [
    {
      field: "",
      headerName: "",
      checkboxSelection: true,
      pinned: "left",
      maxWidth: 50,
    },
    {
      field: "ref_id",
      headerName: "Ref. ID",
    },
    {
      field: "customer",
      headerName: "Customer",
    },
    {
      field: "products",
      headerName: "Products",
    },
    {
      field: "date_of_purchase",
      headerName: "Date",
    },
    {
      field: "distribution",
      headerName: "Distribution",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "price_rs",
      headerName: "Price (in Rs.)",
    },
  ];

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      filter: true,
    },
    columnDefs: columnDefs,
    animateRows: true,
    pagination: true,
    rowSelection: "multiple",
    rowModelType: "clientSide",
    rowMultiSelectWithClick: true,
  };

  const uniqueStatuses = [...new Set(mockData.map((item) => item.status))];

  const exportSelectedRows = () => {
    const selectedRows = gridApiRef.current.getSelectedNodes();
    console.log(selectedRows.length);
    const data = selectedRows.map((rowNode, index) => {
      const selectedRowsData = rowNode.data;
      const extractedData = {};
      columnDefs.forEach((colDef) => {
        const headerName = colDef.headerName || "Serial Number";
        extractedData[headerName] = colDef.headerName
          ? selectedRowsData[colDef.field]
          : index + 1;
      });
      return extractedData;
    });
    exportToExcel(data, "DataExport");
  };

  const handleStatusFilterChange = (value) => {
    const selectedStatus = uniqueStatuses.find((status) => status === value);
    if (selectedStatus) {
      const filteredRows = mockData.filter(
        (row) => row.status === selectedStatus
      );
      setRowData(filteredRows);
    } else {
      setRowData(mockData);
    }
  };

  const uniqueDistribution = [
    ...new Set(mockData.map((item) => item.distribution)),
  ];

  const handleDistributionFilterChange = (value) => {
    const selectedDistribution = uniqueDistribution.find(
      (distribution) => distribution === value
    );
    if (selectedDistribution) {
      const filteredDistributionRows = mockData.filter(
        (row) => row.distribution === selectedDistribution
      );
      setRowData(filteredDistributionRows);
    } else {
      setRowData(mockData);
    }
  };

  const handleSelectAll = (event) => {
    if (gridApiRef.current) {
      const selected = event.target.checked;
      if (selected) {
        gridApiRef.current.selectAll();
      } else {
        gridApiRef.current.deselectAll();
      }
      setSelectAllChecked(selected);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ width: "80vw" }}>
      <div
        className="ag-theme-alpine"
        style={{
          height: "700px",
        }}
      >
        <section className="filterSection">
          <div className="selectionFilters">
            <Input
              style={{ width: "25rem", marginRight: "1rem" }}
              placeholder="Search..."
              addonBefore={<SearchOutlined />}
              onInput={(e) => setQuickFilter(e?.target?.value)}
              size="large"
            />
            <StatusFilter
              optionsStatus={uniqueStatuses}
              handleStatusFilterChange={handleStatusFilterChange}
            />
            <DistributionFilter
              optionsDistribution={uniqueDistribution}
              handleDistributionFilterChange={handleDistributionFilterChange}
            />
          </div>
          <ExportData onClick={exportSelectedRows} />
        </section>
        <div
          className="display_flex"
          style={{ height: "5rem", alignItems: "center" }}
        >
          <input
            type="checkbox"
            id="selectAllCheckbox"
            className="selectAllCheckbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
          />
          <label htmlFor="selectAllCheckbox" className="selectAllLabel">
            <span>
              ALL ORDERS
              <span style={{ color: "#999999" }}>
                ({selectedRowCount} orders selected)
              </span>
            </span>
          </label>
        </div>
        <AgGridReact
          ref={gridApiRef}
          rowData={rowData}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          quickFilterText={quickFilter}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default AGGridTable;
