import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from './pages/Frontpage';
import Layout from './components/Layout';
import Displayplaces from './pages/Displayplaces';
import PlaceDetail from './pages/PlaceDetail';
import DistrictPlaces from './pages/DistrictPlaces';
import PlacesByCategory from './pages/Categorypage';
import CategoryFilter from './pages/Categoryfilter';
import Contactform from './pages/Contactform';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Frontpage />} />
          <Route path='/places' element={<Displayplaces />} />
          <Route path='/places/:category' element={<PlacesByCategory />} /> {/* <-- Dynamic route */}
          <Route path="place/:id" element={<PlaceDetail />} />
          <Route path="/district/:district" element={<DistrictPlaces />} />
          <Route path='/catfil' element={<CategoryFilter/>}/>
          <Route path='/form' element={<Contactform/>}/>  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
