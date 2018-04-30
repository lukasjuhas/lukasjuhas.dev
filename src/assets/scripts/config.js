export default {
  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // Url
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:2525/#/' : 'https://itsluk.as',

  // API base url used by axios
  baseApiUrl: process.env.NODE_ENV === 'development' ? 'http://api.itsluk.as.test' : 'https://api.itsluk.as',
};
