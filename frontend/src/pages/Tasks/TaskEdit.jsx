import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../../api/task_api";
import { AuthContext } from "../../context/AuthContext";

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const currentUser = auth.user; 

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending"
  });

  const [loading, setLoading] = useState(true);

  // Load task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTaskById(id);
        const t = res.data.task;

        setForm({
          title: t.title,
          description: t.description,
          dueDate: t.dueDate ? t.dueDate.slice(0, 10) : "",
          status: t.status
        });

        setLoading(false);
      } catch (err) {
        console.log("Error fetching task:", err.response);
      }
    };

    fetchTask();
  }, [id]);

  // Handle input field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, form);
      navigate("/tasks");
    } catch (err) {
      console.log(err.response);
    }
  };

  if (loading) return <p>Loading...</p>;
  const isUser = currentUser.role === "User";

  return (
    <div style={{ marginLeft: "260px", padding: "20px", maxWidth: "600px" }}>
      <h2>Edit Task</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <input
          type="text"
          name="title"
          disabled={isUser}
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          disabled={isUser}
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />

        <input
          type="date"
          name="dueDate"
          disabled={isUser}
          value={form.dueDate}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" style={{ padding: "10px", background: "black", color: "white" }}>
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskEdit;