import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "../users/users.jsx";
import api from "../../api";

const App = () => {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState(users.length);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
        setValue(value - 1);
    };

    const handleToggleBookMark = (userId) => {
        const newFavorit = users.map((user) => {
            if (user._id === userId) {
                user.favorite = !user.favorite;
            }
            return user;
        });
        setUsers(newFavorit);
    };

    return (
        <>
            <Table
                props={users}
                handleDelete={handleDelete}
                handleToggleBookMark={handleToggleBookMark}
            />
        </>
    );
};

export default App;
