import axios from 'axios';

import {path, auth} from './config';

export const getTimeEntries = async () => {
  return axios
    .get(path.toggl.timeEntries(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${auth.toggl.user}:${auth.toggl.password}`
        ).toString('base64')}`,
      },
    })
    .then(res => {
      return res.data;
    });
};
