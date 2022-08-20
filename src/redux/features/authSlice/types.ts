import { IAuthUser } from "../../../types/types";

export interface IAuthState {
  authUserData: null | IAuthUser;
  isSigningIn: boolean;
  signingInError: null | string;
  enteringFlag: boolean;
}