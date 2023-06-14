import { Column } from "react-table";
import { EmployeeData } from "../types/EmployeeData";

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
      },
    ],
  },
  {
    Header: "Təmsilçilik"
  },
  {
    Header: "Məxfilik"
  },{
    Header: "Zərərliyə görə"
  },{
    Header: "Kibertəhlükəsizlik əlavəsi"
  },{
    Header: "Xarici dil",
  },
  {
    Header: "Kəşf. mükaf.",
  },
  {
    Header: "Elmi dərəcə",
  },
  {
    Header: "Fəxri ad",
  },
];

const columns: Column<TableData>[] = [
  {
    Header: "idarə",
  },
  {
    Header: "Şöbə, bölmə",
  },
  {
    Header: "Vəzifə",
  },
  {
    Header: "Hərbi rütbə",
  },
  {
    Header: "S.A.A.",
    accessor: "name",
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
      },
      {
        Header: "Vəzifə maaşı",
      },
      {
        Header: "Xİ  görə əlavə",
      },
      {
        Header: "P.t qatı",
      },
      {
        Header: "Məharət dər.",
      },
      {
        Header: "Təmsilçilik",
      },
      {
        Header: "Məxfiçilik",
      },
      {
        Header: "Zərərliyə görə",
      },
      {
        Header: "Kibertəhlükəsizlik əlavəsi",
      },
      {
        Header: "Xarici dil",
      },
      {
        Header: "Kəşf. mükaf.",
      },
      {
        Header: "Elmi dərəcə",
      },
      {
        Header: "Fəxri ad",
      },
      {
        Header: "Əlavə öd. (gvti)",
      },
      {
        Header: "Əlavə ödəniş",
      },
      {
        Header: "Cəmi",
      },
    ],
  },
  {
    Header: "Tutulur",
    columns: [
      {
        Header: "Gəlir vergisi",
      },
      {
        Header: "DSMF",
      },
      {
        Header: "Tibbi sığorta",
      },
      {
        Header: "Kəsirlər",
      },
      {
        Header: "Aliment",
      },
      {
        Header: "Artıq 211100",
      },
      {
        Header: "Güzəşt",
      },
      {
        Header: "Cəmi",
        accessor: "total",
      },
    ],
  },
  {
    Header: "Ələ veriləcək məbləğ",
  },
  {
    Header: "Ərzaq komp-sı",
  },
  {
    Header: "MV müavin.",
  },
  {
    Header: "Məzuniyyət",
  },
  {
    Header: "Kəşf. məzun.",
  },
  {
    Header: "Kəşf. xəstə",
  },
  {
    Header: "Kirayə. komp.",
  },
  {
    Header: "Maddi yardım",
  },
  {
    Header: "Ezamiyyət",
  },
  {
    Header: "Səhra pulu",
  },
  {
    Header: "Yol xərci",
  },
  {
    Header: "Yük pulu",
  },
  {
    Header: "Çıxış müav.",
  },
  {
    Header: "BPM faiz",
  },
  {
    Header: "BPM",
  },
  {
    Header: "DSMF ümumi",
  },
  {
    Header: "Cəmi",
    accessor: "total2",
  },
  {
    Header: "Qeyd",
  },
  {
    Header: "MV müav. verilir",
  },
  {
    Header: "Hesab nömrəsi",
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
  },
  {
    Header: "Vəzifə",
  },
  {
    Header: "Xİ",
  },
  {
    Header: "Qatı",
  },
  {
    Header: "Məhar.",
  },
  {
    Header: "Təmsil",
  },
  {
    Header: "Məxfi",
  },
  {
    Header: "Zərər",
  },
  {
    Header: "Dil",
  },
  {
    Header: "K. mükf.",
  },
  {
    Header: "Elmi",
  },
  {
    Header: "Əl.(gvt)",
  },
  {
    Header: "Əlavə",
  },
  {
    Header: "Cəmi h.",
  },
  {
    Header: "Vergi",
  },
  {
    Header: "DSMF",
  },
  {
    Header: "Tibbi",
  },
  {
    Header: "Kəsir",
  },
  {
    Header: "Aliment",
  },
  {
    Header: "Artıq",
  },
  {
    Header: "961",
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

const detailsColumns: Column<TableData>[] = [
  {
    Header: "Il",
  },
  {
    Header: "Ay",
  },
  {
    Header: "idarə",
  },
  {
    Header: "Şöbə, bölmə",
  },
  {
    Header: "Vəzifə",
  },
  {
    Header: "Hərbi rütbə",
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
      },
      {
        Header: "Vəzifə maaşı",
      },
      {
        Header: "Xİ  görə əlavə",
      },
      {
        Header: "P.t qatı",
      },
      {
        Header: "Məharət dər.",
      },
      {
        Header: "Təmsilçilik",
      },
      {
        Header: "Məxfiçilik",
      },
      {
        Header: "Zərərliyə görə",
      },
      {
        Header: "Xarici dil",
      },
      {
        Header: "Kəşf. mükaf.",
      },
      {
        Header: "Elmi dərəcə",
      },
      {
        Header: "Fəxri ad",
      },
      {
        Header: "Əlavə öd. (gvti)",
      },
      {
        Header: "Əlavə ödəniş",
      },
      {
        Header: "Cəmi",
      },
    ],
  },
  {
    Header: "Tutulur",
    columns: [
      {
        Header: "Gəlir vergisi",
      },
      {
        Header: "DSMF",
      },
      {
        Header: "Tibbi sığorta",
      },
      {
        Header: "Kəsirlər",
      },
      {
        Header: "Aliment",
      },
      {
        Header: "Artıq 211100",
      },
      {
        Header: "Güzəşt",
      },
      {
        Header: "Cəmi",
        accessor: "total",
      },
    ],
  },
  {
    Header: "Ələ veriləcək məbləğ",
  },
  {
    Header: "Ərzaq komp-sı",
  },
  {
    Header: "MV müavin.",
  },
  {
    Header: "Məzuniyyət",
  },
  {
    Header: "Kəşf. məzun.",
  },
  {
    Header: "Kəşf. xəstə",
  },
  {
    Header: "Kirayə. komp.",
  },
  {
    Header: "Maddi yardım",
  },
  {
    Header: "Ezamiyyət",
  },
  {
    Header: "Səhra pulu",
  },
  {
    Header: "Yol xərci",
  },
  {
    Header: "Yük pulu",
  },
  {
    Header: "Çıxış müav.",
  },
  {
    Header: "BPM faiz",
  },
  {
    Header: "BPM",
  },
  {
    Header: "DSMF ümumi",
  },
  {
    Header: "Cəmi",
    accessor: "total2",
  },
  {
    Header: "Qeyd",
  },
  {
    Header: "MV müav. verilir",
  },
  {
    Header: "Hesab nömrəsi",
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
