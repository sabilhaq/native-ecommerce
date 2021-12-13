import axios from 'axios';
import Config from 'react-native-config';

const request = axios.create({
  baseURL: Config.REACT_APP_BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});

export default request;
