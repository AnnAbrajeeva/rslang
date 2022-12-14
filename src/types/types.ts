export interface IUserWordParams {
  id?: string
  difficulty: string
  optional: {
    learned?: boolean
    data?: string
    counter?: number // для выставления признака изученного слова, инкремент при правильном ответе, обнуление при неправильном
    sprint?: {
      rightCounter: number
      wrongCounter: number
    }
    audiochallenge?: {
      rightCounter: number
      wrongCounter: number
    }

    wordId?: string
  }
  wordId?: string
}

export interface IUserWordWithParams {
  _id?: string
  id?: string
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
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
  userWord: {
    id?: string
    difficulty: string
    optional: {
      learned?: boolean
      data: string
      counter?: number // для выставления признака изученного слова, инкремент при правильном ответе, обнуление при неправильном
      sprint?: {
        rightCounter: number
        wrongCounter: number
      }
      audiochallenge?: {
        rightCounter: number
        wrongCounter: number
      }
    }
    wordId?: string
  }
}

export interface IUserHardWords {
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
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
  userWord: {
    difficulty: string
    optional: {}
  }
}

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
  sound: string
  id: string
  transcription: string
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
