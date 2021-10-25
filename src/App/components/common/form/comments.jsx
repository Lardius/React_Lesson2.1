import React, { useState } from 'react'
import api from '../../../api'
import AddNewComment from './addNewComment'
import CommentsList from './commentsList'
import PropTypes from 'prop-types'

const Comments = ({ id }) => {
  const commentsUsers = JSON.parse(localStorage.getItem('comments'))
  const [comments, setComments] = useState(commentsUsers.filter((x) => x.pageId === id))
  const [users] = useState(JSON.parse(localStorage.getItem('users')))

  const removeComment = (id) => {
    api.comments.remove(id).then()
    setComments(comments.filter((x) => x._id !== id))
  }

  const addNewComment = (data) => {
    api.comments.add(data).then((data) => setComments(prevState => ([
      ...prevState,
      data
    ])))
  }
  return (
    <>
      <AddNewComment addNewComment={addNewComment} users={users} id={id}/>

      {comments.length > 0 && <CommentsList comments={comments} removeComment={removeComment} users={users}/>}
    </>
  )
}
Comments.propTypes = { id: PropTypes.string.isRequired }

export default Comments
