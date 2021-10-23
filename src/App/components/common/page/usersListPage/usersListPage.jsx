import React, { useState, useEffect } from 'react'
import Pagination from '../../pagination.jsx'
import { paginate } from '../../../../utils/paginate'
import GroupList from '../../groupList'
import api from '../../../../api'
import SearchStatus from '../../../ui/searchStatus'
import _ from 'lodash'
import UsersTable from '../../../ui/UsersTable'

const UsersListPage = () => {
  const pageSize = 4
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  const [data, setData] = useState({ inputSearch: '' })

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = (userId) => {
    const newFavorit = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark
      }
      return user
    })
    setUsers(newFavorit)
  }
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setData((prevState) => ({
      ...prevState,
      inputSearch: ''
    }))
    setSelectedProf(item)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const HandleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
    setSelectedProf()
    setCurrentPage(1)
  }

  if (users) {
    const filteredUsersBySearchField = users.filter((user) => (user.name.toLowerCase().indexOf(data.inputSearch.toLowerCase())) >= 0)
    const filteredUsers = data.inputSearch.length > 0
      ? filteredUsersBySearchField
      : (selectedProf
        ? users.filter((user) => _.isEqual(user.profession, selectedProf))
        : users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className="d-flex">

        { professions &&
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={ selectedProf }
            items={ professions }
            onItemSelect={ handleProfessionSelect }/>
          <button className="btn btn-secondary mt-2" onClick={ clearFilter }>Очистить</button>
        </div>
        }
        <div className="d-flex flex-column w-100">
          <SearchStatus props={ count }/>
          <input type="text" value={ data.inputSearch } placeholder="Search..." className="w-100 my-2"
            name="inputSearch"
            onChange={ HandleChange }/>
          { usersCrop.length > 0 &&
          <UsersTable
            users={ usersCrop }
            onSort={ handleSort }
            selectedSort={ sortBy }
            handleDelete={ handleDelete }
            handleToggleBookMark={ handleToggleBookMark }
          /> }
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={ count }
              pageSize={ pageSize }
              currentPage={ currentPage }
              onPageChange={ handlePageChange }
            />
          </div>
        </div>

      </div>

    )
  }
  return <div className="container shadow ">Loader...</div>
}

export default UsersListPage
