import React from 'react'
import PropTypes from 'prop-types'
import Comment from './comment'

const CommentsList = ({ comments, removeComment, users }) => {
  return (<div className="card mb-3">
    <div className="card-body">
      <h2>Comments</h2>
      <hr/>
      {comments.map((comment) =>
        <div key={comment._id} className="bg-light card-body mb-3">
          <Comment user={users.filter((item) => item._id === comment.userId)} onRemove={() => removeComment(comment._id)} comment={comment.content} createTime={comment.created_at}/>
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
