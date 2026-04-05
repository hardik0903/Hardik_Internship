import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

/*
  Home Page (Landing)
*/

function Home() {
  const { user } = useAuth();

  return (
    <div className="container page-content">
      <div className="home-hero animate-slide-up">
        <h1 className="home-title">Empowering Education with Open Source Software</h1>
        <p className="home-subtitle">
          FOSSEE promotes the use of open source software in educational institutions. 
          Book a workshop for your college and empower your students with modern tools.
        </p>
        
        <div className="home-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg">
                Become a Coordinator
              </Link>
              <Link to="/workshops" className="btn btn-secondary btn-lg">
                Browse Workshops
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="home-features animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="feature-card">
          <div className="feature-icon">
            <span className="material-icons-round">volunteer_activism</span>
          </div>
          <h3>Free & Open Source</h3>
          <p>All software taught in our workshops is completely free and open source, eliminating licensing costs for institutions.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <span className="material-icons-round">model_training</span>
          </div>
          <h3>Expert Instructors</h3>
          <p>Empower your students with hands-on training by FOSSEE fellows and experts from premium technical universities.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <span className="material-icons-round">workspace_premium</span>
          </div>
          <h3>Certification</h3>
          <p>Participants receive certificates upon successful completion of the workshop and a post-workshop proficiency test.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
