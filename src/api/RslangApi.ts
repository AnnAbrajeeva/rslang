import { IAuthUser, IUser, IWord, IUserWord, IUserStatistics, IUserSettings } from '../types/types'

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

  getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      throw new Error('Please, authorization')
    } else {
      return JSON.parse(user) as IAuthUser
    }
  }

  // Получение всех слов
  getAllWords = (page: string, group: string): Promise<IWord[]> =>
    this.getResource(`${this.url}words?page=${page}&group=${group}`)

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
    const {token} = this.getUserFromLocalStorage()

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
    const {token, userId} = this.getUserFromLocalStorage()

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
    const {token, userId} = this.getUserFromLocalStorage()

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
    const {token, userId} = this.getUserFromLocalStorage()

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
    const {token, userId} = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserWord[]
    return content
  }

   // Добавить слово пользователя
   createUserWord = async (wordId: string) => {
    const {token, userId} = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserWord[]
    return content
  }

  // Получить слово пользователя по Id
  пуеUserWord = async (wordId: string) => {
    const {token, userId} = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserWord[]
    return content
  }

  // Добавить слово пользователя
  updateUserWord = async (wordId: string) => {
    const {token, userId} = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserWord[]
    return content
  }

  // Добавить слово пользователя
  deleteUserWord = async (wordId: string) => {
    const {token, userId} = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserWord[]
    return content
  }

  getUserStatistics = async () => {
    const {token, userId} = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserStatistics[]
    return content
  }

  updateUserStatistics = async () => {
    const {token, userId} = this.getUserFromLocalStorage()

    const res = await fetch(`${this.url}users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const content = await res.json() as IUserStatistics[]
    return content
  }

  getUserSettings = async () => {
    const {token, userId} = this.getUserFromLocalStorage()

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
    const {token, userId} = this.getUserFromLocalStorage()

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
