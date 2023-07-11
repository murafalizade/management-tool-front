import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "./TableLayout";
import OperationService from "../api/operationService";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  addPosition,
  setDepartment,
  setEmployees,
  setPositions,
} from "../redux/organizationSlice";
import Swal from "sweetalert2";
import EmployeeService from "../api/employeeService";

export default function Departments() {
  const [organization, setOrganization] = useState<any[]>([]);
  const [newEdit, setNewEdit] = useState<boolean>(false);
  const [choosenOrganization, setChoosenOrganizetion] = useState<any>(null);
  const [choosenDepartment, setChoosenDepartment] = useState<any>(null);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const departmentsData = useSelector(
    (state: any) => state.organization
  ).departments;
  const positionsData = useSelector(
    (state: any) => state.organization
  ).positions;
  const employeesData = useSelector(
    (state: any) => state.organization
  ).employees;
  const dispatch = useDispatch();

  const getOrganizationData = async () => {
    const res = await OperationService.getAdminstration();
    return res.data;
  };

  const selectOrganization = async (id: number) => {
    if (newEdit) {
      Swal.fire({
        title: "Dəyişiklikləri yadda saxlamaq istəyirsinizmi?",
        showDenyButton: true,
        confirmButtonText: "Yadda saxla",
        denyButtonText: `Ləğv et`,
      }).then(async (result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await saveDepartment();
          await savePosition();
        } else if (result.isDenied) {
          setNewEdit(false);
        }
      });
    }
    const res = await OperationService.getAdminstrationById(id);
    setChoosenOrganizetion(res);
    dispatch(setPositions([]));
    setChoosenDepartment(null);
    dispatch(setDepartment(res.departments));
  };

  const selectDepartment = async (id: number) => {
    if (id < 0) return;
    const res = await OperationService.getOrganizationById(id);
    const org = res.data;
    setChoosenDepartment(org);
    dispatch(setPositions(org.positions));
  };

  // bolme elave etmek ucun
  const addDepartments = () => {
    if (!choosenOrganization) {
      alert("Zəhmət olmasa ilk öncə idarəni seçin");
      return;
    }
    const newDepartment = {
      id: -(Math.abs(departmentsData.length) + 1),
      name: "",
      adminstrationId: choosenOrganization.id,
    };
    dispatch(addDepartment(newDepartment));
    setNewEdit(true);
  };

  // bolmeni silmek ucun
  const deleteDepartment = async (id: number | null) => {
    if (!id) {
      alert("Zəhmət olmasa ilk öncə şöbə və bölmə seçin");
      return;
    }
    Swal.fire({
      title: "Bölməni silmək istəyirsinizmi?",
      showDenyButton: true,
      confirmButtonText: "Sil",
      denyButtonText: `Ləğv et`,
    }).then(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      const newDepartments = departmentsData.filter(
        (department: any) => department.id !== id
      );
      if (result.isConfirmed) {
        if (id > 0) {
          await OperationService.deleteOrganizationById(id);
          Toast.fire({
            icon: "success",
            title: "Bölmə silindi",
          });
        }
        dispatch(setDepartment(newDepartments));
      } else if (result.isDenied) {
      }
    });
  };

  // bolmeni deyismek ucun
  const changeDepartment = (e: any, id: number) => {
    const newDepartments = departmentsData.map((department: any) => {
      if (department.id === id) {
        return {
          ...department,
          [e.target.name]: e.target.value,
        };
      }
      return department;
    });
    dispatch(setDepartment(newDepartments));
    setNewEdit(true);
  };

  // bolmeni yadda saxlamaq ucun
  const saveDepartment = async () => {
    await OperationService.saveOrganization(departmentsData);
    Toast.fire({
      icon: "success",
      title: "Bölmələr yadda saxlanıldı",
    });
    setNewEdit(false);
  };

  // vezifeni silmek ucun
  const deletePosition = async (id: number | null) => {
    if (!id) {
      alert("Zəhmət olmasa ilk öncə vəzifəni seçin");
      return;
    }
    Swal.fire({
      title: "Vəzifəni silmək istəyirsinizmi?",
      showDenyButton: true,
      confirmButtonText: "Sil",
      denyButtonText: `Ləğv et`,
    }).then(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      const newPositions = positionsData.filter(
        (position: any) => position.id !== id
      );
      if (result.isConfirmed) {
        if (id > 0) {
          await OperationService.deletePositionById(id);
          Toast.fire({
            icon: "success",
            title: "Vəzifə silindi",
          });
        }
        dispatch(setPositions(newPositions));
      } else if (result.isDenied) {
      }
    });
  };

  // vezife elave etmek ucun
  const addPositions = () => {
    if (!choosenDepartment) {
      alert("Zəhmət olmasa ilk öncə şöbə və bölmə seçin");
      return;
    }
    if (choosenDepartment.id < 0) {
      alert("Zəhmət olmasa ilk öncə secdiyiniz şöbə və bölməni yadda saxlayin");
      return;
    }
    const newPosition = {
      id: -(Math.abs(positionsData.length) + 1),
      name: "",
      salary: 0,
      departmentId: choosenDepartment.id,
    };
    dispatch(addPosition(newPosition));
    setNewEdit(true);
  };

  // vezifeni deyismek ucun
  const changePosition = (e: any, id: number) => {
    const newPositions = positionsData.map((position: any) => {
      if (position.id === id) {
        return {
          ...position,
          [e.target.name]: e.target.value,
        };
      }
      return position;
    });
    dispatch(setPositions(newPositions));
    setNewEdit(true);
  };

  // vezifeni yadda saxlamaq ucun
  const savePosition = async () => {
    await OperationService.savePosition(positionsData);
    Toast.fire({
      icon: "success",
      title: "Vəzifələr yadda saxlanıldı",
    });
    setNewEdit(false);
  };

  // vezifeni secdikde
  const selectPosition = async (id: number) => {
    if (id < 0) return;
    const res = await EmployeeService.getEmployeeByPositionId(id);
    dispatch(setEmployees(res??[]));
  };

  useEffect(() => {
    const gettingData = async () => {
      const org = await getOrganizationData();
      setOrganization(org);
    };
    gettingData();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={2}>
          <TableLayout
            columns={[
              {
                title: "S№",
                field: "id",
              },
              {
                title: "İdarə",
                field: "shortName",
              },
            ]}
            data={organization}
            isEditable={false}
            select={selectOrganization}
          />
        </Col>

        <Col md={9}>
          <TableLayout
            isEditable={true}
            data={departmentsData}
            select={selectDepartment}
            change={changeDepartment}
            add={addDepartments}
            save={saveDepartment}
            delete={deleteDepartment}
            columns={[
              {
                title: "S№",
                field: "id",
              },
              {
                title: "Şöbə və Bölmələr",
                field: "name",
              },
            ]}
          />

          <TableLayout
            isEditable={true}
            data={positionsData}
            change={changePosition}
            add={addPositions}
            select={selectPosition}
            save={savePosition}
            delete={deletePosition}
            columns={[
              {
                title: "S№",
                field: "id",
              },
              {
                title: "Vəzifələr",
                field: "name",
              },

              { title: "Hərbi rütbə", field: "rank" },
              {
                title: "Ayadək",
                field: "till_month",
              },
              {
                title: "İlədək",
                field: "till year",
              },
            ]}
          />

          <TableLayout
            isEditable={false}
            data={employeesData}
            columns={[
              {
                title: "İl",
                field: "year",
              },
              {
                title: "Ay",
                field: "months",
              },

              {
                title: "Soyadı",
                field: "lastName",
              },
              { title: "Adı", field: "firstName" },
              {
                field: "fatherName",
                title: "Atasının adı",
              },
              {
                title: "HA_ID",

                field: "HA_ID",
              },
              {
                title: "H_ID",

                field: "rankId",
              },
              {
                title: "VZF_ID",

                field: "positionId",
              },
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
}
