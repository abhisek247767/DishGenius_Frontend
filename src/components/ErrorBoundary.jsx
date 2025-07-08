import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react"; // Install: npm i lucide-react

class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-red-100 p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                We encountered an unexpected error. Don't worry, this happens sometimes.
              </p>
            </div>

            {this.state.error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-800 text-sm font-medium mb-1">Error Details:</p>
                <p className="text-red-700 text-xs break-all">
                  {this.state.error.message || "Unknown error occurred"}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = ({ children }) => <ErrorCatcher>{children}</ErrorCatcher>;

export default ErrorBoundary;
