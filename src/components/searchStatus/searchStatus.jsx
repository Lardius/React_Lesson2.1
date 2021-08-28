import React from "react";

const SearchStatus = ({ props }) => {
  let message = "";
  let classNames = "badge bg-";
  if (props === 0) {
    props = "";
    classNames += "danger";
    message = " Никто с тобой не тусанет";
  } else if (
    1 < props % 10 &&
    props % 10 < 5 &&
    props % 100 !== 12 &&
    props % 100 !== 13 &&
    props % 100 !== 14
  ) {
    classNames += "primary";
    message = " человека тусанет с тобой сегодня";
  } else {
    classNames += "primary";
    message = " человек тусанет с тобой сегодня";
  }
  return (
    <>
      <span className={classNames}>
        <h1>
          {props}
          {message}
        </h1>
      </span>
    </>
  );
};

export default SearchStatus;
