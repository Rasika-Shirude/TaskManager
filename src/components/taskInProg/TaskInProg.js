import React, { useState } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './TaskInProg.css';

const TaskInProg = ({ tasks, setTasks, searchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userRole = currentUser?.role;

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const inProgressStatuses = ["In Progress", "under review", "ready to deploy"];

  // Filter tasks
  let filteredTasks = tasks.filter(task =>
    inProgressStatuses.includes(task.status) &&
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (priorityFilter !== "All") {
    filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
  }

  if (statusFilter !== "All") {
    filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
  }

  // 🔹 Sort by INC number
  filteredTasks.sort((a, b) => {
    const numA = parseInt(a.taskNumber?.replace("INC", "") || 0, 10);
    const numB = parseInt(b.taskNumber?.replace("INC", "") || 0, 10);
    return numA - numB;
  });

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleClearFilters = () => {
    setPriorityFilter("All");
    setStatusFilter("All");
    setSortOrder("asc");
  };

  return (
    <div className="inprog-container">
      <h1 className="inprog-title">Tasks In Progress</h1>

      <div className="inprog-filter-bar">
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {inProgressStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort by Priority {sortOrder === "asc" ? "🔼" : "🔽"}
        </button>

        <button onClick={handleClearFilters} className="clear-btn">Clear Filters</button>
      </div>

      <ul className="inprog-task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className="inprog-task-row">
            <div className="inprog-task-column">
              <Link
                to={`/task/${task.id}`}
                state={{ from: location.pathname }}
                className="task-link"
              >
                <strong>{task.taskNumber}: {task.name}</strong>
                <div className="task-desc">
                  {task.description?.length > 40
                    ? `${task.description.slice(0, 40)}...`
                    : task.description || "No description"}
                </div>
              </Link>
            </div>

            <div className="inprog-task-column">
              <span className={`priority-tag ${task.priority?.toLowerCase()}`}>{task.priority}</span>
            </div>

            <div className="inprog-task-column">
              {(userRole === "assignee" || userRole === "admin") ? (
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="status-dropdown"
                >
                  {inProgressStatuses.concat("Completed").map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <span className="readonly-status">{task.status}</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/dashboard')} className="back-button">Back</button>
    </div>
  );
};

export default TaskInProg;
