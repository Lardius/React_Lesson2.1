import React from "react";
import "./table-item.css";
import HumanQualities from "../human-qualities/human-qualities.jsx";
const TableItem = ({
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  handleDelete,
  handleToggleBookMark,
  favorite = false,
}) => {
  let classNames = "bi bi-bookmark-heart";
  if (!favorite) {
    console.log(222);
    classNames += "-fill";
  }
  const qualiti = qualities.map((item) => {
    const { _id, ...itemEnd } = item;
    return (
      <div key={_id}>
        <HumanQualities {...itemEnd} />
      </div>
    );
  });
  return (
    <>
      <th>{name}</th>
      <td>
        <div className="d-flex align-content-between margin-10">{qualiti}</div>
      </td>
      <td key={profession._id}>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <div className="icon">
          <i className={classNames} onClick={handleToggleBookMark}></i>
        </div>
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
          delete
        </button>
      </td>
    </>
  );
};

export default TableItem;
