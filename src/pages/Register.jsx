import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  departmentChoices,
  titleChoices,
  stateChoices,
  sourceChoices,
} from '../data/mockData';
import './Register.css';

/*
  Register Page

  The registration form is quite extensive because it mirrors the Django
  UserRegistrationForm + ProfileForm. We need to collect:
  - Account info (name, email, password)
  - Professional info (title, institute, department, position)
  - Contact & location (phone, state, city)
  
  I've split the form into sections with clear headers so users
  aren't overwhelmed by a wall of inputs. The two-column layout on
  desktop helps keep the form compact.
*/

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // form state — each field maps to the Django model
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: 'Mr',
    institute: '',
    department: 'computer engineering',
    position: 'coordinator',
    phone: '',
    state: 'IN-MH',
    location: '',
    source: 'Google',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Enter a valid email address';
    if (formData.password.length < 4) newErrors.password = 'Password must be at least 4 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.institute.trim()) newErrors.institute = 'Institute name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const result = register(formData);
      if (result.success) {
        navigate('/dashboard');
      }
      setLoading(false);
    }, 800);
  }

  // helper to render a form field — saves us from repeating the same JSX
  function renderField(label, name, type = 'text', placeholder = '', options = {}) {
    return (
      <div className="form-group">
        <label htmlFor={`register-${name}`}>{label}</label>
        <input
          id={`register-${name}`}
          type={type}
          name={name}
          className={`input-field ${errors[name] ? 'error' : ''}`}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          {...options}
        />
        {errors[name] && <span className="error-text">{errors[name]}</span>}
      </div>
    );
  }

  // helper for dropdown selects
  function renderSelect(label, name, choices) {
    return (
      <div className="form-group">
        <label htmlFor={`register-${name}`}>{label}</label>
        <select
          id={`register-${name}`}
          name={name}
          className="input-field"
          value={formData[name]}
          onChange={handleChange}
        >
          {choices.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join the FOSSEE workshop community</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          
          {/* ---- account details section ---- */}
          <div className="form-section">
            <div className="form-section-title">Account Details</div>
            <div className="form-row">
              {renderField('First Name', 'firstName', 'text', 'Rajesh')}
              {renderField('Last Name', 'lastName', 'text', 'Kumar')}
            </div>
            {renderField('Email Address', 'email', 'email', 'you@college.edu')}
            <div className="form-row">
              {renderField('Password', 'password', 'password', 'Min 4 characters')}
              {renderField('Confirm Password', 'confirmPassword', 'password', 'Re-enter password')}
            </div>
          </div>

          {/* ---- professional info section ---- */}
          <div className="form-section">
            <div className="form-section-title">Professional Information</div>
            <div className="form-row">
              {renderSelect('Title', 'title', titleChoices)}
              {renderSelect('Department', 'department', departmentChoices)}
            </div>
            {renderField('Institute / College', 'institute', 'text', 'e.g. IIT Bombay')}

            {/* position selection — coordinator or instructor */}
            <div className="form-group">
              <label>Position</label>
              <div className="radio-group">
                <label
                  className={`radio-option ${formData.position === 'coordinator' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="position"
                    value="coordinator"
                    checked={formData.position === 'coordinator'}
                    onChange={handleChange}
                  />
                  <span>Coordinator</span>
                </label>
                <label
                  className={`radio-option ${formData.position === 'instructor' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="position"
                    value="instructor"
                    checked={formData.position === 'instructor'}
                    onChange={handleChange}
                  />
                  <span>Instructor</span>
                </label>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Select Coordinator to organise workshops. Select Instructor to conduct workshops.
              </p>
            </div>
          </div>

          {/* ---- contact & location section ---- */}
          <div className="form-section">
            <div className="form-section-title">Contact & Location</div>
            <div className="form-row">
              {renderField('Phone Number', 'phone', 'tel', '10-digit number')}
              {renderField('City / Place', 'location', 'text', 'Mumbai')}
            </div>
            <div className="form-row">
              {renderSelect('State', 'state', stateChoices)}
              {renderSelect('How did you hear about us?', 'source', sourceChoices)}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
