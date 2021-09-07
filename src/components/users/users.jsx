import React, { useState } from "react";
import Pagination from "../paginnation/pagination.jsx";
import PropTypes from "prop-types";
import { paginate } from "../../utils/paginate";
import TableItem from "../user/user.jsx";

const Table = ({ props: allUsers, handleDelete, handleToggleBookMark }) => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        console.log("page", pageIndex);
        setCurrentPage(pageIndex);
    };
    const users = paginate(allUsers, currentPage, pageSize);
    const elementTable = users.map((user) => {
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
        <>
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
            <Pagination
                itemsCount={allUsers.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Table.propTypes = {
    props: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
};
export default Table;
