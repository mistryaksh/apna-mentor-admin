import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toast } from "react-toastify";

interface DoctorSliceProps {
     specialization: string[];
     input?: string | null;
}

const initialState: DoctorSliceProps = {
     specialization: [],
     input: null,
};

const DoctorSlice = createSlice({
     initialState,
     name: "doctors",
     reducers: {
          handleSpecialization: (state, action) => {
               if (!action.payload) {
                    toast.error("Please type something for specialization");
               } else {
                    state.specialization.push(action.payload);
                    state.input = "";
               }
          },
          removeSpecialization: (state, action) => {
               state.specialization.splice(action.payload, 1);
          },
          handleInput: (state, action) => {
               state.input = action.payload;
          },
     },
});

export const DoctorsReducer = DoctorSlice.reducer;
export const useDoctorSlice = () =>
     useSelector((state: RootState) => {
          return state.doctors;
     });
export const { handleInput, handleSpecialization, removeSpecialization } = DoctorSlice.actions;
