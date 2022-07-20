import axios from 'axios';

export default async function req(route, method, data_obj, query, contentType) {
  let result
  try {
    result = await axios({
      url: `http://localhost:3001/${route}`,
      method: method,
      data: data_obj,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': contentType
      },
      params: query
    })
  } catch (error) {
    console.log(error);
    return {error: 'request error'}
  }
  const statusOk = result && result.status === 200 && result.statusText === 'OK';
  if(statusOk) {
    if(result.data.errors) {
      return {error: result.data}
    } else {
      return result.data;
    }
  } else {
    console.log('status is not ok???');
  }
}