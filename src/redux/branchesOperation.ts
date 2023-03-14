import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Days } from "db/Days";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export type Branch = {
    id: string;
    city: string;
    name: string;
    adress: string;
    type: string;
    phone: string;
    maxWeight: number;
    maxDimensions: string;
    longitude: number;
    latitude: number;
    hasPostFinance: boolean;
    hasBicycleParking: boolean;
    hasPOSTerminal: boolean;
    hasInternational: boolean;
    hasSelfWorkplaces: boolean;
    canGetMoneyTransfer: boolean;
    hasGeneratorEnabled: boolean;
    schedule: Days;
    isShow: boolean;
};

export const getWarehouses = createAsyncThunk<
    Branch[],
    string,
    { rejectValue: string }
>("getWarehouses", async (request, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(request);

        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const getBranches = (city: string) => {
    return getWarehouses(`/branch?CityName=${city}`);
};

export const getBranchByRef = (ref: string) => {
    return getWarehouses(`/branch/${ref}`);
};
