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
  const [rowsOfScientificDegrees, setRowsOfScientificDegrees] = useState<any>(
    []
  );
  const [rowsOfHonorTitles, setRowsOfHonorTitles] = useState<any>([]);
  const [rowsOfAbilities, setRowsOfAbilities] = useState<any>([]);
  const [rowsOfForeignLanguages, setRowsOfForeignLanguages] = useState<any>([]);
  const [rowsOfRanks, setRowsOfRanks] = useState<any>([]);
  const [rowsOfRents, setRowsOfRents] = useState<any>([]);
  const [newEdit, setNewEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const scientificDegreesColumns = [
    { title: "Seç", field: "select" },
    { title: "№", field: "id" },
    { title: "Ad", field: "name" },
    { title: "5-10 illik təcrübə əlavəsi", field: "for5to10Salary" },
    { title: "10-15 illik təcrübə əlavəsi", field: "for10to15Salary" },
    { title: "15-20 illik təcrübə əlavəsi", field: "for15to20Salary" },
    { title: "Müddətsiz", field: "for20Salary" },
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
    { title: "Qısa adı", field: "shortName" },
    { title: "Pul əlavəsi", field: "salary" },
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
    id: -(Math.abs(rowsOfRanks) + 1),
    name: "",
    shortName: 0,
    salary: 0,
  };
  const newRowOfRents = {
    id: -(Math.abs(rowsOfRents.length) + 1),
    name: "",
    shortName: 0,
    salary: 0,
  };
  const toast = new Toastify();

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
    getElmiDerece();
    getFexriAd();
    getMeharet();
    getXariciDil();
    getRanks();
    getKiraye();
  }, []);

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
      : newRowOfRents;

    isScientificDegrees &&
      setRowsOfScientificDegrees([...rowsOfScientificDegrees, newRow]);
    isHonorTitles && setRowsOfHonorTitles([...rowsOfHonorTitles, newRow]);
    isAbilities && setRowsOfAbilities([...rowsOfAbilities, newRow]);
    isForeignLanguages &&
      setRowsOfForeignLanguages([...rowsOfForeignLanguages, newRow]);
    isRanks && setRowsOfRanks([...rowsOfRanks, newRow]);
    isRents && setRowsOfRents([...rowsOfRents, newRow]);
  };

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
      : await OperationService.getKiraye();
    setSelectedRow(selectedRow);
  };

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
            ? await OperationService.UpdateRank(row)
            : await OperationService.UpdateRent(row);
        }
      });
      toast.success("Bölmələr yadda saxlanıldı");
    } catch (err) {
      toast.error("Bölmələr yadda saxlanılmadı");
    }
  };

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
  };

  // Change Password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
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
  const handleChangeNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    console.log(updatedUser)
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
        <div className="info-part d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="profile-img">
              <img src="..\user-img.png"></img>
            </div>
            <div>
              <h2>User</h2>
            </div>
            <div>
              <p>
                Son giriş vaxtı:<span></span>
              </p>
            </div>
          </div>
          {isShowBtn && <div className="my-3"><p>Email:</p></div>}
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
                  <div className="d-flex flex-column gap-1">
                    <label>Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={handleChangeEmail}
                      className="input"
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label>Köhnə şifrə</label>
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label>Yeni şifrə</label>
                    <input
                      type="password"
                      className="input"
                      value={newPassword}
                      onChange={handleChangeNewPassword}
                    />
                  </div>
                  <button className="btn btn-primary w-75 mt-2" type="submit">
                    Yadda saxla
                  </button>
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
                }}
              >
                Xarici dil
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
                }}
              >
                Fəxri ad
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
                }}
              >
                Kirayə
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
                }}
              >
                Hərbi rütbələr
              </button>
            </div>
          </div>
          <div>
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
