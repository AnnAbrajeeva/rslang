export interface ICreatedUser {
  id: string;
  name: string;
  email: string;
}

export interface IRegistrationState {
  isCreatingUser: boolean;
  userCreationError: string | null;
  registeringFlag: boolean;
}