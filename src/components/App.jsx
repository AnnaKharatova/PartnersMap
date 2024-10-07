import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import MapPage from './MapPage/MapPage.jsx'
import Catalog from './Catalog/Catalog.jsx'
import ElementPage from './ElementPage/ElementPage.jsx'
import Error500 from './Error500/Error500.jsx';

function App() {

  const [maxWidth1024, setMaxWidth1024] = useState()
  const [maxWidth760, setMaxWidth760] = useState()

  const handleResize = () => {
    if (window.innerWidth < 760) {
      setMaxWidth1024(false);
      setMaxWidth760(true);
    } else if (window.innerWidth < 1024) {
      setMaxWidth1024(true);
      setMaxWidth760(false);
    } else {
      setMaxWidth1024(false);
      setMaxWidth760(false);
    }
  };
  window.addEventListener('resize', handleResize);

  useEffect(() => {
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  return (
    <Routes>
      <Route path="/" element={<MapPage maxWidth1024={maxWidth1024} maxWidth760={maxWidth760} />} />
      <Route path="/catalog" element={<Catalog maxWidth760={maxWidth760} />} />
      <Route path="/catalog/:type/:id" element={<ElementPage maxWidth760={maxWidth760} />} />
      <Route path="/error" element={<Error500 />} />
    </Routes>
  )
}

export default App
