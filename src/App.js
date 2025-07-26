import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/homePage/HomePage";
import Dashboard from "./components/dashboard/Dashboard";
import TotalTasks from "./components/totalTask/TotalTask";
import TaskInProg from "./components/taskInProg/TaskInProg";
import Completed from "./components/completed/Completed";
import TaskDetails from "./components/totalTask/TaskDetails";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/login/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Realtime Listener
  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(fetchedTasks);
      });
      return () => unsub();
    } else {
      setTasks([]);
    }
  }, [user]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Navbar onSearch={setSearchQuery} user={user} />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <Dashboard searchQuery={searchQuery} tasks={tasks} />
            </PrivateRoute>
          }
        />
        <Route
          path="/total-tasks"
          element={
            <PrivateRoute user={user}>
              <TotalTasks tasks={tasks} searchQuery={searchQuery} />
            </PrivateRoute>
          }
        />
        <Route
          path="/task-in-prog"
          element={
            <PrivateRoute user={user}>
              <TaskInProg tasks={tasks} searchQuery={searchQuery} />
            </PrivateRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <PrivateRoute user={user}>
              <Completed tasks={tasks} searchQuery={searchQuery} />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute user={user}>
              <TaskDetails tasks={tasks} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
