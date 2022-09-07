import axios from 'axios';
import dayjs from 'dayjs';
import {path, pixela} from './config';

type Data = {
  [key: string]: number;
};

type PixelaResponse = {
  isSuccess: boolean;
  isRejected?: boolean;
  message: string;
};

const postPixel = (graphId: string, body: {date: string; quantity: string}) =>
  new Promise<void>((resolve, reject) => {
    axios
      .post<PixelaResponse>(path.pixela.pixel(graphId), body, {
        headers: {
          'X-USER-TOKEN': pixela.token,
        },
      })
      .then(res => {
        if (!res.data.isSuccess) {
          console.log('------------- then error ----------------');
          console.log(res);
          reject(
            new Error(`Pixela への POST に失敗しました。GraphID: ${graphId}`)
          );
        }

        resolve();
      })
      .catch(
        (error: {
          response: {
            data: PixelaResponse;
          };
        }) => {
          // pixela の API は25%の確率で reject されるので reject された場合は再度リクエストを送る
          if (error.response.data.isRejected) {
            console.log('--------- Pixela Post Rejected. ----------');

            postPixel(graphId, body)
              .then(() => {
                resolve();
              })
              .catch((error: Error) => {
                reject(error);
              });
          } else {
            console.log('------------- catch error ----------------');
            console.log(error);
            reject(
              new Error(`Pixela への POST に失敗しました。GraphID: ${graphId}`)
            );
          }
        }
      );
  });

export const postGraphs = (data: Data) => {
  const today = dayjs().add(9, 'h'); // Cloud Functions の timezone を考慮した現在時刻
  const yestersay = today.subtract(1, 'd');

  const promises = Object.entries(data).map(([key, value]) => {
    return postPixel(key, {
      date: yestersay.format('YYYYMMDD'),
      quantity: `${Math.floor(value / 60)}`, // 秒を分に変換して小数点を切り捨て
    });
  });

  return Promise.all(promises);
};
