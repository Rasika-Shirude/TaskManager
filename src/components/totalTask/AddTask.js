import React, { useState } from "react";
import "./AddTask.css";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const AddTask = ({ tasks }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = useState("In Progress");
  const [priority, setPriority] = useState("Medium");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userRole = currentUser?.role;

  /**
   * Generate the next INC number dynamically from Firestore
   */
  const getNextTaskNumber = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const numbers = querySnapshot.docs
        .map((doc) => doc.data().taskNumber)
        .filter(Boolean)
        .map((num) => parseInt(num.replace("INC", ""), 10));

      const maxNum = numbers.length > 0 ? Math.max(...numbers) : 99;
      return `INC${maxNum + 1}`;
    } catch (err) {
      console.error("Error generating task number:", err);
      return `INC100`; // fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDesc) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const nextTaskNumber = await getNextTaskNumber();

      const newTask = {
        taskNumber: nextTaskNumber,
        name: taskName,
        description: taskDesc,
        status: userRole === "user" ? "with assignee" : taskStatus,
        priority,
        createdAt: new Date(),
      };

      // Add to Firestore
      await addDoc(collection(db, "tasks"), newTask);

      toast.success(`Task ${nextTaskNumber} added successfully!`);

      // Reset fields
      setTaskName("");
      setTaskDesc("");
      setTaskStatus("In Progress");
      setPriority("Medium");
    } catch (err) {
      console.error("Error adding task:", err);
      toast.error("Failed to add task. Try again!");
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter task description"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        required
      />

      {userRole === "admin" && (
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option value="with assignee">With Assignee</option>
          <option value="In Progress">In Progress</option>
          <option value="under review">Under Review</option>
          <option value="ready to deploy">Ready to Deploy</option>
          <option value="Completed">Completed</option>
        </select>
      )}

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
