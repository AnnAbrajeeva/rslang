/* eslint-disable */
import Card from '@mui/material/Card'
import { getSprintChallengeStatistics } from '../../Games page/Sprint/utils/updateStatistic';
import './StatisticsCard.css'

interface StatisticsCardProps {
  data: {
    title: string
    firstRow: string
    secondRow: string
    thirdRow: string
  },
}

export default function StatisticsSprint({ data }: StatisticsCardProps) {
  const statistic = getSprintChallengeStatistics();
  let bestStreak: number|undefined;
  let gameNewWordsCount: number|undefined;
  let rightAnswers: number|undefined;
  let wrongAnswers: number|undefined;
  let rightWordsPercent: number|undefined;

  if (statistic) {
    bestStreak= statistic.games.sprint.bestStreak;
    rightAnswers = statistic.games.sprint.rightAnswers;
    wrongAnswers = statistic.games.sprint.wrongAnswers;
    gameNewWordsCount = statistic.games.sprint.gameNewWordsCount;
    rightWordsPercent = (rightAnswers + wrongAnswers) > 0 ? Math.round((rightAnswers / (rightAnswers + wrongAnswers)) * 100) : 0;
  }

  return (
    <Card className="stat-card" sx={{ minWidth: 275 }}>
      <h3 className="stat-card__title">{data.title}</h3>
      <table className="stat-card__table">
        <tr className="stat-card__row">
          <td>{data.firstRow}</td>
          <td className="stat-card__number">{statistic ? gameNewWordsCount : 0}</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.secondRow}</td>
          <td className="stat-card__number">{statistic ? rightWordsPercent : 0}%</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.thirdRow}</td>
          <td className="stat-card__number">{statistic ? bestStreak : 0}</td>
        </tr>
      </table>
    </Card>
  )
}
