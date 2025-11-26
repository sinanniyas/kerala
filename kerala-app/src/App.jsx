import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from './pages/Frontpage';
import Layout from './components/Layout';
import Displayplaces from './pages/Displayplaces';
import PlaceDetail from './pages/PlaceDetail';
import DistrictPlaces from './pages/DistrictPlaces';
import PlacesByCategory from './pages/Categorypage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Frontpage />} />
            <Route path='/places' element={<Displayplaces />} />
            <Route path="place/:id" element={<PlaceDetail />} />
            <Route path="/district/:district" element={<DistrictPlaces />} />
            <Route path='/exp' element={<PlacesByCategory/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
