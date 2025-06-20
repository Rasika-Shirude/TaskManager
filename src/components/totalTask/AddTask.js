import React, { useState } from "react";
import "./AddTask.css";
import { toast } from "react-toastify";

const AddTask = ({ addTask, tasks }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = useState("In Progress");
  const [priority, setPriority] = useState("Medium");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userRole = currentUser?.role;

  // Get next task number like INC100, INC101...
  const getNextTaskNumber = () => {
    const taskNumbers = tasks
      .map(task => task.taskNumber)
      .filter(Boolean)
      .map(num => parseInt(num.replace("INC", ""), 10));

    const maxNumber = taskNumbers.length > 0 ? Math.max(...taskNumbers) : 99;
    return `INC${maxNumber + 1}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      taskNumber: getNextTaskNumber(),
      name: taskName,
      description: taskDesc,
      status: userRole === "user" ? "with assignee" : taskStatus,
      priority
    };
    addTask(newTask);
    toast.success("Task added successfully!");
    setTaskName("");
    setTaskDesc("");
    setTaskStatus("In Progress");
    setPriority("Medium");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
      <input type="text" placeholder="Enter task description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} required />

      {userRole === "admin" && (
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
          <option value="with assignee">With Assignee</option>
          <option value="In Progress">In Progress</option>
          <option value="under review">Under Review</option>
          <option value="ready to deploy">Ready to Deploy</option>
          <option value="Completed">Completed</option>
        </select>
      )}

      <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
