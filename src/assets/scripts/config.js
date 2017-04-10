export default {
  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // Url
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:2525/#/' : 'https://itsluk.as',

  // API base url used by axios
  baseApiUrl: 'https://api.itsluk.as',

  // Timeout on requests (by axios)
  // TODO: set this just for upload
  timeout: 300000, // 5mim
};
