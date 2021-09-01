import React from "react";

const BookMark = ({ favorite, onToggleBookMark }) => {
  let classNames = "bi bi-bookmark-heart";
  if (favorite) {
    classNames += "-fill";
  } else {
    classNames = "bi bi-bookmark-heart";
  }
  return (
    <div className="icon">
      <i
        style={{ cursor: "pointer" }}
        className={
          favorite ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark-heart"
        }
        onClick={onToggleBookMark}
      ></i>
    </div>
  );
};

export default BookMark;
