import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component
      if (typeof component === 'function') {
        return component(item)
      }
      return component
    }
    return _.get(item, columns[column].path)
  }
  return (
    <tbody>
      { data.map((item) => (
        <tr key={ item._id }>
          { Object.keys(columns).map((column) => {
            if (column === 'name') {
              const id = item._id
              return <td key={ column }><Link to={ '/users/' + id }>{ renderContent(item, column) }</Link></td>
            } else {
              return <td key={ column }>{ renderContent(item, column) }</td>
            }
          }) }
        </tr>
      )) }
    </tbody>
  )
}
TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableBody
