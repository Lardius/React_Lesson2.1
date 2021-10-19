import React from 'react'
import UsersPage from '../components/common/page/userPage'
import { useParams } from 'react-router-dom'
import UsersListPage from '../components/common/page/usersListPage'

const Users = () => {
  const params = useParams()
  const { userId } = params
  return <>{ userId ? <UsersPage id={ userId }/> : <UsersListPage/> }</>
}

export default Users
