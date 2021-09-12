import React from "react";
import "./user.css";
import PropTypes from "prop-types";
import HumanQualities from "../human-qualities/human-qualities.jsx";
import BookMark from "../bookmark/bookmark";

const TableItem = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    handleDelete,
    handleToggleBookMark,
    favorite
}) => {
    return (
        <>
            <th>{name}</th>
            <td>
                <div className="d-flex align-content-between margin-10">
                    {qualities.map((item) => {
                        const { _id, ...itemEnd } = item;
                        return (
                            <div key={_id}>
                                <HumanQualities {...itemEnd} />
                            </div>
                        );
                    })}
                </div>
            </td>
            <td key={profession._id}>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <BookMark
                    favorite={favorite}
                    onToggleBookMark={handleToggleBookMark}
                />
            </td>
            <td>
                <button className="btn btn-danger" onClick={handleDelete}>
                    delete
                </button>
            </td>
        </>
    );
};
TableItem.defaultProps = {
    favorite: false
};
TableItem.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired,
    favorite: PropTypes.bool.isRequired
};
export default TableItem;