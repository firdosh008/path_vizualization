import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import DropDown from "../Drop_Down/DropDown";
import { BiSolidBomb } from "react-icons/bi";
import { FaLessThan, FaWeightHanging } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Context } from "../Contex/Context";

export default function Navbar() {
  const [Algorithm, setAlgorithm, Visualize, setVisualize] = useContext(Context);
  return (
    <div className="navb shadow-xl ">
      <img src={logo} alt="logo" className="img" />
      <DropDown heading="Algorithm" />
      <DropDown heading="Maze & Pattern" />
      <button className="btn">
        <BiSolidBomb className="icon" />+
      </button>
      <button className="btn">
        <FaWeightHanging className="icon" />+
      </button>
      <button className="btn go " onClick={() => setVisualize(true)}>
        Visualize {Algorithm}
      </button>
      <button
        className="btn stop"
        onClick={() => window.location.reload(false)}
      >
        Clear
      </button>
      <div className="symbols">
        <FaLessThan className="icon" />
        <h1>Start</h1>
        <GoGoal className="icon" />
        <h1>End</h1>
        <BiSolidBomb className="node wall" />
        <h1>Wall</h1>
        <BiSolidBomb className="icon" />
        <h1>Boam</h1>
        <FaWeightHanging className="icon" />
        <h1>Weight</h1>
        <BiSolidBomb className="node unvisited" />
        <h1>Unvisited</h1>
        <BiSolidBomb className="node visited" />
        <h1>Visited</h1>
        <BiSolidBomb className="node path" />
        <h1>Shortest Path</h1>
      </div>
    </div>
  );
}
