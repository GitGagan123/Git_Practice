import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: error };
  }

  render() {
    if (this.state.hasError) {
      return <div>An Axios error occurr{this.state.hasError.message}</div>; // Customize the error message as needed
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
