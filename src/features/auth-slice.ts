import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export interface AuthSliceProps {
     token: string;
}

const initialState: AuthSliceProps = {
     token: "",
};

const AuthSlice = createSlice({
     initialState,
     name: "auth",
     reducers: {
          AppLogin: (state, action) => {
               state.token = action.payload;
               localStorage.setItem("admin_token", action.payload);
          },
          AppLogOut: (state) => {
               localStorage.removeItem("admin_token");
               state.token = "";
          },
     },
});

export const useAuthSlice = () =>
     useSelector((state: RootState) => {
          return state.auth;
     });
export const AuthReducer = AuthSlice.reducer;
export const { AppLogOut, AppLogin } = AuthSlice.actions;
