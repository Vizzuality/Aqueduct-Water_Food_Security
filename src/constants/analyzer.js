import compact from 'lodash/compact'
import sortBy from 'lodash/sortBy'
import { WATER_INDICATORS } from 'constants/water-indicators'

export const SET_ANALYSIS = 'SET_ANALYSIS'
export const RESET_ANALYSIS = 'RESET_ANALYSIS'

// TODO: Update to non-blob based URL once merged into the main branch
export const ANALYSIS_URL = "https://rawcdn.githack.com/greenriver/aqueduct-food/5f8afafbe8d923a75bef8c902ff98ee3bc439baa/doc/analyzer/template_supply_chain.xlsx"

export const RESULT_LOOKUP = {
  as: 'Annual Spend',
  pcr: '* % Change Required',
  dc: '* Desired Condition',
  rv: '* Raw Value',
  s: '* Score',
  cy: 'Country',
  cn: 'Crop_Name',
  e: 'Error',
  ip: 'IFPRI_production_MT',
  lat: 'Latitude',
  lid: 'Location ID',
  lng: 'Longitude',
  mt: 'Material Type',
  mv: 'Material Volume (MT)',
  ra: 'Radius',
  ru: 'Radius Unit',
  rn: 'row',
  st: 'State/Province',
  wid: 'Watershed ID'
}

const arrayToLookup = arr => arr.reduce((acc, k) => ({ ...acc, [k]: RESULT_LOOKUP[k] }), {})

export const LOCATION_RESULT_FIELD_ORDER = [
  'rn',
  'wid',
  'lid',
  'ip',
  'cn',
  's',
  'rv',
  'dc',
  'pcr',
]

export const LOCATION_RESULT_LOOKUP = arrayToLookup(LOCATION_RESULT_FIELD_ORDER)
export const LOCATION_RESULT_HEADERS = Object.values(LOCATION_RESULT_LOOKUP).map(label => ({ value: label, label }))

export const ERROR_RESULT_FIELD_ORDER = [
  'rn',
  'lid',
  'lat',
  'lng',
  'ra',
  'ru',
  'st',
  'cy',
  'mt',
  'mv',
  'as',
  'e',
]

export const ERROR_RESULT_LOOKUP = arrayToLookup(ERROR_RESULT_FIELD_ORDER)
export const ERROR_RESULT_HEADERS = Object.values(ERROR_RESULT_LOOKUP).map(label => ({ value: label, label }))

export const WATER_INDICATORS_LOOKUP = (
  ['bws', 'bwd', 'cep', 'udw', 'usa', 'gtd']
  .map(key => {
    const indicator = WATER_INDICATORS[key]
    if (indicator) return [key, indicator]
    return null
  })
  .filter(Boolean)
  .reduce((acc, [key, indicator]) => ({ ...acc, [key]: { name: indicator.name, shortName: key.toUpperCase() } }), {})
)

export const getShortNameForIndicator = indicator => {
  let shortName
  try {
    shortName = WATER_INDICATORS_LOOKUP[indicator].shortName || '*'
  } catch(e) {
    shortName = '*'
  }
  return shortName
}

export const getHeadersForIndicator = (headers = [], indicator) => {
  return compact(headers).map(h => {
    const replaced = h.label.replace(/^(\*)/, getShortNameForIndicator(indicator))
    return { value: replaced, label: replaced }
  })
}

export const transformValues = (items, { indicator, orderArr = [] } = {}) => {
  return items.map(loc => (
    sortBy(Object.entries(loc), ([k]) => orderArr.indexOf(k))
    .reduce((acc, [k, v]) => {
      const label = RESULT_LOOKUP[k].replace(/^(\*)/, getShortNameForIndicator(indicator))
      return ({ ...acc, [label]: v })
    }, {})
  ))
}

export const transformLocations = (locations = [], indicator) => transformValues(locations, { orderArr: LOCATION_RESULT_FIELD_ORDER, indicator })
export const transformErrors = (errors = []) => transformValues(errors, { orderArr: ERROR_RESULT_FIELD_ORDER })

export const transformResults = ({ errors = [], locations = [], indicator = '' } = {}) => ({
  locations: transformLocations(locations, indicator),
  errors: transformErrors(errors),
  indicator,
})
