import { NavLink, Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

function App() {
  const [clicked, setClicked] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setClicked(false);
    }
  }, [location]);

  const handleButtonClick = () => {
    setClicked(true);
  };

  return (
    <div>
        <>
          {!clicked && (
            <>
            <div className="home-buttons-container">
              <Button variant="outlined" onClick={handleButtonClick} component={NavLink} to="/login" style={{ textDecoration: 'none' }}>Login</Button>
              <Button variant="outlined" onClick={handleButtonClick} component={NavLink} to="/register" style={{ textDecoration: 'none' }}>Register</Button>
            </div>
            </>
          )}
          <Outlet/>
        </>
    </div>
  );
}

export default App;