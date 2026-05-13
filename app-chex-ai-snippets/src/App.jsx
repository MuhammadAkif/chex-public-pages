import { useEffect } from 'react';
import useAuthToken from './hooks/useAuthToken';

const LOGIN_URL = 'https://chex.ai/login';

function Spinner() {
  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };
  const dotStyle = {
    width: 40,
    height: 40,
    border: '4px solid #e5e7eb',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: 'auth-spin 1s linear infinite',
  };
  return (
    <div style={wrapStyle} role="status" aria-live="polite" aria-label="Loading">
      <style>{`@keyframes auth-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={dotStyle} />
    </div>
  );
}

export default function App() {
  const { token, loading, error } = useAuthToken();

  useEffect(() => {
    if (loading) return;
    if (!token) {
      window.location.replace(LOGIN_URL);
    }
  }, [token, loading]);

  if (loading) return <Spinner />;

  if (!token) {
    return <Spinner />;
  }

  return (
    <div>
      {error ? (
        <div style={{ padding: 12, background: '#fef3c7', color: '#92400e' }}>
          Warning: {error.message}
        </div>
      ) : null}
      {/* Your authenticated app goes here */}
    </div>
  );
}
