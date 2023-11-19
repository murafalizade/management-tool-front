import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BarChart } from "../components/charts/BarGraph";
import { PieChart } from "../components/charts/PieChart";
import OperationService from "../api/operationService";
import Loading from "../components/layouts/Loading";
import "../styles/statistics.scss";

const Statistics = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [rankNames, setRankNames] = useState<string[]>([]);
  const [rankValues, setRankValues] = useState<any[]>([]);
  const [employeeCount, setEmployeeCount] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getAllStatistics: any = async () => {
    setIsLoaded(true);
    const ranks = await OperationService.getRankStatistic(year);
    const employees = await OperationService.getEmployeeStatistic(year);
    const keys = Object.keys(ranks);
    const values = Object.values(ranks);
    setEmployeeCount(employees);
    setRankNames(keys);
    setRankValues(values);
    setIsLoaded(false);
  };

  useEffect(() => {
    document.body.classList.add("overflow-y-scroll");
    getAllStatistics();
  }, []);

  return (
    <div className="overflow-x-hidde statistics">
      <div className="d-flex justify-content-between m-3 mb-5">
        <h2 className="mx-2 text-center fw-700">{"Statistika"}</h2>
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
            onClick={() => getAllStatistics()}
          >
            Göstər
          </Button>
        </div>
      </div>
      {isLoaded ? (
        <Loading />
      ) : (
        <div className="row align-items-center">
          <div className="col-md-6 text-center px-3">
            <PieChart
              label="Maddi yardım üzrə say"
              labels={["Maddi yardım alanlar", "Maddi yardım almayanlar"]}
              data={[
                employeeCount.financialAid,
                employeeCount.all - employeeCount.financialAid,
              ]}
            />
          </div>
          <div className="col-md-6 text-center px-3">
            <PieChart
              label="Məzuniyyət üzrə say"
              labels={["Məzuniyyətdə olanlar", "Məzuniyyətdə olmayanlar"]}
              data={[
                employeeCount.vacations,
                employeeCount.all - employeeCount.vacations,
              ]}
            />
          </div>
          <div className="col-md-8 text-center px-3 mt-5">
            <BarChart
              label="Hərbi rütbələr"
              data={rankValues}
              labels={rankNames}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
