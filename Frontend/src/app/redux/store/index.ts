import { configureStore } from "@reduxjs/toolkit";

import { showModalSlicer } from "../showModalSlice";
import { organizationSlicer } from "../organizationSlice";

export const store = configureStore({
  reducer: {
    showModal: showModalSlicer.reducer,
    organization: organizationSlicer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
