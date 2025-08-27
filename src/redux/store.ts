import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dogsApi } from "./services/dogsApi";

const rootReducer = combineReducers({
  [dogsApi.reducerPath]: dogsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dogsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
