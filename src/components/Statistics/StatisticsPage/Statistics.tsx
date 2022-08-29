/* eslint-disable react/self-closing-comp */
import Paper from '@mui/material/Paper';
import StatisticsCard from '../StatisticsCard/StatisticsCard'
import './Statistics.css'
import {Chart} from '../StatisticChart/StatisticChart';


export default function Statistics() {
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
    <Paper elevation={3} sx={{ padding: 5}}>
      <div className="statistics__wrapper">
        <h2 className="statistics__title">Statistics for today</h2>
        <div className="statistics__cards-wrapper">
          <StatisticsCard data={sprintData} />
          <StatisticsCard data={audioData} />
          <StatisticsCard data={oneDay} /> 
        </div>
      </div>
      </Paper>
      <Paper elevation={3} sx={{ padding: 5, marginTop: 5}}>
      <div className="statistics__wrapper">
        <h2 className="statistics__title">Statistics for the entire period</h2>
        <div className="statistics__cards-wrapper">
          <Chart />
        </div>
      </div>
      </Paper>
    </div>
  )
}
