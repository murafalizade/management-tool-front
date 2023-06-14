import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useTable } from "react-table";
import { createColumns } from "../constants/headers";
import "../styles/home.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRow } from "../redux/showModalSlice";
import withAuth from "../hoc/withAuth";
import { RootState } from "../redux/store";
import { EmployeeData } from "../types/EmployeeData";
import EmployeeService from "../api/employeeService";
import Swal from "sweetalert2";
import { BsFillPersonCheckFill, BsFillPersonVcardFill } from "react-icons/bs";
import {MdDelete} from "react-icons/md";
import "../styles/create.scss";

function Create() {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const state = useSelector((state: RootState) => state.showModal);
  const [selectedColumn, setSelectedColumn] = useState<any>(state.selectedRow);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [updatedEmployees, setUpdatedEmployees] = useState<EmployeeData[]>([]);

  const dispatch = useDispatch();

  let nav = useNavigate();

  // fetch employees from API
  const getEmployees = async () => {
    const response = await EmployeeService.getEmployeeByAll();
    setEmployees(response);
  };

  // delete employee
  const deleteEmployee = async () => {
    if (!selectedColumn) {
      alert("Please select a row");
      return;
    }
    try {
      Swal.fire({
        title: "Silmək istədiyinizə əminsiniz?",
        text: "Bu əməliyyatı geri qaytara bilməyəcəksiniz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Bəli",
        cancelButtonText: "Xeyr",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await EmployeeService.deleteEmployeeById(selectedColumn.id);
          dispatch(setSelectedRow(null));
          Toast.fire({
            icon: "success",
            title: "Bölmə silindi",
          });
          await getEmployees();
        } else {
          return;
        }
      });
    } catch (e: any) {
      console.log(e);
      alert(e.toString() || "Xəta baş verdi!");
    }
  };

  // open personal account
  const personalAccount = () => {
    if (!selectedColumn) {
      alert("Please select a row");
      return;
    }
    nav(`/detail/${selectedColumn.id}`);
  };

  // set selected row
  useEffect(() => {
    setSelectedColumn(state.selectedRow);
  }, [state.selectedRow]);

  // fetch employees when component mounted
  useEffect(() => {
    getEmployees();
  }, []);

  // handle row click
  const handleRowClick = (row: any) => {
    // if (row.original === selectedColumn) {
    //   dispatch(setSelectedRow(null));
    // } else {
    dispatch(setSelectedRow(row.original));
    //
  };

  // handle input change for one of employee
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setEmployees((prevState) =>
      prevState.map((employee) =>
        employee.id === selectedColumn.id
          ? { ...employee, [name]: value }
          : employee
      )
    );

    // if employee already exists in updatedEmployees array, update it otherwise add it to array with updated value
    if (updatedEmployees.find((x) => x.id === selectedColumn.id)) {
      setUpdatedEmployees((prevState) =>
        prevState.map((employee) =>
          employee.id === selectedColumn.id
            ? { ...employee, [name]: value }
            : employee
        )
      );
    } else {
      setUpdatedEmployees((prevState) => [
        ...prevState,
        { ...selectedColumn, [name]: value },
      ]);
    }
  };

  // save updated employees
  const saveUpdatedEmployees = async () => {
    updatedEmployees.forEach(async (employee) => {
      await EmployeeService.updateEmployee(employee);
    });
    Toast.fire({
      icon: "success",
      title: "Məlumatlar yeniləndi",
    });
    setUpdatedEmployees([]);
  };

  const tableInstance = useTable({ columns: createColumns, data: employees });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <main>
      <div className="d-flex m-3">
        <Button onClick={() => personalAccount()} className="mx-2">
         <BsFillPersonVcardFill /> Şəxsi kabinet
        </Button>
        <Button onClick={() => saveUpdatedEmployees()} className="mx-2">
          <BsFillPersonCheckFill /> Yadda saxla
        </Button>
        <Button onClick={() => deleteEmployee()} className="mx-2">
          <MdDelete /> Sil
        </Button>
        <Button className="mx-2">B3 forma</Button>
      </div>

      <div style={{ overflow: "scroll" }}>
        <Table className="employee-table" bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    title={column.render("Header")}
                    className="text-center my-2"
                    {...column.getHeaderProps()}
                  >
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
                    textAlign: "left",
                    backgroundColor:
                      row.original === selectedColumn ? "#d8e4eb" : "#f5f5f5",
                  }}
                  {...row.getRowProps()}
                  onClick={() => handleRowClick(row)}
                >
                  {row.cells.map((cell: any, i: number) => {
                    return (
                      <td className="cell" {...cell.getCellProps()}>
                        <input
                          className={`table_input form-control ${
                            row.original === selectedColumn ? "selected" : ""
                          }`}
                          name={cell.column.id}
                          onChange={handleInputChange}
                          value={cell.value}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </main>
  );
}

export default withAuth(Create);
