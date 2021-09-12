import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ favorite, onToggleBookMark }) => {
    return (
        <div className="icon">
            <i
                style={{ cursor: "pointer" }}
                className={"bi bi-bookmark-heart" + (favorite ? "-fill" : "")}
                onClick={onToggleBookMark}
            />
        </div>
    );
};
BookMark.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired,
    favorite: PropTypes.bool.isRequired
};
export default BookMark;
