import Input from "../../components/Input";
import Button from "../../components/Button";
import SearchIcon from "../../assets/icons/icons8-search.svg?react";
import DownloadIcon from "../../assets/icons/icons8-download.svg";
import useDebounce from "../../hooks/useDebounce";
import { useEffect } from "react";
import api from "../../services/api";

const UserFilter = ({
  searchData,
  statusData,
  budgetData,
  onSearchChange,
  onStatusChange,
  onBudgetChange,
}) => {
  return (
    <div className="user-filter">
      <div className="user-filter__inputs">
        <Input
          label="Axtar"
          placeholder="Email və ya ID ilə axtar..."
          icon={SearchIcon}
          size="md"
          type="text"
          value={searchData}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Input
          label="Status"
          placeholder="Status axtar..."
          size="md"
          type="text"
          value={statusData}
          onChange={(e) => onStatusChange(e.target.value)}
        />

        <Input
          label="Büdcə"
          placeholder="Büdcə axtar..."
          size="md"
          type="text"
          value={budgetData}
          onChange={(e) => onBudgetChange(e.target.value)}
        />
      </div>

      <div className="user-filter__actions">
        <Button
          content="CSV Export"
          bg_color="yellowMain"
          text_color="#fff"
          icon_content={DownloadIcon}
          onClick={() => console.log("Exporting CSV...")}
        />
      </div>
    </div>
  );
};

export default UserFilter;
