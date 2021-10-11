import React, { useEffect, useState } from "react";
import UsersPage from "../components/userPage";
import UsersList from "../components/usersList";
import api from "../api";
import PropTypes from "prop-types";

const Users = ({ match }) => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const postId = match.params.userId;
    if (users) { return <>{postId ? <UsersPage id={postId} users={users}/> : <UsersList usersList={users}/>}</>; }
    return "Loader ...";
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
