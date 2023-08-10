import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModalTabProps {
  tab: string;
  show: boolean;
}

export interface ModalShowType {
  show: number;
  modalInfo: IModalTabProps;
  selectedRow: any;
  showCreateModal: boolean;
  showModalRank: boolean;
  showModalCompensation: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
}

const initialState: ModalShowType = {
  show: 0,
  modalInfo: {
    tab: "",
    show: false,
  },
  showCreateModal: false,
  selectedRow: {},
  showModalRank: false,
  showModalCompensation: false,
  showEditModal: false,
  showDeleteModal: false,
};

export const showModalSlicer = createSlice({
  name: "showModal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<number>) => {
      state.show = action.payload;
    },

    showModalRank: (state) => {
      state.showModalRank = true;
    },

    showModalCompensation: (state) => {
      state.showModalCompensation = true;
    },

    showModalEdit: (state) => {
      state.showEditModal = true;
    },

    showModalDelete: (state) => {
      state.showDeleteModal = true;
    },

    hideModalCompensation: (state) => {
      state.showModalCompensation = false;
    },

    hideModalRank: (state) => {
      state.showModalRank = false;
    },

    showModalCreate: (state) => {
      state.showCreateModal = true;
    },

    hideModalCreate: (state) => {
      state.showCreateModal = false;
    },

    hideModalEdit: (state) => {
      state.showEditModal = false;
    },

    hideModalDelete: (state) => {
      state.showDeleteModal = false;
    },

    hideModal: (state) => {
      state.show = 0;
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
  showModalRank,
  hideModalRank,
  showModalCompensation,
  hideModalCompensation,
  showModalEdit,
  hideModalEdit,
  showModalDelete,
  hideModalDelete,
} = showModalSlicer.actions;

export default showModalSlicer.reducer;
