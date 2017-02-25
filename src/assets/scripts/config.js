
export default {
  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // API base url used by axios
  baseApiUrl: 'https://api.itsluk.dev',

  // Timeout on requests (by axios)
  timeout: 30000,
};
