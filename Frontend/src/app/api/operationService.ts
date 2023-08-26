import fetch from "./interceptor";

export default class OperationService {
  static async login(data: any): Promise<any> {
    return await fetch.post(`/api/login`, data);
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

  static async getRanks(): Promise<any> {
    return await fetch.get(`/api/rank`);
  }

  static async getDiscount(month?: number, year?: number): Promise<any> {
    return await fetch.get(`/api/discount?month=${month}&year=${year}`);
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
}
