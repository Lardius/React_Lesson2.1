import React from "react";
import PropTypes from "prop-types";

const HumanQualities = ({ name, color }) => {
    let classNames = "m-1 badge bg-";
    classNames += color;

    return (
        <>
            <span className={classNames}>{name}</span>
        </>
    );
};
HumanQualities.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};
export default HumanQualities;
