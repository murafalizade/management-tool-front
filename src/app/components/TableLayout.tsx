import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";

interface Props<T> {
  data: T[];
  columns: {
    title: string;
    field: keyof T;
    render?: (data: T) => JSX.Element;
  }[];
  add?: () => void;
  delete?: (id: number | null) => void;
  select?: (data: T) => void;
  change?: (e: any, id: number) => void;
  selected?: T | null;
  isEditable: boolean;
}

const TableLayout = (props: Props<any>) => {
  const data = props.data;

  const [info, setInfo] = useState<any[]>(data);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);

  // melumat elave etmek
  const addOrganization = () => {
    const newInfo = props.columns.map((data) => {
      return {
        [data.field]: "",
      };
    });
    setInfo([...info, newInfo]);
  };

  // melumati silmek
  const deleteOrganization = (id: number | null) => {
    if (!id) {
      alert("Zəhmət olmasa ilk öncə idarə seçin");
      return;
    }

    const newInfo = info.filter((data) => data.id !== id);
    setInfo(newInfo);
    setSelectedOrganization(null);
  };

  // melumati secmek klikle
  const selectOrganization = (organization: any) => {
    if (selectedOrganization?.id === organization.id) {
      setSelectedOrganization(null);
      return;
    }
    setSelectedOrganization(organization);
  };

  // Idareni deyismek
  const changeOrganization = (e: any, id: number) => {
    const newInfo = info.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          [e.target.name]: e.target.value,
        };
      }
      return data;
    });
    setInfo(newInfo);
  };

  return (
    <div>
      {props.isEditable ? (
        <div className="d-flex my-2">
          <Button
            onClick={() => addOrganization()}
            variant="primary"
            className="me-2"
          >
            Yeni idarə
          </Button>
          <Button
            onClick={() => deleteOrganization(selectedOrganization?.id)}
            variant="danger"
          >
            Sil
          </Button>
          <Button variant="success" className="ms-auto">
            Yadda saxla
          </Button>
        </div>
      ) : null}
      <Table className="my-2" bordered>
        <thead>
          <tr className="text-center">
            {props.columns.map((column) => (
              <th>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {info.map((d) => (
            <tr onClick={() => selectOrganization(d)}>
              {props.columns.map((column) => (
                <td
                  className={column.field === "id" ? "small-td" : ""}
                  style={
                    selectedOrganization?.id === d.id
                      ? { backgroundColor: "#e6e6e6" }
                      : {}
                  }
                >
                  {!props.isEditable ? (
                    d[column.field]
                  ) : (
                    <input
                      style={
                        selectedOrganization?.id === d.id
                          ? { backgroundColor: "#e6e6e6" }
                          : {}
                      }
                      name={column.field as string}
                      onChange={(e) => changeOrganization(e, d.id)}
                      className="border-0 user-none w-100 select-none"
                      value={d[column.field]}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableLayout;
