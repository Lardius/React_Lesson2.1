import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [error, setError] = useState({})
  const HandleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired:
    { message: 'Электронная почта обязательня для заполнения' },
      isEmail:
    { message: 'Электронная почта введена некорректно' }
    },
    password: {
      isRequired:
    { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol:
    { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
      isContainDigit:
    { message: 'Пароль должен содержать хотя бы одну цифру' },
      min:
    {
      message: 'Пароль должен состоять минимум из 8 символову',
      value: 8
    }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setError(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(error).length === 0

  const HandleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }
  return (

    <form onSubmit={ HandleSubmit }>
      <TextField
        label="Email"
        onHandleChange={ HandleChange }
        name="email"
        value={ data.email }
        error={ error.email }
      />

      <TextField
        label="Password"
        type="password"
        onHandleChange={ HandleChange }
        name="password"
        error={ error.password }
        value={ data.password }/>
      <button type="submit" disabled={ !isValid } className="btn btn-primary w-100 mx-auto">Submit</button>
    </form>
  )
}

export default LoginForm
