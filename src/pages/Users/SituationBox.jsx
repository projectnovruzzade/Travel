import React from "react";
import ConfirmUser from "../../assets/icons/icons8-confirm.svg?react";
import ClockIcon from "../../assets/icons/icons8-clock.svg?react";

const matchIcon = {
    ConfirmUser: <ConfirmUser />,
    ClockIcon: <ClockIcon />,
};


const SituationBox = ({ title, icon: Icon, colorClass, data }) => {
    
  return (
    <div className="situation-box">
      <div className="content">
        <div className="text_part">
          <span className="secondary">{title}</span>
          <strong className={`primary ${colorClass}`} >
            {data}
          </strong>
        </div>
        <div className={`icon_part ${colorClass}`}>
          {matchIcon[Icon] ? matchIcon[Icon] : null}
        </div>
      </div>
    </div>
  );
};

export default SituationBox;
