import React, { useEffect, useState } from "react";
import { EmployeeData } from "../../types/EmployeeData";
import EmployeeService from "../../api/employeeService";
import Toastify from "../../utility/Toastify";
import OperationService from "../../api/operationService";

const ChangePositionEmployeeModal = () => {
  // Get all employees and set to state
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [positions, setPositions] = useState<any[]>([]);
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>();

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees
  const fetchEmployees = async () => {
    const employee = await EmployeeService.getEmployeeByAll();
    const position = await OperationService.getPosition();
    setEmployees(employee);
    setPositions(position);
  };

  // Handle select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployeeId(parseInt(e.target.value));
  };

  const handleSelectChangePosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPositionId(parseInt(e.target.value));
  };

  const toast = new Toastify();


  const handleDelete = async () => {
    setLoading(true);
    try {
      await EmployeeService.deleteEmployeeById(selectedEmployeeId!);
    } catch (error) {
      toast.success();
    }
    setLoading(false);
  };

  return (
    <div>
      <label htmlFor="employees" className="form-label">
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

      <label htmlFor="employees" className="form-label">
        Vəzifəni seçin
      </label>
      <select
        onChange={handleSelectChangePosition}
        name="employees"
        className="form-control my-2"
      >
        {positions.map((position) => (
          <option key={position.id} value={position.id}>
            {position.name}
          </option>
        ))}
      </select>

      <div className="d-flex justify-content-end align-items-end">
        <button type="button" className="btn btn-primary m-2">
          {!loading ? (
            "Dəyişdir"
          ) : (
            <i className="fa fa-refresh fa-spin mx-2"></i>
          )}
        </button>
        <button type="button" className="btn btn-primary m-2">
          İmtina
        </button>
      </div>
    </div>
  );
};

export default ChangePositionEmployeeModal;
