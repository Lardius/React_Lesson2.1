import React from "react";
import PropTypes from "prop-types";
import HumanQualities from "./human-qualities";

const QualitiesList = ({ qualities }) => {
    return <div className="d-flex ">
        {qualities.map((item) => {
            const { _id, ...itemEnd } = item;
            return (
                <div key={_id}>
                    <HumanQualities {...itemEnd} />
                </div>
            );
        })}
    </div>;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
