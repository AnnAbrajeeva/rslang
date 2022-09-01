/* eslint-disable */
import Paper from '@mui/material/Paper';
import { useTypedSelector } from '../../../redux/hooks';
import StatisticsCard from '../StatisticsCard/StatisticsCard'
import StatisticsAudio from '../StatisticsCard/StatisticsAudio'
import './Statistics.css'
import { Chart } from '../StatisticChart/StatisticChart';
import { getAudioChallengeStatistics } from '../../../utils/utils';

const stat = {
  allGamesRight: 0,
  allGamesWrong: 0,
  allNewWordsCount: 0,
  date: '',
  games: {
    audiochallenge: {
      bestStreak: 0,
      gameNewWordsCount: 0,
      rightAnswers: 0,
      wordList: [],
      wrongAnswers: 0,
    },
    wordList: []
  }, 
  wordList: []
}

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

  const audioChallengeStatistic = getAudioChallengeStatistics();
  
  return (
    <div className="statistics">
      <Paper elevation={3} sx={{ padding: 5 }}>
        <div className="statistics__wrapper">
          <h2 className="statistics__title">Statistics for today:</h2>
          {user && <div className="statistics__cards-wrapper">
            <StatisticsCard data={sprintData} />
            <StatisticsAudio data={audioData} />
            <StatisticsCard data={oneDay} />
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
