import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../types/types';
import { IAuthUser } from '../types/types';
import { IGetUserWords, IPostUserWord, ISendStatistic, ISignIn } from './types';

export const BASE_URL = 'https://rs-lang-be-orcn.onrender.com';

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
      if (e instanceof Error) console.log(e.message);
      return thunkAPI.rejectWithValue('New user could not be created! Try again.');
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
      if (e instanceof Error) console.log(e.message);
      return thunkAPI.rejectWithValue('Failed to log in to my account! Try again.');
    }
  }
);

export const fetchAllWords = createAsyncThunk(
  'thunks/fetchAllWords',
  async (pageParams: { page: string; group: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://rs-lang-be-orcn.onrender.com/words/?page=${pageParams.page}&group=${pageParams.group}`
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      return thunkAPI.rejectWithValue('Failed to get the words');
    }
  }
);

export const fetchUserWords = createAsyncThunk(
  'thunks/fetchUserWords',
  async (userData: IGetUserWords, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userData.userId}/words`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load user words');
    }
  }
);

export const postUserWord = createAsyncThunk(
  'thunks/postUserWord',
  async ({ newUserWord, userData }: IPostUserWord, thunkAPI) => {
    const { wordId } = newUserWord.optional;
    try {
      await axios.post(`${BASE_URL}/users/${userData.userId}/words/${wordId}`, newUserWord, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to post a word in the database');
    }
  }
);

export const updateUserWord = createAsyncThunk(
  'thunks/updateUserWord',
  async ({ newUserWord, userData }: IPostUserWord, thunkAPI) => {
    const { wordId } = newUserWord.optional;
    try {
      await axios.put(`${BASE_URL}/users/${userData.userId}/words/${wordId}`, newUserWord, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update a word in the database');
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
      return thunkAPI.rejectWithValue('Failed to get statistics');
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
      return thunkAPI.rejectWithValue('Failed to send statistics');
    }
  }
);
