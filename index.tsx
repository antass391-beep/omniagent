import React, { Component, ReactNode, ErrorInfo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// --- DIAGNOSTICS: PREVIEW START ---
console.log(">>> PREVIEW START <<<");

// Capture any uncaught errors
window.addEventListener("error", evt => {
  console.error("GLOBAL ERROR:", evt.message, evt.filename, evt.lineno, evt.colno);
});

window.addEventListener("unhandledrejection", evt => {
  console.error("UNHANDLED PROMISE REJECTION:", evt.reason);
});
// ----------------------------------

console.log("Environment Detection:", {
  href: window.location.href,
  isIframe: window.self !== window.top,
  userAgent: navigator.userAgent
});

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical Runtime Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          color: '#ff5555', 
          backgroundColor: '#050507', 
          height: '100%',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.05em', marginBottom: '1rem' }}>SYSTEM HALTED</h1>
          <p style={{ color: '#71717a', maxWidth: '500px', marginBottom: '2rem' }}>The interface encountered a critical kernel exception.</p>
          <pre style={{ 
            backgroundColor: '#000', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            overflow: 'auto', 
            maxWidth: '90%', 
            fontSize: '11px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#71717a',
            textAlign: 'left'
          }}>
            {this.state.error?.message}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '2rem', 
              padding: '0.75rem 2rem', 
              background: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '2rem', 
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log("REACT MOUNT SUCCESS");
  } catch (e) {
    console.error("REACT MOUNT FAILED:", e);
  }
} else {
  console.error("ROOT ELEMENT NOT FOUND");
}