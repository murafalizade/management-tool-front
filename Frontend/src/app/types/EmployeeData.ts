export type EmployeeData = {
  id?: number;
  lastName: string;
  firstName: string;
  fatherName: string;
  injuranceNo: string;
  birthDate: string;
  enteranceDate: string;
  enteranceCommand: string;
  meharetDate: string;
  startDate: string;
  commandNo: string;
  fexriAdName: string;
  fin: string;
  rankId: number;
  phone:string;
  elmiDereceId:number;
  meharetId: number;
  rank: {
    shortName: string;
  };
  position: {
    name: string;
  };
  meharet: {
    name: string;
  };
  temsilcilik?: string;
  mexfilik?: string;
  zererlilik?: string;
  xariciDil:{
    name: string;
  }
  kesfiyyat?: string;
  elmiDerece: {
    name: string;
  };
  fexriAd?: {
    name: string;
  };
};
