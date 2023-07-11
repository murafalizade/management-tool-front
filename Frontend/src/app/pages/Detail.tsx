import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { detailsColumns } from "../constants/headers";
import { useTable } from "react-table";
import EmployeeService from "../api/employeeService";
import { SalaryRecordData } from "../types/SalaryRecordData";
import { useParams } from "react-router-dom";


const Detail = () => {

  const [salaryRecord, setSalaryRecord] = useState<SalaryRecordData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const { id } = useParams<{ id: string }>();

  // fetch employees from API
  const getEmployees = async (id: number) => {
    const response = await EmployeeService.getEmployeeSalaryRecordByEmployeeId(
      id,
      year
    );
    console.log(response);
    setSalaryRecord(response);
  };

  useEffect(() => {
    getEmployees(parseInt(id!));
  }, [id]);

  const tableInstance = useTable({
    columns: detailsColumns,
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
          <Button variant="primary" className="btn btn-primary mx-2" onClick={()=> getEmployees(parseInt(id!))}>
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
