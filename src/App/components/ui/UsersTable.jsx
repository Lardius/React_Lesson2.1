import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table'

const UserTable = ({ users, onSort, selectedSort, handleToggleBookMark, handleDelete }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества', component: (user) => (<Qualities qualities={ user.qualities }/>) },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark onToggleBookMark={ () => handleToggleBookMark(user._id) } favorite={ user.bookmark }/>)
    },
    delete: {
      component: (user) => (<button className="btn btn-danger" onClick={ () => handleDelete(user._id) }>
        delete
      </button>)
    }

  }
  return <Table
    onSort={ onSort }
    selectedSort={ selectedSort }
    columns={ columns }
    data={ users }>
  </Table>
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  handleToggleBookMark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default UserTable
