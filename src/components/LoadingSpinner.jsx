import PropTypes from 'prop-types';

/*
  LoadingSpinner component
  
  Shows a simple spinning animation while content is loading.
  Using CSS animation instead of a GIF to keep bundle size small.
*/

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      gap: '16px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        {message}
      </p>

      {/* inline keyframes for the spinner rotation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

LoadingSpinner.propTypes = {
  /** Text message shown below the spinner */
  message: PropTypes.string,
};

export default LoadingSpinner;
