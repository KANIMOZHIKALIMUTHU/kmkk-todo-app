// src/components/TodoList.js
import React from 'react';
import TodoItem from '../TodoItem';
import './index.css';

const TodoList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="todo-list">
      <h2>Tasks</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
