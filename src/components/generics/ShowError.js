import React, { Component } from 'react';
import AppLayout from '../layout/AppLayout';

export default class ShowError extends Component {
  render() {
    return (
      <AppLayout>
        <div>
          <h2 className="alert alert-danger">Error: {this.props.error}</h2>
        </div>
      </AppLayout>
    );
  }
}
