import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockWorkshopTypes } from '../data/mockData';
import './ProposeWorkshop.css';

/*
  Propose Workshop Page
  
  Coordinators use this form to request a workshop on a specific date.
  If they navigated here from a specific WorkshopTypeDetail page,
  we pre-select that workshop type for them using router state.
*/

function ProposeWorkshop() {
  const { user, isInstructor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If the user got here from a specific template, pre-select it
  const preSelectedId = location.state?.workshopTypeId || '';

  const [formData, setFormData] = useState({
    workshopTypeId: preSelectedId,
    date: '',
    tncAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Instructors shouldn't be proposing workshops
  useEffect(() => {
    if (isInstructor()) {
      navigate('/dashboard');
    }
  }, [isInstructor, navigate]);

  // Find the selected workshop type so we can display its specific T&C
  const selectedType = mockWorkshopTypes.find(
    ws => ws.id === parseInt(formData.workshopTypeId)
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!formData.workshopTypeId) newErrors.workshopTypeId = 'Please select a workshop type';
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate <= today) {
        newErrors.date = 'Please select a future date';
      }
    }

    if (!formData.tncAccepted) {
      newErrors.tncAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      // Intentionally not adding to mockData permanently since it resets on reload anyway
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  }

  return (
    <div className="container page-content">
      <div className="propose-container animate-slide-up">
        <div className="propose-card">
          <div className="propose-header">
            <h1>Propose Workshop</h1>
            <p className="text-muted">Fill out the details below to request a workshop at your institute.</p>
          </div>

          <form className="propose-form" onSubmit={handleSubmit} noValidate>
            
            <div className="form-group">
              <label htmlFor="workshopTypeId">Workshop Type</label>
              <select
                id="workshopTypeId"
                name="workshopTypeId"
                className={`input-field ${errors.workshopTypeId ? 'error' : ''}`}
                value={formData.workshopTypeId}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.workshopTypeId}
              >
                <option value="" disabled>Select a workshop...</option>
                {mockWorkshopTypes.map(ws => (
                  <option key={ws.id} value={ws.id}>{ws.name}</option>
                ))}
              </select>
              {errors.workshopTypeId && <span className="error-text" role="alert">{errors.workshopTypeId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Proposed Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className={`input-field ${errors.date ? 'error' : ''}`}
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // restrict past dates
                aria-required="true"
                aria-invalid={!!errors.date}
              />
              {errors.date && <span className="error-text" role="alert">{errors.date}</span>}
            </div>

            {selectedType && (
              <div className="animate-fade-in">
                <label id="tnc-label" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)', display: 'block' }}>
                  Terms and Conditions
                </label>
                <div className="tnc-box" aria-labelledby="tnc-label" tabIndex="0">
                  {selectedType.termsAndConditions}
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="tncAccepted"
                    name="tncAccepted"
                    checked={formData.tncAccepted}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.tncAccepted}
                  />
                  <div>
                    <label htmlFor="tncAccepted">
                      I have read and accept the terms and conditions for this workshop.
                    </label>
                    {errors.tncAccepted && <span className="error-text" role="alert" style={{ display: 'block', marginTop: '4px' }}>{errors.tncAccepted}</span>}
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-full-width" disabled={loading}>
              {loading ? 'Submitting Proposal...' : 'Submit Proposal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProposeWorkshop;
