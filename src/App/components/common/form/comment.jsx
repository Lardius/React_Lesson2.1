import React from 'react'
import PropTypes from 'prop-types'

const Comment = ({ comment, createTime, onRemove, user }) => {
  const dateNow = (time) => {
    const dataNow = Math.round((Date.now() - time) / 60000)
    let timeComm = ''
    const dateComment = new Date(Number(createTime))
    if (dataNow < 1) {
      timeComm = ' - 1 минуту назад'
    } else if (dataNow < 5) {
      timeComm = ' - 5 минут назад'
    } else if (dataNow < 10) {
      timeComm = ' - 10 минут назад'
    } else if (dataNow < 30) {
      timeComm = ' - 30 минут назад'
    } else if (dataNow / 1440 < 1) {
      timeComm = ` - ${Math.floor((Date.now() - createTime) / 60000 / 60)} часа(ов) 
      ${Math.round((Date.now() - createTime) / 60000 % 60)} минут(ы) назад`
    } else if (dataNow / 1440 / 365 < 1) {
      timeComm = ` - ${dateComment.getDay()}  
      ${dateComment.toLocaleString('en-EN', { month: 'long' })}`
    } else if (dataNow / 1440 / 365 > 1) {
      timeComm = ` - ${dateComment.getDay()}  
      ${dateComment.toLocaleString('en-EN', { month: 'long' })} 
      ${dateComment.getFullYear()}`
    }
    return timeComm
  }
  const timeComm = dateNow(createTime)

  return (
    <div className="row">
      <div className="col">
        <div className="d-flex flex-start">
          <img src={`https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
          className="rounded-circle shadow-1-strong me-3"
          alt="avatar"
          width="65"
          height="65"/>
          <div className="flex-grow-1 flex-shrink-1">
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1">{user[0].name}<span className="small">{timeComm}</span>
                </p>
                <button onClick={onRemove} className="btn btn-sm text-primary d-flex align-items-center">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <p className="small mb-0">{comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  createTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRemove: PropTypes.func,
  user: PropTypes.array
}

export default Comment
