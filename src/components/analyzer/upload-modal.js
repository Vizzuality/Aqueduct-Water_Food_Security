import React, { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import {
  SegmentedUi,
} from 'aqueduct-components';
import CustomTable from 'components/ui/Table/Table';
import { ExportToCsv } from 'export-to-csv';
import {
  ID_LOOKUP,
  WATER_INDICATORS,
  ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE
} from 'constants/water-indicators';
import classNames from 'classnames';
import {
  RESULT_LOOKUP,
  ERROR_RESULT_HEADERS,
  transformResults,
  transformErrors,
} from 'constants/analyzer'
import { DownloadableTable } from 'components/ui/analyzer';
import RESULT_DATA from './TEMP_DATA.json'

const LOADING_STATE_TEXT = {
  transforming: 'Preparing file',
  uploading: 'Uploading',
  processing: <>Analyzing <small>(this may take a few minutes)</small></>,
  downloading: 'Downloading results',
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const AnalyzerUploadModal = ({ filters, onDone }) => {
  const [modalState, setModalState] = useState({ stage: 'initial' })
  // const [modalState, setModalState] = useState({ stage: 'uploading', progress: 0.5 })
  const [filename, setFilename] = useState()
  const inputRef = useRef(null)
  const formRef = useRef(null)
  const indicatorKey = filters.indicator ? ID_LOOKUP[filters.indicator] : undefined

  if (!ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE.supply_chain.includes(indicatorKey)) return null
  
  const indicatorSpec = WATER_INDICATORS[indicatorKey]

  const nullFn = useCallback(() => {}, [])

  useEffect(() => {
    const modalElement = document.querySelector('.c-modal.analyzer')
    if (modalState.stage.match(/error/)) {
      modalElement.classList.add('error')
    } else {
      modalElement.classList.remove('error')
    }
  }, [modalState])

  const downloadCSV = (event, data) => {
    if (event) event.preventDefault();
    const csvExporter = new ExportToCsv({
      showLabels: true,
      filename: `Prioritize Basins Analyzer - ${filters.indicator.name} - Rows with errors`,
      headers: ERROR_RESULT_HEADERS.map(e => e.label)
    });
    csvExporter.generateCsv(data.map(d => Object.entries(d).reduce((acc, [k, v]) => ({ ...acc, [k]: v || '' }), {})));
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    // reject(new Error('Unexpected error while analyzing data'))
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(btoa(reader.result));
    reader.onerror = error => reject(error);
    
  });

  const fakeSubmit = async ({ includeErrors = true, includeLocations = true } = {}) => {
    let progress = 0

    // Upload
    while (progress < 1) {
      let added = Math.random() * 0.05 + 0.05
      let ms = Math.random() * 100 + 200
      progress += added
      if (progress > 1) progress = 1
      await sleep(ms)
      setModalState({ stage: 'uploading', progress })
    }
    
    setModalState({ stage: 'processing' })
    await sleep(3000 + Math.random() * 2000)

    progress = 0
    while (progress < 1) {
      let added = Math.random() * 0.05 + 0.05
      let ms = Math.random() * 100 + 300
      progress += added
      if (progress > 1) progress = 1
      await sleep(ms)
      setModalState({ stage: 'downloading', progress })
    }

    const { locations, errors } = RESULT_DATA

    return {
      data: {
        locations: includeLocations ? locations : [],
        errors: includeErrors ? errors : [],
      }
    }
  }

  const submitFile = (file) => {
    if (file && filters.threshold && indicatorSpec) {
      setModalState({ stage: 'transforming' })
      toBase64(file)
      .then(value => {
        // const newFile = new File([value], `${file.name}.b64`)
        const newFile = file
        const data = new FormData(formRef.current)
        data.append('data', newFile)
        setModalState({ stage: 'uploading', progress: 0 })
        // axios({
        //   method: "post",
        //   url: `https://staging-api.resourcewatch.org/aqueduct/analysis/food-supply-chain/${indicatorKey}/${indicatorSpec.toRaw(filters.threshold)}`,
        //   // url: `http://localhost:5100/api/v1/aqueduct/analysis/food-supply-chain/${indicatorKey}/${indicatorSpec.toRaw(filters.threshold)}`,
        //   data: data,
        //   headers: { "Content-Type": "multipart/form-data" },
        //   onDownloadProgress: e => setModalState({ stage: 'downloading', progress: e.loaded / e.total }),
        //   onUploadProgress: (e) => {
        //     const progress = e.loaded / e.total
        //     if (progress >= 1) {
        //       setModalState({ stage: 'processing' })
        //     } else {
        //       setModalState({ stage: 'uploading', progress })
        //     }
        //   }
        // })
        fakeSubmit({ includeLocations: true, includeErrors: true })
        // Promise.resolve({ data: RESULT_DATA })
        .then(({ data: d = {} } = {}) => {
          // const data = transformResults({ ...d, indicator: indicatorKey })
          const data = { ...d, indicator: indicatorKey }
          const hasErrors = !isEmpty(data.errors)
          setModalState({ stage: hasErrors ? 'loaded-errors' : 'loaded', locations: data.locations, errors: data.errors })
          if (!hasErrors) setTimeout(() => onDone(data.locations || []), 3000)
        })
        .catch(err => {
          setModalState({ stage: 'error', which: 'request', err })
          console.error(err)
        })
      })
      .catch(err => {
        setModalState({ stage: 'error', which: 'transform', err })
        console.error(err)
      })
    }
  }

  const resetModal = () => {
    setModalState({ stage: 'initial' })
    setFilename(undefined)
    if (formRef.current) formRef.current.reset()
  }

  const hasProgressValue = !isNil(modalState.progress)

  // if (modalState.errors) {
  //   console.log({
  //     columns: Object.keys(extractErrorValues({ errors: modalState.errors })[0]).map(k => ({ label: k, value: k })),
  //     data: extractErrorValues({ errors: modalState.errors }),
  //   })
  // }

  return (
    <div>
      <SegmentedUi
        className="-tabs-light"
        items={[
          { value: 'addresses', label: 'Addresses' },
        ]}
        selected="addresses"
        onChange={nullFn}
      />
      <div className="analyzer-import-modal">
        {/* IF IN INITIAL STATE */}
        {/* Setting display to none here because we need the form element to stay mounted */}
        <div style={{ display: modalState.stage === 'initial' ? undefined : 'none' }}>
          <h3>Import Sourcing Locations</h3>
          <p>This functionality is in beta and under development.  Please help us improve and report bugs <a href="#">here</a>.  Thank you for your patience.</p>
          <p>Please use the templates below to structure your data.</p>
          <p>Replace with your own location names and coordinates. Do not add additional columns. There is a 500 addresses per file limit.</p>
          <p>More <a href="#">info</a></p>
          <p>List of supported file formats <em>(click on any format to download the template)</em>:</p>
          <ul>
              <li>
                <a href="#">Spreadsheet (.xlsx)</a>
              </li>
          </ul>
          <form
            id="upload-form"
            ref={formRef}
            onSubmit={e => {
              const file = inputRef.current.files[0]
              e.preventDefault()
              submitFile(file)
            }}
          >
            
            <label className="file-upload">
              <input
                name="file"
                type="file"
                required
                ref={inputRef}
                onChange={e => setFilename(e.target.files[0].name)}
              />
              {filename || 'Select file to import data'}
            </label>
            <button type="submit" className="action-button" disabled={!filename}>
              Upload File
            </button>
          </form>
        </div>

        {/* IF IN PROGRESS */}
        {!['initial', 'error', 'loaded-errors'].includes(modalState.stage) && (
          <>
            <h3>Import Sourcing Locations</h3>
            <div className="loading-content">
              <div className="progress-container">
                {modalState.stage === 'loaded' ? (
                  <p className="complete-text">
                    Upload Complete
                  </p>
                ) : (
                  <>
                    <div className={classNames("progress-bar", { indeterminate: !hasProgressValue })}>
                      <div
                        className={classNames("value", { indeterminate: !hasProgressValue })}
                        style={{ width: hasProgressValue ? `${Math.round(modalState.progress * 100)}%` : undefined }}
                      />
                    </div>
                    <p className="progress-text">
                      {LOADING_STATE_TEXT[modalState.stage]}
                      {hasProgressValue ? <> ({Math.round(modalState.progress * 100)}%)</> : null}
                    </p>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* IF LOADED BUT WITH ERRORS */}
        {modalState.stage === 'loaded-errors' && (
          <>
            <h3>Import entries error</h3>
            <p>
              {isEmpty(modalState.locations) ? 'All' : `The following ${modalState.errors.length}`}{' '}
              entries out of {modalState.errors.length + modalState.locations.length} failed to match watersheds.{' '}
              Try updating the country or province name using <a href="#">this guide</a>
            </p>
            <div className="downloadable-table">
              <DownloadableTable
                hideInstructions
                noExpand // Should expand eventually
                downloadOptions={[
                  { name: 'CSV', action: (e) => downloadCSV(e, modalState.errors) }
                ]}
              >
                <CustomTable
                  columns={ERROR_RESULT_HEADERS}
                  data={transformErrors(modalState.errors)}
                  pagination={{
                    // enabled: data.length > 10,
                    enabled: true,
                    pageSize: 10,
                    page: 0
                  }}
                />
              </DownloadableTable>
            </div>
            <div className="buttons">
              {!isEmpty(modalState.locations) && (
                <button className="action-button" onClick={() => onDone(modalState.locations)}>
                  Continue without these entries
                </button>
              )}
              <button className="action-button" onClick={resetModal}>
                Return to upload
              </button>
            </div>
          </>
        )}

        {/* IF ERROR DURING PROCESSING */}
        {modalState.stage === 'error' && (
          <>
            <h3>Import entries error</h3>
            <p>The following error occurred while processing this file:</p>
            <p className="error-text">
              {modalState.err.message || 'Unknown error'}
            </p>
            <br/>
            <button className="action-button" onClick={resetModal}>
              Return to upload
            </button>
          </>
        )}
      </div>
    </div>
    
  )
}

AnalyzerUploadModal.propTypes = {
  filters: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default AnalyzerUploadModal;
