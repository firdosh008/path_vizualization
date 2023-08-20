import React, { useState } from "react";
import "./PathfindingVisualizer.css";
import Grid from "../components/Grid/Grid";
import Navbar from "../components/Nav_bar/Navbar";
import Footer from "../components/footer/Footer";
import { Context } from "../components/Contex/Context";

export default function PathfindingVisualizer() {
  const [Algorithm, setAlgorithm] = useState(null);
  const [Visualize, setVisualize] = useState(false);
  const [clear, setClear] = useState(false);
  const [cursor, setCursor] = useState("Cursor");

  return (
    <div>
      <Context.Provider
        value={[
          Algorithm,
          setAlgorithm,
          Visualize,
          setVisualize,
          clear,
          setClear,
          cursor,
          setCursor,
        ]}
      >
        <Navbar></Navbar>
        <Grid></Grid>
        <Footer></Footer>
      </Context.Provider>
    </div>
  );
}
