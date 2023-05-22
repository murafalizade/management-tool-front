import { IDepartment } from "./IDepartment";

export interface IOrganization {
    id: number;
    name: string;
    shortName: string;
    departments: IDepartment[];
}