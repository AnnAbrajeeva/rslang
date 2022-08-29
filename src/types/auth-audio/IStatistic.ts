export interface IDailyResult {
  newWordsCounter: number;
  allWordsCounter: number;
}
export interface IStatistic {
  id?: string;
  learnedWords: number;
  optional: {
    learnedWordsIds: {
      [prop: string]: number; // в качестве key используется id слова, в качестве значения - единица
    };
    dailyResults: {
      [prop: string]: IDailyResult; // в качестве key - дата в формате строки 'yyyy-mm-dd'
    };
  };
}
