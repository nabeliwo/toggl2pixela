const TOGGL_API_URL = 'https://api.track.toggl.com/api/v9';
const PIXELA_API_URL = 'https://pixe.la/v1';

export const path = {
  toggl: {
    timeEntries: () => `${TOGGL_API_URL}/me/time_entries`,
  },
  pixela: {
    pixel: (graphId: string) =>
      `${PIXELA_API_URL}/users/nabeliwo/graphs/${graphId}`,
  },
};

export const toggl = {
  auth: {
    user: process.env.TOGGL_USER || '',
    password: process.env.TOGGL_PASSWORD || '',
  },
};

export const pixela = {
  token: process.env.PIXELA_USER_TOKEN || '',
};

export const mapping = [
  {
    togglProjectId: process.env.TOGGL_PROJECT_ID_ENGLISH_STUDY || '',
    pixelaGraphId: process.env.PIXELA_GRAPH_ID_ENGLISH_STUDY || '',
  },
  {
    togglProjectId: process.env.TOGGL_PROJECT_ID_COMPUTER_SCIENCE_STUDY || '',
    pixelaGraphId: process.env.PIXELA_GRAPH_ID_COMPUTER_SCIENCE_STUDY || '',
  },
  {
    togglProjectId: process.env.TOGGL_PROJECT_ID_EXERCISE || '',
    pixelaGraphId: process.env.PIXELA_GRAPH_ID_EXERCISE || '',
  },
  {
    togglProjectId: process.env.TOGGL_PROJECT_ID_SPLATOON_PLAY || '',
    pixelaGraphId: process.env.PIXELA_GRAPH_ID_SPLATOON_PLAY || '',
  },
];
