import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ type, label, name, value, onHandleChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onHandleChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  const toggleShowPassword = () => {
    setShowPassword((state) => !state)
  }

  return (
    <div className="mb-4">
      <label htmlFor={ name }>{ label }</label>
      <div className="input-group has-validation">
        <input
          type={ showPassword ? 'text' : type }
          id={ name }
          value={ value }
          onChange={ handleChange }
          name={ name }
          className={ getInputClasses() }/>
        { type === 'password' &&
        (<button
          className="btn btn-outline-secondary"
          type="button"
          onClick={ toggleShowPassword }>
          <i className={ 'bi bi-eye' + (showPassword ? '-slash' : '') }></i>
        </button>) }
        { error && <div className="invalid-feedback">{ error }</div> }
      </div>

    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default TextField
