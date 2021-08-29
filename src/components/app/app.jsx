import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchStatus from "../searchStatus/searchStatus.jsx";
import Table from "../table/table.jsx";
import API from "../../api";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const [count, setCount] = useState(users.length);
  const [favorite, setFavorite] = useState(true);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
    setCount(count - 1);
  };

  const handleToggleBookMark = (id) => {
    setUsers(users.map((user) => user._id !== id));
    setFavorite(!favorite);
    console.log(favorite);
    console.log(id);
  };

  return (
    <>
      <SearchStatus props={count} />
      <Table
        props={users}
        handleDelete={handleDelete}
        handleToggleBookMark={handleToggleBookMark}
        favorite
      />
    </>
  );
};

export default App;
