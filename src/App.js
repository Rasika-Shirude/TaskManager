import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/homePage/HomePage";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import TotalTasks from "./components/totalTask/TotalTask";
import TaskInProg from "./components/taskInProg/TaskInProg";
import Completed from './components/completed/Completed';
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import PrivateRoute from "./components/login/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import TaskDetails from './components/totalTask/TaskDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Task 1", status: "In Progress" },
          { id: 2, name: "Task 2", status: "In Progress" },
          { id: 3, name: "Task 3", status: "Completed" },
          { id: 4, name: "Task 4", status: "In Progress" },
          { id: 5, name: "Task 5", status: "In Progress" },
          { id: 6, name: "Task 6", status: "under review" },
          { id: 7, name: "Task 7", status: "In Progress" },
          { id: 8, name: "Task 8", status: "In Progress" },
          { id: 9, name: "Task 9", status: "In Progress" },
          { id: 10, name: "Task 10", status: "In Progress" }
        ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const isLocalhost = window.location.hostname === "localhost";

  return (
    <BrowserRouter basename={isLocalhost ? "/" : "/TaskManager"}>
      <ScrollToTop />
      <Navbar onSearch={setSearchQuery} />

      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard searchQuery={searchQuery} tasks={tasks} setTasks={setTasks} />
            </PrivateRoute>
          }
        />
        <Route path="/total-tasks" element={<TotalTasks tasks={tasks} setTasks={setTasks} searchQuery={searchQuery} />} />
        <Route path="/task-in-prog" element={<TaskInProg tasks={tasks} setTasks={setTasks} searchQuery={searchQuery} />} />
        <Route path="/completed" element={<Completed tasks={tasks} searchQuery={searchQuery} />} />
        <Route path="/task/:id" element={<TaskDetails tasks={tasks} setTasks={setTasks} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
