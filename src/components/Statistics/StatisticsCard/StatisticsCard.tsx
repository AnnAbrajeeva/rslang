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
}

export default function StatisticsCard({data}: StatisticsCardProps) {
  return (
    <Card className="stat-card" sx={{ minWidth: 275 }}>
      <h3 className="stat-card__title">{data.title}</h3>
      <table className="stat-card__table">
        <tr className="stat-card__row">
          <td>{data.firstRow}</td>
          <td className="stat-card__number">0</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.secondRow}</td>
          <td className="stat-card__number">0%</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.thirdRow}</td>
          <td className="stat-card__number">0</td>
        </tr>
      </table>
    </Card>
  )
}
