import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWarehouses, Branch } from "./branchesOperation";

type BranchesState = {
    list: Branch[];
    filter: boolean[];
    isLoading: boolean;
    error: string | undefined;
};

const initialState: BranchesState = {
    list: [],
    filter: [true, true, false],
    isLoading: false,
    error: "",
};

const branchesSlice = createSlice({
    name: "branches",
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<number>) => {
            state.filter[action.payload] = !state.filter[action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWarehouses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getWarehouses.fulfilled,
                (state, action: PayloadAction<Branch[]>) => {
                    state.list = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(getWarehouses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { changeFilter } = branchesSlice.actions;

export default branchesSlice.reducer;
