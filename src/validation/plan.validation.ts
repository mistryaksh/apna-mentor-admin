import { object, string } from "yup";
import { PaymentOptionProps } from "../interface";

export interface PlanOptionProps {
     planName: string;
     price: number;
     validFor: string;
}

export const PlanOptionInitialValues: PlanOptionProps = {
     planName: "",
     price: 0,
     validFor: "",
};

export const PlanOptionValidateSchema = object().shape({
     planName: string().required("Please enter plan name"),
     price: string().required("Please enter plan prices"),
     validFor: string().required("Please select date for current plan"),
});
