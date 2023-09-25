import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { totalSalaryRecordHeaders } from "../constants/headers/salaryRecord";
import { personalAccountHeaders } from "../constants/headers/personalAccount";
import { useTable } from "react-table";
import EmployeeService from "../api/employeeService";
import { SalaryRecordData } from "../types/SalaryRecordData";
import { useParams } from "react-router-dom";
import Toastify from "../utility/Toastify";

const Detail = () => {
  const [salaryRecord, setSalaryRecord] = useState<SalaryRecordData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [totalValue, setTotalValue] = useState<any>({});

  const { id } = useParams<{ id: string }>();

  const toast = new Toastify();

  // fetch employees from API
  const getEmployees = async (id: number) => {
    try {
      const response =
        await EmployeeService.getEmployeeSalaryRecordByEmployeeId(id, year);
      setSalaryRecord(response);
    } catch (err) {
      toast.error();
    }
  };

  useEffect(() => {
    getEmployees(parseInt(id!));
  }, [id]);

  useEffect(() => {
    // calculate sum to each fields return object
    const totals = salaryRecord.reduce((acc: any, curr: any) => {
      for (const key in curr) {
        if (typeof curr[key] !== "string") {
          console.log(key, curr[key]);
          if (acc[key]) {
            acc[key] += curr[key];
          } else {
            acc[key] = curr[key];
          }
        }
      }
      return acc;
    }, []);

    setTotalValue(totals);
  }, [salaryRecord]);

  // Handle resizing
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState<any>(0);
  const [tableIndex, setTableIndex] = useState<any>(0);
  const [headers, setHeaders] = useState(personalAccountHeaders);

  const handleMouseUp = () => {
    setResizing(false);
    setStartWidth(null);
    setTableIndex(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    setResizing(true);
    setStartX(e.clientX);
    const columnElement = headers.find(x => x.Header === column);
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
      const columnElement = updatedHeaders.find(x => x.Header === tableIndex);
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
            min={2000}
            defaultValue={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <Button
            variant="primary"
            className="btn btn-primary mx-2"
            onClick={() => getEmployees(parseInt(id!))}
          >
            Göstər
          </Button>
        </div>
        <h6 className="mx-2 text-center">{salaryRecord?.[0]?.fullName}</h6>

        <div>
          <Button variant="primary" className="btn btn-primary">
            Şəxsi kabinet
          </Button>
        </div>
      </div>

      <div style={{ overflow: "scroll", maxHeight: "80vh" }}>
        {/* <div style={{maxHeight:'43vh',width:"100%"}}> */}
        <Table className="main-table" bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th className="text-center" {...column.getHeaderProps()} onMouseDown={(e) => handleMouseDown(e, column.Header)}>
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
                            <div
                              style={{ width: `${cell.column.width}px`, minWidth: "100%" }}
                            >
                              {new Date(row.values.date).toLocaleDateString()}
                            </div>
                          </td>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <td {...cell.getCellProps()}>
                          <div
                            style={{ width: `${cell.column.width}px`, minWidth: "100%" }}
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
            <tr>
              <td colSpan={10}></td>
              {totalSalaryRecordHeaders.map((column: any) => (
                <td>{totalValue[column.accessor]}</td>
              ))}
            </tr>
          </tfoot>
        </Table>
      </div>
    </main>
  );
};

export default Detail;
