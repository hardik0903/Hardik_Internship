import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/*
  ProtectedRoute component
  
  Wraps around pages that need the user to be logged in.
  If they're not authenticated, we bounce them to the login page.
  
  Nothing complicated — just a check before rendering the children.
*/

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // user isn't logged in, send them to login
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  /** The page component(s) to render if the user is authenticated */
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
