import fetch from "./interceptor";

export default class EmployeeService {
  static async getEmployeeById(id: number): Promise<any> {
    return await fetch.get(`/api/employee/${id}`);
  }

  static async getEmployeeByAll(): Promise<any> {
    return await fetch.get(`/api/employee`);
  }

  static async deleteEmployeeById(id: number): Promise<any> {
    return await fetch.delete(`/api/employee/${id}`);
  }

  static async addEmployee(data: any): Promise<any> {
    return await fetch.post(`/api/employee`, data);
  }

  static async updateEmployee(data: any): Promise<any> {
    return await fetch.put(`/api/employee`, data);
  }

  static async getEmployeeSalaryRecord(
    month: number,
    year: number,
    filter: string
  ): Promise<any> {
    return await fetch.get(
      `/api/employee/salary/record/?month=${month}&year=${year}&search=${filter}`
    );
  }

  static async getEmployeeSalaryRecordByEmployeeId(
    id: number,
    year: number
  ): Promise<any> {
    return await fetch.get(
      `/api/employee/salary/record/employee?employeeId=${id}&year=${year}`
    );
  }

  static async getEmployeeSalaryRecordById(id: number): Promise<any> {
    return await fetch.get(`/api/employee/salary/record/${id}`);
  }

  static async getEmployeeByPositionId(id: number): Promise<any> {
    return await fetch.get(`/api/employee/position/${id}`);
  }

  static async updateNextMonth(): Promise<any> {
    return await fetch.post(`/api/employee/salary/record/nextmonth`);
  }

  static async updateEmployeeSalaryRecord(data: any): Promise<any> {
    return await fetch.put(`/api/employee/salary/record`, data);
  }

  static async getKiraye(): Promise<any> {
    return await fetch.get(`/api/kiraye`);
  }

  static async exportEmployeeSalaryRecord(
    month: number,
    year: number,
    filter: string
  ): Promise<any> {
    return await fetch.get(
      `/api/employee/salary/record/export/?month=${month}&year=${year}&search=${filter}`,
      {
        responseType: "blob",
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      }
    );
  }
}
