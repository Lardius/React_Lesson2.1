import React, { useState } from 'react'
import SelectField from './selectField'
import PropTypes from 'prop-types'

const AddNewComment = ({ id, addNewComment, users }) => {
  const [data, setData] = useState({ userId: '', content: '', pageId: id })

  const HandleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const addTextComm = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      content: target.value
    }))
  }

  const add = () => {
    addNewComment(data)
    setData((prevState) => ({
      ...prevState,
      content: '',
      userId: ''
    }))
  }
  return (<div className="card mb-2">
    <div className="card-body">
      <div>
        <SelectField
          label="Выберите пользователя"
          name="userId"
          defaultOption="Выберите пользователя"
          value={data.userId}
          onChange={HandleChange}
          options={users}/>
        <div className="mb-4">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Сообщение</label>
          <textarea value={data.content} onChange={addTextComm} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button disabled={!data.content || !data.userId} onClick={add} className="btn btn-primary">Опубликовать</button>
        </div>
      </div>
    </div>
  </div>
  )
}

AddNewComment.propTypes = {
  id: PropTypes.string.isRequired,
  addNewComment: PropTypes.func,
  users: PropTypes.array
}
export default AddNewComment
