
import sortBy from 'lodash/sortBy'
import { WATER_INDICATORS } from 'constants/water-indicators'

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

export const RESULT_FIELD_ORDER = [
  "rn",
  "wid",
  "lid",
  "ip",
  "cn",
  "s",
  "rv",
  "dc",
  "pcr"
]

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

/**
 * Extracts locations from the result object
 * 
 * @param {Object} obj - the object returned from the analysis query
 * @returns 
 */
export const extractLocations = (obj) => {
  let locations = []
  if (obj.locations) locations = [ ...obj.locations ]
  return locations
}

/**
 * Extracts and processes locations into the values shown in the table
 * 
 * @param {Object} obj - the object returned from the analysis query
 */
export const extractTableValues = obj => {
  const locations = extractLocations(obj)
  return (
    locations.map(loc => (
      sortBy(Object.entries(loc), ([k]) => RESULT_FIELD_ORDER.indexOf(k))
      .reduce((acc, [k, v]) => {
        const label = RESULT_LOOKUP[k].replace(/^(\*)/, WATER_INDICATORS_LOOKUP[obj.indicator].shortName)
        return ({ ...acc, [label]: v })
      }, {})
    ))
  )
}

