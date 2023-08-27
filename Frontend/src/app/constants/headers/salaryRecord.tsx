import { CellProps, Column } from "react-table";
import { SalaryRecordData } from "../../types/SalaryRecordData";
import moment from "moment";

// Custom cell converter string for boolean values in table
const CustomCellRenderer: React.FunctionComponent<
  CellProps<SalaryRecordData, boolean>
> = ({ value }) => {
  return <span>{value ? "Bəli" : "Xeyr"}</span>;
};

const salaryRecordHeaders: Column<SalaryRecordData>[] = [
  {
    Header: "idarə",
    accessor: "positionDepartmentAdminstrationName",
  },
  {
    Header: "Şöbə, bölmə",
    accessor: "positionDepartmentName",
  },
  {
    Header: "Vəzifə",
    accessor: "positionName",
  },
  {
    Header: "Hərbi rütbə",
    accessor: "rankName",
  },
  {
    Header: "S.A.A.",
    accessor: "fullName",
  },
  {
    Header: "Uzun müddətli Xİ",
    columns: [
      {
        Header: "gün",
        accessor: (row: any) => {
          const startDate = moment(row?.employeeStartDate);
          let recordDate = moment(row?.recordDate);
          recordDate = recordDate.set("date", 1);
          const duration = moment.duration(recordDate.diff(startDate));
          return duration.days();
        },
      },
      {
        Header: "ay",
        accessor: (row: any) => {
          const startDate = moment(row?.employeeStartDate);
          let recordDate = moment(row?.recordDate);
          recordDate = recordDate.set("date", 1);
          const duration = moment.duration(recordDate.diff(startDate));
          return duration.months();
        },
      },
      {
        Header: "il",
        accessor: (row: any) => {
          const startDate = moment(row?.employeeStartDate);
          let recordDate = moment(row?.recordDate);
          recordDate = recordDate.set("date", 1);
          const duration = moment.duration(recordDate.diff(startDate));
          return duration.years();
        },
      },
    ],
  },
  {
    Header: "Xİ görə (%)",
    accessor: "xiPercent",
  },
  {
    Header: "Hesablanıb",
    columns: [
      {
        Header: "Rütbə maaşı",
        accessor: "rankSalary",
      },
      {
        Header: "Vəzifə maaşı",
        accessor: "positionSalary",
      },
      {
        Header: "Xİ  görə əlavə",
        accessor: "xiMoney",
      },
      {
        Header: "P.t qatı",
        accessor: "ptMoney",
      },
      {
        Header: "Məharət dər.",
        accessor: "abilityPrice",
      },
      {
        Header: "Təmsilçilik",
        accessor: "representing",
      },
      {
        Header: "Məxfiçilik",
        accessor: "confidentiality",
      },
      {
        Header: "Zərərliyə görə",
        accessor: "harmfulness",
      },
      {
        Header: "Kibertəhlükəsizlik əlavəsi",
        accessor: "cyberSecurity",
      },
      {
        Header: "Xarici dil",
        accessor: "foreignLanguagePrice",
      },
      {
        Header: "Kəşf. mükaf.",
        accessor: "exploretionPrice",
      },
      {
        Header: "Elmi dərəcə",
        accessor: "scientificDegreePrice",
      },
      {
        Header: "Fəxri ad",
        accessor: "honorTitlePrice",
      },
      {
        Header: "Əlavə öd. (gvti)",
        accessor: "extraMoney",
      },
      {
        Header: "Əlavə ödəniş",
        accessor: "extraMoney2",
      },
      {
        Header: "Cəmi",
        accessor: "totalIncome",
      },
    ],
  },
  {
    Header: "Tutulur",
    columns: [
      {
        Header: "Gəlir vergisi",
        accessor: (row: SalaryRecordData) => row.tax.toFixed(2),
      },
      {
        Header: "DSMF",
        accessor: (row: SalaryRecordData) => row.dsmf.toFixed(2),
      },
      {
        Header: "Tibbi sığorta",
        accessor: (row: SalaryRecordData) => row.healthInsurance.toFixed(2),
      },
      {
        Header: "Kəsirlər",
        accessor: "fails",
      },
      {
        Header: "Aliment",
        accessor: "alimony",
      },
      {
        Header: "Artıq 211100",
        accessor: "extra211100",
      },
      {
        Header: "Güzəşt",
        accessor: "totalDiscount",
      },
      {
        Header: "Cəmi",
        accessor: (row: SalaryRecordData) => row.totalTaken.toFixed(2),
      },
    ],
  },
  {
    Header: "Ələ veriləcək məbləğ",
    accessor: (row: SalaryRecordData) => row.totalGiven.toFixed(2),
  },
  {
    Header: "Ərzaq komp-sı",
    accessor: "food",
  },
  {
    Header: "MV müavin.",
    accessor: "muavin",
  },
  {
    Header: "Məzuniyyət",
    accessor: "vacation",
  },
  {
    Header: "Kəşf. məzun.",
    accessor: "kesfMezun",
  },
  {
    Header: "Kəşf. xəstə",
    accessor: "kesfXeste",
  },
  {
    Header: "Kirayə. komp.",
    accessor: "rentPrice",
  },
  {
    Header: "Maddi yardım",
    accessor: "financialAid",
  },
  {
    Header: "Ezamiyyət",
    accessor: "businessTrip",
  },
  {
    Header: "Səhra pulu",
    accessor: "desertPrice",
  },
  {
    Header: "Yol xərci",
    accessor: "tripExpense",
  },
  {
    Header: "Yük pulu",
    accessor: "yukPulu",
  },
  {
    Header: "Çıxış müav.",
    accessor: "exitAid",
  },
  {
    Header: "BPM faiz",
    accessor: "bPMPercentage",
  },
  {
    Header: "BPM",
    accessor: "bpm",
  },
  {
    Header: "DSMF ümumi",
    accessor: "totalDSMF",
  },
  {
    Header: "Cəmi",
    id: "totalSalary",
    accessor: (row: SalaryRecordData) => row.totalSalary.toFixed(2),
  },
  {
    Header: "Qeyd",
    accessor: "comment",
  },
  {
    Header: "MV müav. verilir",
    accessor: "isMatry",
    Cell: CustomCellRenderer,
  },
  {
    Header: "Kirayə komp. verilir",
    accessor: "kirayeName",
  },
  {
    Header: "Hesab nömrəsi",
    accessor: "accountNumber",
  },
  {
    Header: "Məh. %",
    accessor: "employeeMeharetName",
  },
  {
    Header: "HA_ID",
  },
  {
    Header: "H_ID",
  },
  {
    Header: "V2F_ID",
    accessor: "employeePositionId",
  },
];

