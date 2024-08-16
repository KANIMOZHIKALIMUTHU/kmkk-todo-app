// src/components/HomePage.js
import React from 'react';
import TaskForm from '../TaskForm';
import TodoList from '../TodoList';
import LabelManager from '../LabelManager';
import './index.css';

const HomePage = ({ tasks, labels, addTask, updateTask, deleteTask, addLabel }) => {
  return (
    <div className="home-page">
      <header className="home-page-header">
        <h1>My To-Do List</h1>
      </header>
      <main className="home-page-main">
        <section className="task-manager">
          <TaskForm addTask={addTask} labels={labels} />
          <TodoList
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </section>
        <aside className="label-manager-section">
          <LabelManager labels={labels} addLabel={addLabel} />
        </aside>
      </main>
      <footer className="home-page-footer">
        <p>© 2024 My To-Do List App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
