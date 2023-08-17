import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useTable } from "react-table";
import { employeeHeaders } from "../constants/headers/employee";
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
import { MdDelete } from "react-icons/md";
import "../styles/create.scss";
import Toastify from "../utility/Toastify";
import moment from "moment";
import OperationService from "../api/operationService";
import { ELMI_DERECE } from "../constants/elmiDerece";

function Create() {
  const Toast = new Toastify();

  const state = useSelector((state: RootState) => state.showModal);
  const [selectedColumn, setSelectedColumn] = useState<any>(state.selectedRow);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  // const [ranks, setRanks] = useState<any>([]);
  // const [positions, setPositions] = useState<any>([]);
  // const [xariciDil, setXariciDil] = useState<any>([]);
  // const [fexriAd, setFexriAd] = useState<any[]>([]);
  // const [elmiDerece, setElmiDerece] = useState<any[]>(ELMI_DERECE);
  // const [meharet, setMeharet] = useState<any[]>([]);

  const [updatedEmployees, setUpdatedEmployees] = useState<EmployeeData[]>([]);

  const dispatch = useDispatch();

  let nav = useNavigate();

  // fetch employees from API
  const getEmployees = async () => {
    try {
      const response = await EmployeeService.getEmployeeByAll();
      setEmployees(response);
      // const response2 = await OperationService.getRanks();
      // setRanks(response2);
      // const response3 = await OperationService.getPosition();
      // setPositions(response3);
      // const xariciDils = await OperationService.getXariciDil();
      // const fexriAds = await OperationService.getFexriAd();
      // const meharet = await OperationService.getMeharet();
      // const elmiDerece = await OperationService.getElmiDerece();
      // setElmiDerece(elmiDerece);
      // setMeharet(meharet);
      // setXariciDil(xariciDils);
      // setFexriAd(fexriAds);
    } catch (err: any) {
      Toast.error(err.toString());
    }
  };

  // delete employee
  const deleteEmployee = async () => {
    if (!selectedColumn) {
      alert("Please select a row");
      return;
    }
    try {
      Toast.warning(async (result: any) => {
        if (result.isConfirmed) {
          await EmployeeService.deleteEmployeeById(selectedColumn.id);
          dispatch(setSelectedRow(null));
          Toast.success("Məlumat silindi");
          await getEmployees();
        }
      });
    } catch (e: any) {
      Toast.error(e.toString());
    }
  };

  // open personal account
  const personalAccount = () => {
    if (!selectedColumn) {
      alert("Please select a row");
      return;
    }
    nav(`/employees/${selectedColumn.id}`);
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
    dispatch(setSelectedRow(row));
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
    Toast.success("Məlumatlar yeniləndi");
    setUpdatedEmployees([]);
  };

  const tableInstance = useTable({ columns: employeeHeaders, data: employees });

  const { getTableProps, getTableBodyProps } = tableInstance;

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
            <tr className="text-center" style={{ backgroundColor: "#f4f4f4" }}>
              <th rowSpan={2} className="table_header">
                Soyadı
              </th>
              <th rowSpan={2} className="table_header">
                Adı
              </th>
              <th rowSpan={2} className="table_header">
                Atasının adı
              </th>
              <th rowSpan={2} className="table_header">
                Sosial Sığorta №
              </th>
              <th rowSpan={2} className="table_header">
                Doğum tarixi
              </th>
              <th rowSpan={2} className="table_header">
                FIN
              </th>

              <th colSpan={2} className="table_header">
                Təyin olunma
              </th>

              <th colSpan={2} className="table_header">
                Qəbul olunma
              </th>

              {/* <th rowSpan={2} className="table_header">
                Rütbənin dəyişdirilməsi
              </th>

              <th rowSpan={2} className="table_header">
                Vəzifənin dəyişdirilməsi
              </th>

              <th colSpan={2} className="table_header">
                Məharət dərəcəsi{" "}
              </th>

              <th rowSpan={2} className="table_header">
                Xarici dil
              </th>

              <th rowSpan={2} className="table_header">
                Elmi dərəcə
              </th>

              <th rowSpan={2} className="table_header">
                Fəxri ad
              </th> */}
            </tr>
            <tr>
              <th className="table_subheader">vaxtı</th>
              <th className="table_subheader">əmri</th>
              <th className="table_subheader">vaxtı</th>
              <th className="table_subheader">əmri</th>

              {/* <th className="table_subheader">verilmə tarixi</th>
              <th className="table_subheader">Məharət dərəcəsi</th> */}
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {employees.map((employee: EmployeeData) => (
              <tr
                className="text-center"
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  textAlign: "center",
                  backgroundColor:
                    employee === selectedColumn ? "#d8e4eb" : "#f5f5f5",
                }}
                onClick={() => handleRowClick(employee)}
              >
                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"lastName"}
                    onChange={handleInputChange}
                    value={employee.lastName}
                  />
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"firstName"}
                    onChange={handleInputChange}
                    value={employee.firstName}
                  />
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"fatherName"}
                    onChange={handleInputChange}
                    value={employee.fatherName}
                  />
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"injuranceNo"}
                    onChange={handleInputChange}
                    value={employee.injuranceNo}
                  />
                </td>
                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    type="date"
                    name="birthDate"
                    onChange={handleInputChange}
                    value={moment(new Date(employee.birthDate)).format(
                      "YYYY-MM-DD"
                    )}
                  />
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"fin"}
                    maxLength={7}
                    minLength={7}
                    onChange={handleInputChange}
                    value={employee.fin}
                  />
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    type="date"
                    name={"startDate"}
                    onChange={handleInputChange}
                    value={moment(new Date(employee.startDate)).format(
                      "YYYY-MM-DD"
                    )}
                  />
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"commandNo"}
                    onChange={handleInputChange}
                    value={employee.commandNo}
                  />
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    type="date"
                    name={"enteranceDate"}
                    onChange={handleInputChange}
                    value={moment(new Date(employee.enteranceDate)).format(
                      "YYYY-MM-DD"
                    )}
                  />
                </td>

                {/* <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"enteranceCommand"}
                    onChange={handleInputChange}
                    value={employee.enteranceCommand}
                  />
                </td> */}

                {/* <td>
                  <select
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"rankId"}
                    onChange={handleInputChange}
                    value={
                      !employee?.rankId
                        ? employee.rank?.shortName
                        : ranks.find((rank: any) => rank.id === employee.rankId)
                            ?.shortName
                    }
                  >
                    <option>{employee.rank?.shortName}</option>
                    {ranks.map((rank: any) => (
                      <option value={rank.id}>{rank.shortName}</option>
                    ))}
                  </select>
                </td> */}

                {/* <td>
                  <select
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"positionId"}
                    onChange={handleInputChange}
                    value={employee.position?.name}
                  >
                    <option>{employee.position?.name}</option>
                    {positions.map((position: any) => (
                      <option value={position.id}>{position.name}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    type="date"
                    name={"meharetDate"}
                    onChange={handleInputChange}
                    value={employee.meharetDate}
                  />
                </td> */}

                {/* <td>
                  <select
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"meharetId"}
                    onChange={handleInputChange}
                    value={employee.meharetId}
                  >
                    <option>{employee.meharet?.name}</option>
                    {meharet
                      .filter((x: any) => x.id !== employee.meharetId)
                      .map((mh: any) => (
                        <option value={mh.id}>{mh.name}</option>
                      ))}
                  </select>
                </td> */}

                {/* <td>
                  <select
                    className={`table_input form-control ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"XariciDilId"}
                    onChange={handleInputChange}
                    value={employee.xariciDil?.name}
                  >
                    <option>{employee.xariciDil?.name}</option>
                    {xariciDil
                      .filter((x: any) => x.name !== employee.xariciDil?.name)
                      .map((language: any) => (
                        <option value={language.id}>{language.name}</option>
                      ))}
                  </select>
                </td>

                <td>
                  <select
                    className={`table_input form-control d-none ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name={"elmiDereceId"}
                    onChange={handleInputChange}
                    value={employee.elmiDereceId}
                  >
                    <option>{employee.elmiDerece?.name}</option>
                    {elmiDerece
                      .filter((x: any) => x.id !== employee.elmiDereceId)
                      .map((elmiDerece: any) => (
                        <option value={elmiDerece.id}>{elmiDerece.name}</option>
                      ))}
                  </select>
                </td>

                <td>
                  <select
                    className={`table_input form-control d-none ${
                      employee === selectedColumn ? "selected" : ""
                    }`}
                    name="fexriAdName"
                    onChange={handleInputChange}
                    defaultValue={employee.fexriAdName}
                  >
                    <option>{employee.fexriAdName}</option>
                    {fexriAd?.map((x: any) => (
                      <option key={`${x.id}`} value={x.name}>
                        {x.name}
                      </option>
                    ))}
                  </select>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}

export default withAuth(Create);