// Headers for sum of each column
const totalSalaryRecordHeaders = [
  {
    Header: "Rütbə",
    accessor: "rankSalary",
  },
  {
    Header: "Vəzifə",
    accessor: "positionSalary",
  },
  {
    Header: "Xİ",
    accessor: "xiMoney",
  },
  {
    Header: "Qatı",
    accessor: "ptMoney",
  },
  {
    Header: "Məhar.",
    accessor: "abilityPrice",
  },
  {
    Header: "Təmsil",
    accessor: "representing",
  },
  {
    Header: "Məxfi",
    accessor: "confidentiality",
  },
  {
    Header: "Zərər",
    accessor: "harmfulness",
  },
  {
    Header: "Kibertəhlükəsizlik",
    accessor: "cyberSecurity",
  },
  {
    Header: "Dil",
    accessor: "foreignLanguagePrice",
  },
  {
    Header: "K. mükf.",
    accessor: "exploretionPrice",
  },
  {
    Header: "Elmi",
    accessor: "scientificDegreePrice",
  },
  {
    Header: "Fəxri",
    accessor: "honorTitlePrice",
  },
  {
    Header: "Əl.(gvt)",
    accessor: "extraMoney",
  },
  {
    Header: "Əlavə",
    accessor: "extraMoney2",
  },
  {
    Header: "Cəmi h.",
    accessor: "totalIncome",
  },
  {
    Header: "Vergi",
    accessor: "tax",
  },
  {
    Header: "DSMF",
    accessor: "dsmf",
  },
  {
    Header: "Tibbi",
    accessor: "healthInsurance",
  },
  {
    Header: "Kəsir",
    accessor: "fails",
  },
  {
    Header: "Aliment",
    accessor: "alimony",
  },
  {
    Header: "Artıq",
    accessor: "extra211100",
  },
  {
    Header: "961",
    accessor: "totalDiscount",
  },
  {
    Header: "Cəmi t.",
    accessor: "totalTaken",
  },
  {
    Header: "ƏVM",
    accessor: "totalGiven",
  },
  {
    Header: "Ərzaq",
    accessor: "food",
  },
  {
    Header: "Veteran",
    accessor: "veteran",
  },
  {
    Header: "Məzun",
    accessor: "vacation",
  },
  {
    Header: "K.məz.",
    accessor: "kesfMezun",
  },
  {
    Header: "K.xəs.",
    accessor: "kesfXeste",
  },
  {
    Header: "Kirayə",
    accessor: "rentPrice",
  },
  {
    Header: "Maddi",
    accessor: "financialAid",
  },
  {
    Header: "Ezam",
    accessor: "businessTrip",
  },
  {
    Header: "Səhra",
    accessor: "desertPrice",
  },
  {
    Header: "Yol",
    accessor: "tripExpense",
  },
  {
    Header: "Yük",
    accessor: "yukPulu",
  },
  {
    Header: "Çıxış",
    accessor: "exitAid",
  },
  {
    Header: " ",
    accessor: "empty",
  },
  {
    Header: "BPM",
    accessor: "bpm",
  },
  {
    Header: "DSMF t.",
    accessor: "totalDSMF",
  },
  {
    Header: "Cəmi",
    accessor: "totalSalary",
  },
];

export { salaryRecordHeaders, totalSalaryRecordHeaders };
