import { useEffect, useState, useContext, useCallback } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../../api/user_api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import UserCard from "../../components/users/userCard/UserCard";
import UserTable from "../../components/users/userTable/UserTable";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [tempRoles, setTempRoles] = useState({});
  const [view, setView] = useState('table'); // 'card' or 'table'

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  const currentUser = auth.user;

  const fetchUsers = useCallback(async () => {
    try {
      const res = await getAllUsers({
        page,
        limit,
        search
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) {
      console.log("Error fetching users:", err.response);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Initialize tempRoles when users are loaded
  useEffect(() => {
    const roles = {};
    users.forEach((u) => {
      roles[u._id] = u.role;
    });
    setTempRoles(roles);
  }, [users]);

  // Search handler
  const handleSearch = (text) => {
    setPage(1);
    setSearch(text);
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  // Save role (Admin only)
  const handleSaveRole = async (id) => {
    try {
      const newRole = tempRoles[id];
      await updateUserRole(id, { role: newRole });

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );

      alert("Role updated!");
    } catch (err) {
      console.log("Error updating role:", err.response);
      alert("Failed to update role");
    }
  };

  // Delete user (Admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log("Error deleting user:", err.response);
    }
  };

  // Handle role change in dropdown
  const handleRoleChange = (userId, newRole) => {
    setTempRoles({ ...tempRoles, [userId]: newRole });
  };

  // Handle create task
  const handleCreateTask = (userId) => {
    navigate(`/tasks/create?assignedTo=${userId}`);
  };

  // Toggle view
  const toggleView = () => {
    setView(view === 'card' ? 'table' : 'card');
  };

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <div>
          <h1>{currentUser.role === "Admin" ? "Manage Users" : "Assign Tasks"}</h1>
          <p>
            {currentUser.role === "Admin"
              ? "Update roles & manage users"
              : "List of all users!"}
          </p>
        </div>
        <button className="view-toggle-btn" onClick={toggleView}>
          {view === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
        </button>
      </div>

      <div className="user-management-controls">
        <SearchBar placeholder="Search users..." onSearch={handleSearch} />

        <div className="limit-selector">
          <label>Show:</label>
          <select value={limit} onChange={handleLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <div className="user-management-info">
        <p>
          Showing {users.length} of {total} users
        </p>
      </div>

      {view === 'card' ? (
        <div className="user-cards">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              tempRole={tempRoles[user._id]}
              onRoleChange={handleRoleChange}
              onSaveRole={handleSaveRole}
              onDelete={handleDelete}
              onCreateTask={handleCreateTask}
              currentUser={currentUser}
            />
          ))}
        </div>
      ) : (
        <UserTable
          users={users}
          tempRoles={tempRoles}
          onRoleChange={handleRoleChange}
          onSaveRole={handleSaveRole}
          onDelete={handleDelete}
          onCreateTask={handleCreateTask}
          currentUser={currentUser}
        />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserManagement;