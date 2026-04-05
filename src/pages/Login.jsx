import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

/*
  Login Page
  
  Pretty simple — email and password inputs, submit button,
  links to register and forgot password.
  
  The form validates that both fields are filled before submitting.
  If login fails (wrong credentials), we show an error message
  right above the form so users know what went wrong.
  
  We also show a little hint about the demo credentials so testers
  can actually explore the app without getting stuck.
*/

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // basic validation — just checking they're not empty
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);

    // small timeout to simulate a network request
    // (makes it feel more realistic than instant login)
    setTimeout(() => {
      const result = login(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your workshop dashboard</p>
        </div>

        {/* show error if login failed */}
        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            New around here?{' '}
            <Link to="/register">Create an account</Link>
          </p>
        </div>

        {/* demo info so people can actually test the app */}
        <div className="demo-hint">
          <strong>Demo:</strong> Use any email + password (min 4 chars) to sign in as a coordinator.
          <br />
          Use <strong>sharma@iitb.ac.in</strong> for instructor view.
        </div>
      </div>
    </div>
  );
}

export default Login;
