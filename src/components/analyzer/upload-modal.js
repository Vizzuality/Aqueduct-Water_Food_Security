import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import {
  SegmentedUi,
} from 'aqueduct-components';
import CustomTable from 'components/ui/Table/Table';
import {
  ID_LOOKUP,
  WATER_INDICATORS,
  ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE
} from 'constants/water-indicators';
import classNames from 'classnames';
import {
  ERROR_RESULT_HEADERS,
  transformErrors,
  ANALYSIS_URL,
} from 'constants/analyzer'
import { downloadCSV, toBase64 } from 'utils/data'
import { DownloadableTable } from 'components/ui/analyzer';
import {
  fetchAnalysis,
} from 'services/analysis'

const LOADING_STATE_TEXT = {
  transforming: 'Preparing file',
  uploading: 'Uploading',
  processing: <>Analyzing <small>(this may take a few minutes)</small></>,
  downloading: 'Downloading results',
}

const AnalyzerUploadModal = ({ filters, onDone }) => {
  const [modalState, setModalState] = useState({ stage: 'initial' })
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

  const downloadErrorCSV = (event, data) => {
    if (event) event.preventDefault();
    downloadCSV({
      data,
      showLabels: true,
      filename: `Prioritize Basins Analyzer - ${indicatorSpec ? indicatorSpec.name : indicatorKey} - Rows with errors`,
      headers: ERROR_RESULT_HEADERS.map(e => e.label)
    })
  };

  const submitFile = (file) => {
    if (file && !isNil(filters.threshold) && indicatorSpec) {
      setModalState({ stage: 'transforming' })
      toBase64(file)
      .then(value => {
        const newFile = new File([value], `${file.name}.b64`) // For staging
        // const newFile = file
        const data = new FormData(formRef.current)
        data.append('data', newFile)
        setModalState({ stage: 'uploading', progress: 0 })
        fetchAnalysis(data, indicatorKey, indicatorSpec.toRaw(filters.threshold), {
          onDownloadProgress: e => setModalState({ stage: 'downloading', progress: e.loaded / e.total }),
          onUploadProgress: e => {
            const progress = e.loaded / e.total
            if (progress >= 1) {
              setModalState({ stage: 'processing' })
            } else {
              setModalState({ stage: 'uploading', progress })
            }
          },
          onProcessing: progress => setModalState({ stage: 'processing', progress })
        })
        // UNCOMMENT TO MOCK
        // fakeAnalysis(null, indicatorKey, null, {
        //   includeLocations: true,
        //   includeErrors: true,
        //   onDownloadProgress: e => setModalState({ stage: 'downloading', progress: e.loaded / e.total }),
        //   onUploadProgress: e => setModalState({ stage: 'uploading', progress: e.loaded / e.total }),
        //   onProcessing: () => setModalState({ stage: 'processing' })
        // })
        .then(data => {
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
          <p>
            This functionality is in beta and under development.  Please help us improve and report bugs{' '}
            <a href="https://form.asana.com/?k=QWAlk9irSkhMNvxJqyFyEw&d=25496124013636" target="_blank">here</a>.{' '}
            Thank you for your patience.
          </p>
          <p>Please use the excel template below to structure your data.</p>
          <p>
            Follow the instructions in the template to add your own supply chain
            locations and materials. Do not change the structure of the template,
            such as by adding, deleting, or changing column names.
          </p>
          {/* TODO: Add this line back when we have a documentation page */}
          {/* <p>More information can be found <a href="#">here</a></p> */}
          <p>Click this link to download the template:</p>
          <ul>
              <li>
                <a href={ANALYSIS_URL || ''} download>template_supply_chain.xlsx</a>
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
              entries out of {modalState.errors.length + modalState.locations.length} failed to match watersheds.
            </p>
            <div className="downloadable-table">
              <DownloadableTable
                hideInstructions
                noExpand
                downloadOptions={[
                  { name: 'CSV', action: (e) => downloadErrorCSV(e, transformErrors(modalState.errors)) }
                ]}
              >
                <CustomTable
                  columns={ERROR_RESULT_HEADERS}
                  data={transformErrors(modalState.errors)}
                  pagination={{
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
