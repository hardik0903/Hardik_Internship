import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import './WorkshopCard.css';

/*
  WorkshopCard component
  
  Used in two contexts:
  1. Workshop Types listing — shows workshop type info (name, description, duration)
  2. Dashboard — shows workshop instances (with status, date, coordinator info)
  
  The "variant" prop controls which layout to render. If no variant is passed,
  it defaults to the workshop type card.
*/

function WorkshopCard({ workshop, variant = 'type' }) {

  // workshop type card — used on the /workshops page
  if (variant === 'type') {
    return (
      <div className="workshop-card animate-fade-in">
        <div className="workshop-card-header">
          <div>
            <h3 className="workshop-card-title">{workshop.name}</h3>
            <p className="workshop-card-subtitle">
              {workshop.duration} day{workshop.duration > 1 ? 's' : ''} workshop
            </p>
          </div>
        </div>

        <div className="workshop-card-body">
          <p>{workshop.description}</p>
        </div>

        <div className="workshop-card-footer">
          <div className="meta-item">
            <span className="material-icons-round" aria-hidden="true">schedule</span>
            {workshop.duration} day{workshop.duration > 1 ? 's' : ''}
          </div>
          <Link 
            to={`/workshops/${workshop.id}`} 
            className="btn btn-outline btn-sm"
            aria-label={`View details for ${workshop.name}`}
          >
            View Details
          </Link>
        </div>
      </div>
    );
  }

  // workshop instance card — used on the dashboard
  return (
    <div className="workshop-card animate-fade-in">
      <div className="workshop-card-header">
        <div>
          <h3 className="workshop-card-title">{workshop.workshopType?.name || 'Workshop'}</h3>
          <p className="workshop-card-subtitle">
            Proposed by {workshop.coordinatorName || 'Coordinator'}
          </p>
        </div>
        <StatusBadge status={workshop.status} />
      </div>

      <div className="workshop-card-meta">
        <div className="meta-item">
          <span className="material-icons-round" aria-hidden="true">calendar_today</span>
          {workshop.date}
        </div>
        {workshop.coordinatorInstitute && (
          <div className="meta-item">
            <span className="material-icons-round" aria-hidden="true">school</span>
            {workshop.coordinatorInstitute}
          </div>
        )}
      </div>

      <div className="workshop-card-footer">
        <div className="meta-item">
          <span className="material-icons-round" aria-hidden="true">info</span>
          {workshop.workshopType?.duration || 1} day workshop
        </div>
        <Link 
          to={`/workshop/${workshop.id}`} 
          className="btn btn-outline btn-sm"
          aria-label={`View details for ${workshop.workshopType?.name || 'Workshop'}`}
        >
          Details
        </Link>
      </div>
    </div>
  );
}

WorkshopCard.propTypes = {
  /**
   * For variant='type': a WorkshopType object { id, name, description, duration }
   * For variant='instance': a Workshop object { id, workshopType, date, status, coordinatorName, ... }
   */
  workshop: PropTypes.object.isRequired,
  /** Controls which card layout to render */
  variant: PropTypes.oneOf(['type', 'instance']),
};

export default WorkshopCard;
