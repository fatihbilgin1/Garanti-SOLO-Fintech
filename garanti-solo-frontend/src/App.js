import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Sayfalarımız
import Dashboard from './pages/Dashboard';
import CreateLink from './pages/CreateLink';
// Yeni yaptığımız Navbar bileşeni
import Navbar from './components/Navbar';

function App() {
  // Hangi sayfada olduğumuzu tutan state (Varsayılan: Dashboard)
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="App">
      {/* Navbar her zaman üstte durur */}
      <Navbar activePage={currentPage} onNavigate={setCurrentPage} />

      {/* Sayfa İçeriği: currentPage neyse onu gösterir */}
      <div className="container">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'createLink' && <CreateLink />}
      </div>
    </div>
  );
}

export default App;