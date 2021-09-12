import React from "react";
import PropTypes from "prop-types";
const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    const itemsValue = typeof items === "object"
        ? Object.values(items)
        : items;
    return (
        <ul className="list-group">
            {itemsValue.map((item) => {
                return <li
                    key={item[valueProperty]}
                    className={"list-group-item" +
                    (item === selectedItem
                        ? " active"
                        : "")}
                    role="button"
                    onClick={() => { onItemSelect(item); }}
                >{item[contentProperty]}</li>;
            })}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func,
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired
};
export default GroupList;
