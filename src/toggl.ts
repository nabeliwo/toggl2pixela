import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

import {path, toggl} from './config';

type TimeEntry = {
  project_id: number;
  duration: number;
  stop: string;
};

export const getTimeEntries = async () => {
  const today = dayjs().add(9, 'h'); // Cloud Functions の timezone を考慮した現在時刻
  const startDate = today.subtract(2, 'd').format('YYYY-MM-DD'); // toggl の timezone を考慮して2日前からのデータを取る
  const endDate = today.format('YYYY-MM-DD');
  const query = `?start_date=${startDate}&end_date=${endDate}`;

  return axios
    .get<TimeEntry[]>(path.toggl.timeEntries() + query, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${toggl.auth.user}:${toggl.auth.password}`
        ).toString('base64')}`,
      },
    })
    .then(res => {
      const data: {[key: number]: number} = {};

      // toggl のタイムゾーンを考慮した時間範囲(昨日の0時から今日の0時まで)
      const min = dayjs(`${today.format('YYYY-MM-DD')} 00:00:00`)
        .subtract(1, 'd')
        .subtract(9, 'h');
      const max = dayjs(`${today.format('YYYY-MM-DD')} 00:00:00`).subtract(
        9,
        'h'
      );

      res.data.forEach(item => {
        if (!dayjs(item.stop).isBetween(min, max)) {
          return;
        }

        if (data[item.project_id] === undefined) {
          data[item.project_id] = item.duration;
        } else {
          data[item.project_id] = data[item.project_id] + item.duration;
        }
      });

      return data;
    });
};
