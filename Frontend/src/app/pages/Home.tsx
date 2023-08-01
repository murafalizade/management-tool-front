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
import EmployeeService from "../api/employeeService";
import Loading from "../components/Loading";
import { SalaryRecordData } from "../types/SalaryRecordData";

function Home() {
  const state = useSelector((state: RootState) => state.showModal);
  const [selectedColumn, setSelectedColumn] = useState<any>(state.selectedRow);
  const [salaryRecord, setSalaryRecord] = useState<SalaryRecordData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [filter, setFilter] = useState<string>("");
  const [totalValue, setTotalValue] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  let nav = useNavigate();

  // fetch employees from API
  const getEmployees = async () => {
    const response = await EmployeeService.getEmployeeSalaryRecord(
      month,
      year,
      filter
    );
    setSalaryRecord(response);
  };

  useEffect(() => {
    getEmployees();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (salaryRecord.length >= 0) {
      // calculate sum to each fields return object
      const totals = salaryRecord.reduce((acc: any, curr: any) => {
        for (const key in curr) {
          if (typeof curr[key] !== "string") {
            if (acc[key]) {
              acc[key] += curr[key];
            } else {
              acc[key] = curr[key];
            }
          } else if (key === "fullName") {
            if (acc[key]) {
              acc[key]++;
            } else {
              acc[key] = 1;
            }
          }
        }
        return acc;
      }, {});
      setTotalValue(totals);
    }
  }, [salaryRecord]);

  // Handle filter change
  const handleFilter = (e: any) => {
    setFilter(e.target.value);
  };

  // Navigate to personal account when clicked
  const personalAccount = () => {
    if (!selectedColumn) {
      alert("Please select a row");
      return;
    }
    nav(`/detail/${selectedColumn.employeeId}`);
  };

  // Set selected row
  useEffect(() => {
    setSelectedColumn(state.selectedRow);
  }, [state.selectedRow]);

  // Handle row click
  const handleRowClick = (row: any) => {
    if (row.original === selectedColumn) {
      dispatch(setSelectedRow(null));
    } else {
      dispatch(setSelectedRow(row.original));
    }
  };

  // Handle row double click
  const handleRowDoubleClick = (row: any) => {
    console.log(row.original.id);
    dispatch(showModal(row.original.id));
  };

  console.log(salaryRecord?.[0]?.isMatry);

  const tableInstance = useTable({ columns, data: salaryRecord });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <main>
      {isLoading ? <Loading /> : null}
      <div className="d-flex justify-content-between m-3">
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="number"
            className="mini-input form-control"
            placeholder="Total"
            min={2000}
            defaultValue={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <select
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="form-control mini-input"
            value={month}
          >
            {months.map((month: any, index: number) => (
              <option key={index} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>

          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label mx-2">Vakant</label>

          <Button
            variant="primary"
            className="btn btn-primary mx-2"
            onClick={() => getEmployees()}
          >
            Göstər
          </Button>
          <Button variant="primary" className="btn btn-primary">
            Nəzarət
          </Button>
        </div>

        <div className="d-flex">
          <select onChange={handleFilter} className="form-control mx-2">
            {filterData.map((month: any, index: number) => (
              <option className="fs-6" key={index} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>

          <Button
            variant="primary"
            className="btn btn-primary"
            onClick={() => getEmployees()}
          >
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

      <div style={{ overflow: "scroll", maxHeight: "80vh" }}>
        {/* <div style={{maxHeight:'43vh',width:"100%"}}> */}
        <Table
          className="position-relative main-table"
          bordered
          hover
          {...getTableProps()}
        >
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
          <tfoot
            className="position-sticky foot-table w-100"
            style={{ bottom: "0px" }}
          >
            <tr className="text-center">
              <th colSpan={4}></th> <th>S.A.A</th>
              <th colSpan={4}></th>
              {""}
              {columns2.map((column: any) => (
                <th>{column.Header}</th>
              ))}
            </tr>
            <tr>
              <td colSpan={4}></td>
              <td>{totalValue.fullName}</td>
              <td colSpan={4}></td>
              {columns2.map((column: any) => (
                <td>{totalValue[column.accessor] ?? 0}</td>
              ))}
            </tr>
          </tfoot>
        </Table>
      </div>

      <CalculatingModal />
      <div className="px-1">{selectedColumn?.comment ?? ""}</div>
    </main>
  );
}

export default withAuth(Home);
