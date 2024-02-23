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
  let [rowData, setRowData] = useState(mockData); // Pass in your data from api
  const [quickFilter, setQuickFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState();

  // const [gridApi, setGridApi] = useState();

  // const onGridReady = (params) => {
  //   const gridApi = params.api;
  //   setGridApi(gridApi);
  // };
  const gridApiRef = useRef(null);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const columnDefs = [
    {
      field: "",
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
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
    rowData: rowData,
    animateRows: true,
    pagination: true,
    rowSelection: "multiple",
    rowModelType: "clientSide",
    rowMultiSelectWithClick: true,
  };

  const uniqueStatuses = [...new Set(mockData.map((item) => item.status))];

  const updateSelectedCount = () => {
    const selectedRows = gridApiRef.current.getSelectedNodes();
    const data = selectedRows.map((rowNode) => rowNode.data);
    console.log(data, "eow");
    exportToExcel(data, "DataExport");
  };

  const handleStatusFilterChange = (value) => {
    const statusFilter = gridApiRef.current.getFilterInstance("status");
    const selectedStatus = uniqueStatuses.find((status) => status === value);
    if (selectedStatus) {
      setStatusFilter(statusFilter);
      statusFilter.setModel({ values: [value] });
      const filteredRows = mockData.filter(
        (row) => row.status === selectedStatus
      );
      console.log(filteredRows, "fr");
      setRowData(() => filteredRows);
      console.log(rowData, "rd");
    } else {
      statusFilter.setModel(null);
      setRowData(mockData);
    }
    gridApiRef.current.onFilterChanged();
  };

  const uniqueDistribution = [
    ...new Set(mockData.map((item) => item.distribution)),
  ];

  const handleDistributionFilterChange = useCallback(
    (value) => {
      const distributionFilter =
        gridApiRef.current.getFilterInstance("distribution");
      console.log(distributionFilter, "dustr");
      const selectedDistribution = uniqueDistribution.find(
        (distribution) => distribution === value
      );
      if (selectedDistribution) {
        distributionFilter.setModel({ values: [value] });
        const filteredRows = mockData.filter(
          (row) => row.distribution === selectedDistribution
        );
        setRowData(filteredRows);
      } else {
        const selectedDistribution = uniqueDistribution;
        setRowData(mockData);
      }

      gridApiRef.current.onFilterChanged();
    },
    [gridApiRef.current, uniqueDistribution, setRowData]
  );

  return (
    <div className="ag-theme-alpine" style={{ width: "80vw" }}>
      <div
        className="ag-theme-alpine"
        style={{
          height: "700px",
        }}
      >
        <section className="filterSection">
          <Input
            style={{ width: "25rem" }}
            placeholder="Search..."
            addonBefore={<SearchOutlined />}
            onInput={(e) => setQuickFilter(e?.target?.value)}
          />
          <StatusFilter
            optionsStatus={uniqueStatuses}
            handleStatusFilterChange={handleStatusFilterChange}
          />
          <DistributionFilter
            optionsDistribution={uniqueDistribution}
            handleDistributionFilterChange={handleDistributionFilterChange}
          />
          <ExportData onClick={updateSelectedCount} />
        </section>
        <AgGridReact
          ref={gridApiRef}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          quickFilterText={quickFilter}
        />
      </div>
    </div>
  );
};

export default AGGridTable;
