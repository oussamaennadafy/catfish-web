import { User } from "@/features/authentication/types/user";
import { AuthenticationSliceState } from "../slices/authenticationSlice";

export interface RootState {
	authentication: AuthenticationSliceState;
	user: {
		user: User
	}
}
