import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import WorkshopCard from '../components/WorkshopCard';
import './Dashboard.css';

function Dashboard() {
  const { user, isInstructor } = useAuth();
  const [activeTab, setActiveTab ] = useState('all');
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch('/api/workshops/');
        if (!response.ok) throw new Error('Failed to fetch workshops');
        const data = await response.json();
        setWorkshops(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  // Filter workshops relevant to the current user
  const userWorkshops = useMemo(() => {
    if (!user) return [];
    
    let relevant = [];
    if (isInstructor()) {
      // Instructors see pending + accepted
      relevant = workshops.filter(ws => 
        ws.status === 0 || (ws.instructor === user.id && ws.status === 1)
      );
    } else {
      // Coordinators see all workshops they proposed
      relevant = workshops.filter(ws => ws.coordinator === user.id);
    }

    return [...relevant].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [user, isInstructor, workshops]);

  // Apply tab filter
  const displayedWorkshops = useMemo(() => {
    if (activeTab === 'all') return userWorkshops;
    if (activeTab === 'pending') return userWorkshops.filter(ws => ws.status === 0);
    if (activeTab === 'accepted') return userWorkshops.filter(ws => ws.status === 1);
    if (activeTab === 'deleted') return userWorkshops.filter(ws => ws.status === 2);
    return userWorkshops;
  }, [userWorkshops, activeTab]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: userWorkshops.length,
      pending: userWorkshops.filter(ws => ws.status === 0).length,
      accepted: userWorkshops.filter(ws => ws.status === 1).length,
    };
  }, [userWorkshops]);

  return (
    <div className="container page-content">
      <Helmet>
        <title>Dashboard | FOSSEE Workshop Portal</title>
        <meta name="description" content="Manage your FOSSEE workshop bookings, proposals, and instructor status in one modern dashboard." />
        <meta property="og:title" content="Dashboard | FOSSEE Workshop Portal" />
        <meta property="og:description" content="Manage your FOSSEE workshop bookings, proposals, and instructor status in one modern dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FOSSEE Workshop Portal" />
      </Helmet>

      <div className="dashboard-header animate-slide-up">
        <div className="dashboard-title">
          <h1>Welcome, {user?.firstName}</h1>
          <p>Manage your workshop bookings and requests</p>
        </div>
        {!isInstructor() && (
          <Link to="/propose" className="btn btn-primary">
            <span className="material-icons-round" aria-hidden="true">add</span>
            Propose Workshop
          </Link>
        )}
      </div>

      <div className="dashboard-stats animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="stat-card">
          <div className="stat-icon blue">
            <span className="material-icons-round" aria-hidden="true">book_online</span>
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Workshops</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
            <span className="material-icons-round" aria-hidden="true">pending_actions</span>
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending Requests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <span className="material-icons-round" aria-hidden="true">event_available</span>
          </div>
          <div className="stat-content">
            <h3>{stats.accepted}</h3>
            <p>Confirmed Workshops</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs animate-fade-in" style={{ animationDelay: '0.2s' }} role="tablist">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
          role="tab"
          aria-selected={activeTab === 'all'}
          aria-controls="workshop-grid"
        >
          All Workshops
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
          role="tab"
          aria-selected={activeTab === 'pending'}
          aria-controls="workshop-grid"
        >
          Pending
        </button>
        <button 
          className={`tab-btn ${activeTab === 'accepted' ? 'active' : ''}`}
          onClick={() => setActiveTab('accepted')}
          role="tab"
          aria-selected={activeTab === 'accepted'}
          aria-controls="workshop-grid"
        >
          Accepted
        </button>
      </div>

      <div id="workshop-grid" className="workshop-grid animate-fade-in" style={{ animationDelay: '0.3s' }}>
        {loading ? (
          <div className="loading-spinner">Loading workshops...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : displayedWorkshops.length > 0 ? (
          displayedWorkshops.map(ws => (
            <WorkshopCard key={ws.id} workshop={ws} variant="instance" />
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-icon material-icons-round" aria-hidden="true">assignment_late</div>
            <h3>No workshops found</h3>
            <p className="text-muted">You don't have any workshops matching this status.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
