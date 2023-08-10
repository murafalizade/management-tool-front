import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { hideModalCreate } from "../../redux/showModalSlice";
import EmployeeService from "../../api/employeeService";
import Swal from "sweetalert2";

export default function CreateEmployeeModal() {
  const state = useSelector((state: RootState) => state.showModal);
  const dispatch = useDispatch();

  // initial employee form state
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    birthDate: "",
    fin: "",
    injuranceNo: "",
  });

  // handle change event of input
  const handleInputChange = (event: any) => {
    setEmployee({ ...employee, [event.target.id]: event.target.value });
  };

  // handle click event of the button
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await EmployeeService.addEmployee(employee);
      Swal.fire({
        icon: "success",
        title: "Əməliyyat uğurla yerinə yetirildi!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/employees";
      });
    } catch (e: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: e || "Xəta baş verdi!",
      });
    }
  };

  return (
    <Modal
      show={state.showCreateModal}
      onHide={() => dispatch(hideModalCreate())}
    >
      <Modal.Header closeButton>
        <Modal.Title>Hərbi qulluqçu əlavə et</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form ms-1">
          <div className="row my-2 g-3 align-items-center">
            <div className="col-4">
              <label htmlFor="lastName" className="col-form-label">
                Soyadı
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                id="lastName"
                value={employee.lastName}
                className="form-control"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row g-3 my-2 align-items-center">
            <div className="col-4">
              <label htmlFor="firstName" className="col-form-label">
                Adı
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                id="firstName"
                value={employee.firstName}
                className="form-control"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center">
            <div className="col-4">
              <label htmlFor="fatherName" className="col-form-label">
                Atasının adı
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                id="fatherName"
                value={employee.fatherName}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center">
            <div className="col-4">
              <label htmlFor="injuranceNo" className="col-form-label">
                Sosial Sığorta Nömrəsi
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                onChange={handleInputChange}
                value={employee.injuranceNo}
                id="injuranceNo"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row my-2 g-3 align-items-center">
            <div className="col-4">
              <label htmlFor="birthDate" className="col-form-label">
                Doğum tarixi
              </label>
            </div>
            <div className="col-8">
              <input
                type="date"
                id="birthDate"
                onChange={handleInputChange}
                value={employee.birthDate}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row my-2 g-3 align-items-center">
            <div className="col-4">
              <label htmlFor="fin" className="col-form-label">
                FİN
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                onChange={handleInputChange}
                value={employee.fin}
                maxLength={7}
                id="fin"
                className="form-control"
                required
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleFormSubmit} className="btn btn-primary">
          Saxla
        </button>
        <button
          onClick={() => dispatch(hideModalCreate())}
          className="btn btn-primary"
        >
          İmtina
        </button>
      </Modal.Footer>
    </Modal>
  );
}
