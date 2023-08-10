import React, { useEffect, useState } from "react";
import { Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "../../styles/navbar.scss";
import DarkModeToggler from "./DarkModeToggler";
import SalaryModal from "../modals/SalaryModal";
import { useDispatch, useSelector } from "react-redux";
import { changeModalInfo, showModalCreate } from "../../redux/showModalSlice";
import Cookie from "../../utility/Cookie";
import { RootState } from "../../redux/store";
import CreateEmployeeModal from "../modals/CreateEmployeeModal";
import EmployeeService from "../../api/employeeService";
import ModalLayout from "../modals/ModalLayout";
import RankSalary from "../tables/RankSalary";
import Compensation from "../tables/Compensation";
import { FILTER_TABLE } from "../../constants/filterTable";
import Toastify from "../../utility/Toastify";
import ChangePositionEmployeeModal from "../modals/ChangePositionEmployeeModal";
import DeleteEmployeeModal from "../modals/DeleteEmployeeModal";

function Layout() {
  const [showFileDropdown, setShowFileDropdown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalRank, setShowModalRank] = useState<boolean>(false);
  const [showModalCompensation, setShowModalCompensation] =
    useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [selectedSubRow, setSelectedSubRow] = useState<string>("");
  const dispatch = useDispatch();

  const toggleOpenDropdown = () => {
    setShowFileDropdown(!showFileDropdown);
  };

  const state = useSelector((root: RootState) => root.showModal);

  useEffect(() => {
    // get theme from cookie
    const theme = localStorage.getItem("theme");
    // if theme is dark then toggle checked state
    if (theme === "dark") {
      document.body.classList.add("inverse");
    } else {
      document.body.classList.remove("inverse");
    }
  }, []);

  const logout = () => {
    Cookie.eraseCookie(process.env.SECRET_TOKEN_KEY as string);
    window.location.href = "/login";
  };

  const addFoodQat = async (qat: number) => {
    try {
      await EmployeeService.addFoodQat(qat);
      Toastify.success();
    } catch (err) {
      Toastify.success("Xəta baş verdi", "top-end");
    }
  };

  const addKirayeQat = async (qat: number) => {
    try {
      await EmployeeService.addKirayeQat(qat);
      Toastify.success();
    } catch (err) {
      Toastify.success("Xəta baş verdi", "top-end");
    }
  };

  const chooseRow = (row: string) => {
    if (row === selectedRow) return setSelectedRow("");
    setSelectedRow(row);
  };

  const chooseSubRow = (row: string) => {
    if (row === selectedSubRow) return setSelectedSubRow("");
    setSelectedSubRow(row);
  };

  return (
    <>
      <SalaryModal show={showModal} tab={activeTab} />
      <CreateEmployeeModal />
      <ModalLayout
        show={showModalRank}
        onHide={() => setShowModalRank(false)}
        title="Hərbi rütbə maaşları"
        children={<RankSalary />}
      />
      <ModalLayout
        show={showModalCompensation}
        onHide={() => setShowModalCompensation(false)}
        title="Kompenzasiya və faizlər"
        children={<Compensation />}
      />
      <ModalLayout
        show={showModalEdit}
        onHide={() => setShowModalEdit(false)}
        title="Vəzifəni dəyiş"
        children={<ChangePositionEmployeeModal />}
      />
      <ModalLayout
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        title="Hərbi qulluqçu sil"
        children={
          <DeleteEmployeeModal onHide={() => setShowModalDelete(false)} />
        }
      />
      <Navbar
        style={{ height: "35px" }}
        bg="white"
        className="border-bottom  p-0"
        expand="lg"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title={<>Hərbi qulluqçular</>}
              id="basic-nav-dropdown"
              onClick={() => chooseRow("Hərbi qulluqçular")}
              style={
                selectedRow === "Hərbi qulluqçular"
                  ? { backgroundColor: "#1E90FF", color: "white" }
                  : {}
              }
              onToggle={toggleOpenDropdown}
              show={showFileDropdown}
            >
              <NavDropdown.Item href="/">HQ siyahı</NavDropdown.Item>
              <NavDropdown.Item
                href={
                  state.selectedRow?.name
                    ? `/employees/${state.selectedRow?.name}`
                    : "/employees"
                }
              >
                HQ Şəxsi hesab
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(showModalCreate())}>
                HQ bu aydan əlavə et
              </NavDropdown.Item>
              <NavDropdown.Item href="/employees">
                HQ vəzifəni dəyiş
              </NavDropdown.Item>
              <NavDropdown.Item href="/employess">
                HQ bu aydan cədvəldən sil
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={"Məlumatlar"}
              onClick={() => chooseRow("Məlumatlar")}
              style={
                selectedRow === "Məlumatlar"
                  ? { backgroundColor: "#1E90FF", color: "white" }
                  : {}
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="#idarələr"
                onClick={() =>
                  dispatch(
                    changeModalInfo({
                      tab: "idarələr",
                      show: true,
                    })
                  )
                }
              >
                Ştat və vəzifə maaşları
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setShowModalRank(true)}>
                Hərbi rütbə maaşları
              </NavDropdown.Item>
              <NavDropdown.Item>Kirayə kompensasiyası</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setShowModalCompensation(true)}>
                Digər faiz və kompen.
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              onClick={() => chooseRow("Əməliyyatlar")}
              style={
                selectedRow === "Əməliyyatlar"
                  ? { backgroundColor: "#1E90FF", color: "white" }
                  : {}
              }
              title={"Əməliyyatlar"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => window.location.reload()}>
                Maaşları yenidən hesabla
              </NavDropdown.Item>
              <NavDropdown
                className="ps-2"
                onClick={() => chooseSubRow("Müharibə veteranı yardımı")}
                style={
                  selectedSubRow === "Müharibə veteranı yardımı"
                    ? { backgroundColor: "#1E90FF", color: "white" }
                    : {}
                }
                title={"Müharibə veteranı yardımı"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item>Verilmir</NavDropdown.Item>
                <NavDropdown.Item>1 qat</NavDropdown.Item>
                <NavDropdown.Item>2 qat</NavDropdown.Item>
                <NavDropdown.Item>3 qat</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                className="ps-2"
                onClick={() => chooseSubRow("Kirayə kompens. bu ay")}
                style={
                  selectedSubRow === "Kirayə kompens. bu ay"
                    ? { backgroundColor: "#1E90FF", color: "white" }
                    : {}
                }
                title={"Kirayə kompens. bu ay"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item onClick={() => addKirayeQat(0)}>
                  Verilmir
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => addKirayeQat(1)}>
                  1 qat
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => addKirayeQat(2)}>
                  2 qat
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => addKirayeQat(3)}>
                  3 qat
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                onClick={() => chooseSubRow("Ərzaq kompens. bu ay")}
                className="ps-2"
                style={
                  selectedSubRow === "Ərzaq kompens. bu ay"
                    ? { backgroundColor: "#1E90FF", color: "white" }
                    : {}
                }
                title={"Ərzaq kompens. bu ay"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item onClick={() => addFoodQat(0)}>
                  Verilmir
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => addFoodQat(1)}>
                  1 qat
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => addFoodQat(2)}>
                  2 qat
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => addFoodQat(3)}>
                  3 qat
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                onClick={() => chooseSubRow("BPM bu ay hamsına")}
                className="ps-2"
                style={
                  selectedSubRow === "BPM bu ay hamsına"
                    ? { backgroundColor: "#1E90FF", color: "white" }
                    : {}
                }
                title={"BPM bu ay hamsına"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Verilmir</NavDropdown.Item>
                <NavDropdown.Item href="#">1 qat</NavDropdown.Item>
                <NavDropdown.Item href="#">2 qat</NavDropdown.Item>
                <NavDropdown.Item href="#">3 qat</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item
                href="#"
                onClick={async () => await EmployeeService.updateNextMonth()}
              >
                Bu ayın cədvəlini gələn aya köçür
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => window.location.reload()}>
                Vakant vəzifələri yenilə
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Yoxlamalar</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              onClick={() => chooseRow("Cədvəllər")}
              style={
                selectedRow === "Cədvəllər"
                  ? { backgroundColor: "#1E90FF", color: "white" }
                  : {}
              }
              title={"Cədvəllər"}
              id="basic-nav-dropdown"
            >
              {FILTER_TABLE.map((item, index) => (
                <NavDropdown key={item.id} title={item.name} drop="end">
                  <NavDropdown.Item href={`/table?filter=${item.slug}`}>
                    Reestr
                  </NavDropdown.Item>
                  <NavDropdown.Item href={`/table?filter=${item.slug}`}>
                    Paylanma cədvəli
                  </NavDropdown.Item>
                </NavDropdown>
              ))}
            </NavDropdown>

            <NavDropdown
              onClick={() => chooseRow("Hesabatlar")}
              style={
                selectedRow === "Hesabatlar"
                  ? { backgroundColor: "#1E90FF", color: "white" }
                  : {}
              }
              title={"Hesabatlar"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#">Icmal cədvəli</NavDropdown.Item>
              <NavDropdown.Item href="#">Statistik məlumatlar</NavDropdown.Item>
              <NavDropdown.Item href="#">6.MX saylı forma</NavDropdown.Item>
              <NavDropdown.Item href={`/table?filter=maddiyardimalmayanlar`}>
                Maddi yardım almayanlar
              </NavDropdown.Item>
              <NavDropdown.Item href="/table?filter=mezuniyyetalmayanlar">
                Məzuniyyət pulu almayanlar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar expand="lg" className="justify-content-end h-100 mx-2">
          <DarkModeToggler />
          <Navbar.Text onClick={() => logout()}>
            <a type="button" className="text-decoration-none ">
              Çıxış
            </a>
          </Navbar.Text>
        </Navbar>
      </Navbar>
    </>
  );
}

export default Layout;