// src/components/TodoItem.js
import React from 'react';
import './index.css';

const TodoItem = ({ task, updateTask, deleteTask }) => {
  const handleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="todo-item-content" onClick={handleComplete}>
        <h4>{task.description}</h4>
        <div className="todo-item-labels">
          {task.labels.map(label => (
            <span key={label} className={`label label-${label.toLowerCase().replace(/\s+/g, '-')}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
    </div>
  );
};

export default TodoItem;
