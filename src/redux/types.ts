import { IUserWord } from '../types/IUserWord';
import { IAuthUser } from '../types/types';

export interface ISignIn {
  email: string;
  password: string;
}

export interface ILoadingPageData {
  savedGroupNumber: number;
  savedPageNumber: number;
}

export interface IGetUserWords {
  userId: string;
  token: string;
}

export interface ICreateUserWord {
  userId: string;
  wordId: string;
  token: string;
  wordData: IUserWord;
}

export interface IDeleteUserWord {
  userId: string;
  wordId: string;
  token: string;
}

export interface IPostUserWord {
  newUserWord: IUserWord;
  userData: IAuthUser;
}

