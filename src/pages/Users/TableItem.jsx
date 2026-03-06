import React from "react";
import WrongIcon from "../../assets/icons/icons8-wrong.svg?react";
import CheckIcon from "../../assets/icons/icons8-check.svg?react";

const TableItem = ({ user }) => {
  return (
    <tr key={user.id}>
      <td className="user-id">{user.id}</td>
      <td>{user.email}</td>
      <td>
        <span
          className={`status-badge status-badge--${user.status === "Tamamlanmış" ? "completed" : user.status === "Davam edir" ? "inprogress" : "default"}`}
        >
          {user.status}
        </span>
      </td>
      <td>{user.budget}</td>
      <td>
        {user?.interests?.map((interest, i) => (
          <span key={i} className="interest-badge">
            {interest}
          </span>
        ))}
      </td>
      <td>{user.companion}</td>
      <td>{user.guide ? <CheckIcon /> : <WrongIcon />}</td>
      <td>{user.airport ? <CheckIcon /> : <WrongIcon />}</td>
      <td>{user.registration_date}</td>
    </tr>
  );
};

export default TableItem;
