import axios from 'axios';
import RESULT_DATA from './TEMP_DATA.json' // Comment out when not needed for dev due to bundle size
import { sleep } from 'utils/general'

export const fetchAnalysis = (
  formData,
  indicator,
  threshold,
  {
    onDownloadProgress = () => {},
    onUploadProgress = () => {},
    onProcessing = () => {},
  }
) => (
  axios({
    method: "post",
    url: `${config.ANALYSIS_API_URL}/aqueduct/analysis/food-supply-chain/${indicator}/${threshold}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    onDownloadProgress,
    onUploadProgress,
  })
    .then((response) => {
      const { status, statusText, data: { job_token: jobToken } = {} } = response || {};
      
      if (status >= 300) throw new Error(statusText);
      if (!jobToken) throw new Error('Request did not return a job token, please try again')
      
      return new Promise((resolve, reject) => {
        const makeRequest = () => (
          axios.get(`${config.ANALYSIS_API_URL}/aqueduct/analysis/food-supply-chain/${jobToken}`)
          .then(({ data: { results, percent_complete = 0, status } = {} } = {}) => {
            onProcessing(percent_complete / 100)
            if (status === 'ready') return resolve(results)
            if (status === 'failed') return reject(new Error('Analyzer processing failed. Please try again'))
            makeRequest()
          })
        )
        makeRequest()
        .catch(reject)
      })
    })
    .catch((error) => { console.error(error.message); })
)

// Do a fake request
// export const fetchAnalysis = async (
export const fakeAnalysis = async (
  formData,
  indicator,
  threshold,
  {
    onDownloadProgress = () => {},
    onUploadProgress = () => {},
    onProcessing = () => {},
    includeErrors = true,
    includeLocations = true,
  }
) => {
  let progress = 0

  // Upload
  while (progress < 1) {
    let added = Math.random() * 0.05 + 0.05
    let ms = Math.random() * 100 + 200
    progress += added
    if (progress > 1) progress = 1
    await sleep(ms)
    onUploadProgress({ loaded: progress, total: 1 })
  }
  
  onProcessing()
  await sleep(3000 + Math.random() * 2000)

  progress = 0
  while (progress < 1) {
    let added = Math.random() * 0.05 + 0.05
    let ms = Math.random() * 100 + 300
    progress += added
    if (progress > 1) progress = 1
    await sleep(ms)
    onDownloadProgress({ loaded: progress, total: 1 })
  }

  const { locations, errors } = RESULT_DATA
  // const { locations, errors } = { locations: [], errors: [] }

  return {
    locations: includeLocations ? locations : [],
    indicator,
    errors: includeErrors ? errors : [],
  }
}

export default { fetchAnalysis };
