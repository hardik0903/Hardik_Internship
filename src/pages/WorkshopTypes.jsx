import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WorkshopCard from '../components/WorkshopCard';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';
import './WorkshopTypes.css';

const ITEMS_PER_PAGE = 6;

function WorkshopTypes() {
  const { isInstructor } = useAuth();
  
  const [workshopTypes, setWorkshopTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('/api/workshop-types/');
        if (!response.ok) throw new Error('Failed to fetch workshop types');
        const data = await response.json();
        setWorkshopTypes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const filteredWorkshops = useMemo(() => {
    if (!searchTerm.trim()) return workshopTypes;
    
    const lowerSearch = searchTerm.toLowerCase();
    return workshopTypes.filter(ws => 
      ws.name.toLowerCase().includes(lowerSearch) ||
      ws.description.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, workshopTypes]);

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
      <Helmet>
        <title>Workshop Categories | FOSSEE Portal</title>
        <meta name="description" content="Browse through technical workshop categories offered by FOSSEE, including Python, Scilab, and OpenFOAM." />
        <meta property="og:title" content="Workshop Categories | FOSSEE Portal" />
        <meta property="og:description" content="Browse through technical workshop categories offered by FOSSEE, including Python, Scilab, and OpenFOAM." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FOSSEE Workshop Portal" />
      </Helmet>

      <div className="workshop-list-header">
        <div className="workshop-list-title">
          <h1>Workshop Types</h1>
          <p>Browse and explore all available workshops</p>
        </div>
        
        <div className="workshop-filters">
          <div className="search-input-wrapper">
            <span className="material-icons-round" aria-hidden="true">search</span>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search workshops..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {isInstructor() && (
            <Link to="/workshops/new" className="btn btn-primary">
              <span className="material-icons-round" aria-hidden="true">add</span>
              Add Workshop
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading categories...</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : filteredWorkshops.length > 0 ? (
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
        <div className="empty-state animate-fade-in">
          <div className="empty-icon material-icons-round" aria-hidden="true">search_off</div>
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
