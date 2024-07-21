import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { api } from "@/redux/api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
// import storage from "redux-persist/lib/storage";
import storage from "@/redux/config/storage";
import { persistReducer, persistStore } from "redux-persist";
import watchlistReducer from "@/redux/features/watchList";
import recentlyViewedReducer from "@/redux/features/recentlyViewed";
import recentlySearchedReducer from "@/redux/features/recentlySearched";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  watchlist: watchlistReducer,
  recentlyViewed: recentlyViewedReducer,
  recentlySearched: recentlySearchedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});
setupListeners(store.dispatch);
export { store };
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
