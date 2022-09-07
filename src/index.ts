import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {mapping} from './config';
import {postGraphs} from './pixela';

import {getTimeEntries} from './toggl';

export const toggl2pixela: HttpFunction = async (_, res) => {
  try {
    const togglData = await getTimeEntries();
    const pixelaData: {[key: string]: number} = {};

    Object.entries(togglData).forEach(([key, value]) => {
      const project = mapping.find(item => item.togglProjectId === key);

      if (project) {
        pixelaData[project.pixelaGraphId] = value;
      }
    });

    await postGraphs(pixelaData);

    res.status(204).send('ok');
  } catch (error) {
    console.log('------------- got error ----------------');
    console.log(error);

    res.status(500).send(error);
  }
};
