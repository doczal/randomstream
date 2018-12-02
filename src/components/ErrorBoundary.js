import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log('ASSDASERORROR');
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if(this.state.errorInfo) {
      return (
        <h1>{this.state.error && this.state.error.toString()}</h1>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;