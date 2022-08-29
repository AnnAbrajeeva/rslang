export type TDifficulty = 'difficult' | 'easy';

export interface IUserWord {
  difficulty: TDifficulty;
  optional: {
    wordId: string;
    userId?: string;
    counter: number; // для выставления признака изученного слова, инкремент при правильном ответе, обнуление при неправильном
    sprint: {
      rightCounter: number;
      wrongCounter: number;
    };
    audiochallenge: {
      rightCounter: number;
      wrongCounter: number;
    };
  };
}
