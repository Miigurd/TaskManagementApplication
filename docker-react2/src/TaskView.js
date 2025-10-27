import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskView = () => {
  const { taskId } = useParams(); // Get task ID from route params

  // State variables for task data, loading status, and error handling
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch individual task by ID
    fetch(`http://localhost:9090/api/tasks/${taskId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        return response.json();
      })
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [taskId]);

  if (loading) return <p>Loading task...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={styles.card}>
      {/* Display task details */}
      <h2>{task.title}</h2>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Description:</strong> {task.description || "No description provided."}</p>
      <p><strong>Status:</strong> {task.status}</p>
    </div>
  );
};

// Inline styles for the component
const styles = {
  card: {
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    maxWidth: "400px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};

export default TaskView;
