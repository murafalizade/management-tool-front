import React from "react";
import { Button, Table } from "react-bootstrap";

const PositionSalary = () => {
  const data = [
    {
      id: 'Baş Komandanlıq',
      name: "Silahlı Qüvvələr Baş Komandanlığı",
      shortName: "Az.Resp.MN-i",
      salary: "3060.00",
    }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between my-4">
        <div className="d-flex">
          <input
            type="number"
            max="2023"
            value={2023}
            className="form-control w-50 me-2 text-rigth"
          />
          <select  defaultValue={5} className="form-control w-75 mx-2">
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
          <Button variant="primary">Goster</Button>
        </div>

        <Button>Cixaris et</Button>
      </div>
      <div
       className="table-wrapper"
      >
        <Table bordered>
          <thead>
            <tr className="text-center">
              <th>İdarə</th>
              <th>Şöbə, Bölmə</th>
              <th>Vəzifə</th>
              <th>Vəzifə maaşı</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.shortName}</td>
                <td>{item.salary}</td>
              </tr>
            ))}
            <tr>
                <td colSpan={2} className="text-center">
                    
                </td>
                <td>
                    {data.length}
                </td>
                <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PositionSalary;
