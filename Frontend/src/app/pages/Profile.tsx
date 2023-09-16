import React, { useEffect, useState } from "react";
import "../styles/profile.scss";
import TableLayout from "../components/tables/TableLayout";
import Toastify from "../utility/Toastify";
import OperationService from "../api/operationService";
import { AxiosError } from "axios";

const Profile = () => {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(true);
  const [isScientificDegrees, setIsScientificDegrees] = useState<boolean>(true);
  const [isHonorTitles, setIsHonorTitles] = useState<boolean>(false);
  const [isAbilities, setIsAbilities] = useState<boolean>(false);
  const [isForeignLanguages, setIsForeignLanguages] = useState<boolean>(false);
  const [isRanks, setIsRanks] = useState<boolean>(false);
  const [isRents, setIsRents] = useState<boolean>(false);
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [rowsOfScientificDegrees, setRowsOfScientificDegrees] = useState<any>(
    []
  );
  const [rowsOfHonorTitles, setRowsOfHonorTitles] = useState<any>([]);
  const [rowsOfAbilities, setRowsOfAbilities] = useState<any>([]);
  const [rowsOfForeignLanguages, setRowsOfForeignLanguages] = useState<any>([]);
  const [rowsOfRanks, setRowsOfRanks] = useState<any>([]);
  const [rowsOfRents, setRowsOfRents] = useState<any>([]);
  const [rowsOfDiscounts, setRowsOfDiscounts] = useState<any>([]);
  const [newEdit, setNewEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const scientificDegreesColumns = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Ad", field: "name" },
    { title: "5-10 illik təcrübə əlavəsi", field: "for5to10Salary" },
    { title: "10-15 illik təcrübə əlavəsi", field: "for10to15Salary" },
    { title: "15-20 illik təcrübə əlavəsi", field: "for15to20Salary" },
    { title: "20 illik və ya daha çox təcrübə əlavəsi", field: "for20Salary" },
    {
      title: "Pedoqoji fəaliyyətlə məşğul olmayan əlavə",
      field: "forEveryoneSalary",
    },
  ];
  const honorTitlesColumns = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Ad", field: "name" },
    { title: "Pul əlavəsi", field: "salary" },
  ];
  const abilitiesColumns = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Ad", field: "name" },
    { title: "Zabit faizi üçün", field: "forZabitPercentage" },
    { title: "Gizir faizi üçün", field: "forGizirPercentage" },
    { title: "Müddətli faizi üçün", field: "forMuddetliPercentage" },
  ];
  const foreignLanguagesColumns = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Ad", field: "name" },
    { title: "Faiz dərəcəsi", field: "percentage" },
  ];
  const ranksColumns = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Ad", field: "name" },
    { title: "Qısa adı", field: "shortName" },
    { title: "Əmək haqqı", field: "salary" },
  ];
  const rentsColumns = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Ad", field: "name" },
    // { title: "Qısa adı", field: "shortName" },
    { title: "Pul əlavəsi", field: "price" },
  ];
  const discounts = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Gəlir vergisi %", field: "taxPercentage" },
    { title: "DSMF %", field: "dsmf" },
    { title: "Tibbi sığorta %", field: "healthInjurance" },
    { title: "Ərzaq əvəzi kompen-si (AZN)", field: "food" },
    { title: "Müharibə veteranı müavinatı (AZN)", field: "veteran" },
    { title: "1 və 2 qrup əlil (AZN)", field: "disability" },
    { title: "Şəhid (AZN)", field: "martyr" },
    { title: "Qaçqın (AZN)", field: "refugee" },
    { title: "Çernobıl (AZN)", field: "chernobyl" },
    { title: "Himayədar (AZN)", field: "owner" },
    { title: "Səhra pulu (AZN)", field: "desert" },
    { title: "Müharibə vet. vergidən azad (AZN)", field: "veteranTaxDiscount" },
    { title: "Minimal əmək haqqı (AZN)", field: "minWage" },
  ];
  const newRowOfScientificDegrees = {
    id: -(Math.abs(rowsOfScientificDegrees.length) + 1),
    name: "",
    for5to10Salary: 0,
    for10to15Salary: 0,
    for15to20Salary: 0,
    for20Salary: 0,
  };
  const newRowOfHonorTitles = {
    id: -(Math.abs(rowsOfHonorTitles.length) + 1),
    name: "",
    salary: 0,
  };
  const newRowOfAbilities = {
    id: -(Math.abs(rowsOfAbilities.length) + 1),
    name: "",
    forZabitPercentage: 0,
    forGizirPercentage: 0,
    forMuddetliPercentage: 0,
  };
  const newRowOfForeignLanguages = {
    id: -(Math.abs(rowsOfForeignLanguages.length) + 1),
    name: "",
    percentage: 0,
  };
  const newRowOfRanks = {
    id: -(Math.abs(rowsOfRanks.length) + 1),
    name: "",
    shortName: "",
    salary: 0,
  };
  const newRowOfRents = {
    id: -(Math.abs(rowsOfRents.length) + 1),
    name: "",
    // shortName: "",
    salary: 0,
  };
  const newRowOfDiscounts = {
    id: -(Math.abs(rowsOfRanks.length) + 1),
    taxPercentage: 0,
    dsmf: 0,
    healthInjurance: 0,
    food: 0,
    veteran: 0,
    disability: 0,
    martyr: 0,
    refugee: 0,
    chernobyl: 0,
    owner: 0,
    desert: 0,
    veteranTaxDiscount: 0,
    minWage: 0,
  };
  const toast = new Toastify();

  // Get table datas
  useEffect(() => {
    const getElmiDerece = async () => {
      const res = await OperationService.getElmiDerece();
      setRowsOfScientificDegrees(res);
    };
    const getFexriAd = async () => {
      const res = await OperationService.getFexriAd();
      setRowsOfHonorTitles(res);
    };
    const getMeharet = async () => {
      const res = await OperationService.getMeharet();
      setRowsOfAbilities(res);
    };
    const getXariciDil = async () => {
      const res = await OperationService.getXariciDil();
      setRowsOfForeignLanguages(res);
    };
    const getRanks = async () => {
      const res = await OperationService.getRanks();
      setRowsOfRanks(res);
    };
    const getKiraye = async () => {
      const res = await OperationService.getKiraye();
      setRowsOfRents(res);
    };
    const getDiscounts = async () => {
      const res = await OperationService.getDiscounts();
      console.log(res.data);
      setRowsOfDiscounts(res.data);
    };
    getElmiDerece();
    getFexriAd();
    getMeharet();
    getXariciDil();
    getRanks();
    getKiraye();
    getDiscounts();
  }, []);

  // Delete a row from a table
  const deleteRow = async (id: number | null) => {
    if (!id) {
      toast.info("Zəhmət olmasa silmək istədiyiniz sətri seçin");
      return;
    }

    toast.warning(async (result: any) => {
      const rowsOfTable = isScientificDegrees
        ? rowsOfScientificDegrees
        : isHonorTitles
        ? rowsOfHonorTitles
        : isAbilities
        ? rowsOfAbilities
        : isForeignLanguages
        ? rowsOfForeignLanguages
        : isRanks
        ? rowsOfRanks
        : isDiscount
        ? rowsOfDiscounts
        : rowsOfRents;
      const updatedRows = rowsOfTable.filter((row: any) => row.id !== id);
      if (result.isConfirmed) {
        if (id > 0) {
          isScientificDegrees &&
            (await OperationService.deleteElmiDereceById(id));
          isHonorTitles && (await OperationService.deleteFexriAdById(id));
          isAbilities && (await OperationService.deleteMeharetById(id));
          isForeignLanguages &&
            (await OperationService.deleteXariciDilById(id));
          isRanks && (await OperationService.deleteRanksById(id));
          isRents && (await OperationService.deleteKirayeById(id));
          toast.success("Sətir silindi");
        }
        isScientificDegrees && setRowsOfScientificDegrees(updatedRows);
        isHonorTitles && setRowsOfHonorTitles(updatedRows);
        isAbilities && setRowsOfAbilities(updatedRows);
        isForeignLanguages && setRowsOfForeignLanguages(updatedRows);
        isRanks && setRowsOfRanks(updatedRows);
        isRents && setRowsOfRents(updatedRows);
      }
    }, "Sətri silmək istəyirsinizmi?");
  };

  // Add a row to a table
  const addRow = () => {
    const newRow = isScientificDegrees
      ? newRowOfScientificDegrees
      : isHonorTitles
      ? newRowOfHonorTitles
      : isAbilities
      ? newRowOfAbilities
      : isForeignLanguages
      ? newRowOfForeignLanguages
      : isRanks
      ? newRowOfRanks
      : isDiscount
      ? newRowOfDiscounts
      : newRowOfRents;

    isScientificDegrees &&
      setRowsOfScientificDegrees([...rowsOfScientificDegrees, newRow]);
    isHonorTitles && setRowsOfHonorTitles([...rowsOfHonorTitles, newRow]);
    isAbilities && setRowsOfAbilities([...rowsOfAbilities, newRow]);
    isForeignLanguages &&
      setRowsOfForeignLanguages([...rowsOfForeignLanguages, newRow]);
    isRanks && setRowsOfRanks([...rowsOfRanks, newRow]);
    isRents && setRowsOfRents([...rowsOfRents, newRow]);
    isDiscount && setRowsOfDiscounts([...rowsOfDiscounts, newRow]);
  };

  // Select a row of a table
  const selectRow = async (id: number) => {
    if (id < 0) return;
    const res = isScientificDegrees
      ? await OperationService.getElmiDerece()
      : isHonorTitles
      ? await OperationService.getFexriAd()
      : isAbilities
      ? await OperationService.getMeharet()
      : isForeignLanguages
      ? await OperationService.getXariciDil()
      : isRanks
      ? await OperationService.getRanks()
      : isDiscount
      ? await OperationService.getDiscounts()
      : await OperationService.getKiraye();
    setSelectedRow(selectedRow);
  };

  // Save rows of a table
  const saveRow = async () => {
    const rowsOfTable = isScientificDegrees
      ? rowsOfScientificDegrees
      : isHonorTitles
      ? rowsOfHonorTitles
      : isAbilities
      ? rowsOfAbilities
      : isForeignLanguages
      ? rowsOfForeignLanguages
      : isRanks
      ? rowsOfRanks
      : isDiscount
      ?rowsOfDiscounts
      : rowsOfRents;
    try {
      rowsOfTable.map(async (row: any) => {
        if (row.id < 0) {
          row.id = 0;
          const res = isScientificDegrees
            ? await OperationService.AddScientificDegree(row)
            : isHonorTitles
            ? await OperationService.AddHonorTitle(row)
            : isAbilities
            ? await OperationService.AddAbility(row)
            : isForeignLanguages
            ? await OperationService.AddForeignLanguage(row)
            : isRanks
            ? await OperationService.AddRank(row)
            :isDiscount
            ? await OperationService.AddDiscount(row)
            : await OperationService.AddRent(row);
        } else {
          const res = isScientificDegrees
            ? await OperationService.UpdateScientificDegree(row)
            : isHonorTitles
            ? await OperationService.UpdateHonorTitle(row)
            : isAbilities
            ? await OperationService.UpdateAbility(row)
            : isForeignLanguages
            ? await OperationService.UpdateForeignLanguage(row)
            : isRanks
            ? await OperationService.UpdateRank(row.id, row)
            :isDiscount
            ?await OperationService.UpdateDiscount(row.id, row)
            : await OperationService.UpdateRent(row);
        }
      });
      toast.success();
    } catch (err) {
      toast.error();
    }
  };

  // Change datas in the row
  const changeRow = (e: any, id: number) => {
    const rowsOfTable = isScientificDegrees
      ? rowsOfScientificDegrees
      : isHonorTitles
      ? rowsOfHonorTitles
      : isAbilities
      ? rowsOfAbilities
      : isForeignLanguages
      ? rowsOfForeignLanguages
      : isRanks
      ? rowsOfRanks
      :isDiscount
      ?rowsOfDiscounts
      : rowsOfRents;
    const newRows = rowsOfTable.map((row: any) => {
      if (row.id === id) {
        return {
          ...row,
          [e.target.name]: e.target.value,
        };
      }
      return row;
    });

    isScientificDegrees && setRowsOfScientificDegrees(newRows);
    isHonorTitles && setRowsOfHonorTitles(newRows);
    isAbilities && setRowsOfAbilities(newRows);
    isForeignLanguages && setRowsOfForeignLanguages(newRows);
    isRanks && setRowsOfRanks(newRows);
    isRents && setRowsOfRents(newRows);
    isDiscount && setRowsOfDiscounts(newRows);
  };

  // Change Password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [updatedUser, setUpdatedUser] = useState({
    email: "admin@gmail.com",
    password: "",
    newPassword: "",
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      email: e.target.value,
    }));
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      password: e.target.value,
    }));
  };
  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      newPassword: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !newPassword) {
      toast.error("Xahiş olunur bütün xanaları doldurun!");
      return;
    }
    console.log(updatedUser);
    try {
      const res = await OperationService.update(updatedUser);
      toast.success("Şifrə yeniləndi");
    } catch (error) {
      const err = error as AxiosError;
      toast.error((err.response?.data as string) || "Xəta baş verdi!");
    }
  };

  return (
    <>
      <div className="d-flex my-3">
        <div className="info-part my-5 d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="profile-img">
              <img src="..\user-img2.png"></img>
            </div>
            <div>
              <h4 className="mt-4">İstifadəçi</h4>
            </div>
          </div>
          {isShowBtn && (
            <div className="my-3">
              <p>
                <b>Email: </b>admin@gmail.com
              </p>
            </div>
          )}
          <div>
            {isShowBtn && (
              <div>
                <button
                  className={`btn btn-primary`}
                  onClick={() => {
                    setIsShowBtn(false);
                  }}
                >
                  Şifrəni dəyişdir
                </button>
              </div>
            )}
            {!isShowBtn && (
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column gap-2">
                  {/* <div className="d-flex flex-column gap-1">
                    <label>Email</label>
                    <input
                      type="text"
                      value={email}
                      placeholder="Email"
                      onChange={handleChangeEmail}
                      className="form-control"
                    />
                  </div> */}
                  <div className="d-flex flex-column gap-1">
                    <label>Köhnə şifrə</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Köhnə şifrə"
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label>Yeni şifrə</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Yeni şifrə"
                      value={newPassword}
                      onChange={handleChangeNewPassword}
                    />
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-primary w-75 mt-2" type="submit">
                      Yadda saxla
                    </button>
                    <button
                      className="btn btn-danger w-25 mt-2 ms-2"
                      onClick={() => {
                        setIsShowBtn(true);
                      }}
                    >
                      Geri
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="tabs-part mx-4">
          <div className="d-flex">
            <div>
              <button
                className={`btn ${
                  isScientificDegrees ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsScientificDegrees(true);
                  setIsHonorTitles(false);
                  setIsAbilities(false);
                  setIsForeignLanguages(false);
                  setIsRanks(false);
                  setIsDiscount(false);
                  setIsRents(false);
                }}
              >
                Elmi dərəcələr
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isHonorTitles ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsScientificDegrees(false);
                  setIsHonorTitles(true);
                  setIsAbilities(false);
                  setIsForeignLanguages(false);
                  setIsRanks(false);
                  setIsRents(false);
                  setIsDiscount(false);
                }}
              >
                Fəxri ad
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isAbilities ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsScientificDegrees(false);
                  setIsHonorTitles(false);
                  setIsAbilities(true);
                  setIsForeignLanguages(false);
                  setIsRanks(false);
                  setIsRents(false);
                  setIsDiscount(false);
                }}
              >
                Məharətlilik
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isForeignLanguages ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsScientificDegrees(false);
                  setIsHonorTitles(false);
                  setIsAbilities(false);
                  setIsForeignLanguages(true);
                  setIsRanks(false);
                  setIsRents(false);
                  setIsDiscount(false);
                }}
              >
                Xarici dil
              </button>
            </div>
            <div>
              <button
                className={`btn ${isRanks ? "clicked-btn" : "unclicked-btn"}`}
                onClick={() => {
                  setIsScientificDegrees(false);
                  setIsHonorTitles(false);
                  setIsAbilities(false);
                  setIsForeignLanguages(false);
                  setIsRanks(true);
                  setIsRents(false);
                  setIsDiscount(false);
                }}
              >
                Hərbi rütbələr
              </button>
            </div>
            <div>
              <button
                className={`btn ${isRents ? "clicked-btn" : "unclicked-btn"}`}
                onClick={() => {
                  setIsScientificDegrees(false);
                  setIsHonorTitles(false);
                  setIsAbilities(false);
                  setIsForeignLanguages(false);
                  setIsRanks(false);
                  setIsRents(true);
                  setIsDiscount(false);
                }}
              >
                Kirayələr
              </button>
              <button
                className={`btn ${
                  isDiscount ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsScientificDegrees(false);
                  setIsHonorTitles(false);
                  setIsAbilities(false);
                  setIsForeignLanguages(false);
                  setIsRanks(false);
                  setIsRents(false);
                  setIsDiscount(true);
                }}
              >
                Güzəştlər
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div style={{ overflowX: "auto" }}>
              {isScientificDegrees && (
                <TableLayout
                  isEditable={true}
                  data={rowsOfScientificDegrees}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={scientificDegreesColumns}
                ></TableLayout>
              )}
              {isHonorTitles && (
                <TableLayout
                  isEditable={true}
                  data={rowsOfHonorTitles}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={honorTitlesColumns}
                ></TableLayout>
              )}
              {isAbilities && (
                <TableLayout
                  isEditable={true}
                  data={rowsOfAbilities}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={abilitiesColumns}
                ></TableLayout>
              )}
              {isForeignLanguages && (
                <TableLayout
                  isEditable={true}
                  data={rowsOfForeignLanguages}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={foreignLanguagesColumns}
                ></TableLayout>
              )}
              {isRanks && (
                <TableLayout
                  isEditable={true}
                  data={rowsOfRanks}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={ranksColumns}
                ></TableLayout>
              )}
              {isRents && (
                <TableLayout
                  isEditable={true}
                  data={rowsOfRents}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={rentsColumns}
                ></TableLayout>
              )}
              {isDiscount && (
                <TableLayout
                  isEditable={true}
                  data={rowsOfDiscounts}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  change={changeRow}
                  columns={discounts}
                ></TableLayout>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;