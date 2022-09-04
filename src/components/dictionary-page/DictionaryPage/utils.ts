import { IStatistic } from '../../../types/auth-audio/IStatistic';
import { IUserWordWithParams } from '../../../types/types';
import RslangApi from "../../../api/RslangApi"
import { updateStatistic } from '../utils/updateStatistic';

const api = new RslangApi()

export const updateUserStatistics = async (statistic: IStatistic | {}, action: string) => {
    const newStat = await updateStatistic(statistic, action)
    if (newStat) {
        await api.updateUserStatistics(newStat)
    }
}

export const addLearned = async (word: IUserWordWithParams, statistic: IStatistic | {}) => {
    if (word.userWord) {
        const wordParams = { ...word.userWord }
        wordParams.difficulty = 'weak'
        wordParams.optional.learned = true
        // eslint-disable-next-line prefer-destructuring
        wordParams.optional.data = new Date().toLocaleString().split(', ')[0]
        wordParams.optional.audiochallenge!.rightCounter = 0
        wordParams.optional.audiochallenge!.wrongCounter = 0
        wordParams.optional.sprint!.wrongCounter = 0
        wordParams.optional.sprint!.rightCounter = 0
        delete wordParams.id
        delete wordParams.wordId
        await api.updateUserWord(word.id!, wordParams)
    } else {
        const wordParams = {
            difficulty: 'weak',
            optional: {
                learned: true,
                // eslint-disable-next-line prefer-destructuring
                data: new Date().toLocaleString().split(', ')[0],
            },
        }
        await api.createUserWord(word.id!, wordParams)
        await updateUserStatistics(statistic, 'add')
    }
}

export const removeLearned = async (word: IUserWordWithParams, statistic: IStatistic | {}) => {
    if (word.userWord) {
        const wordParams = { ...word.userWord }
        wordParams.optional.learned = false
        wordParams.optional.audiochallenge!.rightCounter = 0
        wordParams.optional.audiochallenge!.wrongCounter = 0
        wordParams.optional.sprint!.wrongCounter = 0
        wordParams.optional.sprint!.rightCounter = 0
        delete wordParams.id
        delete wordParams.wordId
        await api.updateUserWord(word.id!, wordParams)
    }
    await updateUserStatistics(statistic, 'remove')
}