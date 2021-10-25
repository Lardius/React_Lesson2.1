import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, Link } from 'react-router-dom'
import api from '../../../../api'
import QualitiesList from '../../../ui/qualities'
import Comments from '../../form/comments'

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
    return <>
      <button className="btn btn-primary m-3" onClick={ () => allUsers() }><i className="bi bi-backspace m-1"></i>Все пользователи</button>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <Link to={'/users/' + id + '/edit'}>
                  <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                    <i className="bi bi-gear"></i>
                  </button>
                </Link>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <img src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                  )
                    .toString(36)
                    .substring(7)}.svg`}
                  className="rounded-circle shadow-1-strong me-3"
                  alt="avatar"
                  width="150"
                  height="150"/>
                  <div className="mt-3">
                    <h4>{ user.name }</h4>
                    <p className="text-secondary mb-1">{ user.profession.name }</p>
                    <div className="text-muted">
                      <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                      <i className="bi bi-caret-up text-secondary" role="button"></i>
                      <span className="ms-2">{ user.rate }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className=" card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Qualities</span>
                </h5>
                <p className="card-text">
                  <QualitiesList qualities={user.qualities} />
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Completed meetings</span>
                  </h5>

                  <h1 className="display-1">{ user.completedMeetings }</h1>
                </div>
              </div>
            </div>

          </div>
          <div className="col-md-8">
            <Comments id={id}/>
          </div>
        </div>
      </div>
    </>
  }
  return <div className="container shadow ">Loader...</div>
}

UsersPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UsersPage
