import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";

const Organizations = () => {
  const data = [
    {
      id: 1,
      name: "SİLAHLI QÜVVƏLƏRİN BAŞ KOMANDANLIĞI",
      shortName: "Baş Komandanlıq",
    },
    {
      id: 2,
      name: "RABİTƏ,İNFORMASİYA TEXNOLOGİYALARI VƏ KİBERTƏHLÜKƏSİZLİK BAŞ İDARƏSİ",
      shortName: "Baş Komandanlıq",
    },
  ];

  const [organizations, setOrganizations] = useState<any[]>(data);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);

  // Idare elave etmek
  const addOrganization = () => {
    const newOrganization = {
      id: organizations.length + 1,
      name: "",
      shortName: "",
    };
    setOrganizations([...organizations, newOrganization]);
  };

  // Idare silmek
  const deleteOrganization = (id: number | null) => {
    if (!id) {
      alert("Zəhmət olmasa ilk öncə idarə seçin");
      return;
    }

    const newOrganizations = organizations.filter(
      (organization) => organization.id !== id
    );
    setOrganizations(newOrganizations);
  };

  // Idareni secmek klikle
  const selectOrganization = (organization: any) => {
    if (selectedOrganization?.id === organization.id) {
      setSelectedOrganization(null);
      return;
    }
    setSelectedOrganization(organization);
  };

  // Idareni deyismek
  const changeOrganization = (e: any, id: number) => {
    const newOrganizations = organizations.map((organization) => {
      if (organization.id === id) {
        return {
          ...organization,
          [e.target.name]: e.target.value,
        };
      }
      return organization;
    });
    setOrganizations(newOrganizations);
  };


  return (
    <div>
      <div className="d-flex my-3">
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
      <Table bordered>
        <thead>
          <tr className="text-center">
            <th>№</th>
            <th>İdarələr</th>
            <th>Qısa adı</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => (
            <tr
              style={
                selectedOrganization?.id === organization.id
                  ? { backgroundColor: "#e6e6e6" }
                  : {}
              }
              onClick={() => selectOrganization(organization)}
            >
              <td className="text-center">{organization.id}</td>
              <td>
                <input
                  style={
                    selectedOrganization?.id === organization.id
                      ? { backgroundColor: "#e6e6e6" }
                      : {}
                  }
                  name="name"
                  onChange={(e) => changeOrganization(e, organization.id)}
                  className="border-0 user-none w-100 select-none"
                  value={organization.name}
                />
              </td>
              <td>
                {" "}
                <input
                  style={
                    selectedOrganization?.id === organization.id
                      ? { backgroundColor: "#e6e6e6" }
                      : {}
                  }
                  name="shortName"
                  onChange={(e) => changeOrganization(e, organization.id)}
                  className="border-0 user-none select-none"
                  value={organization.shortName}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Organizations;
