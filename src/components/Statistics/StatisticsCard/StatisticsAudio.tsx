/* eslint-disable */
import Card from '@mui/material/Card'
import { getAudioChallengeStatistics } from '../../../utils/utils';
import './StatisticsCard.css'

interface StatisticsCardProps {
  data: {
    title: string
    firstRow: string
    secondRow: string
    thirdRow: string
  },
}

export default function StatisticsAudio({ data }: StatisticsCardProps) {
  const statistic = getAudioChallengeStatistics();
  let bestStreak: number|undefined;
  let gameNewWordsCount: number|undefined;
  let rightAnswers: number|undefined;
  let wrongAnswers: number|undefined;
  let rightWordsPercent: number|undefined;

  const date = new Date().toLocaleString().split(', ')[0]

  if (statistic && statistic.date === date) {
    bestStreak= statistic.games.audiochallenge.bestStreak;
    rightAnswers = statistic.games.audiochallenge.rightAnswers;
    wrongAnswers = statistic.games.audiochallenge.wrongAnswers;
    gameNewWordsCount = statistic.games.audiochallenge.gameNewWordsCount;
    rightWordsPercent = (rightAnswers + wrongAnswers) > 0 ? Math.round((rightAnswers / (rightAnswers + wrongAnswers)) * 100) : 0;
  }

  return (
    <Card className="stat-card" sx={{ minWidth: 275 }}>
      <h3 className="stat-card__title">{data.title}</h3>
      <table className="stat-card__table">
        <tr className="stat-card__row">
          <td>{data.firstRow}</td>
          <td className="stat-card__number">{gameNewWordsCount ? gameNewWordsCount : 0}</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.secondRow}</td>
          <td className="stat-card__number">{rightWordsPercent ? rightWordsPercent : 0}%</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.thirdRow}</td>
          <td className="stat-card__number">{bestStreak ? bestStreak : 0}</td>
        </tr>
      </table>
    </Card>
  )
}
