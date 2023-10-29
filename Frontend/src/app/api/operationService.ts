import fetch from "./interceptor";

export default class OperationService {
  static async login(data: any): Promise<any> {
    return await fetch.post(`/api/login`, data);
  }

  static async register(data: any): Promise<any> {
    return await fetch.post(`/api/register`, data);
  }

  static async update(data: any): Promise<any> {
    return await fetch.put(`/api`, data);
  }

  static async getFexriAd(): Promise<any> {
    return await fetch.get(`/api/fexriad`);
  }

  static async getXariciDil(): Promise<any> {
    return await fetch.get(`/api/xaricidil`);
  }

  static async getMeharet(): Promise<any> {
    return await fetch.get(`/api/meharet`);
  }

  static async getElmiDerece(): Promise<any> {
    return await fetch.get(`/api/elmiderece`);
  }

  static async getKiraye(): Promise<any> {
    return await fetch.get(`/api/kiraye`);
  }

  static async getRanks(): Promise<any> {
    return await fetch.get(`/api/rank`);
  }

  static async getAdminstration(): Promise<any> {
    return await fetch.get(`/api/adminstration`);
  }

  static async getPosition(): Promise<any> {
    return await fetch.get(`/api/position`);
  }

  static async getAdminstrationById(id: number): Promise<any> {
    return await fetch.get(`/api/adminstration/${id}`);
  }

  static async getAdminstrationByAll(): Promise<any> {
    return await fetch.get(`/api/adminstration/all`);
  }

  static async getOrganization(): Promise<any> {
    return await fetch.get(`/api/department`);
  }

  static async getOrganizationById(id: number): Promise<any> {
    return await fetch.get(`/api/department/${id}`);
  }

  static async deleteAdminstrationById(id: number): Promise<any> {
    return await fetch.delete(`/api/adminstration/id?id=${id}`);
  }

  static async deleteOrganizationById(id: number): Promise<any> {
    return await fetch.delete(`/api/department/${id}`);
  }

  static async deleteElmiDereceById(id: number): Promise<any> {
    return await fetch.delete(`/api/ElmiDerece/${id}`);
  }

  static async deleteFexriAdById(id: number): Promise<any> {
    return await fetch.delete(`/api/FexriAd/${id}`);
  }

  static async deleteMeharetById(id: number): Promise<any> {
    return await fetch.delete(`/api/Meharet/${id}`);
  }

  static async deleteXariciDilById(id: number): Promise<any> {
    return await fetch.delete(`/api/XariciDil/${id}`);
  }

  static async deleteRanksById(id: number): Promise<any> {
    return await fetch.delete(`/api/rank/${id}`);
  }

  static async deleteKirayeById(id: number): Promise<any> {
    return await fetch.delete(`/api/Kiraye/${id}`);
  }

  static async saveOrganization(data: any): Promise<any> {
    return await fetch.post(`/api/department/save-all`, data);
  }

  static async saveAdminstration(data: any): Promise<any> {
    return await fetch.post(`/api/adminstration/save-all`, data);
  }

  static async deletePositionById(id: number): Promise<any> {
    return await fetch.delete(`/api/position/${id}`);
  }

  static async savePosition(data: any): Promise<any> {
    return await fetch.post(`/api/position/save-all`, data);
  }

  static async UpdateScientificDegree( data: any): Promise<any> {
    return await fetch.put(`/api/ElmiDerece`, data);
  }

  static async UpdateHonorTitle( data: any): Promise<any> {
    return await fetch.put(`/api/fexriad`, data);
  }

  static async UpdateAbility(data: any): Promise<any> {
    return await fetch.put(`/api/Meharet`, data);
  }

  static async UpdateForeignLanguage(data: any): Promise<any> {
    return await fetch.put(`/api/XariciDil`, data);
  }

  static async UpdateRank(id: number, data: any): Promise<any> {
    return await fetch.put(`/api/rank/${id}`, data);
  }

  static async UpdateRent(data: any): Promise<any> {
    return await fetch.put(`/api/kiraye`, data);
  }

  static async UpdateDiscount(id:number, data: any): Promise<any> {
    return await fetch.put(`/api/discount/${id}`, data);
  }

  static async AddScientificDegree(data: any): Promise<any> {
    return await fetch.post(`/api/ElmiDerece`, data);
  }

  static async AddHonorTitle(data: any): Promise<any> {
    return await fetch.post(`/api/fexriad`, data);
  }

  static async AddAbility(data: any): Promise<any> {
    return await fetch.post(`/api/Meharet`, data);
  }

  static async AddForeignLanguage(data: any): Promise<any> {
    return await fetch.post(`/api/XariciDil`, data);
  }

  static async AddRank(data: any): Promise<any> {
    return await fetch.post(`/api/rank`, data);
  }

  static async AddRent(data: any): Promise<any> {
    return await fetch.post(`/api/kiraye`, data);
  }

  static async AddDiscount(data: any): Promise<any> {
    return await fetch.post(`/api/discount`, data);
  }

  static async getDiscount(month?: number, year?: number): Promise<any> {
    return await fetch.get(`/api/discount?month=${month}&year=${year}`);
  }

  static async getDiscounts(): Promise<any> {
    return await fetch.get(`/api/discount/all`);
  }

  static async getExcel(): Promise<any> {
    return await fetch.get(`/api/adminstration/export-excel`, {
      responseType: "blob",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  }

  static async getExcelDistribution(month:number, year:number, search:string): Promise<any> {
    return await fetch.get(`/api/employee/salary/record/distribution?month=${month}&year=${year}&search=${search}`, {
      responseType: "blob",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  }

  static async getExcelReestr(month:number, year:number, search:string): Promise<any> {
    return await fetch.get(`/api/employee/salary/record/reestr?month=${month}&year=${year}&search=${search}`, {
      responseType: "blob",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  };

  static async getRankStatistic(year:number): Promise<any> {
    return await fetch.get(`/api/rank/statistics/${year}`);
  }

  static async getEmployeeStatistic(year:number): Promise<any> {
    return await fetch.get(`/api/employee/salary/record/statistics?year=${year}`);
  }
}
