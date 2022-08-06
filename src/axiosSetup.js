import axios from 'axios';

/**
 * axios request
 * @param {String} route without the / in the beginning
 * @param {String} method all capital letter
 * @param {obj} data_obj object for the req.body in express
 * @param {obj} query object for the req.param in express
 * @param {String} contentType the contentType header, usualy "multipart/form-data" default to "x-www-form-urlencoded"
 * @returns if error return {error: 'something'} else return result.data
 */
async function req(route, method, data_obj, query, contentType) {
  let result
  try {
    result = await axios({
      url: `${process.env.REACT_APP_DOMAIN}${route}`,
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
    return { error: 'request error' }
  }
  const statusOk = result && result.status === 200 && result.statusText === 'OK';
  if (statusOk) {
    if (result.data.errors) {
      return { error: result.data }
    } else {
      return result.data;
    }
  } else {
    console.log('status is not ok???');
  }
}

export default req