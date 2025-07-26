import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import "./TaskInProg.css";

const TaskInProg = ({ tasks, searchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userRole = currentUser?.role;

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const inProgressStatuses = ["In Progress", "under review", "ready to deploy"];

  // Filter only In Progress tasks
  let filteredTasks = tasks.filter((task) =>
    inProgressStatuses.includes(task.status)
  );

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

  // Status filter
  if (statusFilter !== "All") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === statusFilter
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

  // Status change
  const handleStatusChange = async (taskId, newStatus) => {
    await updateDoc(doc(db, "tasks", taskId), { status: newStatus });
  };

  const handleBack = () => navigate("/dashboard");

  return (
    <div className="inprog-container">
      <h1 className="inprog-title">Tasks In Progress</h1>

      {/* Filters */}
      <div className="inprog-filter-bar">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          {inProgressStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Priority {sortOrder === "asc" ? "🔼" : "🔽"}
        </button>

        <button
          onClick={() => {
            setPriorityFilter("All");
            setStatusFilter("All");
            setSortOrder("none");
          }}
          className="clear-btn"
        >
          Clear Filters
        </button>
      </div>

      {/* Task List */}
      <ul className="inprog-task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="inprog-task-row">
            <div className="inprog-task-column">
              <Link
                to={`/task/${task.id}`}
                state={{ from: location.pathname }}
                className="task-link"
              >
                <strong>{task.taskNumber}: {task.name}</strong>
              </Link>
            </div>
            <div className="inprog-task-column">
              <span className={`priority-tag ${task.priority?.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>
            <div className="inprog-task-column">
              {(userRole === "assignee" || userRole === "admin") ? (
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="status-dropdown"
                >
                  {inProgressStatuses.concat("Completed").map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="readonly-status">{task.status}</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default TaskInProg;
