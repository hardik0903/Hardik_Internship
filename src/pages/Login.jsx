import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

/*
  Login Page
  
  Pretty simple — email and password inputs, submit button,
  links to register and forgot password.
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

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);

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
      <Helmet>
        <title>Sign In | FOSSEE Workshop Portal</title>
        <meta name="description" content="Access your FOSSEE account to propose, manage, and track technical workshops." />
      </Helmet>

      <div className="login-card animate-slide-up">
        
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your workshop dashboard</p>
        </div>

        {/* show error if login failed */}
        {error && (
          <div className="login-error" role="alert">
            <span className="material-icons-round" aria-hidden="true" style={{ fontSize: '18px', marginRight: '8px', verticalAlign: 'middle' }}>error_outline</span>
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
              aria-required="true"
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
              aria-required="true"
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
