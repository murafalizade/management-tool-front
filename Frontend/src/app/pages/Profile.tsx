import React, { useEffect, useState } from "react";
import "../styles/profile.scss";
import TableLayout from "../components/tables/TableLayout";
import Toastify from "../utility/Toastify";
import OperationService from "../api/operationService";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(true);
  const [isFirstTab, setIsFirstTab] = useState<boolean>(true);
  const [isSecondTab, setIsSecondTab] = useState<boolean>(false);
  const [isThirdTab, setIsThirdTab] = useState<boolean>(false);
  const [isFourthTab, setIsFourthTab] = useState<boolean>(false);
  const [isFifthTab, setIsFifthTab] = useState<boolean>(false);
  const [isSixthTab, setIsSixthTab] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [rows, setRows] = useState<any>([]);
  const [newEdit, setNewEdit] = useState<boolean>(false);
  const scienttificDegreesColumns = [
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
  const militaryAccountingSystemColumns = [
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
  const toast = new Toastify();

  useEffect(()=>{
    const getElmiDerece = async () => {
      const res = await OperationService.getElmiDerece();
      setRows(res);
    };
    getElmiDerece();
  },[]);

  const deleteRow = async (id: number | null) => {
    if (!id) {
      toast.info("Zəhmət olmasa silmək istədiyiniz sətri seçin");
      return;
    }

    toast.warning(async (result: any) => {
      const updatedRows = rows.filter((row: any) => row.id !== id);
      console.log(id)
      if (result.isConfirmed) {
        if (id > 0) {
          await OperationService.deleteElmiDereceById(id);
          toast.success("Sətir silindi");
        }
        setRows(updatedRows);
      }
    }, "Sətri silmək istəyirsinizmi?");
  };

  const addRow = () => {
    const newRow = {
      id: -(Math.abs(rows.length) + 1),
      name: "",
      for5to10Salary: 0,
      for10to15Salary: 0,
      for15to20Salary: 0,
      for20Salary: 0
    };

    setRows([...rows, newRow]);
  };

  const selectRow = async (id: number) => {
    if (id < 0) return;
    const res = await OperationService.getElmiDerece();
    setSelectedRow(selectedRow);
  };

  const saveRow = async () => {
    try {
      rows.map(async (row: any) => {
        if (row.id < 0) {
          row.id = 0;
          const res = await OperationService.AddScientificDegree(row);
        } else {
          const res = await OperationService.UpdateScientificDegree(row);
        }
      });
      toast.success("Bölmələr yadda saxlanıldı");
    } catch (err) {
      toast.error("Bölmələr yadda saxlanılmadı");
    }
  };

  const changeRow = (e: any, id: number) => {
    const newRows = rows.map((row: any) => {
      if (row.id === id) {
        return {
          ...row,
          [e.target.name]: e.target.value,
        };
      }
      return row;
    });

    setRows(newRows);

  };

  // Change Password
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [updatedUser, setUpdatedUser] = useState({
    email: newUsername,
    password: newPassword,
  });

  const handleChangeUsername = (e: any) => {
    setNewUsername(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setNewPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      toast.error("Xahiş olunur bütün xanaları doldurun!");
      return;
    }
    try {
      if (newPassword == confirmPassword) {
        const res = await OperationService.login(updatedUser);
        setNewUsername("");
        setNewPassword("");
      }
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
            <div className="profile-img"></div>
            <div>
              <h1>Modern</h1>
            </div>
            <div>
              <p>
                Son giriş vaxtı:<span></span>
              </p>
            </div>
          </div>
          <div className="my-3">Email</div>
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
                    <label>İstifadəçi adı</label>
                    <input
                      type="text"
                      placeholder="Ad"
                      value={newUsername}
                      onChange={handleChangeUsername}
                      className="input"
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label>Şifrə</label>
                    <input
                      type="password"
                      placeholder="Şifrə"
                      className="input"
                      value={newPassword}
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <label>Şifrə təsdiqlənməsi</label>
                    <input
                      type="password"
                      placeholder="Şifrə təsdiqlənməsi"
                      className="input"
                      value={confirmPassword}
                      onChange={handleChangeConfirmPassword}
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
                  isFirstTab ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsFirstTab(true);
                  setIsSecondTab(false);
                  setIsThirdTab(false);
                  setIsFourthTab(false);
                  setIsFifthTab(false);
                  setIsSixthTab(false);
                }}
              >
                Elmi dərəcələr
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isSecondTab ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsFirstTab(false);
                  setIsSecondTab(true);
                  setIsThirdTab(false);
                  setIsFourthTab(false);
                  setIsFifthTab(false);
                  setIsSixthTab(false);
                }}
              >
                Xarici dil
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isThirdTab ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsFirstTab(false);
                  setIsSecondTab(false);
                  setIsThirdTab(true);
                  setIsFourthTab(false);
                  setIsFifthTab(false);
                  setIsSixthTab(false);
                }}
              >
                Məhrətlilik
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isFourthTab ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsFirstTab(false);
                  setIsSecondTab(false);
                  setIsThirdTab(false);
                  setIsFourthTab(true);
                  setIsFifthTab(false);
                  setIsSixthTab(false);
                }}
              >
                Fəxri ad
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isFifthTab ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsFirstTab(false);
                  setIsSecondTab(false);
                  setIsThirdTab(false);
                  setIsFourthTab(false);
                  setIsFifthTab(true);
                  setIsSixthTab(false);
                }}
              >
                Kirayə
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  isSixthTab ? "clicked-btn" : "unclicked-btn"
                }`}
                onClick={() => {
                  setIsFirstTab(false);
                  setIsSecondTab(false);
                  setIsThirdTab(false);
                  setIsFourthTab(false);
                  setIsFifthTab(false);
                  setIsSixthTab(true);
                }}
              >
                Güzəşt
              </button>
            </div>
          </div>
          <div>
            <div>
              {isFirstTab && (
                <TableLayout
                  isEditable={true}
                  data={rows}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={scienttificDegreesColumns}
                ></TableLayout>
              )}
              {isSecondTab && (
                <TableLayout
                  isEditable={true}
                  data={rows}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={foreignLanguagesColumns}
                ></TableLayout>
              )}
              {isThirdTab && (
                <TableLayout
                  isEditable={true}
                  data={rows}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={abilitiesColumns}
                ></TableLayout>
              )}
              {isFourthTab && (
                <TableLayout
                  isEditable={true}
                  data={rows}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={honorTitlesColumns}
                ></TableLayout>
              )}
              {isFifthTab && (
                <TableLayout
                  isEditable={true}
                  data={rows}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={rentsColumns}
                ></TableLayout>
              )}
              {isSixthTab && (
                <TableLayout
                  isEditable={true}
                  data={rows}
                  add={addRow}
                  select={selectRow}
                  save={saveRow}
                  delete={deleteRow}
                  change={changeRow}
                  columns={militaryAccountingSystemColumns}
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
