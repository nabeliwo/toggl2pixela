import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {getTimeEntries} from './toggl';

export const toggl2pixela: HttpFunction = async (req, res) => {
  try {
    const togglData = await getTimeEntries();
    res.status(200).send(JSON.stringify(togglData));
  } catch (error) {
    console.log('got error: ', error);
    res.status(500).send(error);
  }
};
