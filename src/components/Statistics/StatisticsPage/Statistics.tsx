import Paper from '@mui/material/Paper';
import StatisticsAudio from '../StatisticsCard/StatisticsAudio'
import StatisticsSprint from '../StatisticsCard/StatisticSprint'
import OneDayStat from '../StatisticsCard/OneDayStat'
import './Statistics.css'
import { Chart } from '../StatisticChart/StatisticChart';
import React from 'react';

export default function Statistics() {
  const user = localStorage.getItem('authData');

  const sprintData = {
    title: 'Sprint',
    firstRow: 'Number of new words:',
    secondRow: 'Correct answers:',
    thirdRow: 'Longest series of correct answers:'
  }

  const audioData = {
    title: 'AudioCall',
    firstRow: 'Number of new words:',
    secondRow: 'Correct answers:',
    thirdRow: 'Longest series of correct answers:'
  }

  const oneDay = {
    title: 'Total per day',
    firstRow: 'Number of new words:',
    secondRow: 'Number of learned words:',
    thirdRow: 'Correct answers:'
  }
  
  return (
    <div className="statistics">
      <Paper elevation={3} sx={{ padding: 5 }}>
        <div className="statistics__wrapper">
          <h2 className="statistics__title">Statistics for today:</h2>
          {user && <div className="statistics__cards-wrapper">
            <StatisticsSprint data={sprintData} />
            <StatisticsAudio data={audioData} />
            <OneDayStat data={oneDay} />
          </div>}
          {!user && <div className="statistics__message">
            Statistics is available only for authorized users :(
          </div>}
        </div>
      </Paper>
      <Paper elevation={3} sx={{ padding: 5, marginTop: 5 }}>
        <div className="statistics__wrapper">
          <h2 className="statistics__title">Statistics for the entire period</h2>
          {user && <div className="statistics__cards-wrapper">
            <Chart />
          </div>}
          {!user && <div className="statistics__message">
            Statistics is available only for authorized users :(
          </div>}
        </div>
      </Paper>
    </div>
  )
}
