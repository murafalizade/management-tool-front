import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModalTabProps {
  tab: string;
  show: boolean;
}

export interface ModalShowType {
  show: boolean;
  modalInfo: IModalTabProps;
  selectedRow: any;
  showCreateModal: boolean;
}

const initialState: ModalShowType = {
  show: false,
  modalInfo: {
    tab: "",
    show: false,
  },
  showCreateModal: false,
  selectedRow: {},
};

export const showModalSlicer = createSlice({
  name: "showModal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.show = true;
    },

    showModalCreate: (state) => {
      state.showCreateModal = true;
    },

    hideModalCreate: (state) => {
      state.showCreateModal = false;
    },

    hideModal: (state) => {
      state.show = false;
    },
    changeModalInfo: (state, action: PayloadAction<IModalTabProps>) => {
      state.modalInfo = action.payload;
    },
    setSelectedRow: (state, action: PayloadAction<any>) => {
      state.selectedRow = action.payload;
    },
  },
});

export const {
  showModal,
  hideModal,
  changeModalInfo,
  setSelectedRow,
  showModalCreate,
  hideModalCreate,
} = showModalSlicer.actions;

export default showModalSlicer.reducer;
