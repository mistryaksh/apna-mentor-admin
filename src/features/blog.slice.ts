import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const BlogSlice = createSlice({
     initialState: {
          label: "",
          image: "",
          body: "",
     },
     name: "blog",
     reducers: {
          handleTitle: (state, action) => {
               state.label = action.payload;
          },
          handleImage: (state, action) => {
               state.image = action.payload;
          },
          handleBody: (state, action) => {
               state.body = action.payload;
          },
     },
});

export const BlogStateReducer = BlogSlice.reducer;
export const useBlogSlice = () =>
     useSelector((state: RootState) => {
          return state.blog;
     });

export const { handleBody, handleImage, handleTitle } = BlogSlice.actions;
