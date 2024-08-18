// src/components/TaskForm.js
import React, { Component } from 'react';
import './index.css';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.task ? props.task.description : '',
      labels: props.task ? props.task.labels : [],
      newLabel: '',
      searchQuery: '',
      availableLabels: props.labels || [], 
      editing: !!props.task,
      taskId: props.task ? props.task.id : null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task !== this.props.task || prevProps.labels !== this.props.labels) {
      this.setState({
        description: this.props.task ? this.props.task.description : '',
        labels: this.props.task ? this.props.task.labels : [],
        availableLabels: this.props.labels || [], // Update available labels
        editing: !!this.props.task,
        taskId: this.props.task ? this.props.task.id : null,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLabelChange = (e) => {
    this.setState({ newLabel: e.target.value });
  }

  addLabel = () => {
    const { newLabel, labels, availableLabels } = this.state;
    if (newLabel && !availableLabels.includes(newLabel)) {
      this.setState({
        availableLabels: [...availableLabels, newLabel],
        labels: [...labels, newLabel],
        newLabel: ''
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { description, labels, editing, taskId } = this.state;
    const task = { description, labels };

    if (editing) {
      this.props.updateTask(taskId, task);
    } else {
      this.props.addTask(task);
    }

    this.setState({ description: '', labels: [], editing: false, taskId: null });
  }

  filterLabels = () => {
    const { searchQuery, availableLabels } = this.state;
    return availableLabels.filter(label => label.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  render() {
    const { description, labels, newLabel, searchQuery } = this.state;
    const filteredLabels = this.filterLabels();

    return (
      <div className="task-form">
        <h2>{this.state.editing ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Task Description"
            required
          />
          <input
            type="text"
            value={newLabel}
            onChange={this.handleLabelChange}
            placeholder="Add New Label"
          />
          <button type="button" onClick={this.addLabel}>Add Label</button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
            placeholder="Search Labels"
          />
          <div className="labels">
            {filteredLabels.map((label, index) => (
              <span
                key={index}
                className={`label ${label.toLowerCase()}`}
                onClick={() => this.setState({
                  labels: [...labels, label],
                  searchQuery: ''
                })}
              >
                {label}
              </span>
            ))}
            {newLabel && !filteredLabels.includes(newLabel) && (
              <span
                className="label new-label"
                onClick={() => this.setState({
                  labels: [...labels, newLabel],
                  availableLabels: [...this.state.availableLabels, newLabel],
                  newLabel: '',
                  searchQuery: ''
                })}
              >
                {newLabel}
              </span>
            )}
          </div>
          <div className="selected-labels">
            {labels.map((label, index) => (
              <span key={index} className={`label ${label.toLowerCase()}`}>
                {label}
              </span>
            ))}
          </div>
          <button type="submit">
            {this.state.editing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    );
  }
}

export default TaskForm;
