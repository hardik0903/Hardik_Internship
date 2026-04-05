import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WorkshopCard from '../components/WorkshopCard';
import { mockWorkshops } from '../data/mockData';
import './Dashboard.css';

/*
  Dashboard Page

  This page behaves differently based on user role:
  - Coordinators see workshops they have proposed (all statuses).
  - Instructors see pending workshops (to accept/reject) and accepted ones.
  
  We use tabs to filter the workshops by status (All, Pending, Accepted).
*/

function Dashboard() {
  const { user, isInstructor } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  // Filter workshops relevant to the current user
  const userWorkshops = useMemo(() => {
    if (!user) return [];
    
    let relevant = [];
    if (isInstructor()) {
      // Instructors see pending + accepted where they are the instructor
      relevant = mockWorkshops.filter(ws => 
        ws.status === 0 || (ws.instructorId === user.id && ws.status === 1)
      );
    } else {
      // Coordinators see all workshops they proposed
      relevant = mockWorkshops.filter(ws => ws.coordinatorId === user.id);
    }

    // Sort by date (newest first)
    return relevant.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [user, isInstructor]);

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
      <div className="dashboard-header animate-slide-up">
        <div className="dashboard-title">
          <h1>Welcome, {user?.firstName}</h1>
          <p>Manage your workshop bookings and requests</p>
        </div>
        {!isInstructor() && (
          <Link to="/propose" className="btn btn-primary">
            <span className="material-icons-round">add</span>
            Propose Workshop
          </Link>
        )}
      </div>

      <div className="dashboard-stats animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="stat-card">
          <div className="stat-icon blue">
            <span className="material-icons-round">book_online</span>
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Workshops</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
            <span className="material-icons-round">pending_actions</span>
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending Requests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <span className="material-icons-round">event_available</span>
          </div>
          <div className="stat-content">
            <h3>{stats.accepted}</h3>
            <p>Confirmed Workshops</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Workshops
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`tab-btn ${activeTab === 'accepted' ? 'active' : ''}`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted
        </button>
      </div>

      <div className="workshop-grid animate-fade-in" style={{ animationDelay: '0.3s' }}>
        {displayedWorkshops.length > 0 ? (
          displayedWorkshops.map(ws => (
            <WorkshopCard key={ws.id} workshop={ws} variant="instance" />
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-icon material-icons-round">assignment_late</div>
            <h3>No workshops found</h3>
            <p className="text-muted">You don't have any workshops matching this status.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
