import PropTypes from 'prop-types';
import './Pagination.css';

/*
  Pagination component
  
  Pretty standard pagination — shows page numbers with prev/next buttons.
  We limit how many page buttons are shown so it doesn't overflow on mobile.
  
  Props:
    - currentPage: which page we're on
    - totalPages: total number of pages
    - onPageChange: callback when page changes 
*/

function Pagination({ currentPage, totalPages, onPageChange }) {
  // don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  // figure out which page numbers to display
  // we want to show at most 5 page buttons centered around the current page
  function getPageNumbers() {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    
    // adjust start if we're near the end
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <span className="material-icons-round" aria-hidden="true">chevron_left</span>
      </button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="material-icons-round" aria-hidden="true">chevron_right</span>
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  /** Current active page (1-indexed) */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  totalPages: PropTypes.number.isRequired,
  /** Callback fired when the user clicks a page button */
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
