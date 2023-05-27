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
  save?: () => void;
  selected?: T | null;
  isEditable: boolean;
}

const TableLayout = (props: Props<any>) => {
  const data = props.data;

  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);

  // melumat elave etmek
  const addOrganization = () => {
    if (props.add) props.add();
  };

  // melumati silmek
  const deleteOrganization = (id: number | null) => {
    if (props.delete) props.delete(id);
  };

  // melumati secmek klikle
  const selectOrganization = async (organization: any) => {
    if (props.select) await props.select(organization.id);
    if (selectedOrganization?.id === organization.id) {
      setSelectedOrganization(null);
      return;
    }
    setSelectedOrganization(organization);
  };

  // Idareni deyismek
  const changeOrganization = (e: any, id: number) => {
    if (props.change) props.change(e, id);
  };

  // Idareni yadda saxlamaq
  const saveOrganization = async () => {
    if (props.save) props.save();
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
          <Button
            variant="success"
            className="ms-auto"
            onClick={() => saveOrganization()}
          >
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
          {data.map((d,index) => (
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
                    column.field === "id" ? (index + 1) : (d[column.field])) : 
                    (
                      <input
                        style={
                          selectedOrganization?.id === d.id
                            ? { backgroundColor: "#e6e6e6" }
                            : {}
                        }
                        name={column.field as string}
                        onChange={(e) => changeOrganization(e, d.id)}
                        className="border-0 user-none w-100 select-none"
                        value={
                          column.field === "id" ? index + 1 : d[column.field]
                        }
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