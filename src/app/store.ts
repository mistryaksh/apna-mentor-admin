import { setupListeners } from "@reduxjs/toolkit/query/react";

import { configureStore, ThunkAction, Action, combineReducers, Middleware } from "@reduxjs/toolkit";
import {
     AccountApiMiddleware,
     AccountApiReducer,
     CallApiMiddleware,
     CallApiReducer,
     CategoryApiMiddleware,
     CategoryApiReducer,
     MentorApiMiddleware,
     MentorApiReducer,
     UserApiMiddleware,
     UserApiReducer,
} from "./api";
import { AccountReducer, CategoryReducer, LayoutReducer } from "./features";

const rootState = combineReducers({
     // api
     accountApi: AccountApiReducer,
     mentorApi: MentorApiReducer,
     callApi: CallApiReducer,
     userApi: UserApiReducer,
     categoryApi: CategoryApiReducer,
     // features
     account: AccountReducer,
     layout: LayoutReducer,
     category: CategoryReducer,
});

const ApiMiddleware: Middleware[] = [
     AccountApiMiddleware,
     MentorApiMiddleware,
     CallApiMiddleware,
     UserApiMiddleware,
     CategoryApiMiddleware,
];

export const store = configureStore({
     reducer: rootState,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

setupListeners(store.dispatch);
