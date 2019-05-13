import axios from 'axios';

export const fetchQuery = (url, params = {}) => axios.get(url, {
  params: { ...params },
  transformResponse: [].concat(
    axios.defaults.transformResponse,
    data => data.rows
  )
})
  .then((response) => {
    const { status, statusText, data } = response;

    if (status >= 300) throw new Error(statusText);

    return data;
  })
  .catch((error) => { console.error(error.message); });

export default { fetchQuery };
