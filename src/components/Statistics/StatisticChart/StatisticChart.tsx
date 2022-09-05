/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { IStatistic } from '../../../types/auth-audio/IStatistic'
import RslangApi from '../../../api/RslangApi'
import { IUserWordWithParams } from '../../../types/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const api = new RslangApi()

export function Chart() {
  const [statistic, setStatistic] = useState<IStatistic>()
  const [userWords, setUserWords] = useState<IUserWordWithParams[]>()

  useEffect(() => {
    const fetchData = async () => {
      const stat = await api.getUserStatistics()
      console.log(stat)
      if (stat) {
        setStatistic(stat)
      }
      const words = await api.getAllLearnedWords()
      setUserWords(words)
    }
    fetchData()
  }, [])

  const dates: string[] = []
  let labels: string[]
  const newWords = []
  const learnedWords = []

  if (statistic && Object.keys(statistic).length > 0) {
    for (let day in statistic.optional.dailyResults) {
      dates.push(day)
      newWords.push(statistic.optional.dailyResults[day].newWordsCounter)
      learnedWords.push(statistic.optional.dailyResults[day].learnedWords)
    }
  }

  const arr = {}

  if (userWords) {
    userWords.forEach((word) => {
      if (word.userWord.optional.data) {
        dates.push(word.userWord.optional.data)
        const date = word.userWord.optional.data
        arr[date] = arr[date] + 1 || 1
      }
    })
  }

  dates.forEach((date) => {
    if(!arr[date]) {
      arr[date] = 0
    }
  })

  const sortArr = Object.keys(arr).sort().reduce(
    (obj, key) => { 
      obj[key] = arr[key]; 
      return obj;
    }, 
    {}
  );


  const set = new Set(dates)
  labels = [...set]
  // const learnedWords = Object.values(sortArr)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        data: newWords,
        label: 'New words',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        data: learnedWords,
        label: 'Learned words',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ], 
  }

  return (
    <>
      <Line options={options} data={data} /> 
    </>
  )
}
export default Chart
