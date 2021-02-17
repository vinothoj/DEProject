import axios from 'axios';

export default axios.create({
   baseURL: `https://console.freelancetypers.com/api/`
  // baseURL: `http://3.230.230.205:4000/api/`
  // baseURL: `http://localhost:4000/api/`
});