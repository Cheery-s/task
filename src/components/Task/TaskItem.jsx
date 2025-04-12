// path: src/components/Task/TaskItem.jsx =>incomplete, please correct this file
import React,{useState} from "react";
import {useDispatch} from 'react-redux';
import {deleteTaskStart, updateTaskStart} from '../../redux/slices/taskSlice';
import {FaEdit,FaTrash,FaCheckCircle,FaShare,FaClock} from 'react-icons/fa';
import EditTaskModal from './EditTaskModal';
import  Button  from "../commonComponents/Button";
// import { supabase } from "../../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
// TaskItem component

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);
  const [shareEmail,setShareEmail] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  
  // format the due date
  const formattedDate = task.due_date ? new Date(task.due_date).toLocaleDateString():'No due date';

  // Calculate days remaining
  const daysRemaining = task.due_date? Math.ceil((new Date(task.due_date)- new Date ())/(1000*60*60*24)):null
  
  
  
  // handle task completion toggle
  const handleCompleteToggle = () => {
  
  // dispatch the update task action with the new completed status
  dispatch(updateTaskStart({
    ...task,
    completed:!task.completed
  }));
    toast.success(task.completed ? 
      "Task marked as incomplete" : 
      "Task marked as complete!"
    );
  }

  // handle edit
  const handleEdit = () => {
  setIsEditModalOpen(true);
  }

  //Handle Save
  const handleSave = (updatedTask) => {
  dispatch(updateTaskStart(updatedTask));// dispatch the update task action
  setIsEditModalOpen(false);//close the modal
  toast.success("Task updated successfully");
    // dispatch(updateTask(task.id));
  };

  // handle task deletion
  const handleDelete = () => {
  if (window.confirm('Are you sure you want to delete this task?')){
   
    dispatch(deleteTaskStart(task.id));
    toast.success("Task deleted successfully")
    console.log('delete task',task.id);
  }
  };
  // Handle share toggle
  const handleShareToggle = () => {
  setIsShareModalOpen(!isShareModalOpen);
  };
  // Handle share submit
  const handleShareSubmit = () => {
  if (!shareEmail.match(/\S+@\S+\.\S+/)) {
    toast.error("Please enter a valid email address");
    return;
  }
  const updatedTask = {
    ...task,
    shared_with: task.shared_with ? [...task.shared_with, shareEmail] : [shareEmail]
  };
  
  dispatch(updateTaskStart(updatedTask));
  setIsShareModalOpen(false);
  setShareEmail(""); // Reset share email input
  toast.success(`Task shared with ${shareEmail}`);
  };
  // Determine priority class for styling
  let priorityClass = "priority-normal";
  if (daysRemaining !== null) {
  if (daysRemaining < 0) priorityClass = "priority-overdue";
  else if (daysRemaining <= 2) priorityClass = "priority-high";
  else if (daysRemaining <= 7) priorityClass = "priority-medium";
  }



  return ( 
   
  <div className={`task-item ${task.completed ? 'task-completed' : ''} ${priorityClass}`}>
    <div className="task-category">{task.category}</div>
  
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
  
    <div className="task-meta">
      <div className="task-due-date">
        <FaClock /> {formattedDate}
        {daysRemaining !== null && daysRemaining >= 0 && !task.completed && (
          <span className="days-remaining">
            {daysRemaining === 0 ? 'Due today' : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`}
          </span>
        )}
        {daysRemaining !== null && daysRemaining < 0 && !task.completed && (
          <span className="days-overdue">
            {Math.abs(daysRemaining)} day{Math.abs(daysRemaining) !== 1 ? 's' : ''} overdue
          </span>
        )}

      </div>
    
      {task.completed && (
        <div className="task-completed-badge">
          <FaCheckCircle /> Completed
        </div>
      )}
  </div>
  
  <div className="task-actions">
    <Button onClick={handleCompleteToggle} className="action-button complete-button">
      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
    </Button>
    
    <Button onClick={handleEdit} className="action-button edit-button">
      <FaEdit /> Edit
    </Button>
    
    <Button onClick={handleShareToggle} className="action-button share-button">
      <FaShare /> Share
    </Button>
    
    <Button onClick={handleDelete} className="action-button delete-button">
      <FaTrash /> Delete</Button>
      
  </div> 
  {isEditModalOpen && (
        <EditTaskModal
          task={task}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )} 
      {isShareModalOpen && (
        <div className="share-modal">
          <h3>Share Task</h3>
          <input
            type="email"
            placeholder="Enter email address"
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
          />
          <Button onClick={handleShareSubmit}>Share</Button>
          <Button onClick={handleShareToggle}>Cancel</Button>
        </div>
      )} 
    <ToastContainer/>
      
  </div>
     )
};
export default TaskItem;













//<div className="border border-gray-300 p-4 rounded-lg mb-4">
  //      <ToastContainer/>
  //     <h3 className="text-xl font-bold">{task.title}</h3>
  //     <p className="text-gray-600">{task.description}</p>
  //     <p className="text-sm text-gray-500">Due:{formattedDate}</p>
  //     <p>Category: {task.category}</p>   
  //           {task.completed && ( 
  //       <div style={{color:'green', fontWeight:"bold"}}><FaCheckCircle />Completed</div>)}
      
  //     <div className="flex gap-2 mt-2">
        
  //       <Button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded"><FaTrash/></Button>
  //       <Button onClick={handleEdit} className="bg-blue-500 text-white px-3 py-1 rounded"><FaEdit/></Button>
  //       <Button onClick={handleCompleteToggle}>{task.completed ? 'Mark Incomplete':'Mark Complete'}</Button>  
  //       <Button onClick={handleShare} className="bg-green-500 text-white px-2 py-1 rounded"><FaShare/></Button>
  //     </div>

  //     {/* Edit  Task modal */}
  //     {isEditModalOpen && 
  //     (<EditTaskModal task={task} onSave={handleSave} onClose={()=>setIsEditModalOpen(false)}/>
  //     )}
  //   </div>
  // );
