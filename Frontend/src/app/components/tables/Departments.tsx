import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "./TableLayout";
import OperationService from "../../api/operationService";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  addPosition,
  setDepartment,
  setEmployees,
  setPositions,
} from "../../redux/organizationSlice";
import EmployeeService from "../../api/employeeService";
import moment from "moment";
import Toastify from "../../utility/Toastify";

export default function Departments() {
  const [organization, setOrganization] = useState<any[]>([]);
  const [newEdit, setNewEdit] = useState<boolean>(false);
  const [choosenOrganization, setChoosenOrganizetion] = useState<any>(null);
  const [choosenDepartment, setChoosenDepartment] = useState<any>(null);
  const [isChanged, setIsChanged] = useState<boolean>(true)

  const toast = new Toastify();

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
      toast.warning(async (result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await saveDepartment();
          await savePosition();
          toast.success();
        } else if (result.isDenied) {
          setNewEdit(false);
          toast.info("Dəyişikliklər ləğv edildi");
        }
      }, "Yadda saxlamaq istəyirsinizmi?");
    }
    const res = await OperationService.getAdminstrationById(id);
    setChoosenOrganizetion(res);
    dispatch(setPositions([]));
    setChoosenDepartment(null);
    dispatch(setDepartment(res.departments));
  };

  const selectDepartment = async (id: number) => {
    if (id < 0) return;
    try {
      const res = await OperationService.getOrganizationById(id);
      const org = res.data;
      setChoosenDepartment(org);
      dispatch(setPositions(org.positions));
    } catch (err) {
      toast.error("Bölmə seçilmədi");
    }
  };

  // bolme elave etmek ucun
  const addDepartments = () => {
    if (!choosenOrganization) {
      toast.info("Zəhmət olmasa ilk öncə idarəni seçin");
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
      toast.info("Zəhmət olmasa ilk öncə şöbə və bölmə seçin");
      return;
    }

    toast.warning(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      const newDepartments = departmentsData.filter(
        (department: any) => department.id !== id
      );
      if (result.isConfirmed) {
        if (id > 0) {
          await OperationService.deleteOrganizationById(id);
          toast.success("Bölmə silindi");
        }
        dispatch(setDepartment(newDepartments));
      }
    }, "Bölməni silmək istəyirsinizmi?");

    setIsChanged(true);
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
    try {
      await OperationService.saveOrganization(departmentsData);
      toast.success("Bölmələr yadda saxlanıldı");
      setNewEdit(false);
    } catch (err) {
      toast.error("Bölmələr yadda saxlanılmadı");
    }

    setIsChanged(true);
  };

  // vezifeni silmek ucun
  const deletePosition = async (id: number | null) => {
    if (!id) {
      toast.info("Zəhmət olmasa ilk öncə vəzifəni seçin");
      return;
    }
    toast.warning(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      const newPositions = positionsData.filter(
        (position: any) => position.id !== id
      );
      if (result.isConfirmed) {
        if (id > 0) {
          await OperationService.deletePositionById(id);
          toast.success("Vəzifə silindi");
        }
        dispatch(setPositions(newPositions));
      }
    }, "Vəzifəni silmək istəyirsinizmi?");

    setIsChanged(true);
  };

  // vezife elave etmek ucun
  const addPositions = () => {
    if (!choosenDepartment) {
      toast.info("Zəhmət olmasa ilk öncə şöbə və bölmə seçin");
      return;
    }
    if (choosenDepartment.id < 0) {
      toast.info("Zəhmət olmasa ilk öncə secdiyiniz şöbə və bölməni yadda saxlayin");
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
    toast.success("Vəzifələr yadda saxlanıldı");
    setNewEdit(false);
    setIsChanged(true);
  };

  // vezifeni secdikde
  const selectPosition = async (id: number) => {
    if (id < 0) return;
    const res = await EmployeeService.getEmployeeByPositionId(id);
    dispatch(setEmployees(res ?? []));
  };

  useEffect(() => {
    if(!isChanged) return;
    const gettingData = async () => {
      const org = await getOrganizationData();
      setOrganization(org);
    };
    gettingData();
    setIsChanged(false);
  }, [isChanged]);

  return (
    <Container>
      <Row>
        <Col md={2}>
          <TableLayout
            columns={[
              {
                title:"Seç",
                field:"select",
              },
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
                title:"Seç",
                field:"select",
              },
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
                title:"Seç",
                field:"select",
              },
              {
                title: "S№",
                field: "id",
              },
              {
                title: "Vəzifələr",
                field: "name",
              },

              { title: "Hərbi rütbə", field: "rankName" },
              {
                title: "Vəzifə maaşı",
                field: "salary",
              },
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
                field: "startDate",
                value: (x) => {
                  const startDate = moment(x?.startDate);
                  let recordDate = moment(new Date());
                  const duration = moment.duration(recordDate.diff(startDate));
                  return duration.days();
                },
              },
              {
                title: "Ay",
                field: "months",
                value: (x) => moment().diff(x.startDate, "months") % 12,
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
