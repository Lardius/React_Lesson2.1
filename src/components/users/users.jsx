import React from "react";
import TableItem from "../user/user.jsx";

const Table = ({ props, handleDelete, handleToggleBookMark }) => {
  const elementTable = props.map((user) => {
    const { _id, ...users } = user;
    return (
      <tr key={_id}>
        <TableItem
          {...users}
          handleDelete={() => handleDelete(_id)}
          handleToggleBookMark={() => handleToggleBookMark(_id)}
        />
      </tr>
    );
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качество</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встречается, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{elementTable}</tbody>
    </table>
  );
};

export default Table;
