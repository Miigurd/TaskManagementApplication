import { useState, useEffect } from 'react';

function TaskList() {
  // State variables for tasks, loading status, and error handling
  const [tasks, setTasks] = useState([]); // array of tasks fetched from the API
  const [loading, setLoading] = useState(true); // loading state while fetching data
  const [error, setError] = useState(null); // error state in case fetching fails

  // useEffect hook to fetch tasks from the API
  useEffect(() => {
    fetch('http://localhost:9090/api/tasks')
      .then(res => res.json()) // parse the JSON from the response
      .then(json => { // on successful fetch, update tasks and loading state
        setTasks(json);
        setLoading(false);
      })
      .catch(err => { // handle any errors during fetch
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  if (tasks.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <div>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through tasks and render each task as a table row */}
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;