// path: src/components/Task/TaskList.jsx =>corrected
import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fetchTasksStart } from '../../redux/slices/taskSlice';
import TaskItem from './TaskItem';
import LoadingSpinner from '../commonComponents/LoadingSpinner';
import './TaskList.css'

const TaskList =()=> {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state)=>state.tasks);
    
    const [filter, setFilter] = useState("all");
const [sortBy, setSortBy] = useState("due_date");
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(()=>{
        dispatch(fetchTasksStart({filter:filter !== "all" ?filter:null}))
    },[dispatch, filter]);
    
    
    const filteredTasks = tasks.filter(task => 
        (filter === "all" || task.category === filter)&&
    (searchTerm === "" || 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()))
);
    // const sortedTasks = filteredTasks.sort((a, b) => new Date(a[sortBy]) - new Date(b[sortBy]))
    // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "due_date") {
      return new Date(a.due_date) - new Date(b.due_date);
    } else if (sortBy === "created_at") {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
    // if (loading) return <p>Loading...</p>;
    //      if (!tasks?.length) return <p>No tasks found</p>;

    return (
        <div className="task-list-container">
        <div className="task-list-header">
          <h2>Your Tasks</h2>
          <div className="task-list-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-container">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
              </select>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="due_date">Due Date</option>
                <option value="created_at">Creation Date</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
        <div className='task-list'>
        {loading ? (
           <LoadingSpinner />
        ) : sortedTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="task-grid">
            {sortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
      </div>
    )
}
export default TaskList;
