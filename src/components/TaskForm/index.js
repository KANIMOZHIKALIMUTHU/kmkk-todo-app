// src/components/TaskForm.js
import React, { Component } from 'react';
import './index.css';

class TaskForm extends Component {
  state = {
    id: null,
    description: '',
    labels: [],
    newLabel: '',
    searchQuery: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLabelChange = (e) => {
    const label = e.target.value;
    this.setState(prevState => ({
      labels: prevState.labels.includes(label)
        ? prevState.labels.filter(l => l !== label)
        : [...prevState.labels, label]
    }));
  };

  handleNewLabelChange = (e) => {
    this.setState({ newLabel: e.target.value });
  };

  handleNewLabelSubmit = (e) => {
    e.preventDefault();
    const { newLabel } = this.state;
    if (newLabel && !this.props.labels.find(label => label.name === newLabel)) {
      const label = { id: Date.now(), name: newLabel };
      this.props.addLabel(label);
      this.setState(prevState => ({
        labels: [...prevState.labels, newLabel],
        newLabel: ''
      }));
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, description, labels } = this.state;
    const task = { id: id || Date.now(), description, labels, completed: false };
    if (this.state.isEditing) {
      this.props.updateTask(task);
    } else {
      this.props.addTask(task);
    }
    this.setState({ id: null, description: '', labels: [] });
  };

  render() {
    const { labels } = this.props;
    const { searchQuery } = this.state;
    const filteredLabels = labels.filter(label =>
      label.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <form onSubmit={this.handleSubmit} className="task-form">
        <div className="form-group">
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Task description"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search labels..."
            className="form-control"
          />
          {filteredLabels.map(label => (
            <div className="form-check-inline" key={label.id}>
              <input
                type="checkbox"
                value={label.name}
                checked={this.state.labels.includes(label.name)}
                onChange={this.handleLabelChange}
                className="form-check-input"
              />
              <label className="form-check-label">{label.name}</label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <input
            type="text"
            value={this.state.newLabel}
            onChange={this.handleNewLabelChange}
            placeholder="New Label"
            className="form-control"
          />
          <button onClick={this.handleNewLabelSubmit} className="btn btn-secondary">
            Add New Label
          </button>
        </div>
        <button type="submit" className="btn btn-primary">Save Task</button>
      </form>
    );
  }
}

export default TaskForm;
