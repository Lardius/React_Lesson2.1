import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioForm'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  const [qualities, setQualities] = useState()
  const [data, setData] = useState({ email: '', password: '', profession: '', sex: 'male', qualities: [], licence: false })
  const [professions, setProfession] = useState()
  const [error, setError] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const HandleChange = (target) => {
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
    },
    licence:
          {
            isRequired:
            { message: 'Вы не сможете использовать наш сервис без подтверждения лицензионного соглашения' }
          },
    profession: {
      isRequired:
        { message: 'Поле обязательно для заполнения' }
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
      <SelectField
        label="Выберите Вашу профессию"
        defaultOption="Choose..."
        value={data.profession}
        onChange={HandleChange}
        error={error.profession}
        options={professions}/>

      <RadioField options={[
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' }
      ]} onChange={HandleChange}
      value={data.sex}
      name="sex"
      label="Укажите Ваш пол"
      />

      <MultiSelectField onChange={HandleChange} options={qualities} name="qualities" label="Выберите Ваши качества"/>

      <CheckBoxField value={data.licence} onChange={HandleChange} name="licence" error={error.licence} >Подтвердить <a>лицензионное соглашение</a></CheckBoxField>

      <button type="submit" disabled={ !isValid } className="btn btn-primary w-100 mx-auto">Submit</button>

    </form>
  )
}

export default RegisterForm
