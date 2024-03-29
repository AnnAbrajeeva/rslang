import React from 'react';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import RslangApi from '../../../api/RslangApi';
import { getOneDayStatistics } from '../../Games page/Sprint/utils/updateStatistic';
import './StatisticsCard.css';

interface StatisticsCardProps {
  data: {
    title: string;
    firstRow: string;
    secondRow: string;
    thirdRow: string;
  };
}

const api = new RslangApi();

export default function OneDayStat({ data }: StatisticsCardProps) {
  const statistic = getOneDayStatistics();
  let allGamesRight: number | undefined;
  let allGamesWrong: number | undefined;
  let allNewWordsCount: number | undefined;
  let rightWordsPercent: number | undefined;

  const date = new Date().toLocaleString().split(', ')[0];

  if (statistic && statistic.date === date) {
    allGamesRight = Math.round(statistic.allGamesRight);
    allGamesWrong = Math.round(statistic.allGamesWrong);
    allNewWordsCount = Math.round(
      statistic.games.audiochallenge.gameNewWordsCount + statistic.games.sprint.gameNewWordsCount
    );
    rightWordsPercent =
      allGamesRight + allGamesWrong > 0
        ? Math.round((allGamesRight / (allGamesRight + allGamesWrong)) * 100)
        : 0;
  }

  const [learned, setLearned] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const allWords = await api.getAllLearnedWords();
      if (allWords.length) {
        const arr = allWords.filter((word) => word.userWord.optional.data === date);
        setLearned(arr.length);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className="stat-card" sx={{ minWidth: 275 }}>
      <h3 className="stat-card__title">{data.title}</h3>
      <table className="stat-card__table">
        <tr className="stat-card__row">
          <td>{data.firstRow}</td>
          <td className="stat-card__number">{allNewWordsCount ? allNewWordsCount : 0}</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.secondRow}</td>
          <td className="stat-card__number">{learned ? learned : 0}</td>
        </tr>
        <tr className="stat-card__row">
          <td>{data.thirdRow}</td>
          <td className="stat-card__number">{rightWordsPercent ? rightWordsPercent : 0}%</td>
        </tr>
      </table>
    </Card>
  );
}
