import { boolean, object, string } from "yup";

export const NewDoctorInitial = {
     password: "",
     username: "",
     address: "",
     email: "",
     mobile: "",
     firstName: "",
     lastName: "",
     gender: "",
     hospitalAddress: "",
     hospitalName: "",
     specialization: [],
};

export const NewDoctorValidation = object().shape({
     password: string().required("password is required"),
     username: string().required("username is required"),
     address: string().required("address is required"),
     email: string().required("email is required"),
     mobile: string().required("mobile is required").max(10).min(10),
     firstName: string().required("firstName is required"),
     lastName: string().required("lastName is required"),
     hospitalAddress: string().required("hospital sddress is required"),
     active: boolean(),
     hospitalName: string().required("hospitalName is required"),
     // specialization: string().required("specialization is required"),
});
