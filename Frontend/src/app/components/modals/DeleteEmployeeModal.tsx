import React, { useEffect, useState } from "react";
import { EmployeeData } from "../../types/EmployeeData";
import EmployeeService from "../../api/employeeService";
import Toastify from "../../utility/Toastify";

interface ModalProps {
  onHide: () => void;
}

const DeleteEmployeeModal = (props: ModalProps) => {
  // Get all employees and set to state
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);


  const toast = new Toastify();

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees
  const fetchEmployees = async () => {
    const employee = await EmployeeService.getEmployeeByAll();
    setEmployees(employee);
  };

  // Handle select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployeeId(parseInt(e.target.value));
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await EmployeeService.deleteEmployeeById(selectedEmployeeId!);
      props.onHide();
      toast.success();
    } catch (error) {
      toast.error();
    }
    setLoading(false);
  };

  return (
    <div>
      <label htmlFor="employees" className="form-label my-2">
        Hərbi qulluqçu seçin
      </label>
      <select
        onChange={handleSelectChange}
        name="employees"
        className="form-control my-2"
      >
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.lastName} {employee.firstName} {employee.fatherName}
          </option>
        ))}
      </select>
      <div className="d-flex justify-content-end align-items-end">
        <button
          onClick={() => handleDelete()}
          type="button"
          className="btn btn-primary m-2"
        >
          {!loading ? "Sil" : <i className="fa fa-refresh fa-spin mx-2"></i>}
        </button>
        <button
          type="button"
          onClick={() => props.onHide()}
          className="btn btn-primary m-2"
        >
          İmtina
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
