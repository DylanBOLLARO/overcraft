import { createSlice } from "@reduxjs/toolkit";

export interface userLoggedState {
	value: any;
}

const initialState: userLoggedState = {
	value: null,
};

export const userLoggedSlice = createSlice({
	name: "userLogged",
	initialState,
	reducers: {
		refresh: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { refresh } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
