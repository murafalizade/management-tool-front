import fetch from './interceptor';

export default class EmployeeService{

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
}