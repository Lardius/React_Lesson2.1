import React from 'react'
import PropTypes from 'prop-types'
import HumanQualities from './human-qualities'

const QualitiesList = ({ qualities }) => {
  return <>
    { qualities.map((item) => {
      const { _id, ...itemEnd } = item
      return (
        <span key={ _id }>
          <HumanQualities { ...itemEnd } />
        </span>
      )
    }) }
  </>
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
