import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ props }) => {
  let message = ''
  let classNames = 'badge bg-'
  if (props === 0) {
    props = ''
    classNames += 'danger'
    message = ' Никто с тобой не тусанет'
  } else if (
    props > 1 % 10 &&
    props % 10 < 5 &&
    props % 100 !== 12 &&
    props % 100 !== 13 &&
    props % 100 !== 14
  ) {
    classNames += 'primary'
    message = ' человека тусанет с тобой сегодня'
  } else {
    classNames += 'primary'
    message = ' человек тусанет с тобой сегодня'
  }
  return (
    <div className="w-50">
      <span className={ classNames }>
        <h1>
          { props }
          { message }
        </h1>
      </span>
    </div>
  )
}
SearchStatus.propTypes = {
  props: PropTypes.number.isRequired
}
export default SearchStatus
