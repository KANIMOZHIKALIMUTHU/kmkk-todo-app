// src/components/LabelManager.js
import React, { Component } from 'react';
import './index.css';

class LabelManager extends Component {
  state = {
    newLabel: '',
    searchQuery: ''
  };

  handleChange = (e) => {
    this.setState({ newLabel: e.target.value });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { newLabel } = this.state;
    if (newLabel && !this.props.labels.find(label => label.name === newLabel)) {
      const label = { id: Date.now(), name: newLabel };
      this.props.addLabel(label);
      this.setState({ newLabel: '' });
    }
  };

  render() {
    const { labels } = this.props;
    const { searchQuery } = this.state;
    const filteredLabels = labels.filter(label =>
      label.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="label-manager">
        <h2>Manage Labels</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={this.state.newLabel}
              onChange={this.handleChange}
              placeholder="New Label"
              className="form-control"
            />
            <button type="submit" className="btn btn-secondary">Add Label</button>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search labels..."
              className="form-control"
            />
          </div>
        </form>
        <div className="list-group">
          {filteredLabels.map(label => (
            <div key={label.id} className="list-group-item">
              {label.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default LabelManager;
