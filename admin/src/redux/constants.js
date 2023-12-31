
export const serverUrl = '';
export const ApiConfig = {
    apiKey: '',
    authDomain: '',
    domain: process.env.NODE_ENV == 'development' ?  'http://localhost:5000/' : 'https://configuratorapi.noav.dev/',
    baseUrl: process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : 'https://configuratorapi.noav.dev/api',
    authUrl: '',
  };