import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ label, value, onChange, defaultOption, options, error }) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }
  const optionsArray = !Array.isArray(options) && typeof (options) === 'object'
    ? Object.keys(options).map(optionName => ({ name: options[optionName].name, _id: options[optionName]._id }))
    : options
  return (<div className="mb-4">
    <label htmlFor="validationCustom04" className="form-label">{ label }</label>
    <select
      className={getInputClasses()}
      id="validationCustom04"
      value={value}
      name="profession"
      onChange={onChange}>
      <option disabled value="">{ defaultOption }</option>
      {optionsArray &&
      optionsArray.map(option => {
        return <option
          key={ option._id }
          value={ option._id }>
          { option.name }
        </option>
      }
      ) }

    </select>
    {error && <div className="invalid-feedback">
      {error}
    </div> }
  </div>
  )
}

SelectField.propTypes = {
  defaultOption: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default SelectField