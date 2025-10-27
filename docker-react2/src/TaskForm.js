import { useState } from "react";

const TaskForm = () => {
  // State variables for form fields and success message
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const taskData = { title, description, status };

    try {
      // Send POST request to create new task
      const response = await fetch("http://localhost:9090/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error("Failed to create task");

      const data = await response.json();
      setMessage(`Task "${data.title}" created successfully!`);

      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setStatus("Pending");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Render form and display success message
  return (
    <div style={styles.container}>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    maxWidth: "400px",
    backgroundColor: "#fdfdfd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};

export default TaskForm;