import { Link } from 'react-router-dom';
import './Footer.css';

/*
  Footer component
  
  Nothing fancy here — just the essential links and copyright info.
  The FOSSEE project is under IIT Bombay, so we credit that.
*/

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* about section */}
        <div className="footer-section">
          <h4>About FOSSEE</h4>
          <p>
            FOSSEE (Free/Libre and Open Source Software for Education) is a 
            project based at IIT Bombay, funded by MHRD, Govt. of India. 
            The project promotes open source tools for education.
          </p>
        </div>

        {/* quick links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/workshops">Workshop Types</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><a href="https://fossee.in" target="_blank" rel="noopener noreferrer">FOSSEE Website</a></li>
          </ul>
        </div>

        {/* contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:pythonsupport@fossee.in">pythonsupport@fossee.in</a></li>
            <li><a href="https://fossee.in" target="_blank" rel="noopener noreferrer">fossee.in</a></li>
            <li>IIT Bombay, Powai, Mumbai</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FOSSEE, IIT Bombay. All rights reserved.</p>
        <p>Workshop Booking Portal v2.0</p>
      </div>
    </footer>
  );
}

export default Footer;
