import React from "react";
import TableHeader from "./tableHeader";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./Table";

const UserTable = ({ users, onSort, selectedSort, handleToggleBookMark, handleDelete }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities} />) },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: { path: "bookmark", name: "Избранное", component: (user) => (<BookMark onToggleBookMark={() => handleToggleBookMark(user._id)} favorite={user.bookmark}/>) },
        delete: {
            component: (user) => (<button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                delete
            </button>)
        }

    };
    return <Table
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
        data={users}>
        <TableHeader {...{ onSort, selectedSort, columns }}/>
        <TableBody {...{ columns, data: users }}/>
    </Table>;
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default UserTable;
