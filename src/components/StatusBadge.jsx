import PropTypes from 'prop-types';

/*
  StatusBadge component

  A tiny pill-shaped badge that shows the workshop status.
  Color-coded so you can tell at a glance if something is
  pending (yellow), accepted (green), or deleted (red).
*/

const STATUS_MAP = {
  0: { label: 'Pending', className: 'badge-pending' },
  1: { label: 'Accepted', className: 'badge-accepted' },
  2: { label: 'Deleted', className: 'badge-deleted' },
};

function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || STATUS_MAP[0];

  return (
    <span 
      className={`badge ${info.className}`} 
      role="status"
      aria-label={`Status: ${info.label}`}
    >
      {info.label}
    </span>
  );
}

StatusBadge.propTypes = {
  /** Numeric status code: 0 = Pending, 1 = Accepted, 2 = Deleted */
  status: PropTypes.oneOf([0, 1, 2]).isRequired,
};

export default StatusBadge;
