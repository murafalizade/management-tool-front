import { Column } from "react-table";
import { EmployeeData } from "../types/EmployeeData";
import { SalaryRecordData } from "../types/SalaryRecordData";

type TableData = {
  name: string;
  age: number;
  email: string;
  total?: number;
  empty?: string;
  total2?: number;
};

export const createColumns: Column<EmployeeData>[] = [
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

const columns: Column<SalaryRecordData>[] = [
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
    Header: "S.A.A.",
    accessor: "fullName",
  },
  {
    Header: "Uzun müddətli Xİ",
    columns: [
      {
        Header: "gün",
        accessor: "xiDays",
      },
      {
        Header: "ay",
        accessor: "xiMonths",
      },
      {
        Header: "il",
        accessor: "xiYears",
      },
    ],
  },
  {
    Header: "Xİ görə (%)",
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
        Header: "Kibertəhlükəsizlik əlavəsi",
        accessor: "kibertehlukesizlik",
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
        accessor: "totalGiven",
      },
    ],
  },
  {
    Header: "Ələ veriləcək məbləğ",
    accessor: "extraGivenMoney",
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
    accessor: "kiraye",
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
    accessor: "totalSalary",
  },
  {
    Header: "Qeyd",
    accessor: "comment",
  },
  {
    Header: "MV müav. verilir",
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
  },
];

const columns2 = [
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
    accessor: "qatiSalary",
  },
  {
    Header: "Məhar.",
    accessor: "meharetlilik",
  },
  {
    Header: "Təmsil",
    accessor: "temsilcilik",
  },
  {
    Header: "Məxfi",
    accessor: "mexfilik",
  },
  {
    Header: "Zərər",
    accessor: "zererlilik",
  },
  {
    Header: "Kibertəhlükəsizlik",
    accessor: "kibertehlukesizlik",
  },
  {
    Header: "Dil",
    accessor: "xariciDil",
  },
  {
    Header: "K. mükf.",
    accessor: "kesfiyyat",
  },
  {
    Header: "Elmi",
    accessor: "elmiDerece",
  },
  {
    Header: "Fəxri",
    accessor: "fexriAd",
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
    accessor: "kesirler",
  },
  {
    Header: "Aliment",
    accessor: "aliment",
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
  },
  {
    Header: "ƏVM",
  },
  {
    Header: "Ərzaq",
  },
  {
    Header: "Veteran",
  },
  {
    Header: "Məzun",
  },
  {
    Header: "K.məz.",
  },
  {
    Header: "K.xəs.",
  },
  {
    Header: "Kirayə",
  },
  {
    Header: "Maddi",
  },
  {
    Header: "Ezam",
  },
  {
    Header: "Səhra",
  },
  {
    Header: "Yol",
  },
  {
    Header: "Yük",
  },
  {
    Header: "Çıxış",
  },
  {
    Header: " ",
    accessor: "empty",
  },
  {
    Header: "BPM",
  },
  {
    Header: "DSMF t.",
  },
  {
    Header: "Cəmi",
    accessor: "total2",
  },
];

const detailsColumns: Column<SalaryRecordData>[] = [
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
      },
      {
        Header: "ay",
      },
      {
        Header: "il",
      },
    ],
  },
  {
    Header: "Xİ görə (%)",
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
        // accessor: "total",
      },
    ],
  },
  {
    Header: "Ələ veriləcək məbləğ",
    accessor: "extraGivenMoney",
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
    accessor: "kiraye",
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
    accessor: "total",
    // /    accessor: "total2",
  },
  {
    Header: "Qeyd",
    accessor: "comment",
  },
  {
    Header: "MV müav. verilir",
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
  },
];

export default columns;
export { columns2, detailsColumns };
