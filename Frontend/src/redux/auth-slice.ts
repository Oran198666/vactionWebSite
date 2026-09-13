import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/user-model";

// Auth slice: holds the logged-in user, or null when nobody is logged in.

// Reducer - init a user:
function initUser(_currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const userToInit = action.payload; // Take user to init.
    const newState = userToInit; // New state is the given user.
    return newState; // Return new state to init the user.
}

// Reducer - logout the user:
function logoutUser(_currentState: UserModel, _action: Action): UserModel {
    return null!;
}

// Auth slice:
export const authSlice = createSlice({
    name: "auth-slice",
    initialState: null! as UserModel,
    reducers: { initUser, logoutUser }
});