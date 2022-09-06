const TOGGL_API_URL = 'https://api.track.toggl.com/api/v9';

export const path = {
  toggl: {
    timeEntries: () => `${TOGGL_API_URL}/me/time_entries`,
  },
};

export const auth = {
  toggl: {
    user: process.env.TOGGL_USER || '',
    password: process.env.TOGGL_PASSWORD || '',
  },
};
