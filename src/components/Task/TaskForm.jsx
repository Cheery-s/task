// path: src/components/Task/TaskForm.jsx => corrected
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskStart } from "../../redux/slices/taskSlice";
import { ToastContainer, toast } from "react-toastify";
import { generateTaskFromText } from "../../services/openaiService";
import { useAuth } from "../../hooks/useAuth";
import Button from "../commonComponents/Button";
import styles from "./css/TaskForm.module.css";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const loading = useSelector((state) => state.tasks.loading);

  const [inputText, setInputText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("work");
  const [aiLoading, setAiLoading] = useState(false);

  const handleAIInput = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to generate a task");
      return;
    }

    setAiLoading(true);
    try {
      const taskDescription = await generateTaskFromText(inputText);
      setTitle(taskDescription);
      toast.success("Task generated successfully");
    } catch (error) {
      toast.error("Failed to generate task");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // input validation
    if (!title || !description || !dueDate) {
      toast.error("Please fill in all fields");
      return;
    }
    if (new Date(dueDate) < new Date()) {
      toast.error("Due date cannot be in the past");
      return;
    }
    // setLoading(true); //start loading
    // try {
    //   // Get the logged-in user's ID
    //   const { data:{ user } } = await supabase.auth.getUser(); //get user data
    //   if(!user){
    //     toast.error("You must be logged in to add task");
    //     return;
    //   }

    // Create the task payload
    const task = {
      title,
      description,
      due_date: dueDate,
      category,
      user_id: user.id,
      created_at: new Date().toISOString(),
      completed: false,
      shared_with: [],
    };

    dispatch(addTaskStart(task)); // dispatch addtask action
    toast.success("Task added successfully");

    //Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setInputText("");
  };
  return (
    <div className={styles.taskFormContainer}>
      <ToastContainer />
      <h2>Create New Task</h2>
      <div className={styles.aiAssistant}>
        <input
          type="text"
          className={styles.aiInput}
          placeholder="Describe your task (e.g., Call John at 3 PM tomorrow)"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className={styles.aiButton}
          onClick={handleAIInput}
          disabled={aiLoading}
        >
          {aiLoading ? "Generating..." : "Generate Task"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.taskForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
            </select>
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding task..." : "Add Task"}
        </Button>
      </form>
    </div>
  );
};
export default TaskForm;
