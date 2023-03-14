import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTTN } from "./historyReducer";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export type Status = {
    isLoading: boolean;
    status: string;
    receivedDate: string;
    deliveryDate: string;
    recipientCity: string;
    senderCity: string;
    dispatchDate: string;
    isParcelDelivered: boolean;
    senderBranch: string;
    recipientBranch: string;
    senderBranchId: string;
    recipientBranchId: string;
    error: string | undefined;
};

export const getStatus = createAsyncThunk<
    Status,
    string,
    { rejectValue: string }
>("getStatus", async (number, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/ttn/${number}`);

        if (!data)
            return rejectWithValue(`ТТН за номером ${number} не знайдено`);

        dispatch(addTTN(number));

        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});
