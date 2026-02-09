import React from 'react';

const Navbar = ({ activePage, onNavigate }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
      <div className="container">
        {/* Sol Üst Logo ve İsim */}
        <a className="navbar-brand fw-bold" href="#" onClick={() => onNavigate('dashboard')}>
          <span className="text-success">Garanti</span> SOLO
        </a>
        
        {/* Menü Butonları */}
        <div className="d-flex">
          <button 
            className={`btn btn-sm me-2 ${activePage === 'dashboard' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => onNavigate('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`btn btn-sm ${activePage === 'createLink' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => onNavigate('createLink')}
          >
            🔗 Link Oluştur
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;