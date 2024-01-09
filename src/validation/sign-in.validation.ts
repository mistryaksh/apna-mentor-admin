import { object, string } from "yup";
import { ISignInProps } from "../interface";

export const SignInValidationValue: ISignInProps = {
     email: "bharatmistry@gmail.com",
     password: "abc123",
};

export const SignInSchema = object().shape({
     email: string().email("email is not valid").required("email address is required"),
     password: string().required("password is required"),
});
