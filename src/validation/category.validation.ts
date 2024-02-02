import { boolean, object, string } from "yup";
import { ICategoryProps } from "../interface";

export const initialCategoryValues: ICategoryProps = {
     status: false,
     title: "",
};

export const CategoryValidationSchema = object().shape({
     status: boolean(),
     title: string().required("title is required"),
});
