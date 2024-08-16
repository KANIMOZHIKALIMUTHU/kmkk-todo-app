// src/App.js
import React, { Component } from 'react';
import Home from './components/Home';
import './App.css';

class App extends Component {
  state = {
    tasks: [],
    labels: []
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const labels = JSON.parse(localStorage.getItem('labels')) || [];
    this.setState({ tasks, labels });
  }

  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    localStorage.setItem('labels', JSON.stringify(this.state.labels));
  }

  addTask = (task) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task]
    }));
  };

  updateTask = (updatedTask) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    }));
  };

  deleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(task => task.id !== taskId)
    }));
  };

  addLabel = (label) => {
    this.setState((prevState) => ({
      labels: [...prevState.labels, label]
    }));
  };

  render() {
    return (
      <Home
        tasks={this.state.tasks}
        labels={this.state.labels}
        addTask={this.addTask}
        updateTask={this.updateTask}
        deleteTask={this.deleteTask}
        addLabel={this.addLabel}
      />
    );
  }
}

export default App;
