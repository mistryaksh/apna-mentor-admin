export interface UserProps {
     name: {
          firstName: string;
          lastName: string;
     };
     email: string;
     mobile: string;
     password: string;
     verified: boolean;
     online: boolean;
     block: boolean;
     role: "admin" | "user" | "doctor";
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface ISignInProps {
     mobile: string;
     password: string;
}
