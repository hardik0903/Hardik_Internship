import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import './WorkshopTypeDetail.css';

function WorkshopTypeDetail() {
  const { id } = useParams();
  const { user, isInstructor } = useAuth();
  const navigate = useNavigate();

  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await fetch(`/api/workshop-types/${id}/`);
        if (!response.ok) throw new Error('Workshop not found');
        const data = await response.json();
        setWorkshop(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchType();
  }, [id]);

  if (loading) {
    return <div className="container page-content"><div className="loading-spinner">Loading...</div></div>;
  }

  if (error || !workshop) {
    return (
      <div className="container page-content">
        <div className="empty-state">
          <div className="empty-icon material-icons-round">error_outline</div>
          <h3>Workshop Not Found</h3>
          <p>The workshop type you're looking for doesn't exist or has been removed.</p>
          <Link to="/workshops" className="btn btn-primary mt-md">
            Back to Workshops
          </Link>
        </div>
      </div>
    );
  }

  // Demo placeholder — these attachments are generated client-side to
  // showcase the UI. In production, they would come from the Django API's
  // /api/workshop-types/:id/attachments/ endpoint.
  const demoAttachments = [
    { id: 1, name: `${workshop.name.replace(/\s+/g, '_')}_Schedule.pdf` },
    { id: 2, name: 'Prerequisites_Guide.pdf' }
  ];

  return (
    <div className="container page-content">
      <Helmet>
        <title>{workshop.name} | FOSSEE Workshops</title>
        <meta name="description" content={workshop.description.substring(0, 160)} />
        <meta property="og:title" content={`${workshop.name} | FOSSEE Workshops`} />
        <meta property="og:description" content={workshop.description.substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="FOSSEE Workshop Portal" />
      </Helmet>
      {/* breadcrumb navigation */}
      <div className="mb-lg">
        <Link to="/workshops" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
          <span className="material-icons-round" aria-hidden="true" style={{ fontSize: '16px' }}>arrow_back</span>
          Back to all workshops
        </Link>
      </div>

      <div className="detail-header animate-slide-up">
        <div className="detail-header-top">
          <h1 className="detail-title">{workshop.name}</h1>
          
          {/* Action button based on user role */}
          {user ? (
            isInstructor() ? (
              <button className="btn btn-secondary">
                <span className="material-icons-round" aria-hidden="true">edit</span>
                Edit Workshop
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/propose', { state: { workshopTypeId: workshop.id } })}
              >
                <span className="material-icons-round" aria-hidden="true">event_available</span>
                Propose this Workshop
              </button>
            )
          ) : (
            <Link to="/login" className="btn btn-primary">
              Sign in to propose
            </Link>
          )}
        </div>

        <div className="detail-meta">
          <span>
            <span className="material-icons-round" aria-hidden="true">schedule</span>
            {workshop.duration} Day{workshop.duration > 1 ? 's' : ''}
          </span>
          <span>
            <span className="material-icons-round" aria-hidden="true">category</span>
            Technical Training
          </span>
        </div>
      </div>

      <div className="detail-content-layout animate-fade-in" style={{ animationDelay: '0.1s' }}>
        
        {/* main content area */}
        <div className="detail-main">
          <section className="detail-section">
            <h2>Description</h2>
            <p>{workshop.description}</p>
          </section>

          <section className="detail-section">
            <h2>Terms and Conditions</h2>
            <div style={{ background: 'var(--color-bg-input)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <p>{workshop.termsAndConditions}</p>
            </div>
          </section>
        </div>

        {/* sidebar for attachments */}
        <div className="detail-sidebar">
          <div className="sidebar-card">
            <h3>
              <span className="material-icons-round" aria-hidden="true">folder_zip</span>
              Resources
              <span className="text-muted" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'normal', marginLeft: '6px' }}>(demo)</span>
            </h3>
            
            <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
              Download the schedule and instructions for this workshop.
            </p>

            <ul className="attachment-list">
              {demoAttachments.map(file => (
                <li key={file.id} className="attachment-item">
                  <span className="material-icons-round" aria-hidden="true">picture_as_pdf</span>
                  <a href="#" className="attachment-name" onClick={(e) => e.preventDefault()}>
                    {file.name}
                  </a>
                  <button
                    className="btn-outline"
                    style={{ padding: '4px', border: 'none', background: 'none', color: 'var(--color-text-muted)' }}
                    aria-label={`Download ${file.name}`}
                    title={`Download ${file.name}`}
                  >
                    <span className="material-icons-round" aria-hidden="true" style={{ fontSize: '18px' }}>download</span>
                  </button>
                </li>
              ))}
            </ul>

            {isInstructor() && (
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                <span className="material-icons-round" aria-hidden="true">upload_file</span>
                Manage Attachments
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default WorkshopTypeDetail;
