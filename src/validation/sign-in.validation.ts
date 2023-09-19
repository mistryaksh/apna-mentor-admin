import { object, string } from "yup";
import { ISignInProps } from "../interface";

export const SignInValidationValue: ISignInProps = {
     mobile: "9892880271",
     password: "abc123",
};

export const SignInSchema = object().shape({
     mobile: string().required("Mobile number is required"),
     password: string().required("Password is required"),
});
