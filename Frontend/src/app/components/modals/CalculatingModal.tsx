import React, { useEffect, useState } from "react";
import "../../styles/modal.scss";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { hideModal } from "../../redux/showModalSlice";
import EmployeeService from "../../api/employeeService";
import { MONTHS } from "../../constants/months";
import moment from "moment";
import Toastify from "../../utility/Toastify";
import OperationService from "../../api/operationService";

const CalculatingModal = () => {
  const state = useSelector((state: RootState) => state.showModal);
  const dispatch = useDispatch();

  const [info, setInfo] = useState<any>({
    takenByHand: false,
    rankSalaryByHand: false,
    positionSalaryByHand: false,
    additionalServiceByHand: false,
    alimentPercent: 0,
    languageSkillByHand: false,
    discoveryByHand: false,
    qatByHand: false,
    rentByHand: false,
  });

  const [rents, setRents] = useState<any[]>([]);

  // Xidmet illeri
  const [serviceYears, setServiceYears] = useState<any>(0);
  const [serviceMonths, setServiceMonths] = useState<any>(0);
  const [serviceDays, setServiceDays] = useState<any>(0);

  const [totalGiven, setTotalGiven] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [totalTaken, setTotalTaken] = useState<number>(0);
  const [totalDSMF, setTotalDSMF] = useState<number>(0);
  const [totalAddition, setTotalAddition] = useState<number>(0);

  const [rentPrice, setRentPrice] = useState<number>(0);
  const [ranks, setRanks] = useState<any[]>([]);

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
    const bne = `${e.target.name}Percent`;
    setInfo({
      ...info,
      [e.target.name]: (parseInt(e.target.value) * info.positionSalary) / 100,
      [bne]: parseInt(e.target.value),
    });
  };

  const handleSelect = (e: any) => {
    setInfo({ ...info, kirayeId: parseInt(e.target.value) });
    setRentPrice(rents.find((x) => x.id === parseInt(e.target.value))?.price);
  };

  const getRecord = async () => {
    if (state.show === 0) {
      // Set all state null or 0
      setInfo(null);
      setServiceYears(0);
      setServiceMonths(0);
      setServiceDays(0);
      setTotalGiven(0);
      setTotalDiscount(0);
      setTotalTaken(0);
      setTotalDSMF(0);
      setRentPrice(0);
      return;
    }
    const record = await EmployeeService.getEmployeeSalaryRecordById(
      state.show
    );
    const ranks = await OperationService.getRanks();
    setRanks(ranks);
    setInfo({
      ...info,
      ...record,
      permanentRankSalary: record.rankSalary,
      permanentPositionSalary: record.positionSalary,
    });
  };

  const getRent = async () => {
    const rent = await EmployeeService.getKiraye();
    setRents(rent);
    setRentPrice(rent.find((x: any) => x.id === info.kirayeId)?.price || 0);
  };

  useEffect(() => {
    if (state.show === 0) return;
    getRecord();
    getRent();
  }, [state.show]);

  const calculate = () => {
    const qat = info.qatByHand
      ? info.ptMoney
      : (info.rankSalary + info.positionSalary + info.xiMoney) * info.ptQat;

    const food = info.foodGiven
      ? info?.food == 0
        ? info.discountFood
        : info?.food
      : 0;

    const rankSalary = info.rankSalaryByHand
      ? info.rankSalary
      : info.permanentRankSalary;

    const positionSalary = info.positionSalaryByHand
      ? info.positionSalary
      : info.permanentPositionSalary;

    setInfo({
      ...info,
      meharetlilik: (info.meharetlilikPercent * positionSalary) / 100,
      temsilcilik: (info.temsilcilikPercent * positionSalary) / 100,
      zererlilik: (info.zererlilikPercent * positionSalary) / 100,
      mexfilik: (info.mexfilikPercent * positionSalary) / 100,
      xariciDil: (info.xariciDilPercent * positionSalary) / 100,
      kesfiyyat: (info.kesfiyyatPercent * positionSalary) / 100,
    });

    setTotalAddition(info.kirayePrice + food);

    setTotalGiven(
      info.meharetlilik +
        info.temsilcilik +
        info.zererlilik +
        rankSalary +
        positionSalary +
        info.mexfilik +
        info.xariciDil +
        info.kesfiyyat +
        info.elmiDerece +
        info.kibertehlukesizlik +
        info.fexriAd +
        info.extraMoney +
        info.extraMoney2 +
        info.xiMoney +
        qat
    );

    setTotalTaken(
      info.aliment +
        info.extra211100 +
        info.kesirler +
        info.tax +
        info.dsmf +
        info.healthInsurance
    );

    setTotalDSMF(
      (info.discountDsmf *
        (info.maddiYardim + info.mezuniyyet + info.kesfMezun + info.cixisMuv)) /
        100
    );
  };

  const toast = new Toastify();

  useEffect(() => {
    setInfo({
      ...info,
      kirayePrice:
        (rentPrice + info.familyCount * 0.5 * rentPrice) * (info.kirayeQat + 1),
    });
  }, [info.familyCount, info.kirayeQat, rentPrice]);

  // Calculate service years till 1st of current month
  useEffect(() => {
    const startDate = moment(info?.employeeStartDate);
    let endDate = moment(info?.recordDate);
    endDate.set("date", 1);
    const duration = moment.duration(endDate.diff(startDate));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    setServiceYears(years);
    setServiceMonths(months);
    setServiceDays(days);
  }, [info?.employeeStartDate]);

  // update record
  const updateRecord = async () => {
    await EmployeeService.updateEmployeeSalaryRecord(info);
    dispatch(hideModal());
    toast.success("Əməliyyat uğurla yerinə yetirildi", () =>
      window.location.reload()
    );
  };

  return (
    <>
      {state.show === 0 ? null : (
        <Modal
          size="xl"
          show={state.show !== 0}
          onHide={() => dispatch(hideModal())}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-6">
              {info?.recordDateYear} il {MONTHS[info.recordDateMonth - 1]?.name}
            </Modal.Title>
            <Modal.Title className="fs-6">{info.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="section pt-4">
              <ul>
                <li className="list-group-item d-flex align-items-center">
                  İdarə:{" "}
                  <select className="form-control w-25 ms-4">
                    <option value="1">1</option>
                  </select>
                </li>
                <li className="list-group-item mt-3 d-flex align-items-center">
                  Vəzifə:
                  <select className="form-control w-25 ms-3">
                    <option value="1">1</option>
                  </select>
                </li>
              </ul>
            </div>

            <div className="d-flex section">
              <label>H/rütbə</label>
              <select
                className="form-control w-25 h-25 p-0 ps-1 me-4 fs-7"
                onChange={(e: any) =>
                  setInfo({
                    ...info,
                    employeeRankId: parseInt(e.target.value),
                    permanentRankSalary: ranks.find(
                      (x) => x.id === parseInt(e.target.value)
                    ).salary,
                  })
                }
                value={info.employeeRankId}
              >
                {ranks.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
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
                <Col md={3} className="ps-0">
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
                          !info.rankSalaryByHand
                            ? info?.permanentRankSalary
                            : info.rankSalary
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
                        value={
                          !info.positionSalaryByHand
                            ? info?.permanentPositionSalary
                            : info.positionSalary
                        }
                        onChange={handleInput}
                      />
                    </div>

                    <div className="d-flex justify-content-between my-1">
                      <label>Xidmət illəri</label>
                      <label>{info?.xiPercent} %</label>
                      <label className="normal-label">{info.xiMoney}</label>
                    </div>

                    <div className="d-flex justify-content-between my-1">
                      <label>Əlavə qat</label>
                      <input
                        type="checkbox"
                        name="isEternalQat"
                        onChange={handleCheckbox}
                        checked={info.isEternalQat}
                        value={info.isEternalQat}
                      />
                      <label className="normal-label">daimi</label>
                      <input
                        type="checkbox"
                        name="qatByHand"
                        onChange={handleCheckbox}
                        checked={info.qatByHand}
                        value={info.qatByHand}
                      />
                      <label className="normal-label">əl ilə</label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <input
                        type="number"
                        name="ptQat"
                        value={info.ptQat}
                        onChange={handleInput}
                        className="form-control date-input"
                      />
                      <label className="normal-label">qat</label>
                      <input
                        disabled={info.isEternalQat}
                        type="number"
                        className="form-control date-input"
                      />
                      <label className="normal-label">gün</label>
                      <input
                        disabled={info.isEternalQat}
                        type="number"
                        className="form-control date-input"
                      />
                      <label className="normal-label">ay</label>
                      <input
                        type="number"
                        name="ptMoney"
                        disabled={!info.qatByHand}
                        onChange={handleInput}
                        className="form-control w-100"
                        value={
                          info.qatByHand
                            ? info.ptMoney
                            : (info.rankSalary +
                                info.positionSalary +
                                info.xiMoney) *
                              info.ptQat
                        }
                      />
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Məharət dərəcəsi</label>
                      {/* <input
                        type="number"
                        className="form-control date-input"
                        min={0}
                        onChange={handlePercentage}
                        value={info.meharetlilikPercent}
                        name="meharetlilik"
                        max={100}
                      /> */}
                      <select
                        name="meharetlilik"
                        onChange={handlePercentage}
                        // value={info.meharetlilik}
                        className="form-control text-center date-input w-25 mx-2"
                      >
                        <option value={0}>1-ci</option>
                        <option value={5}>2-ci</option>
                        <option value={10}>usta</option>
                      </select>
                      {/* % */}
                      <label className="normal-label">
                        {info.meharetlilik}
                      </label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Təmsilçilik</label>
                      <input
                        type="number"
                        className="form-control date-input"
                        onChange={handlePercentage}
                        name="temsilcilik"
                        value={info.temsilcilikPercent}
                        min={0}
                        max={100}
                      />
                      %
                      <label className="normal-label">{info.temsilcilik}</label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Zərərlik</label>
                      <input
                        type="number"
                        className="form-control date-input"
                        min={0}
                        onChange={handlePercentage}
                        value={info.zererlilikPercent}
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
                        value={info.mexfilikPercent}
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
                      {/* <input
                        type="number"
                        className="form-control date-input"
                        min={0}
                        value={info.xariciDilPercent}
                        name="xariciDil"
                        onChange={handlePercentage}
                        max={100}
                      />
                      % */}
                      <select
                        name="xariciDil"
                        onChange={handlePercentage}
                        // value={info.xariciDil}
                        className="form-control date-input w-100 mx-1"
                      >
                        <option value={0}>Şərq</option>
                        <option value={5}>Avropa</option>
                      </select>

                      <input
                        type="number"
                        disabled={!info.languageSkillByHand}
                        className="form-control w-50 me-0"
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
                        value={info.kesfiyyatPercent}
                        onChange={handlePercentage}
                        max={100}
                      />
                      %
                      <input
                        type="number"
                        className="form-control w-75 me-0"
                        disabled={!info.discoveryByHand}
                        onChange={handleInput}
                        name="kesfiyyat"
                        value={info.kesfiyyat}
                      />
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Elmi dərəc. görə</label>
                      <select
                        name="xariciDil"
                        onChange={handlePercentage}
                        // value={info.xariciDil}
                        className="form-control date-input w-100 mx-2"
                      >
                        <option value={0}>Şərq</option>
                        <option value={5}>Avropa</option>
                      </select>

                      <label className="normal-label">{info.elmiDerece}</label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Kibertəhlük. əlav.</label>
                      <input
                        type="number"
                        className="form-control w-100 me-0"
                        onChange={handleInput}
                        name="kibertehlukesizlik"
                        value={info.kibertehlukesizlik}
                      />
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Fəxri ada görə</label>
                      <select
                        name="fexriAd"
                        onChange={handlePercentage}
                        // value={info.xariciDil}
                        className="form-control date-input w-100 mx-2"
                      >
                        <option value={0}>Şərq</option>
                        <option value={5}>Avropa</option>
                      </select>

                      <label className="normal-label">{info.fexriAd}</label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Əlavə ödən.(gvt)</label>
                      <input
                        type="number"
                        className="form-control w-100 me-0"
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
                        className="form-control w-100 me-0"
                        value={info.extraMoney2}
                      />
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Cəmi hesablanıb:</label>
                      <b>{totalGiven.toFixed(2)}</b>
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
                            Güzəştli məbləğ: {totalDiscount.toFixed(2)}
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
                          value={
                            !info.takenByHand
                              ? totalGiven !== 0
                                ? // Add other calculation here VeteranTaxDiscount
                                  (
                                    (info.discountTaxPercentage * totalGiven) /
                                    100
                                  ).toFixed(2)
                                : info.tax?.toFixed(2)
                              : info.tax?.toFixed(2)
                          }
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
                          value={
                            !info.takenByHand
                              ? totalGiven !== 0
                                ? (
                                    (info.discountDsmf * totalGiven) /
                                    100.0
                                  ).toFixed(2)
                                : info.dsmf?.toFixed(2)
                              : info.dsmf?.toFixed(2)
                          }
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
                          value={
                            !info.takenByHand
                              ? totalGiven !== 0
                                ? (info.discountHealthInsurance * totalGiven) /
                                  100
                                : info.healthInsurance
                              : info.healthInsurance
                          }
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
                          disabled={!info.takenByHand}
                          value={info?.alimentPercentage}
                          onChange={(e: any) => {
                            setInfo({
                              ...info,
                              aliment:
                                (e.target.value * (totalGiven - info.tax)) /
                                100,
                              alimentPercentage: e.target.value,
                            });
                          }}
                          className="form-control w-50"
                        />
                        %
                        <input
                          type="number"
                          min="0"
                          value={info.aliment}
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
                        <b>{totalTaken.toFixed(2)}</b>
                      </div>
                    </div>

                    <div className="section">
                      <div className="d-flex  align-items-center justify-content-between my-1">
                        <label>Veriləcək məbləğ:</label>
                        <b>
                          {(
                            totalGiven -
                            totalTaken +
                            totalDiscount -
                            totalDSMF +
                            (info.maddiYardim +
                              info.mezuniyyet +
                              info.kesfMezun +
                              info.cixisMuv +
                              info.sehra +
                              info.yolXerci)
                          ).toFixed(2)}
                        </b>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="pe-0">
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="section">
                        <div className="d-flex  align-items-center justify-content-between my-1">
                          <label>İş günləri</label>
                          <input
                            type="text"
                            className="form-control date-input"
                          />
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
                          <input
                            checked={info.foodGiven}
                            value={info.foodGiven}
                            name="foodGiven"
                            onChange={handleCheckbox}
                            type="checkbox"
                          />
                          <label>verilir</label>
                          <input
                            value={
                              info.foodGiven
                                ? info?.food == 0
                                  ? info.discountFood
                                  : info?.food
                                : 0
                            }
                            name="food"
                            disabled={!info.foodGiven}
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
                        <select
                          value={info.kirayeId}
                          onChange={handleSelect}
                          className="form-control w-25 h-25 p-0 ps-1 fs-7"
                        >
                          <option value={info.kirayeId}>
                            {
                              rents?.find(
                                (item: any) => item.id == info.kirayeId
                              )?.name
                            }
                          </option>
                          {rents
                            ?.filter((item: any) => item.id != info.kirayeId)
                            .map((item: any) => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        <input
                          type="number"
                          name="familyCount"
                          onChange={handleInput}
                          value={info.familyCount}
                          className="form-control date-input"
                        />
                        <label className="normal-label">nəfər</label>
                        <input
                          type="number"
                          value={info.kirayeQat}
                          name="kirayeQat"
                          onChange={handleInput}
                          className="form-control date-input"
                        />
                        <label className="normal-label">Qat</label>
                        <input
                          type="number"
                          disabled={!info.rentByHand}
                          name="kirayePrice"
                          onChange={handleInput}
                          value={info.kirayePrice}
                          className="form-control date-input"
                        />
                        <input
                          type="checkbox"
                          checked={info.rentByHand}
                          value={info.rentByHand}
                          onChange={handleCheckbox}
                          name="rentByHand"
                        />
                        <label className="normal-label">əl ilə</label>
                      </div>
                    </div>

                    <div className="section">
                      <Row>
                        <Col md={7}>
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
                            <input
                              type="number"
                              value={info.maddiYardim}
                              onChange={handleInput}
                              name="maddiYardim"
                              className="form-control w-100"
                            />
                            <input
                              type="number"
                              value={
                                (info.discountDsmf * info.maddiYardim) / 100
                              }
                              className="form-control border-0  w-100"
                            />
                            <input
                              type="number"
                              value={
                                info.maddiYardim -
                                (info.discountDsmf * info.maddiYardim) / 100
                              }
                              className="form-control w-100"
                            />
                          </div>

                          <div className="d-flex my-2 justify-content-between">
                            <label>Məzuniyyət</label>
                            <input
                              type="number"
                              value={info.mezuniyyet}
                              onChange={handleInput}
                              name="mezuniyyet"
                              className="form-control w-100"
                            />
                            <input
                              value={
                                (info.discountDsmf * info.mezuniyyet) / 100
                              }
                              type="number"
                              className="form-control w-100"
                            />
                            <input
                              type="number"
                              value={
                                info.mezuniyyet -
                                (info.discountDsmf * info.mezuniyyet) / 100
                              }
                              className="form-control w-100"
                            />
                          </div>

                          <div className="d-flex my-2 justify-content-between">
                            <label>Kəşf. məzun.</label>
                            <input
                              type="number"
                              value={info.kesfMezun}
                              onChange={handleInput}
                              name="kesfMezun"
                              className="form-control w-100"
                            />
                            <input
                              type="number"
                              value={(info.discountDsmf * info.kesfMezun) / 100}
                              className="form-control w-100"
                            />
                            <input
                              value={
                                info.kesfMezun -
                                (info.discountDsmf * info.kesfMezun) / 100
                              }
                              type="number"
                              className="form-control w-100"
                            />
                          </div>

                          <div className="d-flex my-2 justify-content-between">
                            <label>
                              BPM
                              {/* <select className="form-control d-none date-input">
                                {Array.from(Array(100).keys()).map((item) => (
                                  <option key={item}>{item}</option>
                                ))}
                              </select> */}
                            </label>

                            <input
                              type="number"
                              className="form-control w-100"
                            />
                            <input
                              type="number"
                              className="form-control w-100"
                            />
                            <input
                              type="number"
                              className="form-control w-100"
                            />
                          </div>

                          <div className="d-flex my-2 justify-content-between">
                            <label>Çıxış müavinatı</label>
                            <input
                              type="number"
                              value={info.cixisMuv}
                              onChange={handleInput}
                              name="cixisMuv"
                              className="form-control w-100"
                            />
                            <input
                              type="number"
                              value={(info.discountDsmf * info.cixisMuv) / 100}
                              className="form-control w-100"
                            />
                            <input
                              value={
                                info.cixisMuv -
                                (info.discountDsmf * info.cixisMuv) / 100
                              }
                              type="number"
                              className="form-control w-100"
                            />
                          </div>
                        </Col>

                        <Col md={1}>
                          <div className="d-flex ms-4 flex-column mt-3 justify-content-center align-items-center">
                            <label className="normal-label d-flex align-items-center my-2">
                              <label className="normal-label">Verilir</label>
                              <input type="checkbox" title="Verilmir" />
                            </label>
                            <label className="normal-label d-flex align-items-center my-2">
                              <label className="normal-label">Verilir</label>
                              <input type="checkbox" title="Verilmir" />
                            </label>
                            <label className="normal-label d-flex align-items-center my-2">
                              <label className="normal-label">Verilir</label>
                              <input type="checkbox" title="Verilmir" />
                            </label>
                            <label className="normal-label d-flex align-items-center my-2">
                              <label className="normal-label">Verilir</label>
                              <input type="checkbox" title="Verilmir" />
                            </label>
                            <label className="normal-label d-flex align-items-center my-2">
                              <label className="normal-label">Verilir</label>
                              <input type="checkbox" title="Verilmir" />
                            </label>
                          </div>
                        </Col>
                        <Col className="p-0 mt-3" md={4}>
                          <div>
                            <label className="d-flex my-2 min-width-30">
                              <label className="min-width-30">
                                {/* <input
                                  type="checkbox"
                                  checked={info.discountDsmf}
                                  onChange={handleCheckbox}
                                  className="ms-1"
                                  name="discountDsmf"
                                />
                                <label className="min-width-20">Verilir</label> */}
                              </label>
                              <span className="min-wdith-30">Ezamiyyet</span>
                              <input
                                type="number"
                                value={info.ezamiyyet}
                                onChange={handleInput}
                                name="ezamiyyet"
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
                                type="number"
                                className="form-control w-75"
                              />
                            </label>
                            <label className="d-flex my-2">
                              <label className="min-width-30"></label>
                              <span className="min-width-30">Kəşf. xəstə.</span>
                              <input
                                type="number"
                                value={info.kesfXeste}
                                onChange={handleInput}
                                name="kesfXeste"
                                className="form-control w-75"
                              />
                            </label>
                            <label className="d-flex my-2">
                              <label className="min-width-30"></label>
                              {/* <input type="checkbox" className="ms-1" />
                              <label className="min-width-20">əl ilə</label> */}
                              Yol. xərcə.
                              <input
                                type="number"
                                name="yolXerci"
                                value={info.yolXerci}
                                onChange={handleInput}
                                className="form-control w-75"
                              />
                            </label>
                            <label className="d-flex my-2">
                              <label className="min-width-30"></label>
                              <span className="min-width-30">Yük pulu</span>
                              <input
                                name="yukPulu"
                                onChange={handleInput}
                                value={info.yukPulu}
                                type="number"
                                className="form-control w-75"
                              />
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
                        <b>
                          {(
                            totalGiven -
                            totalTaken +
                            totalDiscount -
                            totalDSMF +
                            totalAddition
                          ).toFixed(2)}
                        </b>
                      </div>
                    </div>
                  </div>
                </Col>
                <div className="d-flex">
                  <input
                    checked={info.isNotGiven}
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
            <Button onClick={() => calculate()}>Hesabla</Button>
            <Button onClick={() => dispatch(hideModal())} variant="secondary">
              Bağla
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CalculatingModal;
