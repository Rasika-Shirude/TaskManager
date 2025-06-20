import React from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";
import AddTask from "../totalTask/AddTask";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ searchQuery, tasks, setTasks }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userRole = currentUser?.role;

const filteredTasks = tasks.filter(task =>
  (task.name && task.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  (task.taskNumber && task.taskNumber.toLowerCase().includes(searchQuery.toLowerCase()))
);

  const totalTasks = filteredTasks.length;

  const inProgressStatuses = ["In Progress", "on hold", "under review", "ready to deploy"];
  const inProgressTasks = filteredTasks.filter(task =>
    inProgressStatuses.includes(task.status)
  );
  const completedTasks = filteredTasks.filter(task =>
    task.status === "Completed"
  );
  const otherTasks = filteredTasks.filter(task =>
    !inProgressStatuses.includes(task.status) && task.status !== "Completed"
  );

  const pieData = {
    labels: ["In Progress", "Completed", "Others"],
    datasets: [
      {
        data: [inProgressTasks.length, completedTasks.length, otherTasks.length],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f"],
        borderColor: ["#2980b9", "#27ae60", "#f39c12"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Task Manager Dashboard</h1>

      <div className="dashboard-cards">
        <div className="unified-card" onClick={() => navigate("/total-tasks")}>
          <h2>Total Tasks</h2>
          <p>{totalTasks}</p>
        </div>
        <div className="unified-card" onClick={() => navigate("/task-in-prog")}>
          <h2>Tasks In Progress</h2>
          <p>{inProgressTasks.length}</p>
        </div>
        <div className="unified-card" onClick={() => navigate("/completed")}>
          <h2>Completed Tasks</h2>
          <p>{completedTasks.length}</p>
        </div>
      </div>

      {/* 📊 Pie Chart Section */}
      <div className="dashboard-chart">
        <h2>Status Distribution</h2>
        <Pie data={pieData} />
      </div>

      {(userRole === "user" || userRole === "admin") && (
        <div className="add-task-dashboard">
          <h2>Add New Task</h2>
          <AddTask addTask={(newTask) => setTasks([...tasks, newTask])} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
