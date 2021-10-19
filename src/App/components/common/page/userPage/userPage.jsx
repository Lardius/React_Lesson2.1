import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import api from '../../../../api'

const UsersPage = ({ id }) => {
  const history = useHistory()
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
  })
  if (user) {
    const allUsers = () => {
      history.push('/users')
    }
    return <>
      <div>
        <h1>{ user.name }</h1>
        <h3>Профессия: { user.profession.name }</h3>
        { user.qualities.map((item) => {
          return <div key={ item._id } className={ 'm-1 badge bg-' + item.color }>{ item.name }</div>
        }) }
        <h4>CompletedMeetings: { user.completedMeetings }</h4>
        <h3>Rate: { user.rate }</h3>
      </div>

      <button onClick={ () => allUsers() }>Все пользователи</button>
    </>
  }
  return 'Loader...'
}

UsersPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UsersPage
