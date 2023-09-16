import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BarChart } from "../components/charts/BarGraph";
import { LineChart } from "../components/charts/LineChart";
import { PieChart } from "../components/charts/PieChart";

const Statistics = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  return (
    <div>
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
            // onClick={() => getEmployees(parseInt(id!))}
          >
            Göstər
          </Button>
        </div>
      </div>

      <h4 className="mx-2 text-center">{"Statistika"}</h4>
      <div className="row align-items-center">
        <div className="col-md-6 text-center px-3">
          <PieChart />
        </div>
        <div className="col-md-6 text-center px-3">
          <LineChart />
        </div>
        <div className="col-md-12 text-center px-3">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
