import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useTable } from "react-table";
import {
  salaryRecordHeaders,
  totalSalaryRecordHeaders,
} from "../constants/headers/salaryRecord";
import { MONTHS } from "../constants/months";
import "../styles/home.scss";
import { useNavigate } from "react-router";
import { FILTER_DATA } from "../constants/filterData";
import CalculatingModal from "../components/modals/CalculatingModal";
import { useDispatch, useSelector } from "react-redux";
import { showModal, setSelectedRow } from "../redux/showModalSlice";
import withAuth from "../hoc/withAuth";
import { RootState } from "../redux/store";
import EmployeeService from "../api/employeeService";
import Loading from "../components/layouts/Loading";
import { SalaryRecordData } from "../types/SalaryRecordData";
import Toastify from "../utility/Toastify";
import Helper from "../utility/Helper";

function Home() {
  const state = useSelector((state: RootState) => state.showModal);
  const [selectedColumn, setSelectedColumn] = useState<any>(state.selectedRow);
  const [salaryRecord, setSalaryRecord] = useState<SalaryRecordData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [filter, setFilter] = useState<string>("");
  const [totalValue, setTotalValue] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toast = new Toastify();

  let nav = useNavigate();

  // fetch employees from API
  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await EmployeeService.getEmployeeSalaryRecord(
        month,
        year,
        filter
      );
      setSalaryRecord(response);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // calculate sum to each fields return object
  useEffect(() => {
    if (salaryRecord.length >= 0) {
      const totals = salaryRecord.reduce((acc: any, curr: any) => {
        for (const key in curr) {
          if (typeof curr[key] === "number") {
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
    if (!selectedColumn || !selectedColumn.employeeId) {
      toast.info("Hərbi qulluqçu seçilməyib!");
      return;
    }
    nav(`/employees/${selectedColumn.employeeId}`);
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
    dispatch(showModal(row.original.id));
  };

  // Handle resizing
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState<any>(0);
  const [tableIndex, setTableIndex] = useState<any>(0);
  const [headers, setHeaders] = useState(salaryRecordHeaders);
  
  const handleMouseUp = () => {
    setResizing(false);
    setStartWidth(null);
    setTableIndex(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent, column:string) => {
    e.preventDefault();
    setResizing(true);
    setStartX(e.clientX);
    const columnElement = headers.find(x=> x.Header === column);
    if (columnElement !== null && typeof columnElement?.width === 'number') {
      setStartWidth(columnElement.width);
    }
    setTableIndex(column);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizing && tableIndex !== null) {
      const offset = e.clientX - startX;
      const newWidth = startWidth + offset;

      const updatedHeaders = [...headers];
      const columnElement = updatedHeaders.find(x=> x.Header === tableIndex);
      if (columnElement !== null && columnElement !== undefined) {
        columnElement.width = newWidth;
        setHeaders(updatedHeaders);
      }
    }
    if (!resizing) {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }
    



  const tableInstance = useTable({
    columns: headers,
    data: salaryRecord,
  });

  let { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <main>
      {isLoading ? <Loading /> : null}
      <div className="d-flex justify-content-between m-3">
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="number"
            className="mini-input form-control"
            min={2000}
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <select
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="form-control mini-input"
            value={month}
          >
            {MONTHS.map((month: any, index: number) => (
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
          <select className="form-control mx-2" onChange={handleFilter} name="filter">
            {FILTER_DATA.map((month: any, index: number) => (
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
            variant="primarysalaryRecordHeaderssalaryRecordHeaders"
            className="btn btn-primary"
          >
            Şəxsi kabinet
          </Button>
        </div>
      </div>

      <div style={{ overflow: "scroll", maxHeight: "79vh" }}>
        <Table
          className="position-relative main-table"
          bordered
          hover
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}  className={`text-center ${!resizing || "resize"}`}>
                {headerGroup.headers.map((column: any) => (
                  <th className={`text-center`} 
                    {...column.getHeaderProps()} onMouseDown={(e) => handleMouseDown(e,column.Header)}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, index: number) => {
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
                            <div
                            style={{ width: `${cell.column.width}px`, minWidth:"100%", wordBreak:"break-all", whiteSpace:"normal"  }}
                            />
                            {new Date(row.values.date).toLocaleDateString()}
                          </td>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <td {...cell.getCellProps()}>
                          <div
                            style={{ width: `${cell.column.width}px`, minWidth:"100%", wordBreak:"break-all", whiteSpace:"normal"  }}
                          >
                            {cell.render("Cell")}
                          </div>
                        </td>
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
              {totalSalaryRecordHeaders.map((column: any) => (
                <th>{column.Header}</th>
              ))}
            </tr>
            <tr>
              <td colSpan={4}></td>
              <td>{totalValue.fullName}</td>
              <td colSpan={4}></td>
              {totalSalaryRecordHeaders.map((column: any) => (
                <td>{Helper.FormatNumber(totalValue[column.accessor])}</td>
              ))}
            </tr>
          </tfoot>
        </Table>
      </div>

      <CalculatingModal />
      <div className="px-1 comment">{selectedColumn?.comment ?? ""}</div>
    </main>
  );
}

export default withAuth(Home);
