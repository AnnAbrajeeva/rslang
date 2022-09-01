import * as React from 'react'
import Card from '@mui/material/Card'
import './StatisticsCard.css'


interface StatisticsCardProps {
  data: {
    title: string
    firstRow: string
    secondRow: string
    thirdRow: string
  },

  statData: {
    bestStreak: number;
    gameNewWordsCount: number;
    rightAnswers: number;
    wrongAnswers: number;
    wordList: Array<string>;
  } | undefined
}

export default function StatisticsCard({data, statData}: StatisticsCardProps) {
  
  const rightAnsPercent = Math.round((statData!.rightAnswers / (statData!.rightAnswers + statData!.wrongAnswers)) * 100);

  return (
    <Card className="stat-card" sx={{ minWidth: 275 }}>
      <h3 className="stat-card__title">{data.title}</h3>
      <table className="stat-card__table">
        <tr className="stat-card__row">
          <td>{data.firstRow}</td>
          <td className="stat-card__number">{statData?.gameNewWordsCount ? statData?.gameNewWordsCount : 0}</td> 
        </tr>
        <tr className="stat-card__row">
          <td>{data.secondRow}</td>
          <td className="stat-card__number">{rightAnsPercent || 0}%</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.thirdRow}</td>
          <td className="stat-card__number">{statData?.bestStreak ? statData?.bestStreak : 0}</td>
        </tr>
      </table>
    </Card>
  )
}
