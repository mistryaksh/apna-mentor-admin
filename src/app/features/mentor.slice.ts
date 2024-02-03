import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";

interface MentorSliceProps {
    auth: {
        username: string,
        password: string
    }
    category: string,
    contact: {
        email: string,
        mobile: string,
        address: string
    }
    name: {
        firstName: string,
        lastName: string
    }
    specialists: string[],
    accountStatus: {
        block: boolean,
        online: boolean,
        verification: boolean
    }
    acType: string,
    subCategory: string[],
}

const initialState: MentorSliceProps = {
    auth: {
        username: "",
        password: "",
    },
    category: "",
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

const MentorSlice = createSlice({
    initialState,
    name: "mentor",
    reducers: {
    }
});

export const MentorReducer = MentorSlice.reducer;
export const useMentorSlice = () =>
    useAppSelector((state: { mentor: any }) => {
        return state.mentor;
    });
export const {} = MentorSlice.actions;
