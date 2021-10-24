import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, Link } from 'react-router-dom'
import api from '../../../../api'

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
                  { user.qualities.map((item) => {
                    return <span key={ item._id }
                      className={ 'm-1 badge bg-' + item.color }>
                      { item.name }
                    </span>
                  }) }
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
            <div className="card mb-2">
              <div className="card-body">
                <div>
                  <h2>New comment</h2>
                  <div className="mb-4">
                    <select className="form-select" name="userId" value="">
                      <option disabled="" value="" selected="">
                        Выберите пользователя
                      </option>

                      <option>Доктор</option>
                      <option>Тусер</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Сообщение</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h2>Comments</h2>
                <hr/>
                <div className="bg-light card-body mb-3">
                  <div className="row">
                    <div className="col">
                      <div className="d-flex flex-start">
                        <img src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                          className="rounded-circleshadow-1-strong me-3" alt="avatar" width="65" height="65"/>
                        <div className="flex-grow-1 flex-shrink-1">
                          <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-1">
                                    Джон Дориан
                                <span className="small">5 минут назад</span>
                              </p>
                              <button className="btn btn-sm text-primary d-flex align-items-center">
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </div>
                            <p className="small mb-0">
                                  Lorem ipsum dolor sit
                                  amet consectetur
                                  adipisicing elit.
                                  Corporis, soluta facilis
                                  fugit hic quasi sapiente
                                  accusamus quia
                                  voluptatem dolorum
                                  laboriosam id iste
                                  voluptas modi animi eius
                                  voluptatum adipisci amet
                                  officiis.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

// <h1>{ user.name }</h1>
// <h3>Профессия: { user.profession.name }</h3>
// <div>
//   { user.qualities.map((item) => {
//     return <div key={ item._id }
//                 className={ 'm-1 badge bg-' + item.color }>
//       { item.name }
//     </div>
//   }) }
// </div>
//
// <h4>CompletedMeetings: { user.completedMeetings }</h4>
// <h3>Rate: { user.rate }</h3>
//
// <button className="btn btn-secondary" onClick={ () => allUsers() }>Все пользователи</button>
// <Link className="btn btn-secondary m-4" to={'/users/' + id + '/edit'} >Edit</Link>
