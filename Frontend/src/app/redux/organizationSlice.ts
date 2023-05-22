import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrganization } from "../types/IOrganization";
import { IDepartment } from "../types/IDepartment";
import { IPosition } from "../types/IPosition";


export interface ModalShowType {
  show: boolean;
  departments:IDepartment[];
  positions:IPosition[];
  selectedRow: any;
}

const initialState: ModalShowType = {
  show: false,
  selectedRow: {},
  departments:[],
  positions:[]
};

export const organizationSlicer = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setSelectedRow: (state, action: PayloadAction<any>) => {
      state.selectedRow = action.payload;
    },
    
    setDepartment: (state, action: PayloadAction<IDepartment[]>) => {
        state.departments = action.payload;
    },

    addDepartment: (state, action: PayloadAction<IDepartment>) => {
        state.departments = [...state.departments, action.payload];
    },

    deleteDepartment: (state, action: PayloadAction<number>) => {
        state.departments = state.departments.filter((department) => department.id !== action.payload);
    },

    setPositions: (state, action: PayloadAction<IPosition[]>) => {
        state.positions = action.payload;
    },

    addPosition: (state, action: PayloadAction<IPosition>) => {
        state.positions = [...state.positions, action.payload];
    },
  },
});

export const { setSelectedRow,setDepartment ,addDepartment,deleteDepartment, setPositions, addPosition} =
organizationSlicer.actions;

export default organizationSlicer.reducer;
