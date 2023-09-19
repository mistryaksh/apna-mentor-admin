import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export interface LayoutSliceProps {
     sideNav?: boolean;
     navBar?: boolean;
     model?: boolean;
}

const InitialLayout: LayoutSliceProps = {
     sideNav: true,
     navBar: true,
};

const LayoutSlice = createSlice({
     initialState: InitialLayout,
     name: "layout",
     reducers: {
          handleSideNav: (state) => {
               state.sideNav = !state.sideNav;
          },
          handleNavbar: (state) => {
               state.navBar = !state.navBar;
          },
          handleModel: (state) => {
               state.model = !state.model;
          },
     },
});

export const useLayoutSlice = () =>
     useSelector((state: RootState) => {
          return state.layout;
     });
export const LayoutReducer = LayoutSlice.reducer;
export const { handleNavbar, handleSideNav, handleModel } = LayoutSlice.actions;
