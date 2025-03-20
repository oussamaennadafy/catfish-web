import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type AuthenticationSliceState = {
  token: string | null;
};

const initialState: AuthenticationSliceState = {
  token: null,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
    clearToken: (state) => {
			state.token = null;
		},
  }
})

export const { setToken, clearToken } = authenticationSlice.actions

export { authenticationSlice };