import { createSelector } from "@reduxjs/toolkit";
import { AuthenticationSliceState } from "../slices/authenticationSlice";
import { RootState } from "../types/root";

export const selectAuthentication = (state: RootState) => state.authentication;
export const selectToken = createSelector(selectAuthentication, (state: AuthenticationSliceState) => state.token);