import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import './Home.css';

/*
  Home Page (Landing)
*/

function Home() {
  const { user } = useAuth();

  return (
    <div className="container page-content">
      <Helmet>
        <title>FOSSEE Workshop Portal | Open Source Learning</title>
        <meta name="description" content="Promoting the use of open source software in educational institutions through hands-on technical workshops." />
        <meta property="og:title" content="FOSSEE Workshop Portal | Open Source Learning" />
        <meta property="og:description" content="Promoting the use of open source software in educational institutions through hands-on technical workshops." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FOSSEE Workshop Portal" />
      </Helmet>

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
            <span className="material-icons-round" aria-hidden="true">volunteer_activism</span>
          </div>
          <h3>Free & Open Source</h3>
          <p>All software taught in our workshops is completely free and open source, eliminating licensing costs for institutions.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <span className="material-icons-round" aria-hidden="true">model_training</span>
          </div>
          <h3>Expert Instructors</h3>
          <p>Empower your students with hands-on training by FOSSEE fellows and experts from premium technical universities.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <span className="material-icons-round" aria-hidden="true">workspace_premium</span>
          </div>
          <h3>Certification</h3>
          <p>Participants receive certificates upon successful completion of the workshop and a post-workshop proficiency test.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
