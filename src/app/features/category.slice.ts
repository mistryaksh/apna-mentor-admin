import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";

interface CategorySliceProps {
     newModel: boolean;
}

const initialState: CategorySliceProps = {
     newModel: false,
};

const CategorySlice = createSlice({
     initialState,
     name: "category",
     reducers: {
          handleNewCategoryModel: (state) => {
               state.newModel = !state.newModel;
          },
     },
});

export const CategoryReducer = CategorySlice.reducer;
export const useCategorySlice = () =>
     useAppSelector((state) => {
          return state.category;
     });
export const { handleNewCategoryModel } = CategorySlice.actions;
