import React from "react";
import type { ErrorInfo } from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error Boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2> Something went wrong...</h2>
          <p>We are working on it</p>
          <button onClick={() => window.location.reload()}>
           reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

