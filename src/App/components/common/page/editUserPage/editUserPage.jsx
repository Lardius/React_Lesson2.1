import React, { useEffect, useState } from 'react'
import api from '../../../../api'
import { validator } from '../../../../utils/validator'
import TextField from '../../form/textField'
import SelectField from '../../form/selectField'
import RadioField from '../../form/radioForm'
import MultiSelectField from '../../form/multiSelectField'
import { useHistory } from 'react-router-dom'

const EditUserPage = () => {
  const history = useHistory()
  const [user] = useState(JSON.parse(localStorage.getItem('user')))
  const userQualities = user.qualities.map(item => {
    return { label: item.name, value: item._id, color: item.color }
  })
  const [qualities, setQualities] = useState()
  const [professions, setProfession] = useState()
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    profession: user.profession._id,
    sex: user.sex,
    qualities: userQualities
  })
  const [dataEnd, setDataEnd] = useState({})
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
  const update = () => {
    setDataEnd(
      {
        ...data,
        qualities: qualities ? (data.qualities.map((item) => ({ name: item.label, _id: item.value, color: item.color }))) : {},
        profession: professions ? (professions[Object.keys(professions).filter((item) => (professions[item]._id === data.profession) && professions[item])[0]]) : []
      })
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
    update()
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setError(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(error).length === 0
  if (professions) {
    const HandleSubmit = (e) => {
      e.preventDefault()

      const isValid = validate()
      if (!isValid) return null
      api.users.update(user._id, dataEnd).then()
      console.log(dataEnd)
      history.push('/users/' + user._id)
    }

    return (
      <form className="container" onSubmit={ HandleSubmit }>
        <TextField
          label="Имя"
          type="text"
          onHandleChange={ HandleChange }
          name="name"
          error={ error.name }
          value={ data.name }/>

        <TextField
          label="Электронная почта"
          onHandleChange={ HandleChange }
          name="email"
          value={ data.email }
          error={ error.email }
        />

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

        <MultiSelectField
          defaultValue={data.qualities}
          onChange={HandleChange}
          options={qualities}
          name="qualities"
          label="Выберите Ваши качества"/>
        <button type="submit" disabled={ !isValid } className="btn btn-primary w-100 mx-auto">Обновить данные</button>

      </form>
    )
  }
  return <div className="container shadow">Loader...</div>
}

export default EditUserPage
