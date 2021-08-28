import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchStatus from "../searchStatus/searchStatus.jsx";
import Table from "../table/table.jsx";
import API from "../../api";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const [count, setCount] = useState(users.length);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
    setCount(count - 1);
  };
  return (
    <>
      <SearchStatus props={count} />
      <Table props={users} handleDelete={handleDelete} />
    </>
  );
};

export default App;
