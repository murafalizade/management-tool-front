import { configureStore } from "@reduxjs/toolkit";

import { showModalSlicer } from "../showModalSlice";

export const store = configureStore({
  reducer: {
    showModal: showModalSlicer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
