import { object, string } from "yup";
import { IMentorProps } from "../interface";

export const initialMentorValues: IMentorProps = {
     auth: {
          username: "",
          password: "",
     },
     category: "" as any,
     contact: {
          email: "",
          mobile: "",
          address: "",
     },
     name: {
          firstName: "",
          lastName: "",
     },
     specialists: [],
     accountStatus: {
          block: false,
          online: false,
          verification: false,
     },
     acType: "MENTOR",
     subCategory: [],
};

export const MentorValidationSchema = object().shape({
     username: string().required("username is required"),
     password: string().required("password is required"),
     category: string().required("category is required"),
     email: string().email("email is not valid").required("email is required"),
     mobile: string().required("mobile is required"),
     address: string().required("address is required"),
     firstName: string().required("first name is required"),
     lastName: string().required("last name is required"),
     specialists: string().required("specialist is required"),
     subCategory: string().required("sub category is required"),
});
