import fetch from './interceptor';

export default class OperationService {
    static async getAdminstration(): Promise<any> {
        return await fetch.get(`/api/adminstration`);
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

    static async deleteOrganizationById(id:number): Promise<any> {
        return await fetch.delete(`/api/department/${id}`);
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

    static async getExcel(): Promise<any> {
        return await fetch.get(`/api/adminstration/export-excel`,
        {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }

        });
    }
}
