export default {
  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // Url
  url: 'http://localhost:2525/#/',

  // API base url used by axios
  baseApiUrl: 'https://api.itsluk.dev',

  // Timeout on requests (by axios)
  timeout: 300000, // 5mim
};
