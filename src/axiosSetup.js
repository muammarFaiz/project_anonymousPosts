import axios from 'axios';

export default async function req(route, method, data_obj) {
  const result = await axios({
    url: `http://localhost:3001/${route}`,
    method: method,
    data: data_obj,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  const statusOk = result && result.status === 200 && result.statusText === 'OK';
  if(statusOk) {
    return result.data;
  } else {
    console.log('status is not ok???');
  }
}