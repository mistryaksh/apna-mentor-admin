import { setupListeners } from "@reduxjs/toolkit/query/react";

import { configureStore, ThunkAction, Action, combineReducers, Middleware } from "@reduxjs/toolkit";
import {
     AccountApiMiddleware,
     AccountApiReducer,
     BlogApiMiddleware,
     BlogApiReducer,
     CallApiMiddleware,
     CallApiReducer,
     CategoryApiMiddleware,
     CategoryApiReducer,
     MentorApiMiddleware,
     MentorApiReducer,
     UserApiMiddleware,
     UserApiReducer,
} from "./api";
import { AccountReducer, CategoryReducer, LayoutReducer, MentorReducer, BlogReducer } from "./features";

const rootState = combineReducers({
     // api
     accountApi: AccountApiReducer,
     mentorApi: MentorApiReducer,
     callApi: CallApiReducer,
     userApi: UserApiReducer,
     categoryApi: CategoryApiReducer,
     blogApi: BlogApiReducer,
     // features
     account: AccountReducer,
     layout: LayoutReducer,
     category: CategoryReducer,
     mentor: MentorReducer,
     blog: BlogReducer,
});

const ApiMiddleware: Middleware[] = [
     AccountApiMiddleware,
     MentorApiMiddleware,
     CallApiMiddleware,
     UserApiMiddleware,
     CategoryApiMiddleware,
     BlogApiMiddleware
];

export const store = configureStore({
     reducer: rootState,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

setupListeners(store.dispatch);
