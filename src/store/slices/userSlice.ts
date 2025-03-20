import { User } from "@/features/authentication/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UserSliceState = {
  user: User | null;
};

const initialState: UserSliceState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
  }
})

export const { setUser } = userSlice.actions

export { userSlice };