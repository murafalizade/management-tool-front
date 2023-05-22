import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useTable, Column } from "react-table";
import columns, { columns2 } from "../constants/headers";
import months from "../constants/months";
import "../styles/home.scss";
import { useNavigate } from "react-router";
import filterData from "../constants/filterData";
import CalculatingModal from "../components/CalculatingModal";
import { useDispatch, useSelector } from "react-redux";
import { showModal, setSelectedRow } from "../redux/showModalSlice";
import withAuth from "../hoc/withAuth";
import { RootState } from "../redux/store";

type TableData = {
  name: string;
  age: number;
  email: string;
  total?: number;
  date?: string;
  total2?: number;
  empty?: string;
};

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

const data2: TableData[] = [
  {
    name: "John Doe",
    age: 30,
    email: "johndoe@example.com",
    date: "2021-05-05",
  },
];

function Home() {
  const state = useSelector((state: RootState) => state.showModal);
  const [selectedColumn, setSelectedColumn] = useState<any>(state.selectedRow);

  const dispatch = useDispatch();

  let nav = useNavigate();

  const personalAccount = () => {
    if (!selectedColumn) {
      alert("Please select a row");
      return;
    }
    nav(`/detail/${selectedColumn.name}`);
  };

  useEffect(() => {
    setSelectedColumn(state.selectedRow);
  }, [state.selectedRow]);


  const handleRowClick = (row: any) => {
    if (row.original === selectedColumn) {dispatch(setSelectedRow(null))}
    else {dispatch(setSelectedRow(row.original));}
  };

  const handleRowDoubleClick = (row: any) => {
    dispatch(showModal())
  };

  const tableInstance = useTable({ columns, data });
  // const tableInstance2 = useTable({ columns: columns2, data: data2 });

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
          <select className="form-control mini-input">
            {months.map((month: any, index: number) => (
              <option key={index} value={month.name}>
                {month.name}
              </option>
            ))}
          </select>

          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label mx-2">Vakant</label>

          <Button variant="primary" className="btn btn-primary mx-2">
            Göstər
          </Button>
          <Button variant="primary" className="btn btn-primary">
            Nəzarət
          </Button>
        </div>

        <div className="d-flex">
          <select className="form-control mx-2">
            {filterData.map((month: any, index: number) => (
              <option className="fs-6" key={index} value={month.name}>
                {month.name}
              </option>
            ))}
          </select>

          <Button variant="primary" className="btn btn-primary">
            Göstər
          </Button>
        </div>

        <div>
          <Button
            onClick={() => personalAccount()}
            variant="primary"
            className="btn btn-primary"
          >
            Şəxsi kabinet
          </Button>
        </div>
      </div>

      <div style={{ overflow: "scroll", maxHeight: "76vh" }}>
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
                    backgroundColor:
                      row.original === selectedColumn ? "#d8e4eb" : "inherit",
                  }}
                  {...row.getRowProps()}
                  onClick={() => handleRowClick(row)}
                  onDoubleClick={() => handleRowDoubleClick(row)}
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
        {/* </div> */}

        <CalculatingModal />

        <Table
          style={{ position: "sticky", bottom: "24px",height:'100px' }}
          bordered
          bgcolor="#f5f5f5"
          hover
          {...getTableProps()}
        >
          <thead>
            <tr>
              <th style={{ width: "383px" }} className="d-block"></th>
              {columns2.map((column: any) => (
                <th className="text-center">{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {tableInstance2.rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })} */}
            <tr>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
              <td className="text-center">0</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="px-1">
        Elman / 719,17 / 2-ci m/d ver. BQR-nin emr N02 05.01.2022
      </div>
    </main>
  );
}

export default withAuth(Home);
