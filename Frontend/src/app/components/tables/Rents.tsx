import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import operationService from "../../api/operationService";
import Toastify from "../../utility/Toastify";
import moment from "moment";
import EmployeeService from "../../api/employeeService";

const Rents = () => {
  // create discount state and set it when page loads from operationService getDiscount function
  const [discount, setDiscount] = useState<any[]>([]);

  // state for filter discount data by year and month
  const [filter, setFilter] = useState<any>({
    year: moment().format("YYYY"),
    month: moment().format("M"),
  });

  const toast = new Toastify();

  // input change for filter
  const handleChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const getDiscount = async () => {
    try {
      const res = await EmployeeService.getKiraye();
      setDiscount(res);
    } catch (error) {
      toast.error();
    }
  };

  useEffect(() => {
    getDiscount();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center w-100 my-4">
        <div className="d-flex h-75">
          <input
            type="number"
            max="2023"
            name="year"
            onChange={handleChange}
            defaultValue={filter.year}
            className="form-control w-25 me-2 text-rigth"
          />
          <select
            defaultValue={filter.month}
            onChange={handleChange}
            name="month"
            className="form-control h-75 w-25 mx-2"
          >
            <option value="1">Yanvar</option>
            <option value="2">Fevral</option>
            <option value="3">Mart</option>
            <option value="4">Aprel</option>
            <option value="5">May</option>
            <option value="6">İyun</option>
            <option value="7">İyul</option>
            <option value="8">Avqust</option>
            <option value="9">Sentyabr</option>
            <option value="10">Oktyabr</option>
            <option value="11">Noyabr</option>
            <option value="12">Dekabr</option>
          </select>
          <Button onClick={() => getDiscount()} variant="primary">
            Göstər
          </Button>
        </div>
      </div>
      <div className="table-wrapper">
        <ul className="p-0">
          {discount?.map((item: any, index: number) => (
            <li className="d-flex my-2" key={index}>
              <p className="text-center mx-3 fs-6 min-width-50">{item.name}</p>
              <input
                type="number"
                value={item.price}
                className="form-control w-25 h-50"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rents;
