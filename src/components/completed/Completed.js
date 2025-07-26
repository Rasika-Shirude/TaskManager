import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Completed.css";

const Completed = ({ tasks, searchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  // Filter only completed tasks
  let filteredTasks = tasks.filter((task) => task.status === "Completed");

  // Search filter
  filteredTasks = filteredTasks.filter((task) => {
    const taskNum = task.taskNumber?.toLowerCase() || "";
    const taskName = task.name?.toLowerCase() || "";
    return (
      taskNum.includes(searchQuery.toLowerCase()) ||
      taskName.includes(searchQuery.toLowerCase())
    );
  });

  // Priority filter
  if (priorityFilter !== "All") {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === priorityFilter
    );
  }

  // Sorting
  if (sortOrder !== "none") {
    const priorityValue = (p) =>
      ({ High: 1, Medium: 2, Low: 3 }[p] || 4);
    filteredTasks.sort((a, b) => {
      const valA = priorityValue(a.priority);
      const valB = priorityValue(b.priority);
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });
  } else {
    // Default sort by INC number
    filteredTasks.sort((a, b) => {
      const numA = parseInt(a.taskNumber?.replace("INC", ""), 10);
      const numB = parseInt(b.taskNumber?.replace("INC", ""), 10);
      return numA - numB;
    });
  }

  return (
    <div className="total-tasks-container">
      <h1>Completed Tasks</h1>

      {/* Filters */}
      <div className="filter-bar">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Priority {sortOrder === "asc" ? "🔼" : "🔽"}
        </button>

        <button
          onClick={() => {
            setPriorityFilter("All");
            setSortOrder("none");
          }}
          className="clear-btn"
        >
          Clear Filters
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No completed tasks found.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-column">
                <Link
                  to={`/task/${task.id}`}
                  state={{ from: location.pathname }}
                  className="task-link"
                >
                  <strong>{task.taskNumber}: {task.name}</strong>
                </Link>
              </div>
              <div className="task-column">
                <span
                  className={`priority-tag ${task.priority?.toLowerCase()}`}
                >
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
      <button onClick={() => navigate("/dashboard")} className="back-button">
        Back
      </button>
    </div>
  );
};

export default Completed;
