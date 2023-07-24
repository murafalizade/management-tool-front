import React, { useEffect, useState } from "react";
import "../styles/modal.scss";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { hideModal } from "../redux/showModalSlice";
import EmployeeService from "../api/employeeService";
import months from "../constants/months";

const CalculatingModal = () => {
  const state = useSelector((state: RootState) => state.showModal);
  const dispatch = useDispatch();

  const [info, setInfo] = useState<any>({
    takenByHand: false,
    rankSalaryByHand: false,
    totalDiscount: 0,
    positionSalaryByHand: false,
    tax: 0,
    dsmf: 0,
    additionalServiceByHand: false,
    skillDegreePercent: 0,
    representationPercent: 0,
    harmfulPercent: 0,
    securityPercent: 0,
    alimentPercent: 0,
    languageSkillPercent: 0,
    languageSkillByHand: false,
    discoveryPercent: 0,
    discoveryByHand: false,
  });

  // Xidmet illeri
  const [serviceYears, setServiceYears] = useState<any>(0);
  const [serviceMonths, setServiceMonths] = useState<any>(0);
  const [serviceDays, setServiceDays] = useState<any>(0);

  const [totalGiven, setTotalGiven] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [totalTaken, setTotalTaken] = useState<number>(0);
  const [totalDSMF, setTotalDSMF] = useState<number>(0);

  // Calculate total discount
  const handleCheckboxChange = (checkboxIndex: string, isChecked: boolean) => {
    if (isChecked) {
      setTotalDiscount((prevTotal) => prevTotal + info[checkboxIndex]);
    } else {
      setTotalDiscount((prevTotal) => prevTotal - info[checkboxIndex]);
    }
  };

  const handleCheckbox = (e: any) => {
    if (e.target.id) {
      handleCheckboxChange(`${e.target.id}`, e.target.checked);
    }
    setInfo({ ...info, [e.target.name]: e.target.checked });
  };

  const handleInput = (e: any) => {
    setInfo({ ...info, [e.target.name]: parseFloat(e.target.value) });
  };

  const handlePercentage = (e: any) => {
    setInfo({
      ...info,
      [e.target.name]: (parseInt(e.target.value) * info.positionSalary) / 100,
    });
  };

  const getRecord = async () => {
    if (state.show === 0) return;
    const record = await EmployeeService.getEmployeeSalaryRecordById(
      state.show
    );
    setInfo({ ...info, ...record });
    setTotalDiscount(parseInt(record?.totalDiscount));
  };

  useEffect(() => {
    getRecord();
  }, [state.show]);

  useEffect(() => {
    setTotalGiven(
      info.meharetlilik +
        info.temsilcilik +
        info.zererlilik +
        info.rankSalary +
        info.positionSalary +
        info.mexfilik +
        info.xariciDil +
        info.kesfiyyat +
        info.elmiDerece +
        info.kibertehlukesizlik +
        info.fexriAd +
        info.extraMoney +
        info.extraMoney2
    );

    setTotalTaken(
      info.aliment +
        info.extra211100 +
        info.kesirler +
        info.tax +
        info.dsmf +
        info.healthInsurance
    );
  }, [info]);

  useEffect(() => {
    // Assuming you have the startDate in the form of a Date object
    const startDate = new Date(info?.employeeStartDate); // Example startDate
    // Get the first day of the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Calculate the difference in milliseconds
    const differenceInMilliseconds =
      startDate.getTime() - firstDayOfMonth.getTime();

    // Calculate the difference in years, months, and remaining days
    let diffYears = startDate.getFullYear() - firstDayOfMonth.getFullYear();
    let diffMonths = startDate.getMonth() - firstDayOfMonth.getMonth();
    let diffDays = startDate.getDate() - firstDayOfMonth.getDate();

    // Adjust the difference if diffDays is negative
    if (diffDays < 0) {
      const daysInLastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      diffDays += daysInLastMonth;
      diffMonths--;
    }

    setServiceYears(Math.abs(diffYears));
    setServiceMonths(Math.abs(diffMonths));
    setServiceDays(Math.abs(diffDays));
  }, [info?.employeeStartDate]);

  // update record
  const updateRecord = async () => {
    setInfo({ ...info, totalGiven, totalDiscount, totalTaken });
    await EmployeeService.updateEmployeeSalaryRecord(info);
    window.location.reload();
  };

  return (
    <Modal
      size="xl"
      show={state.show !== 0}
      onHide={() => dispatch(hideModal())}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">
          {info?.recordDateYear} il {months[info.recordDateMonth - 1]?.name}
        </Modal.Title>
        <Modal.Title className="fs-6">{info.fullName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="section pt-4">
          <ul>
            <li className="list-group-item">
              İdarə: {info.employeePositionDepartmentAdminstrationName}
            </li>
            <li className="list-group-item">
              Vəzifə: {info.employeePositionName}
            </li>
          </ul>
        </div>

        <div className="d-flex section">
          <label>H/rütbə</label>
          <input
            type="text"
            disabled
            value={info.employeeRankName}
            className="form-control"
          />

          <label>Bu ayn 1-nə olan Xİ (il,ay,gün)</label>
          <input
            type="text"
            disabled
            value={serviceYears}
            className="form-control date-input"
          />
          <input
            type="text"
            disabled
            value={serviceMonths}
            className="form-control date-input"
          />
          <input
            type="text"
            disabled
            className="form-control date-input"
            value={serviceDays}
          />
          <label>Hesab №</label>
          <input
            type="text"
            value={info?.accountNumber}
            onChange={(e: any) =>
              setInfo({ ...info, accountNumber: e.target.value })
            }
            max={16}
            min={16}
            name="accountNumber"
            className="form-control long-input w-25"
          />
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
                    type="checkbox"
                  />
                  <label className="form-check-label normal-label">
                    əl ilə
                  </label>
                  <input
                    name="rankSalary"
                    disabled={!info.rankSalaryByHand}
                    onChange={handleInput}
                    value={
                      info.rankSalaryByHand
                        ? info.rankSalary
                        : info.employeeRankSalary
                    }
                    type="number"
                    className="form-control"
                  />
                </div>

                <div className="d-flex my-1">
                  <label>Vəzifə maaşı</label>
                  <input
                    name="positionSalaryByHand"
                    checked={info.positionSalaryByHand}
                    onChange={handleCheckbox}
                    type="checkbox"
                  />
                  <label className="form-check-label normal-label">
                    əl ilə
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    disabled={!info.positionSalaryByHand}
                    name="positionSalary"
                    value={info.positionSalary}
                    onChange={handleInput}
                  />
                </div>

                <div className="d-flex justify-content-between my-1">
                  <label>Xidmət illəri</label>
                  <label>{info?.xiPercent} %</label>
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
                  <input type="number" className="form-control date-input" />
                  <label className="normal-label">qat</label>
                  <input type="number" className="form-control date-input" />
                  <label className="normal-label">gün</label>
                  <input type="number" className="form-control date-input" />
                  <label className="normal-label">ay</label>
                  <input type="number" className="form-control w-100" />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Məharət dərəcəsi</label>
                  <input
                    type="number"
                    className="form-control date-input"
                    min={0}
                    onChange={handlePercentage}
                    name="meharetlilik"
                    max={100}
                  />
                  %<label className="normal-label">{info.meharetlilik}</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Təmsilçilik</label>
                  <input
                    type="number"
                    className="form-control date-input"
                    onChange={handlePercentage}
                    name="temsilcilik"
                    min={0}
                    max={100}
                  />
                  %<label className="normal-label">{info.temsilcilik}</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Zərərlik</label>
                  <input
                    type="number"
                    className="form-control date-input"
                    min={0}
                    onChange={handlePercentage}
                    name="zererlilik"
                    max={100}
                  />
                  %<label className="normal-label">{info.zererlilik}</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Məxfilik</label>
                  <input
                    type="number"
                    className="form-control date-input"
                    min={0}
                    onChange={handlePercentage}
                    name="mexfilik"
                    max={100}
                  />
                  %<label className="normal-label">{info.mexfilik}</label>
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Xarici dil</label>
                  <input
                    type="checkbox"
                    name="languageSkillByHand"
                    checked={info.languageSkillByHand}
                    onChange={handleCheckbox}
                  />
                  <label className="normal-label">əl ilə</label>
                  <input
                    type="number"
                    className="form-control date-input"
                    min={0}
                    name="xariciDil"
                    onChange={handlePercentage}
                    max={100}
                  />
                  %
                  <input
                    type="number"
                    disabled={!info.languageSkillByHand}
                    className="form-control w-50"
                    onChange={handleInput}
                    name="xariciDil"
                    value={info.xariciDil}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Kəş.mük.</label>
                  <input
                    type="checkbox"
                    name="discoveryByHand"
                    checked={info.discoveryByHand}
                    onChange={handleCheckbox}
                  />
                  <label className="normal-label">əl ilə</label>
                  <input
                    type="number"
                    className="form-control date-input"
                    min={0}
                    name="kesfiyyat"
                    onChange={handlePercentage}
                    max={100}
                  />
                  %
                  <input
                    type="number"
                    className="form-control w-75"
                    disabled={!info.discoveryByHand}
                    onChange={handleInput}
                    name="kesfiyyat"
                    value={info.kesfiyyat}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Elmi dərəc. görə</label>
                  <input
                    type="number"
                    name="elmiDerece"
                    onChange={handleInput}
                    className="form-control w-100"
                    value={info.elmiDerece}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Kibertəhlük. əlav.</label>
                  <input
                    type="number"
                    className="form-control w-100"
                    onChange={handleInput}
                    name="kibertehlukesizlik"
                    value={info.kibertehlukesizlik}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Fəxri ada görə</label>
                  <input
                    type="number"
                    className="form-control w-100"
                    onChange={handleInput}
                    name="fexriAd"
                    value={info.fexriAd}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Əlavə ödən.(gvt)</label>
                  <input
                    type="number"
                    className="form-control w-100"
                    onChange={handleInput}
                    name="extraMoney"
                    value={info.extraMoney}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Əlavə ödəniş</label>
                  <input
                    type="number"
                    onChange={handleInput}
                    name="extraMoney2"
                    className="form-control w-100"
                    value={info.extraMoney2}
                  />
                </div>

                <div className="d-flex  align-items-center justify-content-between my-1">
                  <label>Cəmi hesablanıb:</label>
                  <b>{totalGiven}</b>
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
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          name="isVeteran"
                          id="discountVeteran"
                          checked={info.isVeteran}
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Çernobil</label>
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          name="isChernobil"
                          id="discountChernobil"
                          checked={info.isChernobil}
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Qaçqın</label>
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          name="isQachqin"
                          id="discountQachqin"
                          checked={info.isQachqin}
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Himayədar</label>
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          name="isOwner"
                          id="discountOwner"
                          checked={info.isOwner}
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Əlil</label>
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          id="discountDisability"
                          name="isDisability"
                          checked={info?.isDisability}
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex justify-content-between my-1">
                        <label className="min-width">Şəhid ailəsi</label>
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          name="isMatry"
                          id="discountMartyr"
                          checked={info?.isMatry}
                        />
                      </div>
                    </Col>

                    <Col md={12}>
                      <div className="d-flex justify-content-center my-1">
                        <label htmlFor="">Kod</label>
                        <input type="text" className="form-control w-100" />
                      </div>
                      <span className="text-center">
                        Güzəştli məbləğ: {totalDiscount}
                      </span>
                    </Col>
                  </Row>
                </div>

                <div className="section">
                  <h6>Tutulur</h6>
                  <div className="d-flex justify-content-end">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      name="takenByHand"
                      value={info?.takenByHand}
                    />
                    <label className="normal-label">əl ilə</label>
                  </div>
                  <div className="d-flex justify-content-between my-1">
                    <label>Gəlir vergisi</label>
                    <input
                      value={info?.tax}
                      name="tax"
                      disabled={!info.takenByHand}
                      onChange={handleInput}
                      type="number"
                      min="0"
                      className="form-control w-50"
                    />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>DSMF</label>
                    <input
                      type="number"
                      min="0"
                      value={info.dsmf}
                      name="dsmf"
                      onChange={handleInput}
                      disabled={!info.takenByHand}
                      className="form-control w-50"
                    />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Tibbi sığorta</label>
                    <input
                      name="healthInsurance"
                      value={info?.healthInsurance}
                      onChange={handleInput}
                      disabled={!info.takenByHand}
                      type="number"
                      min="0"
                      className="form-control w-50"
                    />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Kəsirlər</label>
                    <input
                      type="number"
                      min="0"
                      name="kesirler"
                      disabled={!info.takenByHand}
                      value={info?.kesirler}
                      onChange={handleInput}
                      className="form-control w-50"
                    />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Aliment</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="alimentPercent"
                      disabled={!info.takenByHand}
                      value={info?.alimentPercent}
                      onChange={handleInput}
                      className="form-control w-50"
                    />
                    %
                    <input
                      type="number"
                      min="0"
                      value={info?.aliment}
                      disabled={!info.takenByHand}
                      onChange={handleInput}
                      name="aliment"
                      className="form-control w-50"
                    />
                  </div>

                  <div className="d-flex justify-content-between my-1">
                    <label>Artıq ödənilən</label>
                    <input
                      onChange={handleInput}
                      value={info?.extra211100}
                      type="number"
                      min="0"
                      disabled={!info.takenByHand}
                      name="Extra211100"
                      className="form-control w-50"
                    />
                  </div>

                  <div className="d-flex  align-items-center justify-content-between my-1">
                    <label>Cəmi tutulur:</label>
                    <b>{totalTaken}</b>
                  </div>
                </div>

                <div className="section">
                  <div className="d-flex  align-items-center justify-content-between my-1">
                    <label>Veriləcək məbləğ:</label>
                    <b>{totalGiven - totalTaken + totalDiscount}</b>
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
                      <input
                        value={info?.food}
                        name="food"
                        onChange={handleInput}
                        type="text"
                        className="form-control"
                      />
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
                          <input
                            value={info?.sehra}
                            onChange={handleInput}
                            name="sehra"
                            type="text"
                            className="form-control w-75"
                          />
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
                    <b>{totalDSMF}</b>
                  </div>

                  <div className="section w-75 d-flex justify-content-between ms-2">
                    <label>Cəmi verilir:</label>
                    <b>{totalGiven - totalTaken + totalDiscount - totalDSMF}</b>
                  </div>
                </div>
              </div>
            </Col>
            <div className="d-flex">
              <input
                value={info.isNotGiven}
                name="isNotGiven"
                onChange={handleCheckbox}
                type="checkbox"
              />
              <label className="mx-2">Bu ay verilmir</label>
              <input type="checkbox" />
              <label className="mx-2">Paylanma cədvəlinə daxil etmə</label>
              <input type="checkbox" />
              <label className="mx-2">Nəzarət</label>
            </div>

            <hr className="my-2" />
            <div className="d-flex section border-0">
              <label>Qeyd</label>
              <input
                value={info.comment}
                name="comment"
                onChange={(e: any) =>
                  setInfo({ ...info, comment: e.target.value })
                }
                type="text"
                className="form-control w-25"
              />
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
        <Button onClick={() => updateRecord()} variant="primary">
          Yadda Saxla
        </Button>
        <Button variant="light">Hesabla</Button>
        <Button variant="secondary">Bagla</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalculatingModal;
