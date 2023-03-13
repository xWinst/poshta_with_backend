import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HistoryState = {
    list: string[];
    currentTTN: string;
};

const initialState: HistoryState = {
    list: [],
    currentTTN: "",
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addTTN: (state, action: PayloadAction<string>) => {
            state.list.push(action.payload);
            state.list = state.list.filter(
                (ttn, i) => state.list.indexOf(ttn) === i
            );
            state.currentTTN = "";
        },
        removeTTN: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((ttn) => ttn !== action.payload);
        },

        removeAll: (state) => initialState,

        setTTN: (state, action: PayloadAction<string>) => {
            state.currentTTN = action.payload;
        },
    },
});

export const { addTTN, removeTTN, removeAll, setTTN } = historySlice.actions;

export default historySlice.reducer;
