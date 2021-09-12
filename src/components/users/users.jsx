import React, { useState, useEffect } from "react";
import Pagination from "../paginnation/pagination.jsx";
import PropTypes from "prop-types";
import { paginate } from "../../utils/paginate";
import TableItem from "../user/user.jsx";
import GroupList from "../groupList/groupList";
import api from "../../api";
import SearchStatus from "../searchStatus/searchStatus";
import _ from "lodash";
const Table = ({ props: allUsers, handleDelete, handleToggleBookMark }) => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
        : allUsers;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">

            {professions &&
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}/>
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                </div>
            }
            <div className="d-flex flex-column w-100">
                <SearchStatus props={filteredUsers.length} />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качество</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встречается, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"/>
                        </tr>
                    </thead>
                    <tbody>{usersCrop.map((user) => {
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
                    })}</tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={filteredUsers.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />

                </div>
            </div>

        </div>

    );
};
Table.propTypes = {
    props: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired
};
export default Table;
