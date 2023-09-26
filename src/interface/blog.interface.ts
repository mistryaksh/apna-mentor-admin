import { UserProps } from "./user.interface";

export interface IBlogProps {
     label: string;
     image: string;
     body: string;
     adminId: UserProps;
     active: boolean;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface INewBlogProps {
     label: string;
     image: string;
     body?: string;
     active: boolean;
}
