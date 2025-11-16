import { useState, useEffect } from "react";
import { createTask } from "../../api/task_api";
import { useNavigate, useSearchParams } from "react-router-dom";

const TaskCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preAssignedUser = searchParams.get("assignedTo") || "";

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });

  // Apply prefetched assigned user
  useEffect(() => {
    if (preAssignedUser) {
      setForm((prev) => ({ ...prev, assignedTo: preAssignedUser }));
    }
  }, [preAssignedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(form);
      navigate("/tasks");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Create Task</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <input type="hidden" name="assignedTo" value={form.assignedTo} />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default TaskCreate;