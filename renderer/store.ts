import { configureStore } from "@reduxjs/toolkit";
import userLoggedReducer from "./features/userLogged/userLoggedSlice";
import counterReducer from "./features/counterSlice/counterSlice";

export const store = configureStore({
	reducer: {
		userLogged: userLoggedReducer,
		counter: counterReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
