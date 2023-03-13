import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStatus, Status } from "./statusOperation";

const initialState: Status = {
    isLoading: false,
    status: "",
    receivedDate: "",
    deliveryDate: "",
    recipientCity: "",
    senderCity: "",
    dispatchDate: "",
    isParcelDelivered: false,
    senderBranch: "",
    recipientBranch: "",
    senderBranchId: "",
    recipientBranchId: "",
    error: "",
};

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getStatus.fulfilled,
                (state, action: PayloadAction<Status>) => action.payload
            )
            .addCase(getStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// export const { setStatus } = statusSlice.actions;

export default statusSlice.reducer;
