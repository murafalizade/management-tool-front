import { IPosition } from "./IPosition";

export interface IDepartment {
    id?: number;
    name: string;
    positions?: IPosition[];
}