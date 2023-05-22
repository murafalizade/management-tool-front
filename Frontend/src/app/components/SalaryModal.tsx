import React, { useEffect, useState } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
import Organizations from "./Organizations";
import PositionSalary from "./PositionSalary";
import Departments from "./Departments";
import { useDispatch, useSelector } from "react-redux";
import { changeModalInfo } from "../redux/showModalSlice";
import { RootState } from "../redux/store";

type Props = {
  show: boolean;
  tab: string;
};

function SalaryModal(props: Props) {

  function handleTabSelect(key: any) {
    setActiveTab(key);
  }

  const state = useSelector((state: RootState) => state.showModal);
  const [activeTab, setActiveTab] = useState(state?.modalInfo.tab);
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveTab(state?.modalInfo.tab);
  }, [state?.modalInfo.tab]);

  return (
    <Modal
      size="xl"
      show={state?.modalInfo.show}
      onHide={() =>
        dispatch(
          changeModalInfo({
            show: false,
            tab: "",
          })
        )
      }
    >
      <Modal.Header closeButton>
        <Nav
          variant="tabs"
          defaultActiveKey={activeTab}
          onSelect={handleTabSelect}
        >
          <Nav.Item>
            <Nav.Link href="#idarələr" eventKey="idarələr">
              İdarələr
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Bölmə_və_Şöbələr" eventKey="Bölmə_və_Şöbələr">
              Bölmə və Şöbələr
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Vəzifə_maaşları" eventKey="Vəzifə_maaşları">
              Vəzifə maaşları
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Modal.Header>
      <Modal.Body>
        <Tab.Pane
          eventKey="idarələr"
          className={activeTab === "idarələr" ? "show active" : ""}
        >
          <Organizations />
        </Tab.Pane>
        <Tab.Pane
          eventKey="Bölmə_və_Şöbələr"
          className={
            activeTab === "Bölmə_və_Şöbələr" ? "show active" : ""
          }
        >
          <Departments />
        </Tab.Pane>
        <Tab.Pane
          eventKey="Vəzifə_maaşları"
          className={
            activeTab === "Vəzifə_maaşları" ? "show active" : ""
          }
        >
          <PositionSalary />
        </Tab.Pane>
      </Modal.Body>
    </Modal>
  );
}

export default SalaryModal;
