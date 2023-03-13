import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Days } from "db/Days";

axios.defaults.baseURL = "https://api.novaposhta.ua/v2.0/json/";

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
    { CityName?: string; Ref?: string },
    { rejectValue: string }
>("getWarehouses", async (method, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("", {
            apiKey: "8e904f55406e03101da547dfe0c30720",
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: method,
        });

        const branchList: Branch[] = data.data.map((branch: any) => {
            const { Width, Height, Length } =
                branch.SendingLimitationsOnDimensions;
            return {
                id: branch.Ref,
                city: branch.CityDescription,
                name: branch.Description,
                adress: branch.ShortAddress,
                type: branch.TypeOfWarehouse,
                phone: branch.Phone,
                maxWeight: Number(branch.PlaceMaxWeightAllowed),
                maxDimensions: `${Width} x ${Height} x ${Length}`,
                longitude: Number(branch.Longitude),
                latitude: Number(branch.Latitude),
                hasPostFinance: branch.PostFinance === "1",
                hasBicycleParking: branch.BicycleParking === "1",
                hasPOSTerminal: branch.POSTerminal === "1",
                hasInternational: branch.InternationalShipping === "1",
                hasSelfWorkplaces: branch.SelfServiceWorkplacesCount === "1",
                canGetMoneyTransfer: branch.CanGetMoneyTransfer === "1",
                hasGeneratorEnabled: branch.GeneratorEnabled === "1",
                schedule: branch.Schedule,
                isShow: !!method.CityName,
            };
        });

        return branchList;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const getBranches = (city: string) => {
    return getWarehouses({ CityName: city });
};

export const getBranchByRef = (ref: string) => {
    return getWarehouses({ Ref: ref });
};
