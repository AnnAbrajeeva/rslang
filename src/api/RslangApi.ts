import { IStatistic } from "../types/auth-audio/IStatistic";
import { IAuthUser, IUser, IWord, IUserWordParams, IUserStatistics, IUserSettings, IUserWordWithParams, IUserHardWords } from '../types/types'

export default class RslangApi {
  url: string

  constructor() {
    this.url = 'https://rs-lang-base.herokuapp.com/'
  }

  getResource = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Something went wrong. Status: ${res.status}`)
    }
    const content = await res.json()
    return content
  }

  postResource = async (url: string, data: unknown) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const content = await res.json()
    return content
  }

  // eslint-disable-next-line consistent-return
  getUserFromLocalStorage = () => {
    const user = localStorage.getItem('authData')
    return JSON.parse(user || '{}') as IAuthUser
  }

  // Получение всех слов
  getAllWords = (page: number, group: number) =>
    this.getResource(`${this.url}words?page=${page}&group=${group}`) as Promise<IWord[]>

  // Получение одного слова по id
  getWord = (id: string): Promise<IWord> =>
    this.getResource(`${this.url}words/${id}`)

  // Создание пользователя
  createUser = (user: IUser): Promise<IUser> =>
    this.postResource(`${this.url}users`, user)

  // Авторизация пользователя
  signInUser = (user: IUser): Promise<IAuthUser> =>
    this.postResource(`${this.url}signin`, user)

  // Получить пользователя по id
  getUser = async (id: string) => {
    const { token } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUser
    return content
  }

  // Обновить пользователя
  updateUser = async (data: IUser) => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const content = await res.json() as IUser
    return content
  }

  // Удалить пользователя
  deleteUser = async (data: IUser) => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const content = await res.json()
    return content
  }

  // Обновить токен
  updateToken = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/tokens`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IAuthUser
    return content
  }

  // Все слова пользователя
  getAllUserWords = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserWordParams[]
    return content
  }

  // Все слова со словами пользователя

  getAllUserWordsWithParams = async (page: number, group: number) => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json()
    let words: IUserWordWithParams[] = content[0].paginatedResults
    words = words.map((word) => {
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      word.id = word._id
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete word._id
      return word
    })
    return words
  }


  // Добавить слово пользователя
  createUserWord = async (wordId: string, word: IUserWordParams) => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word)
    })
    const content = await res.json() as IUserWordParams
    return content
  }

  // Получить слово пользователя по Id
  getUserWord = async (wordId: string) => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserWordParams
    return content
  }

  // Добавить слово пользователя
  updateUserWord = async (wordId: string, data: IUserWordParams) => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const content = await res.json() as IUserWordParams[]
    return content
  }

  // Удалить слово пользователя
  deleteUserWord = async (wordId: string) => {
    const { token, userId } = this.getUserFromLocalStorage()

    await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  // Получить все сложные слова
  getWords = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/aggregatedWords?wordsPerPage=3600`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json()
    let hardWords: IUserWordWithParams[] = content[0].paginatedResults
    hardWords = hardWords.map((word) => {
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      word.id = word._id
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete word._id
      return word
    })
    return hardWords as IUserWordWithParams[]
  }

  // Получить все сложные слова
  getAllHardWords = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"hard"}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json()
    let hardWords: IUserWordWithParams[] = content[0].paginatedResults
    hardWords = hardWords.map((word) => {
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      word.id = word._id
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete word._id
      return word
    })
    return hardWords as IUserHardWords[]
  }

  // Получить все выученные слова
  getAllLearnedWords = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.optional.learned":true}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json()
    let hardWords: IUserWordWithParams[] = content[0].paginatedResults
    hardWords = hardWords.map((word) => {
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      word.id = word._id
      // eslint-disable-next-line no-underscore-dangle, no-param-reassign
      delete word._id
      return word
    })
    return hardWords as IUserWordWithParams[]
  }

  getUserStatistics = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      return {}
    }
    const content = await res.json() as IStatistic
    return content
  }

  updateUserStatistics = async (data: IStatistic) => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const content = await res.json() as IUserStatistics[]
    return content
  }

  getUserSettings = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserSettings[]
    return content
  }

  updateUserSettings = async () => {
    const { token, userId } = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/settings`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserSettings[]
    return content
  }
}