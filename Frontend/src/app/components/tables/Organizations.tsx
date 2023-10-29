import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import OperationService from "../../api/operationService";
import Toastify from "../../utility/Toastify";

const Organizations = () => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [isChanged, setIsChanged] = useState<boolean>(true);

  const getData = async () => {
    const res = await OperationService.getAdminstration();
    const data = res.data;
    return data;
  };

  const toast = new Toastify();

  useEffect(() => {
    if(!isChanged) return;

    const gettingData = async () => {
      const departments = await getData();
      setOrganizations(departments);
    };

    gettingData();
    setIsChanged(false);
  }, [isChanged]);

  // Idare elave etmek
  const addOrganization = () => {
    const newOrganization = {
      id: -(Math.abs(organizations.length) + 1),
      name: "",
      shortName: "",
    };
    setOrganizations([...organizations, newOrganization]);
  };

  // Idare silmek
  const deleteOrganization = async (id: number | null) => {
    if (!id) {
      toast.info("Zəhmət olmasa ilk öncə idarə seçin");
      return;
    }
    toast.warning(async (result: any) => {
      const newOrganizations = organizations.filter(
        (organization) => organization.id !== id
      );
      if (result.isConfirmed) {
        if (id > 0) {
          await OperationService.deleteAdminstrationById(id);
        }
        setOrganizations(newOrganizations);
        toast.success("Idarə silindi");
      } else if (result.isDenied) {
        toast.info();
      }
    }, "Silmək istədiyinizə əminsinizmi?");

    setIsChanged(true);
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

  // Idareni yadda saxlamaq
  const saveOrganization = async () => {
    await OperationService.saveAdminstration(organizations);
    toast.success("Idarələr yadda saxlanıldı");
    setIsChanged(true);
  };

  return (
    <div>
      <div className="d-flex my-3">
        <Button
          onClick={() => addOrganization()}
          variant="primary"
          className="me-2"
        >
          Əlave et
        </Button>
        <Button
          onClick={() => deleteOrganization(selectedOrganization?.id)}
          variant="danger"
        >
          Sil
        </Button>
        <Button
          variant="success"
          onClick={() => saveOrganization()}
          className="ms-auto"
        >
          Yadda saxla
        </Button>
      </div>
      <Table bordered>
        <thead>
          <tr className="text-center">
            <th>Seç</th>
            <th>№</th>
            <th>İdarələr</th>
            <th>Qısa adı</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization, index) => (
            <tr
              style={
                selectedOrganization?.id === organization.id
                  ? { backgroundColor: "#e6e6e6" }
                  : {}
              }
            >
              <td className="text-center">
                <input
                  style={{ width: "30px" }}
                  type="checkbox"
                  className="form-check-input text-center form-control"
                  checked={selectedOrganization?.id === organization.id}
                  onChange={() => {
                    selectOrganization(organization);
                  }}
                />
              </td>
              <td className="text-center">{index + 1}</td>
              <td>
                <input
                  style={
                    selectedOrganization?.id === organization.id
                      ? { backgroundColor: "#e6e6e6" }
                      : {}
                  }
                  name="name"
                  onChange={(e) => changeOrganization(e, organization.id)}
                  className="border-0 user-none form-control initial w-100 select-none"
                  value={organization.name}
                  placeholder="İdarə adı"
                />
              </td>
              <td>
                <input
                  style={
                    selectedOrganization?.id === organization.id
                      ? { backgroundColor: "#e6e6e6" }
                      : {}
                  }
                  name="shortName"
                  onChange={(e) => changeOrganization(e, organization.id)}
                  className="border-0 user-none form-control initial select-none"
                  value={organization.shortName}
                  placeholder="Qısa adı"
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
