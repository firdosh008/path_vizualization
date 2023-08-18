import React, { useState } from "react";
import "./PathfindingVisualizer.css";
import Grid from "../components/Grid/Grid";
import Navbar from "../components/Nav_bar/Navbar";
import Footer from "../components/footer/Footer";
import { Context } from "../components/Contex/Context";

export default function PathfindingVisualizer() {
  const [Algorithm, setAlgorithm] = useState(null);
  
  const onSetAlgo = (value) =>{
    setAlgorithm(value)
  }

  return (
    <div>
      <Context.Provider value={[Algorithm, onSetAlgo, setAlgorithm]}>
        <Navbar></Navbar>
        <Grid></Grid>
        <Footer></Footer>
      </Context.Provider>
    </div>
  );
}
