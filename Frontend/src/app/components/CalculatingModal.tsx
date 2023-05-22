import React, { useEffect, useState } from "react";
import "../styles/modal.scss";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { hideModal } from "../redux/showModalSlice";

const CalculatingModal = () => {
  const state = useSelector((state: RootState) => state.showModal);
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    rankSalary: "12,23",
    rankSalaryByHand: false,
    positionSalary: "234,23",
    positionSalaryByHand: false,
    serviceYears: "21",
    serviceYearPercent: "30",
    additionalService: false,
    additionalServiceByHand: false,
    additionalServiceMulti: "",
    additionalServiceMonths: "",
    additionalServiceDays: "",
    skillDegree: "",
    skillDegreePercent: "",
    representation: "",
    representationPercent: "",
    harmful: "",
    harmfulPercent: "",
    security: "",
    securityPercent: "",
    languageSkill: "",
    languageSkillPercent: "",
    languageSkillByHand: false,
    discovery: "",
    discoveryPercent: "",
    discoveryByHand: false,
    scientific: "",
    award: "",
    extraGvt: "",
    extra: "",
    total: "",
    totalPercent: "",
    totalByHand: false,
    totalByHandPercent: "",
    totalByHandAmount: "",
  });

  const handleCheckbox = (e: any) => {
    setInfo({ ...info, [e.target.name]: e.target.checked });
  };

  const handleInput = (e: any) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <Modal size="xl" show={state.show} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">2023 il May</Modal.Title>
        <Modal.Title className="fs-6">Ismayilov Qurban Adil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="section pt-4">
          <ul>
            <li className="list-group-item">
              İdarə: Şəxsi heyət Baş idarəsi(Q1)
            </li>
            <li className="list-group-item">Ştat üzrə: KATİBLİK</li>
            <li className="list-group-item">Vəzifə: Katibliyin rəsi</li>
            <li className="list-group-item">İcra edir: KATİBLİK</li>
            <li className="list-group-item">Vezife: Katibliyin rəisi</li>
          </ul>
        </div>

        <div className="d-flex section">
          <label>H/rütbə</label>
          <input type="text" className="form-control" />

          <label>Bu ayn 1-nə olan Xİ (il,ay,gün)</label>
          <input type="text" className="form-control date-input" />
          <input type="text" className="form-control date-input" />
          <input type="text" className="form-control date-input" />
          <label>Hesab №</label>
          <input type="text" className="form-control long-input w-25" />
        </div>

        <Container fluid>
          <Row>
            <Col md={3}>
              <div className="section">
                <h6>Hesablanıb</h6>
                <div className="d-flex my-1">
                  <label>H/rütbə maaşı</label>
                  <input
                    name="rankSalaryByHand"
                    checked={info.rankSalaryByHand}
                    onChange={handleCheckbox}
                    id="exampleCheck1"
                    type="checkbox"
                  />
                  <label
                    className="form-check-label normal-label"
                    htmlFor="exampleCheck1"
                  >
                    əl ilə
                  </label>
                  <input
                    name="rankSalary"
                    disabled={!info.rankSalaryByHand}
                    onChange={handleInput}
                    value={info.rankSalary}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="d-flex my-1">
                  <label>Vəzifə maaşı</label>
                  <input
                    id="exampleCheck1"
                    name="positionSalaryByHand"
                    checked={info.positionSalaryByHand}
                    onChange={handleCheckbox}
                    type="checkbox"
                  />
                  <label
                    className="form-check-label normal-label"
                    htmlFor="exampleCheck1"
                  >
                    əl ilə
                  </label>
                  <input type="text" className="form-control" disabled={!info.positionSalaryByHand}
                  name="positionSalary" value={info.positionSalary} onChange={handleInput} />
                </div>

                <div className="d-flex justify-content-between my-1">
                  <label>Xidmət illəri</label>
                  <label>{info.serviceYearPercent} %</label>
                  <label className="normal-label">{info.serviceYears}</label>
                </div>

                <div className="d-flex justify-content-between my-1">
                  <label>Əlavə qat</label>
                  <input type="checkbox" />
                  <label className="normal-label">daimi</label>
                  <input type="checkbox" />
                  <label className="normal-label">əl ilə</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <input type="text" className="form-control date-input" />
                  <label className="normal-label">qat</label>
                  <input type="text" className="form-control date-input" />
                  <label className="normal-label">gün</label>
                  <input type="text" className="form-control date-input" />
                  <label className="normal-label">ay</label>
                  <input type="text" className="form-control w-100" />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Məharət dərəcəsi</label>
                  <select className="form-control date-input">
                    {Array.from(Array(100).keys()).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  %<label className="normal-label">507,60</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Təmsilçilik</label>
                  <select className="form-control date-input">
                    {Array.from(Array(100).keys()).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  %<label className="normal-label">507,60</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Zərərlik</label>
                  <select className="form-control date-input">
                    {Array.from(Array(100).keys()).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  %<label className="normal-label">507,60</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Məxfilik</label>
                  <select className="form-control date-input">
                    {Array.from(Array(100).keys()).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  %<label className="normal-label">507,60</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Xarici dil</label>
                  <input type="checkbox" />
                  <label className="normal-label">əl ilə</label>
                  <select className="form-control date-input">
                    {Array.from(Array(100).keys()).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  %
                  <input
                    type="text"
                    className="form-control w-50"
                    value={"453,21"}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Kəş.mük.</label>
                  <input type="checkbox" />
                  <label className="normal-label">əl ilə</label>
                  <select className="form-control date-input">
                    {Array.from(Array(100).keys()).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  %
                  <input
                    type="text"
                    className="form-control w-75"
                    value={"453,21"}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Elmi dərəc. görə</label>
                  <input
                    type="text"
                    className="form-control w-100"
                    value={"453,21"}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Fəxri ada görə</label>
                  <input
                    type="text"
                    className="form-control w-100"
                    value={"453,21"}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Əlavə ödən.(gvt)</label>
                  <input
                    type="text"
                    className="form-control w-100"
                    value={"453,21"}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Əlavə ödəniş</label>
                  <input
                    type="text"
                    className="form-control w-100"
                    value={"453,21"}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Cəmi hesablanıb:</label>
                  <b>1233.23</b>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <div className="section">
                  <h6>Güzəştlər</h6>
                  <Row>
                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">MV</label>
                        <input type="checkbox" />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Çernobil</label>
                        <input type="checkbox" />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Qaçqın</label>
                        <input type="checkbox" />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Himayədar</label>
                        <input type="checkbox" />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Əlil</label>
                        <input type="checkbox" />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Şəhid ailəsi</label>
                        <input type="checkbox" />
                      </div>
                    </Col>

                    <Col md={12}>
                      <div className="d-flex justify-content-center my-1">
                        <label htmlFor="">Kod</label>
                        <input type="text" className="form-control w-100" />
                      </div>
                      <span className="text-center">
                        Güzəştli məbləğ: 3241.123
                      </span>
                    </Col>
                  </Row>
                </div>

                <div className="section">
                  <h6>Tutulur</h6>
                  <div className="d-flex justify-content-end">
                    <input type="checkbox" />
                    <label className="normal-label">əl ilə</label>
                  </div>
                  <div className="d-flex justify-content-between my-1">
                    <label>Gəlir vergisi</label>
                    <input type="text" className="form-control w-50" />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>DSMF</label>
                    <input type="text" className="form-control w-50" />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Tibbi sığorta</label>
                    <input type="text" className="form-control w-50" />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Kəsirlər</label>
                    <input type="text" className="form-control w-50" />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Aliment</label>
                    <select className="form-control date-input">
                      {Array.from(Array(100).keys()).map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                    %
                    <input type="text" className="form-control w-50" />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Artıq ödənilən</label>
                    <input type="text" className="form-control w-50" />
                  </div>

                  <div className="d-flex  align-items-center justify-content-between my-1">
                    <label>Cəmi tutulur:</label>
                    <b>1233.23</b>
                  </div>
                </div>

                <div className="section">
                  <div className="d-flex  align-items-center justify-content-between my-1">
                    <label>Veriləcək məbləğ:</label>
                    <b>1233.23</b>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <div className="d-flex justify-content-between">
                  <div className="section">
                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>İş günleri</label>
                      <input type="text" className="form-control date-input" />
                      <label>Ay</label>
                      <select className="form-control date-input">
                        {Array.from(Array(12).keys()).map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="section">
                    <h6>Ərzaq paylanması</h6>
                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <input type="checkbox" />
                      <label>verilir</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="section">
                  <h6>Mənzil kirayəsi kompensasiya</h6>
                  <div className="d-flex  align-items-center justify-content-between my-1">
                    <label className="normal-label">Yaş. yeri</label>
                    <input type="text" className="form-control" />
                    <input type="text" className="form-control date-input" />
                    <label className="normal-label">nəfər</label>
                    <input type="text" className="form-control date-input" />
                    <label className="normal-label">Qat</label>
                    <input type="text" className="form-control date-input" />
                    <input type="checkbox" />
                    <label className="normal-label">əl ilə</label>
                  </div>
                </div>

                <div className="section">
                  <Row>
                    <Col md={8}>
                      <div
                        style={{ left: "70px" }}
                        className="d-flex position-relative"
                      >
                        <label className="mx-3">Hesablanıb</label>
                        <label className="mx-2">DSMF</label>
                        <label className="">Verilir</label>
                      </div>
                      <div className="d-flex justify-content-between">
                        <label>Maddi yardim</label>
                        <input type="text" className="form-control w-100" />
                        <input
                          type="text"
                          className="form-control border-0  w-100"
                        />
                        <input type="text" className="form-control w-100" />
                      </div>

                      <div className="d-flex my-2 justify-content-between">
                        <label>Məzuniyyət</label>
                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                      </div>

                      <div className="d-flex my-2 justify-content-between">
                        <label>Kəşf. məzun.</label>
                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                      </div>

                      <div className="d-flex my-2 justify-content-between">
                        <label className="normal-label me-4 d-flex">
                          BPM
                          <select className="form-control date-input">
                            {Array.from(Array(100).keys()).map((item) => (
                              <option key={item}>{item}</option>
                            ))}
                          </select>
                        </label>

                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                        {/* <input type="checkbox" />
                    <label className="mx-2 normal-label">əl</label> */}
                        {/* <label>Yol xərci</label> */}
                        {/* <input type="text" className="form-control w-100" /> */}
                      </div>

                      <div className="d-flex my-2 justify-content-between">
                        <label>Çıxış müavinatı</label>
                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                        <input type="text" className="form-control w-100" />
                      </div>
                    </Col>
                    <Col className="p-0 mt-3" md={4}>
                      <div>
                        <label className="d-flex my-2 min-width-30">
                          <label className="min-width-30"></label>
                          <span className="min-wdith-30">Ezamiyyet</span>
                          <input
                            type="text"
                            className="form-control w-75 d-block"
                          />
                        </label>
                        <label className="d-flex my-2">
                          <label className="min-width-30"></label>
                          <span className="min-width-30">Səhra pulu</span>
                          <input type="text" className="form-control w-75" />
                        </label>
                        <label className="d-flex my-2">
                          <label className="min-width-30"></label>
                          <span className="min-width-30">Kəşf. xəstə.</span>
                          <input type="text" className="form-control w-75" />
                        </label>
                        <label className="d-flex my-2">
                          <input type="checkbox" className="ms-1" />
                          <label className="min-width-20">əl ilə</label>
                          Yol. xərcə.
                          <input type="text" className="form-control w-75" />
                        </label>
                        <label className="d-flex my-2">
                          <label className="min-width-30"></label>
                          <span className="min-width-30">Yük pulu</span>
                          <input type="text" className="form-control w-75" />
                        </label>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="section w-75 d-flex justify-content-between">
                    <label>DSMF Cəmi:</label>
                    <b>1233.23</b>
                  </div>

                  <div className="section w-75 d-flex justify-content-between ms-2">
                    <label>Cəmi verilir:</label>
                    <b>1233.23</b>
                  </div>
                </div>
              </div>
            </Col>
            <div className="d-flex">
              <input type="checkbox" />
              <label className="mx-2">Bu ay verilmir</label>
              <input type="checkbox" />
              <label className="mx-2">Paylanma cədvəlinə daxil etmə</label>
              <input type="checkbox" />
              <label className="mx-2">Nəzarət</label>
            </div>

            <hr className="my-2" />
            <div className="d-flex section border-0">
              <label>Qeyd</label>
              <input type="text" className="form-control w-25" />
            </div>
            <div className="d-flex">
              <label>Rəng</label>
              <input type="color" className="form-control" />
              <Button className="mx-2">Çıxarış</Button>
              <Button>Əlavə Məlumat</Button>
            </div>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Yadda Saxla</Button>
        <Button variant="light">Hesabla</Button>
        <Button variant="secondary">Bagla</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalculatingModal;
