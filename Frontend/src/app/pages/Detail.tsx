import React from "react";
import { Button, Table } from "react-bootstrap";
import { detailsColumns } from "../constants/headers";
import { useTable } from "react-table";
type TableData = {
  name: string;
  age: number;
  email: string;
  total?: number;
  date?: string;
  total2?: number;
  empty?: string;
};
const Detail = () => {
  const data: TableData[] = [
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      date: "2021-05-05",
    },
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      date: "2021-05-05",
    },
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      date: "2021-05-05",
    },
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      date: "2021-05-05",
    },
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      date: "2021-05-05",
    },
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      date: "2021-05-05",
    },
  ];
  const tableInstance = useTable({ columns: detailsColumns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <main>
      <div className="d-flex justify-content-between m-3">
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="number"
            className="mini-input form-control"
            placeholder="Total"
            value={2023}
          />

          <Button variant="primary" className="btn btn-primary mx-2">
            Göstər
          </Button>
        </div>
        <h6 className="mx-2 text-center">Abbasov Zakir Hesen</h6>

        <div>
          <Button variant="primary" className="btn btn-primary">
            Şəxsi kabinet
          </Button>
        </div>
      </div>

      <div style={{ overflow: "scroll", maxHeight: "80vh" }}>
        {/* <div style={{maxHeight:'43vh',width:"100%"}}> */}
        <Table bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th className="text-center" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell: any, i: number) => {
                    if (cell.column.id === "date") {
                      // Define custom cell component for date column
                      return (
                        <React.Fragment key={i}>
                          <td {...cell.getCellProps()}>
                            {new Date(row.values.date).toLocaleDateString()}
                          </td>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Table bordered hover>
          <thead></thead>
          <tbody>
            <tr>
              <td className="text-center"></td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </main>
  );
};

export default Detail;
