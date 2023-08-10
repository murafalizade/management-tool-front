import { Column } from "react-table";
import { EmployeeData } from "../../types/EmployeeData";
import moment from "moment";

export const employeeHeaders: Column<EmployeeData>[] = [
    {
      Header: "Soyadı",
      accessor: "lastName",
    },
    {
      Header: "Adı",
      accessor: "firstName",
    },
    {
      Header: "Atasının adı",
      accessor: "fatherName",
    },
    {
      Header: "Sosial Sığorta №",
      accessor: "injuranceNo",
    },
    {
      Header: "Doğum tarixi",
      accessor: (row) => moment(new Date(row.birthDate)).format("DD.MM.YYYY") || "",
    },
    {
      Header: "FIN",
      accessor: "fin",
    },
    {
      Header: "Təyin olunma",
      columns: [
        {
          Header: "vaxtı",
          accessor: (row) => moment(new Date(row.startDate)).format("DD.MM.YYYY") || "",
        },
        {
          Header: "əmri",
          accessor: "commandNo",
        },
      ],
    },
    {
      Header: "Qəbul olunma",
      columns: [
        {
          Header: "vaxtı",
          id: "enteranceDate",
          accessor: (row) => moment(new Date(row.enteranceDate)).format("DD.MM.YYYY") || "",
        },
        {
          Header: "əmri",
          accessor: "enteranceCommand",
        },
      ],
    },
    {
      Header: "Rütbənin dəyişdirilməsi",
      accessor: (row) => row.rank?.shortName || "",
    },
    {
      Header: "Vəzifənin dəyişdirilməsi",
      accessor: (row) => row.position?.name || "",

    },
    {
      Header: "Məharət dərəcəsi",
      columns: [
        {
          Header: "verilmə tarixi",
        },
        {
          Header: "Məharət dərəcəsi",
          // accessor: "meharetlilik",
        },
      ],
    },
    {
      Header: "Təmsilçilik",
      accessor: "temsilcilik",
    },
    {
      Header: "Məxfilik",
      accessor: "mexfilik",
    },
    {
      Header: "Zərərliyə görə",
      accessor: "zererlilik",
    },
    {
      Header: "Xarici dil",
      accessor: (row) => row.xariciDil?.name || "",
    },
    {
      Header: "Elmi dərəcə",
      accessor: "elmiDerece",
    },
    {
      Header: "Fəxri ad",
      accessor: (row) => row.fexriAd?.name || "",
    },
  ];