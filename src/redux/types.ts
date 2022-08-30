import { IStatistic } from '../types/auth-audio/IStatistic';
import { IUserWord } from '../types/auth-audio/IUserWord';
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

export interface ISendStatistic {
  userData: IAuthUser;
  newStatistic: IStatistic;
}

export interface IPostUserWord {
  newUserWord: IUserWord;
  userData: IAuthUser;
}

