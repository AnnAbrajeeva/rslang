/* eslint-disable */
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react';
import RslangApi from '../../../api/RslangApi';
import { IUserWordWithParams } from '../../../types/types';
import { getCurrentDate } from '../../../utils';
import { getOneDayStatistics } from '../../Games page/Sprint/utils/updateStatistic';
import './StatisticsCard.css'

interface StatisticsCardProps {
  data: {
    title: string
    firstRow: string
    secondRow: string
    thirdRow: string
  },
}

const api = new RslangApi()

export default function OneDayStat({ data }: StatisticsCardProps) {
  const statistic = getOneDayStatistics();
  let allGamesRight: number|undefined;
  let allGamesWrong: number|undefined;
  let allNewWordsCount: number|undefined;
  let rightWordsPercent: number|undefined;

  if (statistic) {
    allGamesRight = statistic.allGamesRight
    allGamesWrong = statistic.allGamesWrong;
    allNewWordsCount = Math.round(statistic.allNewWordsCount);
    rightWordsPercent = (allGamesRight + allGamesWrong) > 0 ? Math.round((allGamesRight / (allGamesRight + allGamesWrong)) * 100) : 0;
  }

  const [userWords, setUserWords] = useState<IUserWordWithParams[]>()
  const [learned, setLearned] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const words = await api.getAllLearnedWords()
      setUserWords(words)
      if(words) {
        const arr = words.filter((word) => word.userWord.optional.data === date)
        setLearned(arr.length)
      }
    }
    fetchData()
  const date = getCurrentDate()

  
  }, [])

  



  return (
    <Card className="stat-card" sx={{ minWidth: 275 }}>
      <h3 className="stat-card__title">{data.title}</h3>
      <table className="stat-card__table">
        <tr className="stat-card__row">
          <td>{data.firstRow}</td>
          <td className="stat-card__number">{statistic ? allNewWordsCount : 0}</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.secondRow}</td>
          <td className="stat-card__number">{statistic ? learned : 0}</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.thirdRow}</td>
          <td className="stat-card__number">{statistic ? rightWordsPercent : 0}%</td>
        </tr>
      </table>
    </Card>
  )
}
