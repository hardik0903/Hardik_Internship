import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { titleChoices, departmentChoices, stateChoices } from '../data/mockData';
import './Profile.css';

/*
  Profile Page

  Allows users to view and edit their profile information.
  Re-uses the dropdown options from our mockData to keep things consistent.
*/

function Profile() {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: user?.title || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    institute: user?.institute || '',
    department: user?.department || '',
    state: user?.state || '',
    location: user?.location || '',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API save
    setTimeout(() => {
      // In a real app we'd update context/backend here
      setLoading(false);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }, 800);
  }

  function getInitials() {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }

  function renderField(label, name, type = "text") {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          type={type}
          name={name}
          className="input-field"
          value={formData[name]}
          onChange={handleChange}
          disabled={!isEditing}
          required
        />
      </div>
    );
  }

  return (
    <div className="container page-content">
      <Helmet>
        <title>My Profile | FOSSEE Workshop Portal</title>
        <meta name="description" content="Manage your FOSSEE account profile, personal and professional information." />
        <meta property="og:title" content="My Profile | FOSSEE Workshop Portal" />
        <meta property="og:description" content="Manage your FOSSEE account profile, personal and professional information." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FOSSEE Workshop Portal" />
      </Helmet>
      <div className="profile-container animate-fade-in">
        
        {message && (
          <div style={{ background: 'var(--color-accent-soft)', color: 'var(--color-success)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)', textAlign: 'center', border: '1px solid var(--color-border)' }}>
            <span className="material-icons-round" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '18px' }}>check_circle</span>
            {message}
          </div>
        )}

        <div className="profile-card">
          <div className="profile-header-section">
            <div className="profile-avatar-large">
              {getInitials()}
            </div>
            <div className="profile-info-primary">
              <h1>{formData.title} {user.firstName} {user.lastName}</h1>
              <p>{user.position} • {user.institute}</p>
              <div className="profile-badges">
                {user.isEmailVerified && (
                  <span className="badge badge-accepted" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-icons-round" aria-hidden="true" style={{ fontSize: '14px' }}>verified</span>
                    Email Verified
                  </span>
                )}
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              Personal Information
            </h3>
            <div className="profile-form-grid">
              <div className="form-group">
                <label>Title</label>
                <select name="title" className="input-field" value={formData.title} onChange={handleChange} disabled={!isEditing}>
                  {titleChoices.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              {renderField('First Name', 'firstName')}
              {renderField('Last Name', 'lastName')}
              {renderField('Phone Number', 'phone', 'tel')}
            </div>

            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              Professional Information
            </h3>
            <div className="profile-form-grid">
              {renderField('Institute / College', 'institute')}
              <div className="form-group">
                <label>Department</label>
                <select name="department" className="input-field" value={formData.department} onChange={handleChange} disabled={!isEditing}>
                  {departmentChoices.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>

            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              Location Details
            </h3>
            <div className="profile-form-grid">
              <div className="form-group">
                <label>State</label>
                <select name="state" className="input-field" value={formData.state} onChange={handleChange} disabled={!isEditing}>
                  {stateChoices.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              {renderField('City / Location', 'location')}
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)} disabled={loading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    <span className="material-icons-round" aria-hidden="true">save</span>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button type="button" className="btn btn-outline" onClick={() => setIsEditing(true)}>
                  <span className="material-icons-round" aria-hidden="true">edit</span>
                  Edit Profile
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
