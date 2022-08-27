export interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
}

export interface IResult {
  word: string
  translation: string
  isCorrect: boolean
}
export interface IUser {
  name?: string
  email: string
  password: string
}

export interface IAuthUser {
  message: 'string'
  token: 'string'
  refreshToken: 'string'
  userId: 'string'
  name: 'string'
}

export interface IUserWord {
  difficulty: 'string'
  optional: {}
}

export interface IUserStatistics {
  learnedWords: number
  optional: {}
}

export interface IUserSettings {
  wordsPerDay: number
  optional: {}
}
