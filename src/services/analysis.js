import axios from 'axios';
import RESULT_DATA from './TEMP_DATA.json'
import { sleep } from 'utils/general'

export const fetchAnalysis = (
  formData,
  indicator,
  threshold,
  {
    onDownloadProgress = () => {},
    onUploadProgress = () => {},
  }
) => (
  axios({
    method: "post",
    url: `https://staging-api.resourcewatch.org/aqueduct/analysis/food-supply-chain/${indicator}/${threshold}`,
    // url: `http://localhost:5100/api/v1/aqueduct/analysis/food-supply-chain/${indicator}/${threshold}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    onDownloadProgress,
    onUploadProgress,
  })
    .then((response) => {
      const { status, statusText, data } = response;
  
      if (status >= 300) throw new Error(statusText);
  
      return data;
    })
    .catch((error) => { console.error(error.message); })
)

// Do a fake request
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

  return {
    locations: includeLocations ? locations : [],
    indicator,
    errors: includeErrors ? errors : [],
  }
}

export default { fetchAnalysis };
