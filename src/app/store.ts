import { setupListeners } from "@reduxjs/toolkit/query/react";

import { configureStore, ThunkAction, Action, combineReducers, Middleware } from "@reduxjs/toolkit";
import {
     AccountApiMiddleware,
     AccountApiReducer,
     CallApiMiddleware,
     CallApiReducer,
     MentorApiMiddleware,
     MentorApiReducer,
     UserApiMiddleware,
     UserApiReducer,
} from "./api";
import { AccountReducer, LayoutReducer } from "./features";

const rootState = combineReducers({
     // api
     accountApi: AccountApiReducer,
     mentorApi: MentorApiReducer,
     callApi: CallApiReducer,
     userApi: UserApiReducer,
     // features
     account: AccountReducer,
     layout: LayoutReducer,
});

const ApiMiddleware: Middleware[] = [AccountApiMiddleware, MentorApiMiddleware, CallApiMiddleware, UserApiMiddleware];

export const store = configureStore({
     reducer: rootState,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

setupListeners(store.dispatch);
