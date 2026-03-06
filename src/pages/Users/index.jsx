import React, { useEffect, useState } from "react";
import "./style.scss";
import api from "../../services/api";
import SituationBox from "./SituationBox";
import UserFilter from "./UserFilter";
import TableItem from "./TableItem";
import useDebounce from "../../hooks/useDebounce";

const situationData = [
  {
    title: "Ümumi İstifadəçilər",
    icon: "ConfirmUser",
    key: "totalUsers",
    colorClass: "blue",
  },
  {
    title: "Tamamlanmış",
    icon: "ConfirmUser",
    key: "completedUsers",
    colorClass: "green",
  },
  {
    title: "Dəvam edən",
    icon: "ClockIcon",
    key: "inProgressUsers",
    colorClass: "secondary",
  },
];

const Users = () => {
  const [userSituations, setUserSituations] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [budgetData, setBudgetData] = useState("");

  const debouncedSearch = useDebounce(searchData, 350);
  const debouncedStatus = useDebounce(statusData, 350);
  const debouncedBudget = useDebounce(budgetData, 350);


  useEffect(() => {
    const fetchUserSituations = async () => {
      setLoading(true);
      try {
        const response = await api.get("/userSituations");
        setUserSituations(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching user situations:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSituations();
  }, []); 

  // Debounced axtarış və filter dəyişiklikləri üçün istifadə olunur
  useEffect(() => {
    const fetchUsers = async () => {
      setTableLoading(true);
      try {
        // const data = await api.get(
        //   `/users?search=${debouncedSearch}&status=${debouncedStatus}&budget=${debouncedBudget}`,
        // );
        const data = await api.get("/users")
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setTableLoading(false);``
      }
    };

    fetchUsers();
  }, [debouncedSearch, debouncedStatus, debouncedBudget]); // ← yalnız bunlar dəyişəndə

  return (
    <div className="user-container">
      <div className="user-header">
        <h2>İstifadəçilər</h2>
        <p>Bütün istifadəçilərin detallı məlumatları</p>
      </div>

      <div className="user-situation">
        {loading ? (
          <p>Yüklənir...</p>
        ) : (
          situationData.map((situation) => (
            <SituationBox
              key={situation.key}
              title={situation.title}
              icon={situation.icon}
              colorClass={situation.colorClass}
              data={userSituations[situation?.key]}
            />
          ))
        )}
      </div>

      <UserFilter
        searchData={searchData}
        statusData={statusData}
        budgetData={budgetData}
        onSearchChange={setSearchData}
        onStatusChange={setStatusData}
        onBudgetChange={setBudgetData}
      />

      <div className="user-table-data-container">
        {tableLoading ? (
          <p>Yüklənir...</p>
        ) : (
          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>STATUS</th>
                  <th>BÜDCƏ</th>
                  <th>MARAQLAR</th>
                  <th>YOLDAŞ</th>
                  <th>BƏLƏDÇİ</th>
                  <th>AIRPORT</th>
                  <th>QEYDİYYAT</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <TableItem key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
