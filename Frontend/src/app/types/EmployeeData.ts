export type EmployeeData = {
  id?: number;
  lastName: string;
  firstName: string;
  fatherName: string;
  injuranceNo: string;
  birthDate: string;
  fin: string;
  appointment?: {
    date: string;
    order: string;
  };
  admission?: {
    date: string;
    order: string;
  };
  changeOfRank?: string;
  changeOfPosition?: string;
  meharetlilik?: string;
  temsilcilik?: string;
  mexfilik?: string;
  zererlilik?: string;
  xariciDil?: string;
  kesfiyyat?: string;
  elmiDerece?: string;
  fexriAd?: string;
};
