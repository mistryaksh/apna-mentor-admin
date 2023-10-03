import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface PaymentOptionProps {
     points: string[];
     pointInput?: string;
}

const initialState: PaymentOptionProps = {
     points: [],
};

const PaymentOptionSlice = createSlice({
     initialState,
     name: "paymentOptions",
     reducers: {
          addPoints: (state, action) => {
               state?.points?.push(action.payload as never);
               state.pointInput = "";
          },
          removePoint: (state, action) => {
               state?.points?.splice(action.payload as number, 1);
          },
          setPointInput: (state, action) => {
               state.pointInput = action.payload;
          },
     },
});

export const PaymentOptionReducer = PaymentOptionSlice.reducer;
export const usePaymentOptionSlice = () =>
     useSelector((state: RootState) => {
          return state.paymentOptions;
     });

export const { addPoints, removePoint, setPointInput } = PaymentOptionSlice.actions;
