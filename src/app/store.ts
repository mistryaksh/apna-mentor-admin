import { setupListeners } from "@reduxjs/toolkit/query/react";

import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { AuthReducer, BlogStateReducer, DoctorsReducer, LayoutReducer, PaymentOptionReducer } from "../features";
import {
     BlogMiddleware,
     BlogReducer,
     DoctorMiddleware,
     DoctorReducer,
     AuthenticationMiddleware,
     AuthenticationReducer,
     UsersReducer,
     UserMiddleware,
     PlanOptionMiddleware,
     PlanOptionReducer,
} from "./async-action";

const rootState = combineReducers({
     // NORMAL STATES
     doctors: DoctorsReducer,
     auth: AuthReducer,
     layout: LayoutReducer,
     blog: BlogStateReducer,
     paymentOptions: PaymentOptionReducer,
     // API CALLS
     blogApi: BlogReducer,
     doctorApi: DoctorReducer,
     userApi: UsersReducer,
     authApi: AuthenticationReducer,
     planOptionApi: PlanOptionReducer,
});

const ApiMiddleware = [
     AuthenticationMiddleware,
     DoctorMiddleware,
     BlogMiddleware,
     UserMiddleware,
     PlanOptionMiddleware,
];

export const store = configureStore({
     reducer: rootState,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

setupListeners(store.dispatch);
export * from "./async-action";
