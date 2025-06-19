import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./TaskDetails.css";

const TaskDetails = ({ tasks, setTasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
    const location = useLocation(); // ✅ always call hooks at the top!
  const from = location.state?.from || "/dashboard";
  const taskId = parseInt(id);
  const task = tasks.find(t => t.id === taskId);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userRole = currentUser?.role;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(task?.comments || []);
  const [completionDate, setCompletionDate] = useState(task?.completionDate || "");
  const [files, setFiles] = useState(task?.files || []);

  if (!task) return <p>Task not found.</p>;

  const updateTaskField = (field, value) => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, [field]: value } : t
    );
    setTasks(updatedTasks);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = [...files, ...uploadedFiles.map(f => f.name)];
    setFiles(newFiles);
    updateTaskField("files", newFiles);
  };

  const handleCompletionDateChange = (e) => {
    const date = e.target.value;
    setCompletionDate(date);
    updateTaskField("completionDate", date);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      user: currentUser.email,
      text: comment,
      time: new Date().toLocaleString(),
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    updateTaskField("comments", updatedComments);
    setComment("");
  };
const handleDeleteFile = (index) => {
  const updatedFiles = files.filter((_, i) => i !== index);
  setFiles(updatedFiles);
  updateTaskField("files", updatedFiles);
};


const handleBack = () => navigate(from);

  return (
    <div className="task-details-container">
      <h2>Task Details</h2>
      <p><strong>Name:</strong> {task.name}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>

      <div className="file-upload">
        <strong>Attachments:</strong>
        {files.length === 0 ? (
          <p>No files uploaded</p>
        ) : (
        <ul className="file-list">
  {files.map((f, i) => (
    <li key={i}>
      <a
        href={`/uploads/${f}`}
        target="_blank"
        rel="noopener noreferrer"
        className="file-link"
      >
        📎 {f}
      </a>
      {userRole !== "admin" && (
        <button
          className="delete-file-btn"
          onClick={() => handleDeleteFile(i)}
        >
          ❌
        </button>
      )}
    </li>
  ))}
</ul>



        )}
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          disabled={userRole === "admin"}
        />
      </div>

      <div className="completion-date">
        <strong>Completion Date:</strong>
        {userRole === "assignee" ? (
          <input
            type="date"
            value={completionDate}
            onChange={handleCompletionDateChange}
          />
        ) : (
          <span>{completionDate || "Not set"}</span>
        )}
      </div>

      <div className="comments-section">
        <strong>Comments:</strong>
        <ul>
          {comments.map((c, index) => (
            <li key={index}>{c.text}</li>
          ))}
        </ul>
        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>

      <button onClick={handleBack} className="back-button">Back</button>
    </div>
  );
};

export default TaskDetails;
