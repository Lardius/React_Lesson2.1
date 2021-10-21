import React, { useEffect, useState } from 'react'
// import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import * as yup from 'yup'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [error, setError] = useState({})
  const HandleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен для заполнения')
      .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
      .matches(/(?=.*[!@$%^&*])/, 'Пароль должен содержать один из специальных символов !@$%^&*')
      .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup.string().required('Электронная почта обязательня для заполнения').email("'Электронная почта введена некорректно'")
  })

  // const validatorConfig = {
  //   email: {
  //     isRequired:
  //   { message: 'Электронная почта обязательня для заполнения' },
  //     isEmail:
  //   { message: 'Электронная почта введена некорректно' }
  //   },
  //   password: {
  //     isRequired:
  //   { message: 'Пароль обязателен для заполнения' },
  //     isCapitalSymbol:
  //   { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
  //     isContainDigit:
  //   { message: 'Пароль должен содержать хотя бы одну цифру' },
  //     min:
  //   {
  //     message: 'Пароль должен состоять минимум из 8 символову',
  //     value: 8
  //   }
  //   }
  // }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    // const errors = validator(data, validatorConfig)
    validateScheme.validate(data).then(() => setError({})).catch((err) => setError({ [err.path]: err.message }))
    // setError(errors)
    // return Object.keys(errors).length === 0
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

      <CheckBoxField value={data.stayOn} onChange={HandleChange} name="stayOn" >Оставаться в системе</CheckBoxField>

      <button type="submit" disabled={ !isValid } className="btn btn-primary w-100 mx-auto">Submit</button>
    </form>
  )
}

export default LoginForm
