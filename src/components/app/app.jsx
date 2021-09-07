import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchStatus from "../searchStatus/searchStatus.jsx";
import Table from "../users/users.jsx";
import API from "../../api";

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    const [value, setValue] = useState(users.length);

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
            <SearchStatus props={value} />
            <Table
                props={users}
                handleDelete={handleDelete}
                handleToggleBookMark={handleToggleBookMark}
            />
        </>
    );
};

export default App;
