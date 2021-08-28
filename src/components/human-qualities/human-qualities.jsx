import React from "react";

const HumanQualities = ({ name, color }) => {
  let classNames = "m-1 badge bg-";
  classNames += color;

  return (
    <>
      <span className={classNames}>{name}</span>
    </>
  );
};

export default HumanQualities;
