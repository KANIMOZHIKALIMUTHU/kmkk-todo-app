// src/components/TodoItem.js
import React from 'react';
import './index.css';

const TodoItem = ({ task, updateTask, deleteTask, onEdit }) => {
  return (
    <div className="todo-item">
      <p className={task.completed ? 'completed' : ''}>{task.description}</p>
      <div className="labels">
        {task.labels.map((label, index) => (
          <span key={index} className={`label ${label.toLowerCase()}`}>
            {label}
          </span>
        ))}
      </div>
      <div className="todo-item-buttons">
        <button
          className="edit-button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="complete-button"
          onClick={() => updateTask(task.id, { ...task, completed: !task.completed })}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          className="delete-button"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
