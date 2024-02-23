<h3 align="center">Data Table using AG Grid React</h3>

<br />
<div align="center">
  <a href="https://github.com/mugdhaarekar/qest-assessment">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
          <li>
      <a href="#project-structure">Project Structure</a>
    </li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#how-to-run">How to Run</a></li>
    <li><a href="#code-to-replace">Code to Replace</a></li>
    <li><a href="#project-functionalities">Project Functionalities</a></li>
    <li><a href="#ag-grid-implementation-reason-and-result">AG Grid Implementation Reason and Result</a>
       <ul>
         <li><a href="#reason">Reason</a></li>
          <li><a href="#result">Result</a></li>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

- [![Product Name Screen Shot][product-screenshot]](https://example.com)

AG-Grid in a React JS application is used as a Data Table. This means it serves as a powerful tool for managing and displaying log data in a tabular format. The application fetches log data from a specified API endpoint/mockdata, and AG-Grid allows users to interactively query, external filter or internal filters, and sort this data. Features include dynamic column configuration, external filters, excel download of selected rows and a user-friendly search interface. The goal is to provide an efficient and customizable platform for viewing and exporting data.

### Built With

- [![React][React.js]][React-url]
- [![AGGrid][AGGrid.com]][AGGrid-url]
- [![AntDesign][AntDesign.com]][AntDesign-url]
- [Parcel][Parcel-url]

### Project Structure

```
└── src
    ├── components
    │   ├── App.js
    │   ├── ExportData
    │   │   └── ExportData.js
    │   ├── ExternalCustomFilters
    │   │   └── CustomFilters.js
    │   ├── TableContainer
    │   │   └── AGGridTable.js
    │   └── assets
    │       └── images
    │           └── mapIcon.svg
    ├── scss
    │   └── table.scss
    └── utils
        └── mockData.js

```

## Installation

### 1. Clone the repository:

    bash git clone https://github.com/mugdhaarekar/qest-assessment

### 2. Navigate to Project Directory: `cd qest-assessment`

### 3. Install Dependencies: `npm install` > (Installs the necessary dependencies listed in the package.json file.)

## How to Run

### `npm start` > (Starts the development server and opens application in the default web browser.)

## Code to Replace

### If you want to customize certain aspects of the AggridTable component, you can modify the following files:

- `src/components/TableContainer/AGGridTable.js`: This file contains the Ag-Grid table implementation.
  - If you need to update the structure or appearance of the displayed data, you can do so here. Specifically, look for the `columnDefs` configuration, which defines the columns of the Ag-Grid table.
  - Replace the data in `mockData`
  - To create custom filters in AG Grid add or update the filter property of `columnDefs` or create external custom filter

## Project Functionalities

This project utilizes AG Grid in ReactJS to serve as a Data Table. The functionalities covered are:

1. **Log Ingestion:**

   - The project fetches mock data from utils which can be replaced with a URL, providing a dynamic and live representation of log entries.
   - Provides a customizable and interactive table using AG Grid to display the data.

2. **Search and Filter:**

   - Implements a global search and individual column external filter functionality allowing users to filter logs.

3. **Dynamic Column Configuration:**

   - Supports dynamic configuration of column headers and properties.

4. **Pagination:**

   - Users can control the number of rows displayed per page by selecting from the dropdown menu. Options include 20, 50, 100 rows.

5. **Styling and Theming:**

   - Utilizes AG Grid's styling options and the Alpine theme for a visually appealing user interface.

6. **User Instructions:**
   - Includes instructions within the README to guide users on customizing filters, updating data sources, and other key aspects.

## AG Grid Implementation Reason and Result

1. Rich Feature Set:
   - AG Grid offers a comprehensive set of features for working with large datasets, including sorting, filtering, pagination, and column grouping, making it an ideal choice for implementing a log ingestor and query interface where efficient data handling is crucial.
2. Customization and Flexibility:
   - AG Grid provides extensive customization options, allowing dynamic configuration of column headers, properties, and visibility which is essential for adapting to different log formats and user preferences.
3. Interactive Query Interface:
   - AG Grid serves as an interactive and user-friendly query interface, enabling users to explore and analyze log data directly within the grid.
4. Client-Side Pagination:
   - Client-side pagination in AG Grid ensures a seamless and responsive user experience, particularly when dealing with large log datasets. This feature enhances performance by rendering only the necessary data on each page.
5. Styling and Theming:
   - AG Grid provides theming options and styles, contributing to a polished and visually appealing user interface. The Alpine theme used in this project enhances the overall look and feel of the log ingestor.

- ### Result

  1. Efficient Data Rendering:
     - AG Grid's client-side pagination and efficient rendering capabilities result in a smooth and responsive application, even when handling a large volume of log entries.
  2. Interactive Exploration:
     - Users can interactively explore and query log data using AG Grid's built-in functionalities, such as sorting, filtering, and searching. This promotes a dynamic and exploratory approach to log analysis.
  3. Dynamic Column Configuration:
     - The ability to dynamically configure column headers and properties ensures adaptability to various log formats.
  4. User-Friendly Interface: - The AG Grid implementation, coupled with additional UI elements, contributes to a user-friendly interface. Features like the search bar, adjustable page size, and custom filters along with export enhance the overall user experience.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: src/components/assets/images/product.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[AGGrid.com]: https://img.shields.io/badge/AG_Grid-38903D?style=for-the-badge&logo=ag-grid&logoColor=white
[AGGrid-url]: https://www.ag-grid.com/
[AntDesign.com]: https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white
[AntDesign-url]: https://2x.ant.design/
[Parcel-url]: https://parceljs.org/
