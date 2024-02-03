import { boolean, object, string } from "yup";
import { ICategoryProps } from "../interface";

export const initialCategoryValues: ICategoryProps = {
     _id: "",
     status: false,
     title: "",
};

export const CategoryValidationSchema = object().shape({
     status: boolean(),
     title: string().required("title is required"),
});

export const initialSubCategoryValues = {
     _id: "",
     categoryId: "",
     causes: [],
     desc: "",
     label: "",
     subTitle: "",
     symptoms: [],
     treatment: [],
};

export const SubCategoryValidationSchema = object().shape({
     categoryId: string().required("category is required"),
     causes: string().required("causes is required"),
     desc: string().required("desc is required"),
     label: string().required("label is required"),
     subTitle: string().required("subTitle is required"),
     symptoms: string().required("symptoms is required"),
     treatment: string().required("treatment is required"),
});
