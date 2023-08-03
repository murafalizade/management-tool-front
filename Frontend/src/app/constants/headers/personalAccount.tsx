import { Column, CellProps } from "react-table";
import { SalaryRecordData } from "../../types/SalaryRecordData";
import moment from "moment";

// Custom cell converter string for boolean values in table
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CustomCellRenderer: React.FunctionComponent<
  CellProps<SalaryRecordData, boolean>
> = ({ value }) => {
  return <span>{value ? "Bəli" : "Xeyr"}</span>
};

export const personalAccountHeaders: Column<SalaryRecordData>[] = [
  {
    Header: "Il",
    accessor: "recordDateYear",
  },
  {
    Header: "Ay",
    accessor: "recordDateMonth",
  },
  {
    Header: "idarə",
    accessor: "employeePositionDepartmentAdminstrationName",
  },
  {
    Header: "Şöbə, bölmə",
    accessor: "employeePositionDepartmentName",
  },
  {
    Header: "Vəzifə",
    accessor: "employeePositionName",
  },
  {
    Header: "Hərbi rütbə",
    accessor: "employeeRankName",
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
        accessor: "meharetlilik",
      },
      {
        Header: "Təmsilçilik",
        accessor: "temsilcilik",
      },
      {
        Header: "Məxfiçilik",
        accessor: "mexfilik",
      },
      {
        Header: "Zərərliyə görə",
        accessor: "zererlilik",
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
        accessor: "tax",
      },
      {
        Header: "DSMF",
        accessor: "dsmf",
      },
      {
        Header: "Tibbi sığorta",
        accessor: "healthInsurance",
      },
      {
        Header: "Kəsirlər",
        accessor: "kesirler",
      },
      {
        Header: "Aliment",
        accessor: "aliment",
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
    accessor: "mezuniyyet",
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
    accessor: "kirayePrice",
  },
  {
    Header: "Maddi yardım",
    accessor: "maddiYardim",
  },
  {
    Header: "Ezamiyyət",
    accessor: "ezamiyyet",
  },
  {
    Header: "Səhra pulu",
    accessor: "sehra",
  },
  {
    Header: "Yol xərci",
    accessor: "yolXerci",
  },
  {
    Header: "Yük pulu",
    accessor: "yukPulu",
  },
  {
    Header: "Çıxış müav.",
    accessor: "cixisMuv",
  },
  {
    Header: "BPM faiz",
    accessor: "bPMPercentage",
  },
  {
    Header: "BPM",
    accessor: "bPM",
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
    Header: "Hesab nömrəsi",
    accessor: "accountNumber",
  },
  {
    Header: "Məh. %",
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