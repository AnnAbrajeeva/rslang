import { IAuthUser } from "../../../types/types";

export interface IAuthState {
  authData: null | IAuthUser;
  isSigningIn: boolean;
  signingInError: null | string;
  enteringFlag: boolean;
}