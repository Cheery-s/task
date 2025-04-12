// path: src/components/Task/EditTaskModal.jsx
import React, { useState } from "react";
import Button from "../commonComponents/Button";
import PropTypes from "prop-types";

// import { Modal, Button } from "react-bootstrap";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [category, setCategory] = useState(task.category || "work");

  const handleSave = () => {
    onSave({ 
    ...task, 
    title, 
    description, 
    due_date: dueDate, 
    category });
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form>
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
            id="edit-title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>
          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
                id="edit-description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="edit-dueDate">Due Date</label>
            <input
          id="edit-dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
            </div>
                
          <div className="form-group">
            <label htmlFor="edit-category">Category</label>
            <select
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div className="modal-action">
          <Button onClick={handleSave} className="save-button">Save</Button>
          <Button onClick={onClose} className="cancel-button">Cancel</Button></div>
        </form>
      </div>
    </div>
  );
};
EditTaskModal.propTypes = {
  task: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
export default EditTaskModal;
