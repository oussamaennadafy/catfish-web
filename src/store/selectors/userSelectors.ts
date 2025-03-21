import { RootState } from "../types/root";

export const selectUser = (state: RootState) => state.user.user;