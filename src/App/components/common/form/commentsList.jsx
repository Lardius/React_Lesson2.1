import React from 'react'
import PropTypes from 'prop-types'
import Comment from './comment'

const CommentsList = ({ comments, removeComment, users }) => {
  const objSort = (a, b) => {
    return b.created_at - a.created_at
  }
  const commentsSort = comments.sort(objSort)
  return (<div className="card mb-3">
    <div className="card-body">
      <h2>Comments</h2>
      <hr/>
      {commentsSort.map((comment) =>
        <div key={comment._id} className="bg-light card-body mb-3">
          <Comment
            user={users.filter((item) => item._id === comment.userId)}
            onRemove={() => removeComment(comment._id)}
            comment={comment.content}
            createTime={comment.created_at}/>
        </div>
      )}
    </div>
  </div>
  )
}
CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  removeComment: PropTypes.func.isRequired,
  users: PropTypes.array

}

export default CommentsList
