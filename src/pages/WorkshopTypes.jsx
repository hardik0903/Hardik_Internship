import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import WorkshopCard from '../components/WorkshopCard';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';
import { mockWorkshopTypes } from '../data/mockData';
import './WorkshopTypes.css';

/*
  Workshop Types List Page

  This page shows all the available workshop types that coordinators
  can book. It supports searching by name and pagination.

  If the logged-in user is an instructor, they also see an 
  "Add Workshop Type" button to create new ones (mirroring Django behavior).
*/

const ITEMS_PER_PAGE = 6;

function WorkshopTypes() {
  const { isInstructor } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // filter workshops based on search term
  // using useMemo so we don't recalculate on every render unless needed
  const filteredWorkshops = useMemo(() => {
    if (!searchTerm.trim()) return mockWorkshopTypes;
    
    const lowerSearch = searchTerm.toLowerCase();
    return mockWorkshopTypes.filter(ws => 
      ws.name.toLowerCase().includes(lowerSearch) ||
      ws.description.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  // calculate pagination slice
  const totalPages = Math.ceil(filteredWorkshops.length / ITEMS_PER_PAGE);
  const currentWorkshops = filteredWorkshops.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // when search changes, reset to page 1
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container page-content">
      <div className="workshop-list-header">
        <div className="workshop-list-title">
          <h1>Workshop Types</h1>
          <p>Browse and explore all available workshops</p>
        </div>
        
        <div className="workshop-filters">
          <div className="search-input-wrapper">
            <span className="material-icons-round">search</span>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search workshops..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* instructors can add new workshops */}
          {isInstructor() && (
            <Link to="/workshops/new" className="btn btn-primary">
              <span className="material-icons-round">add</span>
              Add Workshop
            </Link>
          )}
        </div>
      </div>

      {/* grid of workshop cards */}
      {filteredWorkshops.length > 0 ? (
        <>
          <div className="workshop-grid">
            {currentWorkshops.map(ws => (
              <WorkshopCard key={ws.id} workshop={ws} variant="type" />
            ))}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        /* empty state if search yields no results */
        <div className="empty-state animate-fade-in">
          <div className="empty-icon material-icons-round">search_off</div>
          <h3>No workshops found</h3>
          <p className="text-muted">
            We couldn't find any workshops matching "{searchTerm}". 
            Try adjusting your search terms.
          </p>
          <button 
            className="btn btn-outline mt-md"
            onClick={() => handleSearchChange({ target: { value: '' }})}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkshopTypes;
