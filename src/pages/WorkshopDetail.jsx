import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { mockWorkshops, mockComments } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import './WorkshopDetail.css';

/*
  Workshop Detail Page
  
  Shows the details of a specific workshop booking (instance).
  Instructors can see an action bar to Accept/Reject/Change Date.
  It also includes a comment section mimicking the Django implementation.
*/

function WorkshopDetail() {
  const { id } = useParams();
  const { user, isInstructor } = useAuth();
  
  // Find the workshop instance
  const workshop = mockWorkshops.find(ws => ws.id === parseInt(id));
  
  // Find comments for this workshop
  const [comments, setComments] = useState(
    mockComments.filter(c => c.workshopId === parseInt(id))
  );

  const [newComment, setNewComment] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  if (!workshop) {
    return (
      <div className="container page-content">
        <div className="empty-state">
          <div className="empty-icon material-icons-round">error_outline</div>
          <h3>Booking Not Found</h3>
          <p>The workshop booking you're looking for doesn't exist.</p>
          <Link to="/dashboard" className="btn btn-primary mt-md">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      workshopId: workshop.id,
      authorName: `${user.firstName} ${user.lastName}`,
      comment: newComment,
      createdDate: new Date().toISOString().split('T')[0],
      isPublic: isInstructor() ? isPublic : true, // Coordinators always post publicly
    };

    setComments([...comments, comment]);
    setNewComment('');
  }

  return (
    <div className="container page-content">
      <Helmet>
        <title>{workshop.workshopType?.name || 'Workshop'} Booking | FOSSEE</title>
        <meta name="description" content={`Workshop booking details for ${workshop.workshopType?.name || 'workshop'} on ${workshop.date}`} />
      </Helmet>
      <div className="mb-lg">
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
          <span className="material-icons-round" aria-hidden="true" style={{ fontSize: '16px' }}>arrow_back</span>
          Back to Dashboard
        </Link>
      </div>

      <div className="instance-header animate-slide-up">
        <div className="instance-title-row">
          <div>
            <h1 className="instance-title">{workshop.workshopType?.name || 'Workshop'}</h1>
            <p className="instance-subtitle">
              Proposed for {workshop.date}
            </p>
          </div>
          <StatusBadge status={workshop.status} />
        </div>

        <div className="instance-meta-grid">
          <div className="meta-box">
            <span className="material-icons-round" aria-hidden="true">person</span>
            <div className="meta-box-content">
              <h4>Coordinator</h4>
              <p>{workshop.coordinatorName}</p>
              <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>{workshop.coordinatorInstitute}</p>
            </div>
          </div>

          <div className="meta-box">
            <span className="material-icons-round" aria-hidden="true">school</span>
            <div className="meta-box-content">
              <h4>Instructor</h4>
              <p>{workshop.instructorName || 'Not Assigned'}</p>
            </div>
          </div>

          <div className="meta-box">
            <span className="material-icons-round" aria-hidden="true">category</span>
            <div className="meta-box-content">
              <h4>Workshop Info</h4>
              <p>{workshop.workshopType?.duration || 1} Days</p>
              <Link to={`/workshops/${workshop.workshopType?.id || 1}`} style={{ fontSize: 'var(--font-size-xs)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                View Type Details <span className="material-icons-round" aria-hidden="true" style={{ fontSize: '14px' }}>open_in_new</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Instructor Action Bar */}
        {isInstructor() && workshop.status === 0 && (
          <div className="action-bar animate-fade-in">
            <button className="btn btn-primary">
              <span className="material-icons-round" aria-hidden="true">check_circle</span>
              Accept Workshop
            </button>
            <button className="btn btn-outline" style={{ borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>
              <span className="material-icons-round" aria-hidden="true">edit_calendar</span>
              Change Date
            </button>
            <button className="btn btn-outline" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
              <span className="material-icons-round" aria-hidden="true">cancel</span>
              Reject
            </button>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="comments-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="comments-header">
          <span className="material-icons-round" aria-hidden="true">forum</span>
          Discussion ({comments.length})
        </h2>

        <div className="comments-list">
          {comments.map(c => (
            <div key={c.id} className="comment-card">
              <div className="comment-header">
                <span className="comment-author">
                  {c.authorName} 
                  {!c.isPublic && <span className="badge badge-pending" style={{ marginLeft: '8px', fontSize: '10px' }}>Private</span>}
                </span>
                <span className="comment-date">{c.createdDate}</span>
              </div>
              <div className="comment-body">{c.comment}</div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-muted text-center" style={{ padding: 'var(--space-xl) 0' }}>
              No comments yet. Start the discussion below.
            </p>
          )}
        </div>

        <div className="add-comment-card">
          <h3>Add a Comment</h3>
          <form className="add-comment-form" onSubmit={handleAddComment}>
            <textarea
              className="input-field"
              placeholder="Type your message here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>

            <div className="comment-meta-actions">
              {isInstructor() ? (
                 <label className="visibility-toggle">
                  <input 
                    type="checkbox" 
                    checked={isPublic} 
                    onChange={(e) => setIsPublic(e.target.checked)} 
                  />
                  Visible to Coordinator
                </label>
              ) : <div></div>}
              
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default WorkshopDetail;
