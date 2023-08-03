import { Column } from "react-table";
import { EmployeeData } from "../../types/EmployeeData";

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
      accessor: "birthDate",
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
          id: "date",
        },
        {
          Header: "əmri",
          id: "order",
        },
      ],
    },
    {
      Header: "Qəbul olunma",
      columns: [
        {
          Header: "vaxtı",
        },
        {
          Header: "əmri",
        },
      ],
    },
    {
      Header: "Rütbənin dəyişdirilməsi",
    },
    {
      Header: "Vəzifənin dəyişdirilməsi",
    },
    {
      Header: "Məharət dərəcəsi",
      columns: [
        {
          Header: "verilmə tarixi",
        },
        {
          Header: "Məharət dərəcəsi",
          accessor: "meharetlilik",
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
      Header: "Kibertəhlükəsizlik əlavəsi",
    },
    {
      Header: "Xarici dil",
      accessor: "xariciDil",
    },
    {
      Header: "Kəşf. mükaf.",
      accessor: "kesfiyyat",
    },
    {
      Header: "Elmi dərəcə",
      accessor: "elmiDerece",
    },
    {
      Header: "Fəxri ad",
      accessor: "fexriAd",
    },
  ];