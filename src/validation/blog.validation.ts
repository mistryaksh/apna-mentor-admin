import { boolean, object, string } from "yup";
import { INewBlogProps } from "../interface";

export const NewBlogInitialValue: INewBlogProps = {
     active: true,
     image: "",
     label: "",
};

export const NewBlogValidationSchema = object().shape({
     active: boolean(),
     image: string().required("please upload blog image"),
     label: string().required("please enter blog title"),
});
