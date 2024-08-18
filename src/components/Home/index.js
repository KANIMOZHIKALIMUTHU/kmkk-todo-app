// src/components/HomePage.js
import React, { Component } from 'react';
import TaskForm from '../TaskForm';
import TodoList from '../TodoList';
import './index.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      labels: ['Urgent', 'Work', 'Personal'], // Example initial labels
      editingTask: null,
    };
  }

  handleEdit = (task) => {
    this.setState({ editingTask: task });
  }

  handleUpdateTask = (taskId, updatedTask) => {
    const tasks = this.state.tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    this.setState({ tasks, editingTask: null });
  }

  handleAddTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false
    };
    this.setState({ tasks: [...this.state.tasks, newTask] });
  }

  handleDeleteTask = (taskId) => {
    this.setState({ tasks: this.state.tasks.filter(task => task.id !== taskId) });
  }

  render() {
    const { tasks, labels, editingTask } = this.state;
    return (
      <div className="home-page">
        <header className="home-page-header">
          <h1>My To-Do List</h1>
        </header>
        <main className="home-page-main">
          <section className="task-manager">
            <TaskForm
              task={editingTask}
              addTask={this.handleAddTask}
              updateTask={this.handleUpdateTask}
              labels={labels} // Pass available labels
            />
            <TodoList
              tasks={tasks}
              updateTask={this.handleUpdateTask}
              deleteTask={this.handleDeleteTask}
              onEdit={this.handleEdit}
            />
          </section>
        </main>
        <footer className="home-page-footer">
          <p>© 2024 My To-Do List App. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default HomePage;
