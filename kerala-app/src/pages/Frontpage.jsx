import React from "react";
import NavbarTop from "../components/Navbartop";
import Hero from "../components/Hero";
import TopSpots from "../components/Topspots";
import TripStyles from "../components/Trips";
import LocalFood from "../components/Food";
import Festivals from "../components/Festivals";
import StayTypes from "../components/Stay";
import TransportGuide from "../components/Transport";
import BestTime from "../components/Besttime";
import Footer from "../components/Footer";
import Plans from "../components/Itenary";
import BudgetCalculator from "../components/Budget";
import DistrictSelector from "../components/District";
import HiddenGems from "../components/Hiddengems";

const Frontpage = () => {
  return (
    <div>
   
      <Hero />
      <DistrictSelector />
      <TopSpots />
      <HiddenGems />
      <TripStyles />
       <LocalFood />
      <Festivals />
      <StayTypes />
      <TransportGuide />
      <BudgetCalculator />
      <Plans />
      <BestTime />
     
    </div>
  );
};

export default Frontpage;
