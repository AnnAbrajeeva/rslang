/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../types/types';
import { IAuthUser } from '../types/types';
import {
  ICreateUserWord,
  IDeleteUserWord,
  IGetUserWords,
  ILoadingPageData,
  IPostUserWord,
  ISendStatistic,
  ISignIn,
} from './types';

export const BASE_URL = 'https://rs-lang-base.herokuapp.com';
export const BASE_URL2 = 'https://zoukman-rslang.herokuapp.com';

export const createUser = createAsyncThunk(
  'thunks/createUser',
  async ({ name, email, password }: IUser, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + '/users', {
        name,
        email,
        password,
      });

      return response.data;
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      return thunkAPI.rejectWithValue(
        'Не удалось создать нового пользователя! Попробуйте еще раз.'
      );
    }
  }
);

export const signIn = createAsyncThunk(
  'thunks/signIn',
  async ({ email, password }: ISignIn, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + '/signin', {
        email,
        password,
      });

      return response.data;
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      return thunkAPI.rejectWithValue(
        'Не удалось войти в учётную запись! Попробуйте еще раз.'
      );
    }
  }
);

export const fetchAllWords = createAsyncThunk(
  'thunks/fetchAllWords',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL2}/wordsAll`); 
      return response.data.map((el: any) =>
        ({ ...el, _id: el._id.$oid })
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      return thunkAPI.rejectWithValue('Не удалось получить слова');
    }
  }
);

export const fetchUserWords = createAsyncThunk(
  'thunks/fetchUserWords',
  async (userData: IGetUserWords, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/${userData.userId}/words`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Не удалось загрузить слова пользователя'
      );
    }
  }
);

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async (pageData: ILoadingPageData, thunkAPI) => {
    try {
      const response = await axios(
        `${BASE_URL}/words?group=${pageData.savedGroupNumber - 1}&page=${pageData.savedPageNumber - 1
        }`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Не удалось загрузить данные. Ошибка сервера'
      );
    }
  }
);

export const getUserWords = createAsyncThunk(
  'words/getUserWords',
  async (userData: IGetUserWords, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/${userData.userId}/aggregatedWords?wordsPerPage=3600&filter={"$or":[{"userWord.difficulty":"difficult"}, {"userWord.difficulty":"easy"}]}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data[0].paginatedResults;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить слова');
    }
  }
);

export const createUserWord = createAsyncThunk(
  'words/createUserWord',
  async (userWord: ICreateUserWord, thunkAPI) => {
    try {
      await axios.post(
        `${BASE_URL}/users/${userWord.userId}/words/${userWord.wordId}`,
        {
          headers: {
            Authorization: `Bearer ${userWord.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось добавить слово');
    }
  }
);

export const updateCurrentWord = createAsyncThunk(
  'words/updateCurrentWord',
  async (userWord: ICreateUserWord, thunkAPI) => {
    try {
      await axios.put(
        `${BASE_URL}/users/${userWord.userId}/words/${userWord.wordId}`,
        userWord.wordData,
        {
          headers: {
            Authorization: `Bearer ${userWord.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось добавить слово');
    }
  }
);

export const deleteUserWord = createAsyncThunk(
  'words/deleteUserWord',
  async (userWord: IDeleteUserWord, thunkAPI) => {
    try {
      await axios.delete(
        `${BASE_URL}/users/${userWord.userId}/words/${userWord.wordId}`,
        {
          headers: {
            Authorization: `Bearer ${userWord.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось удалить слово');
    }
  }
);

export const postUserWord = createAsyncThunk(
  'thunks/postUserWord',
  async ({ newUserWord, userData }: IPostUserWord, thunkAPI) => {
    const { wordId } = newUserWord.optional;
    try {
      await axios.post(
        `${BASE_URL}/users/${userData.userId}/words/${wordId}`,
        newUserWord,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Не удалось обновить слово в базе данных'
      );
    }
  }
);

export const updateUserWord = createAsyncThunk(
  'thunks/updateUserWord',
  async ({ newUserWord, userData }: IPostUserWord, thunkAPI) => {
    const { wordId } = newUserWord.optional;
    try {
      await axios.put(
        `${BASE_URL}/users/${userData.userId}/words/${wordId}`,
        newUserWord,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Не удалось обновить слово в базе данных'
      );
    }
  }
);

export const getStatistic = createAsyncThunk(
  'statistic/getStatistic',
  async (userData: IAuthUser, thunkAPI) => {
    const { userId, token } = userData;
    try {
      const response = await axios(`${BASE_URL}/users/${userId}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось получить статистику');
    }
  }
);

export const sendStatistic = createAsyncThunk(
  'statistic/sendStatistic',
  async (statisticData: ISendStatistic, thunkAPI) => {
    const { userData, newStatistic } = statisticData;
    try {
      await axios.put(
        `${BASE_URL}/users/${userData.userId}/statistics`,
        {
          ...newStatistic,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось получить статистику');
    }
  }
);
