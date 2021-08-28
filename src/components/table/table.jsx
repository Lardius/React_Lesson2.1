import React from "react";
import TableItem from "../table-item/table-item.jsx";

const Table = ({ props, handleDelete }) => {
  const elementTable = props.map((user) => {
    const { _id, ...users } = user;
    return (
      <tr key={_id}>
        <TableItem {...users} handleDelete={() => handleDelete(_id)} />
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
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{elementTable}</tbody>
    </table>
  );
};

export default Table;
