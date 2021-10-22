import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, Link } from 'react-router-dom'
import api from '../../../../api'

const UsersPage = ({ id }) => {
  const history = useHistory()
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
  }, [])
  localStorage.setItem('user', JSON.stringify(user))
  if (user) {
    const allUsers = () => {
      history.push('/users')
    }
    console.log()
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
      <Link to={'/users/' + id + '/edit'} >Edit</Link>
    </>
  }
  return 'Loader...'
}

UsersPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UsersPage
