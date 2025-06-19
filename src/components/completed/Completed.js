import React from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Completed.css';

const Completed = ({ tasks, searchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => navigate('/dashboard');

  const completedTasks = tasks.filter(task => task.status === "Completed");
  const filteredTasks = completedTasks.filter(task => task.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="total-tasks-container">
      <h1>Completed Tasks</h1>
      {filteredTasks.length === 0 ? (
        <p>No completed tasks found.</p>
      ) : (
        <ul className="task-list">
  {filteredTasks.map(task => (
    <li key={task.id} className="task-item">
      <div className="task-column">
        <Link
          to={`/task/${task.id}`}
          state={{ from: location.pathname }}
          className="task-link"
        >
          <strong>{task.name}</strong>
        </Link>
      </div>

      <div className="task-column">
        <span className={`priority-tag ${task.priority?.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-column">
        <span className="status-tag completed">{task.status}</span>
      </div>
    </li>
  ))}
</ul>

      )}
      <button onClick={handleBack} className="back-button">Back</button>
    </div>
  );
};

export default Completed;
