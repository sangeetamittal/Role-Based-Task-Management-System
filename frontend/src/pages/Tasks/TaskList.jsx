import { useEffect, useState, useCallback, useContext } from "react";
import { getTasks, deleteTask } from "../../api/task_api";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import { AuthContext } from "../../context/AuthContext";
import TaskTable from "../../components/tasks/taskTable/TaskTable";
import TaskCard from "../../components/tasks/taskCard/TaskCard";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('card'); // 'card' or 'table'

  const auth = useContext(AuthContext);
  const currentUser = auth.user;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTasks({
        page,
        limit,
        search,
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
      setTotal(res.data.total);
    } catch (err) {
      console.log("Error fetching tasks:", err.response);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearch = (text) => {
    setPage(1);        // reset to first page
    setSearch(text);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      setTasks(tasks.filter((t) => t._id !== id));
      await deleteTask(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/tasks/edit/${id}`);
  };

  const toggleView = () => {
    setView(view === 'card' ? 'table' : 'card');
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>All Tasks</h2>
        <div className="view-toggle">
          <button onClick={toggleView}>
            {view === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
          </button>
        </div>
      </div>
      
      <div className="task-list-controls">
        <SearchBar placeholder="Search tasks..." onSearch={handleSearch} />

        <div className="limit-selector">
          <label>Show:</label>
          <select value={limit} onChange={handleLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <div className="task-list-info">
            <p>
              Showing {tasks.length} of {total} tasks
            </p>
          </div>

          {view === 'card' ? (
            <div className="task-cards">
              {tasks.map((task) => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete}
                  currentUser={currentUser}
                />
              ))}
            </div>
          ) : (
            <TaskTable 
              tasks={tasks} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              currentUser={currentUser}
            />
          )}
        </>
      )}
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TaskList;