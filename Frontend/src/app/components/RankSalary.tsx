import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import OperationService from "../api/operationService";

const RankSalary = () => {
  const [organization, setOrganization] = useState<any[]>([]);
  const getRankData = async () => {
    const response = await OperationService.getRanks();
    console.log(response);
    setOrganization(response);
  };

  useEffect(() => {
    getRankData();
  }, []);

  const exportToExcel = async () => {
    const response = await OperationService.getExcel();
    const url = URL.createObjectURL(response);

    const link = document.createElement("a");
    link.href = url;
    link.download = "vezife_maaslari.xlsx";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
        <div className="d-flex justify-content-center w-100 my-4">
          <div className="d-flex h-75">
            <input
              type="number"
              max="2023"
              defaultValue={2023}
              className="form-control w-25 me-2 text-rigth"
            />
            <select defaultValue={5} className="form-control h-75 w-25 mx-2">
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
            <Button variant="primary">Göstər</Button>
          </div>
        </div>
      <div className="table-wrapper">
        <Table bordered>
          <thead>
            <tr className="text-center">
              <th>S№"</th>
              <th>Hərbi rütbə</th>
              <th>Qısa adı</th>
              <th>Hərbi rütbə maaşı</th>
            </tr>
          </thead>
          <tbody>
            {organization.map((item: any, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.shortName}</td>
                <td>{item.salary}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="text-center"></td>
              <td>{organization.length}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RankSalary;
