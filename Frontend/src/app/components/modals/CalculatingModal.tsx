import React, { useEffect, useState } from "react";
import "../../styles/modal.scss";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { hideModal, showModal } from "../../redux/showModalSlice";
import EmployeeService from "../../api/employeeService";
import { MONTHS } from "../../constants/months";
import moment from "moment";
import Toastify from "../../utility/Toastify";
import OperationService from "../../api/operationService";
import Helper from "../../utility/Helper";

const CalculatingModal = () => {
  const state = useSelector((state: RootState) => state.showModal);
  const dispatch = useDispatch();

  const [info, setInfo] = useState<any>({});

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
  const [scientificDegrees, setScientificDegrees] = useState<any[]>([]);
  const [honorTitle, setHonorTitle] = useState<any[]>([]);
  const [adminstrators, setAdminstrators] = useState<any[]>([]);
  const [languageSkills, setLanguageSkills] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [abilities, setAbilities] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [aid, setAid] = useState<any>({});
  const [allPositions, setAllPositions] = useState<any[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<any>({});

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
    const positionSalary = !info.positionSalaryByHand
      ? selectedOptions.position || info.positionSalary
      : info.positionSalary;

    const bne = `${e.target.name}Percentage`;
    setInfo({
      ...info,
      [e.target.name]: (parseInt(e.target.value) * positionSalary) / 100,
      [bne]: parseInt(e.target.value),
    });
  };

  const handleSelectInput = (e: any) => {
    const tableName = e.target.name;
    let result: any = null;
    switch (tableName) {
      case "ability":
        const abilityPrice = abilities.find(
          (x) => x.id === parseInt(e.target.value)
        );
        if (info.rankId === 100) {
          result = abilityPrice?.forZabitPercentage;
        } else if (info.rankId === 200) {
          result = abilityPrice?.forGizirPercentage;
        } else {
          // result = abilityPrice?.forMuddetliPercentage;
          result = abilityPrice?.forGizirPercentage;
        }
        break;
      case "foreignLanguage":
        result = languageSkills.find(
          (x) => x.id === parseInt(e.target.value)
        )?.percentage;
        break;
      case "honorTitle":
        result = honorTitle.find(
          (x) => x.id === parseInt(e.target.value)
        )?.salary;
        break;
      case "scientificDegree":
        const degreePrice = scientificDegrees.find(
          (x) => x.id === parseInt(e.target.value)
        );
        if (serviceYears > 5 && serviceYears < 10) {
          result = degreePrice?.for5to10Salary;
        } else if (serviceYears > 10 && serviceYears < 15) {
          result = degreePrice?.for10to15Salary;
        } else if (serviceYears > 15 && serviceYears < 20) {
          result = degreePrice?.for15to20Salary;
        } else if (serviceYears > 20) {
          result = degreePrice?.for20Salary;
        } else {
          result = degreePrice?.forEveryoneSalary;
        }
        break;
      case "rank":
        result = ranks.find((x) => x.id === parseInt(e.target.value))?.salary;
        break;
      case "position":
        result = positions.find(
          (x) => x.id === parseInt(e.target.value)
        )?.salary;
        break;
      case "rent":
        result = rents.find((x) => x.id === parseInt(e.target.value))?.price;
        break;
      // case "adminstrator":
      //   result = adminstrator.find((x) => x.id === parseInt(e.target.value));
      //   break;
      default:
        result = 0;
        break;
    }
    const fieldName = `${tableName}Id`;
    setInfo({ ...info, [fieldName]: parseInt(e.target.value) });
    setSelectedOptions({ ...selectedOptions, [e.target.name]: result || 0 });
  };

  // Fetch all records from services
  const getRecord = async () => {
    // reset all state
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

    // Get employee record
    const record = await EmployeeService.getEmployeeSalaryRecordById(
      state.show
    );

    // Get aid status
    const aidStatus = await EmployeeService.getAidStatus(state.show);
    setAid(aidStatus);

    setTotalDiscount(record.totalDiscount);

    setInfo({
      ...info,
      ...record,
      permanentRankSalary: record.rankSalary,
      permanentPositionSalary: record.positionSalary,
      isChanged: true,
    });

    // Get rank list
    const ranks = await OperationService.getRanks();
    setRanks(ranks);

    // Get rent
    const rent = await EmployeeService.getKiraye();
    setRents(rent);

    // Get Scientific degree
    const scientificDegree = await OperationService.getElmiDerece();
    setScientificDegrees(scientificDegree);

    // Get Honor title
    const honorTitle = await OperationService.getFexriAd();
    setHonorTitle(honorTitle);

    // // Get Adminstrator
    // const adminstrator = await OperationService.getAdminstration();
    // setAdminstrators(adminstrator.data);

    // Get all positions
    const allPositions = await OperationService.getAdminstrationByAll();
    setAllPositions(allPositions);

    // Get Language skills
    const languageSkills = await OperationService.getXariciDil();
    setLanguageSkills(languageSkills);

    // // Get Organizations
    // const organization = await OperationService.getOrganization();
    // setOrganizations(organization.data);

    // Get Positions
    const position = await OperationService.getPosition();
    setPositions(position);

    // Get Abilities
    const abilities = await OperationService.getMeharet();
    setAbilities(abilities);
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

  useEffect(() => {
    if (!info.isChanged) return;

    calculate();
  }, [info.isChanged]);

  // Calculation all total salary and other stuffs
  const calculate = () => {
    const food = info.foodGiven
      ? info?.food == 0
        ? info.discountFood
        : info?.food
      : 0;

    const rankSalary = !info.isRankSalaryHand
      ? selectedOptions.rank || info.rankSalary
      : info.rankSalary;

    const positionSalary = !info.isPositionSalaryHand
      ? selectedOptions.position || info.positionSalary
      : info.positionSalary;

    const scientificDegreeSalary =
      selectedOptions.scientificDegree === undefined
        ? info.scientificDegreePrice
        : selectedOptions.scientificDegree;

    const honorTitleSalary =
      selectedOptions.honorTitle === undefined
        ? info.honorTitlePrice
        : selectedOptions.honorTitle;

    const foreignLanguageSalary =
      selectedOptions.foreignLanguage === undefined
        ? info.foreignLanguagePrice
        : info.isLanguagePriceHand
        ? info.foreignLanguagePrice
        : (positionSalary * selectedOptions.foreignLanguage) / 100;
    const qat = info.isQatHand
      ? info.ptMoney
      : (rankSalary + positionSalary + info.xiMoney) * info.ptQat;
    const abilitySalary =
      selectedOptions.ability === undefined
        ? info.abilityPrice
        : (positionSalary * selectedOptions.ability) / 100;

    const xiMoney = positionSalary * (info.xiPercent / 100);

    // according which extra income is given calculate extras, dsmf and total given
    let vacation = 0,
      vacationDSMF = 0,
      financialAid = 0,
      exitAid = 0,
      exitAidDSMF = 0,
      bpm = 0,
      bpmdsmf = 0;

    if (info.isFinancialAidGiven) {
      financialAid = info.financialAid || positionSalary + rankSalary;
    }
    if (info.isVacationGiven) {
      vacation = info.vacation || positionSalary;
      vacationDSMF = info.vacationDSMF || (vacation * info.discountDsmf) / 100;
    }
    if (info.isExitAidGiven) {
      exitAid = info.exitAid || positionSalary;
      exitAidDSMF = info.exitAidDSMF || (exitAid * info.discountDsmf) / 100;
    }
    if (info.isBPMGiven) {
      bpm = info.bpm || positionSalary;
      bpmdsmf = info.bpmdsmf || (bpm * info.discountDsmf) / 100;
    }

    setInfo({
      ...info,
      vacation,
      vacationDSMF,
      financialAid,
      exitAid,
      exitAidDSMF,
      bpm,
      qat,
      bpmdsmf,
      xiMoney,
      isChanged: false,
    });

    setTotalAddition(info.rentPrice + food);

    const totalGivens =
      abilitySalary +
      info.representing +
      info.harmfulness +
      rankSalary +
      positionSalary +
      info.confidentiality +
      foreignLanguageSalary +
      info.exploretionPrice +
      scientificDegreeSalary +
      info.cyberSecurity +
      honorTitleSalary +
      info.extraMoney +
      info.extraMoney2 +
      xiMoney +
      qat;

    setTotalGiven(totalGivens);

    const dsmf = !info.isPayerHand
      ? (info.discountDsmf * (rankSalary + positionSalary)) / 100.0
      : info.dsmf;

    const injurance = !info.isPayerHand
      ? (info.discountHealthInjurance * (rankSalary + positionSalary)) / 100.0
      : info.healthInsurance;

    let taxAmount =
      rankSalary + positionSalary - info.discountMinWage >= 0
        ? rankSalary + positionSalary - info.discountMinWage
        : 0;
    const tax = !info.isPayerHand
      ? // Add other calculation here VeteranTaxDiscount
        (info.discountTaxPercentage * taxAmount) / 100
      : info.tax;

    const rentPrice = !info.isRentHand
      ? selectedOptions.rent === undefined
        ? info.rentPrice
        : selectedOptions.rent * info.rentQat * (1 + info.familyCount * 0.5)
      : info.rentPrice;

    const totalTakens =
      info.alimony + info.extra211100 + info.fails + tax + dsmf + injurance;
    setTotalTaken(totalTakens);

    setTotalDSMF(vacationDSMF + exitAidDSMF + bpmdsmf);

    setTotal(
      totalGivens +
        totalDiscount -
        totalTakens -
        (vacationDSMF + exitAidDSMF + bpmdsmf) +
        rentPrice +
        food +
        vacation +
        exitAid +
        bpm +
        financialAid
    );
  };

  const toast = new Toastify();

  // Calculate service years till 1st of current month
  useEffect(() => {
    let startDate = moment(info?.employeeStartDate);
    const endDate = moment(new Date());
    // endDate.set("date", 1);
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
    dispatch(showModal(0));
    toast.success("Əməliyyat uğurla yerinə yetirildi");
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
              <ul className="d-flex w-100">
                <div className="w-50">
                  <li className="list-group-item d-flex align-items-center">
                    İdarə:{" "}
                    <select
                      className="form-control w-50 ms-4"
                      value={info.positionId}
                      name="position"
                      onChange={handleSelectInput}
                    >
                      <option value={""}>Seç</option>
                      {allPositions.map((x: any) => (
                        <option value={x.positionId}>
                          {x.organizationName}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="list-group-item mt-3 d-flex align-items-center">
                    Vəzifə:
                    <select
                      className={"form-control w-50 ms-3"}
                      value={info.positionId}
                      name="position"
                      onChange={handleSelectInput}
                    >
                      <option value={""}>Seç</option>
                      {allPositions
                        .filter((x) =>
                          info.positionId
                            ? x.positionId === info.positionId
                            : true
                        )
                        .map((x: any) => (
                          <option value={x.positionId}>{x.positionName}</option>
                        ))}
                    </select>
                  </li>
                </div>
                <div className="w-50">
                  <li className="list-group-item d-flex align-items-center">
                    Şöbə:
                    <select
                      className="form-control w-50 ms-3"
                      value={info.positionId}
                      name="position"
                      onChange={handleSelectInput}
                    >
                      <option value={""}>Seç</option>
                      {allPositions.map((x: any) => (
                        <option value={x.positionId}>{x.departmentName}</option>
                      ))}
                    </select>
                  </li>
                </div>
              </ul>
            </div>

            <div className="d-flex section">
              <label>H/rütbə</label>
              <select
                className="form-control w-25 h-25 p-0 ps-1 me-4 fs-7"
                value={info.rankId}
                name="rank"
                onChange={handleSelectInput}
              >
                <option value={""}>Seç</option>
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
                        name="isRankSalaryHand"
                        checked={info.isRankSalaryHand}
                        value={info.isRankSalaryHand}
                        onChange={handleCheckbox}
                        type="checkbox"
                      />
                      <label className="form-check-label normal-label">
                        əl ilə
                      </label>
                      <input
                        name="rankSalary"
                        disabled={!info.isRankSalaryHand}
                        onChange={handleInput}
                        value={
                          !info.isRankSalaryHand
                            ? selectedOptions.rank || info.rankSalary
                            : info.rankSalary
                        }
                        type="number"
                        className="form-control"
                      />
                    </div>

                    <div className="d-flex my-1">
                      <label>Vəzifə maaşı</label>
                      <input
                        name="isPositionSalaryHand"
                        checked={info.isPositionSalaryHand}
                        onChange={handleCheckbox}
                        type="checkbox"
                      />
                      <label className="form-check-label normal-label">
                        əl ilə
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        disabled={!info.isPositionSalaryHand}
                        name="positionSalary"
                        value={
                          !info.isPositionSalaryHand
                            ? selectedOptions.position || info.positionSalary
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
                        name="isQatHand"
                        onChange={handleCheckbox}
                        checked={info.isQatHand}
                        value={info.isQatHand}
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
                        disabled={!info.isQatHand}
                        onChange={handleInput}
                        className="form-control w-100"
                        value={info.qat}
                      />
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Məharət dərəcəsi</label>
                      <select
                        name="ability"
                        onChange={handleSelectInput}
                        value={info.abilityId}
                        className="form-control text-center date-input w-25 mx-2"
                      >
                        <option
                          value={
                            abilities.find((x) => x.name === "Verilmir")?.id
                          }
                        >
                          Verilmir
                        </option>
                        {abilities
                          .filter((x) => x.name !== "Verilmir")
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((x: any) => (
                            <option value={x.id}>{x.name}</option>
                          ))}
                      </select>
                      <label className="normal-label">
                        {selectedOptions.ability === undefined
                          ? info.abilityPrice
                          : info.positionSalary *
                            (selectedOptions.ability / 100)}
                      </label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Təmsilçilik</label>
                      <input
                        type="number"
                        className="form-control date-input"
                        onChange={handlePercentage}
                        name="representing"
                        value={info.representingPercentage}
                        min={0}
                        max={100}
                      />
                      %
                      <label className="normal-label">
                        {info.representing}
                      </label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Zərərlik</label>
                      <input
                        type="number"
                        className="form-control date-input"
                        min={0}
                        onChange={handlePercentage}
                        value={info.harmfulnessPercentage}
                        name="harmfulness"
                        max={100}
                      />
                      %
                      <label className="normal-label">{info.harmfulness}</label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Məxfilik</label>
                      <input
                        type="number"
                        className="form-control date-input"
                        min={0}
                        onChange={handlePercentage}
                        value={info.confidentialityPercentage}
                        name="confidentiality"
                        max={100}
                      />
                      %
                      <label className="normal-label">
                        {info.confidentiality}
                      </label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Xarici dil</label>
                      <input
                        type="checkbox"
                        name="isLanguagePriceHand"
                        checked={info.isLanguagePriceHand}
                        onChange={handleCheckbox}
                      />
                      <label className="normal-label">əl ilə</label>
                      <select
                        name="foreignLanguage"
                        onChange={handleSelectInput}
                        value={info.foreignLanguageId}
                        className="form-control date-input w-100 mx-1"
                      >
                        <option
                          value={
                            languageSkills.find((x) => x.name === "Verilmir")
                              ?.id
                          }
                        >
                          Verilmir
                        </option>

                        {languageSkills
                          .filter((x) => x.name !== "Verilmir")
                          .map((x: any) => (
                            <option value={x.id}>{x.name}</option>
                          ))}
                      </select>

                      <input
                        type="number"
                        disabled={!info.isLanguagePriceHand}
                        className="form-control w-50 me-0"
                        onChange={handleInput}
                        name="foreignLanguagePrice"
                        value={
                          selectedOptions.foreignLanguage === undefined
                            ? info.foreignLanguagePrice
                            : info.isLanguagePriceHand
                            ? info.foreignLanguagePrice
                            : (info.positionSalary *
                                selectedOptions.foreignLanguage) /
                              100
                        }
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
                        name="exploretionPrice"
                        value={info.exploretionPrice}
                      />
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Elmi dərəc. görə</label>
                      <select
                        name="scientificDegree"
                        onChange={handleSelectInput}
                        value={info.scientificDegreeId}
                        className="form-control date-input w-100 mx-2"
                      >
                        <option
                          value={
                            scientificDegrees.find((x) => x.name === "Verilmir")
                              ?.id
                          }
                        >
                          Verilmir
                        </option>
                        {scientificDegrees
                          .filter((x) => x.name !== "Verilmir")
                          .map((x: any) => (
                            <option value={x.id}>{x.name}</option>
                          ))}
                      </select>

                      <label className="normal-label">
                        {selectedOptions.scientificDegree === undefined
                          ? info.scientificDegreePrice
                          : selectedOptions.scientificDegree}
                      </label>
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Kibertəhlük. əlav.</label>
                      <input
                        type="number"
                        className="form-control date-input"
                        min={0}
                        name="cyberSecurity"
                        value={info.cyberSecurityPercentage}
                        onChange={handlePercentage}
                        max={100}
                      />
                      %
                      <label className="normal-label">
                        {info.cyberSecurity}
                      </label>
                      {/* <input
                        type="number"
                        className="form-control w-100 me-0"
                        onChange={handleInput}
                        name="cyberSecurityPrice"
                        value={info.cyberSecurityPrice}
                      /> */}
                    </div>

                    <div className="d-flex  align-items-center justify-content-between my-1">
                      <label>Fəxri ada görə</label>
                      <select
                        name="honorTitle"
                        onChange={handleSelectInput}
                        value={info.honorTitleId}
                        className="form-control date-input w-100 mx-2"
                      >
                        <option
                          value={
                            honorTitle.find((x) => x.name === "Verilmir")?.id
                          }
                        >
                          Verilmir
                        </option>
                        {honorTitle
                          .filter((x) => x.name !== "Verilmir")
                          .map((x: any) => (
                            <option value={x.id}>{x.name}</option>
                          ))}
                      </select>

                      <label className="normal-label">
                        {selectedOptions.honorTitle === undefined
                          ? info.honorTitlePrice
                          : selectedOptions.honorTitle}
                      </label>
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
                              name="isRefugee"
                              id="discountQachqin"
                              checked={info.isRefugee}
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
                          name="isPayerHand"
                          checked={info?.isPayerHand}
                        />
                        <label className="normal-label">əl ilə</label>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <label>Gəlir vergisi</label>
                        <input
                          value={
                            !info.isPayerHand
                              ? // Add other calculation here VeteranTaxDiscount
                                (
                                  (info.discountTaxPercentage * totalGiven) /
                                  100
                                ).toFixed(2)
                              : info.tax
                          }
                          name="tax"
                          disabled={!info.isPayerHand}
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
                            !info.isPayerHand
                              ? (
                                  (info.discountDsmf * totalGiven) /
                                  100.0
                                ).toFixed(2)
                              : info.dsmf
                          }
                          name="dsmf"
                          onChange={handleInput}
                          disabled={!info.isPayerHand}
                          className="form-control w-50"
                        />
                      </div>

                      <div className="d-flex justify-content-between my-1">
                        <label>Tibbi sığorta</label>
                        <input
                          name="healthInsurance"
                          value={
                            !info.isPayerHand
                              ? (info.discountHealthInjurance * totalGiven) /
                                100
                              : info.healthInsurance
                          }
                          onChange={handleInput}
                          disabled={!info.isPayerHand}
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
                          name="fails"
                          // disabled={!info.takenByHand}
                          value={info?.fails}
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
                          // disabled={!info.takenByHand}
                          value={info?.alimonyPercentage}
                          onChange={(e: any) => {
                            setInfo({
                              ...info,
                              alimony:
                                (e.target.value * (totalGiven - info.tax)) /
                                100,
                              alimonyPercentage: e.target.value,
                            });
                          }}
                          className="form-control w-50"
                        />
                        %
                        <input
                          type="number"
                          min="0"
                          value={info.alimony}
                          disabled={!info.isPayerHand}
                          onChange={handleInput}
                          name="alimony"
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
                          // disabled={!info.takenByHand}
                          name="Extra211100"
                          className="form-control w-50"
                        />
                      </div>

                      <div className="d-flex  align-items-center justify-content-between my-1">
                        <label>Cəmi tutulur:</label>
                        <b>{Helper.FormatNumber(totalTaken)}</b>
                      </div>
                    </div>

                    <div className="section">
                      <div className="d-flex  align-items-center justify-content-between my-1">
                        <label>Veriləcək məbləğ:</label>
                        <b>
                          {Helper.FormatNumber(
                            totalGiven - totalTaken + totalDiscount
                          )}
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
                          value={info.rentId}
                          onChange={handleSelectInput}
                          name="rent"
                          className="form-control w-25 h-25 p-0 ps-1 fs-7"
                        >
                          {rents.map((item: any) => (
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
                          value={info.rentQat}
                          name="rentQat"
                          onChange={handleInput}
                          className="form-control date-input"
                        />
                        <label className="normal-label">Qat</label>
                        <input
                          type="number"
                          disabled={!info.isRentHand}
                          name="rentPrice"
                          onChange={handleInput}
                          value={
                            !info.isRentHand
                              ? selectedOptions.rent === undefined
                                ? info.rentPrice
                                : selectedOptions.rent *
                                  info.rentQat *
                                  (1 + info.familyCount * 0.5)
                              : info.rentPrice
                          }
                          className="form-control date-input"
                        />
                        <input
                          type="checkbox"
                          checked={info.isRentHand}
                          value={info.isRentHand}
                          onChange={handleCheckbox}
                          name="isRentHand"
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
                          {aid.financialAidMonth !== 0 ? (
                            <>
                              <label className="w-100">
                                Maddi yardim
                                <span className="ms-2">
                                  {aid.financialAidMonth} ay köçb.
                                </span>
                              </label>
                            </>
                          ) : (
                            <div className="d-flex justify-content-between">
                              <label>Maddi yardim</label>
                              <input
                                type="number"
                                value={info.financialAid}
                                onChange={handleInput}
                                name="financialAid"
                                disabled={!info.isFinancialAidGiven}
                                className="form-control w-100"
                              />
                              <input
                                type="number"
                                onChange={handleInput}
                                disabled
                                className="form-control border-0 opacity-0  w-100"
                              />
                              <input
                                type="number"
                                value={info.financialAid}
                                className="form-control w-100"
                              />
                            </div>
                          )}

                          {aid.vacationMonth !== 0 ? (
                            <>
                              <label className="w-100">
                                Məzuniyyət
                                <span className="ms-3">
                                  {aid.vacationMonth} ay köçb.
                                </span>
                              </label>
                            </>
                          ) : (
                            <div className="d-flex my-2 justify-content-between">
                              <label>Məzuniyyət</label>
                              <input
                                type="number"
                                value={info.vacation}
                                onChange={handleInput}
                                disabled={!info.isVacationGiven}
                                name="vacation"
                                className="form-control w-100"
                              />
                              <input
                                value={info.vacationDSMF}
                                type="number"
                                name="vacationDSMF"
                                onChange={handleInput}
                                disabled={!info.isVacationGiven}
                                className="form-control w-100"
                              />
                              <input
                                type="number"
                                value={info.vacation - info.vacationDSMF}
                                className="form-control w-100"
                              />
                            </div>
                          )}
                          {aid.kesfMezunMonth !== 0 ? (
                            <>
                              <label className="w-100">
                                Kəşf. məzun.
                                <span className="ms-2">
                                  {aid.kesfMezunMonth} ay köçb.
                                </span>
                              </label>
                            </>
                          ) : (
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
                                value={
                                  (info.discountDsmf * info.kesfMezun) / 100
                                }
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
                          )}

                          {aid.bpmMonth !== 0 ? (
                            <>
                              <label className="w-100">
                                BPM
                                <span className="ms-2">
                                  {aid.bpmdMonth} ay köçb.
                                </span>
                              </label>
                            </>
                          ) : (
                            <div className="d-flex my-2 justify-content-between">
                              <label>BPM</label>
                              <input
                                type="number"
                                disabled={!info.isBPMGiven}
                                value={info.bpm}
                                name="bpm"
                                onChange={handleInput}
                                className="form-control w-100"
                              />
                              <input
                                type="number"
                                value={info.bpmdsmf}
                                disabled={!info.isBPMGiven}
                                onChange={handleInput}
                                name="bpmdsmf"
                                className="form-control w-100"
                              />
                              <input
                                type="number"
                                value={info.bpm - info.bpmdsmf}
                                className="form-control w-100"
                              />
                            </div>
                          )}

                          {aid.cixisMuvMonth !== 0 ? (
                            <>
                              <label className="w-100">
                                Çıxış müavinatı
                                <span className="ms-2">
                                  {aid.cixisMuvMonth} ay köçb.
                                </span>
                              </label>
                            </>
                          ) : (
                            <div className="d-flex my-2 justify-content-between">
                              <label>Çıxış müavinatı</label>
                              <input
                                type="number"
                                disabled={!info.isExitAidGiven}
                                value={info.exitAid}
                                onChange={handleInput}
                                name="exitAid"
                                className="form-control w-100"
                              />
                              <input
                                type="number"
                                disabled={!info.isExitAidGiven}
                                value={info.exitAidDSMF}
                                name="exitAidDSMF"
                                className="form-control w-100"
                              />
                              <input
                                value={info.exitAid - info.exitAidDSMF}
                                type="number"
                                className="form-control w-100"
                              />
                            </div>
                          )}
                        </Col>

                        <Col md={1}>
                          <div className="d-flex ms-4 flex-column mt-3 justify-content-center align-items-center ">
                            <label
                              style={{
                                opacity: aid.financialAidMonth === 0 ? 1 : 0,
                              }}
                              className="normal-label d-flex align-items-center z-index-highest my-2"
                            >
                              <label className="normal-label">Verilir</label>
                              <input
                                type="checkbox"
                                title="Verilmir"
                                checked={info.isFinancialAidGiven}
                                name="isFinancialAidGiven"
                                onChange={handleCheckbox}
                              />
                            </label>

                            <label className="normal-label d-flex align-items-center z-index-highest my-2">
                              <label
                                style={{
                                  opacity: aid.vacationMonth === 0 ? 1 : 0,
                                }}
                                className="normal-label d-flex align-items-center z-index-highest my-2"
                              >
                                Verilir
                              </label>
                              <input
                                type="checkbox"
                                title="Verilmir"
                                checked={info.isVacationGiven}
                                name="isVacationGiven"
                                onChange={handleCheckbox}
                              />
                            </label>

                            <label className="normal-label d-flex align-items-center z-index-highest my-2">
                              <label className="normal-label">Verilir</label>
                              <input type="checkbox" title="Verilmir" />
                            </label>

                            <label className="normal-label d-flex align-items-center z-index-highest my-2">
                              <label
                                style={{ opacity: aid.bpmMonth === 0 ? 1 : 0 }}
                                className="normal-label"
                              >
                                Verilir
                              </label>
                              <input
                                type="checkbox"
                                title="Verilmir"
                                checked={info.isBPMGiven}
                                name="isBPMGiven"
                                onChange={handleCheckbox}
                              />
                            </label>

                            <label className="normal-label d-flex align-items-center z-index-highest my-2">
                              <label
                                style={{
                                  opacity: aid.cixisMuvMonth === 0 ? 1 : 0,
                                }}
                                className="normal-label"
                              >
                                Verilir
                              </label>
                              <input
                                type="checkbox"
                                title="Verilmir"
                                checked={info.isExitAidGiven}
                                name="isExitAidGiven"
                                onChange={handleCheckbox}
                              />
                            </label>
                          </div>
                        </Col>

                        <Col className="p-0 mt-3" md={4}>
                          <div>
                            <label className="d-flex my-2 min-width-30">
                              <label className="min-width-30"></label>
                              <span className="min-wdith-30">Ezamiyyet</span>
                              <input
                                type="number"
                                value={info.businessTrip}
                                onChange={handleInput}
                                name="businessTrip"
                                className="form-control w-75 d-block"
                              />
                            </label>
                            <label className="d-flex my-2">
                              <label className="min-width-30"></label>
                              <span className="min-width-30">Səhra pulu</span>
                              <input
                                value={info?.desertPrice}
                                onChange={handleInput}
                                name="desertPrice"
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
                                name="tripExpense"
                                value={info.tripExpense}
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
                        <b>{Helper.FormatNumber(totalDSMF)}</b>
                      </div>

                      <div className="section w-75 d-flex justify-content-between ms-2">
                        <label>Cəmi verilir:</label>
                        <b>{Helper.FormatNumber(total)}</b>
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
