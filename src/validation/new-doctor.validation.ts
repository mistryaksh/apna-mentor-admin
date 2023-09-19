import { boolean, object, string } from "yup";

export const NewDoctorInitial = {
     password: "abc123",
     username: "karl1234",
     address: "5th main streen, UK, Bharat-000000",
     email: "karl123",
     mobile: "1234465674",
     firstName: "karl",
     lastName: "smith",
     gender: "not_to_say",
     hospitalAddress: "9th main streen, UK, Bharat-000000",
     hospitalName: "medicare multi speciality hostpital",
     specialization: ["Orthopedics", "Dermatology", "Pediatrics"],
};

export const NewDoctorValidation = object().shape({
     password: string().required("password is required"),
     username: string().required("username is required"),
     address: string().required("address is required"),
     email: string().required("email is required"),
     mobile: string().required("mobile is required"),
     firstName: string().required("firstName is required"),
     lastName: string().required("lastName is required"),
     hospitalAddress: string().required("hospital sddress is required"),
     active: boolean(),
     hospitalName: string().required("hospitalName is required"),
     // specialization: string().required("specialization is required"),
});
