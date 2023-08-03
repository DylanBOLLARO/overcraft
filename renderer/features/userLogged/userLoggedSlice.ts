import { createSlice } from "@reduxjs/toolkit";

export interface userLoggedState {
	value: number;
}

const initialState: userLoggedState = {
	value: 0,
};

export const userLoggedSlice = createSlice({
	name: "userLogged",
	initialState,
	reducers: {
		refresh: (state) => {
			state.value += 1;
		},
	},
});

export const { refresh } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
