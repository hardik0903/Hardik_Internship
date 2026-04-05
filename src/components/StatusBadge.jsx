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
    <span className={`badge ${info.className}`}>
      {info.label}
    </span>
  );
}

export default StatusBadge;
