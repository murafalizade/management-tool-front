import React, { useEffect, useState } from "react";
import { Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "../styles/navbar.scss";
import DarkModeToggler from "./DarkModeToggler";
import SalaryModal from "./SalaryModal";
import { useDispatch, useSelector } from "react-redux";
import { changeModalInfo, showModalCreate } from "../redux/showModalSlice";
import Cookie from "../utility/Cookie";
import { RootState } from "../redux/store";
import CreateEmployeeModal from "./CreateEmployeeModal";

function Layout() {
  const [showFileDropdown, setShowFileDropdown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
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

  const openModal = (tab: string) => {
    setActiveTab(tab);
    setShowModal(true);
  };

  const logout = () => {
    Cookie.eraseCookie(process.env.SECRET_TOKEN_KEY as string);
    window.location.href = "/login";
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
      <CreateEmployeeModal  />
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
                  ? { backgroundColor: "#1E90FF",color:"white" }
                  : {}
              }
              onToggle={toggleOpenDropdown}
              show={showFileDropdown}
            >
              <NavDropdown.Item href="/">HQ siyahı</NavDropdown.Item>
              <NavDropdown.Item
                href={
                  state.selectedRow?.name
                    ? `/detail/${state.selectedRow?.name}`
                    : "/"
                }
              >
                HQ Şəxsi hesab
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>dispatch(showModalCreate())}>
                HQ bu aydan əlavə et
              </NavDropdown.Item>
              <NavDropdown.Item href="/create">
                HQ vəzifəni dəyiş
              </NavDropdown.Item>
              <NavDropdown.Item href="/create">
                HQ bu aydan cədvəldən sil
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={"Məlumatlar"}
              onClick={() => chooseRow("Məlumatlar")}
              style={
                selectedRow === "Məlumatlar" ? { backgroundColor: "#1E90FF",color:"white" } : {}
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
              <NavDropdown.Item
                onClick={() =>
                  dispatch(
                    changeModalInfo({
                      tab: "Bölmə_və_Şöbələr",
                      show: true,
                    })
                  )
                }
                href="#Bölmə_və_Şöbələr"
              >
                Hərbi rütbə maaşları
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() =>
                  dispatch(
                    changeModalInfo({
                      tab: "Vəzifə_maaşları",
                      show: true,
                    })
                  )
                }
                href="#Vəzifə_maaşları"
              >
                Digər faiz və kompen.
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              onClick={() => chooseRow("Əməliyyatlar")}
              style={
                selectedRow === "Əməliyyatlar" ? { backgroundColor: "#1E90FF",color:"white" } : {}
              }
              title={"Əməliyyatlar"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => window.location.reload()}>
                Maaşları yenidən hesabla
              </NavDropdown.Item>
              <NavDropdown
                onClick={() => chooseSubRow("Kirayə kompens. bu ay")}
                style={
                  selectedSubRow === "Kirayə kompens. bu ay" ? { backgroundColor: "#1E90FF",color:"white" } : {}
                }
                title={"Kirayə kompens. bu ay"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Verilmir</NavDropdown.Item>
                <NavDropdown.Item href="#">1 qat</NavDropdown.Item>
                <NavDropdown.Item href="#">2 qat</NavDropdown.Item>
                <NavDropdown.Item href="#">3 qat</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                  onClick={() => chooseSubRow("Ərzad kompens. bu ay")}
                  style={
                    selectedSubRow === "Ərzad kompens. bu ay" ? { backgroundColor: "#1E90FF",color:"white" } : {}
                  }
                title={"Ərzad kompens. bu ay"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Verilmir</NavDropdown.Item>
                <NavDropdown.Item href="#">1 qat</NavDropdown.Item>
                <NavDropdown.Item href="#">2 qat</NavDropdown.Item>
                <NavDropdown.Item href="#">3 qat</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
               onClick={() => chooseSubRow("BPM bu ay hamsına")}
               style={
                 selectedSubRow === "BPM bu ay hamsına" ? { backgroundColor: "#1E90FF",color:"white" } : {}
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
              <NavDropdown.Item href="#">
                Bu ayın cədvəlini gələn aya köçür
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => window.location.reload()}>
                Vakant vəzifələri yenilə
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Yoxlamalar</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown onClick={()=>chooseRow("Cədvəllər")}
              style={selectedRow==="Cədvəllər"?{backgroundColor:"#1E90FF",color:"white"}:{}}  title={"Cədvəllər"} id="basic-nav-dropdown">
              <NavDropdown title={"Əsas"} id="basic-nav-dropdown" drop="end">
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={"Ərzaq"} id="basic-nav-dropdown" drop="end">
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={"Kirayə"} id="basic-nav-dropdown" drop="end">
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Məzuniyyət"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Ezamiyyət"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Səhra pulu"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Maddi yardım"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Kəşf. Məzun."}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Kəşf. Xəstə."}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Kəşf. Mükafat."}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Yol xərci"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={"Yük xərci"}
                id="basic-nav-dropdown"
                drop="end"
              >
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={"Təxris"} id="basic-nav-dropdown" drop="end">
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={"BPM"} id="basic-nav-dropdown" drop="end">
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={"2 qat"} id="basic-nav-dropdown" drop="end">
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={"Aliment"} id="basic-nav-dropdown" drop="end">
                <NavDropdown.Item href="#">Reestr</NavDropdown.Item>
                <NavDropdown.Item href="#">Paylanma cədvəli</NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>

            <NavDropdown  onClick={()=>chooseRow("Hesabatlar")}
              style={selectedRow==="Hesabatlar"?{backgroundColor:"#1E90FF",color:"white"}:{}} title={"Hesabatlar"} id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Icmal cədvəli</NavDropdown.Item>
              <NavDropdown.Item href="#">Statistik məlumatlar</NavDropdown.Item>
              <NavDropdown.Item href="#">6.MX saylı forma</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Maddi yardım almayanlar
              </NavDropdown.Item>
              <NavDropdown.Item href="#">
                Məzuniyyət pulu almayanlar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar expand="lg" className="justify-content-end mx-2">
          <DarkModeToggler />
          <Navbar.Text onClick={() => logout()}>
            <a href="#logout" className="text-decoration-none ">
              Çıxış
            </a>
          </Navbar.Text>
        </Navbar>
      </Navbar>
    </>
  );
}

export default Layout;
