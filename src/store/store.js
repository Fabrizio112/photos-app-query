import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice"
import { photosApi } from "./apis/photosApi";
export const store = configureStore({
    reducer: {
        search: searchReducer,
        [photosApi.reducerPath]: photosApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(photosApi.middleware)
})