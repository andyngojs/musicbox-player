import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AppReducer from "@/redux/slices/app.slice";
import PlayerReducer from "@/redux/slices/player.slice";

const combinedReducer = combineReducers({
  app: AppReducer,
  player: PlayerReducer,
});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "music-box",
      storage,
    },
    combinedReducer,
  ),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });
  },
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
