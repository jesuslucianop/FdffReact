import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ReportPage from './pages/reportPage';
import Home from './components/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <Router basename='/' element={<Home/>}>
        
        <>
        <Routes>

          <Route path="/" element={<Home/>}  />
          <Route path="/atletas" element={<ReportPage />}  />
          <Route />
        </Routes>
        
        </>
      </Router>
    </div>

  );
}

export default App
