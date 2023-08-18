import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import DropDown from "../Drop_Down/DropDown";
import { BiSolidBomb } from "react-icons/bi";
import { FaLessThan } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Context } from "../Contex/Context";

export default function Navbar() {
  const [Algorithm, setAlgorithm, onSetAlgo] = useContext(Context);
  return (
    <div className="navb shadow-xl ">
      <img src={logo} alt="logo" className="img" />
      <DropDown heading="Algorithum" />
      <DropDown heading="Maze and Pattern" />
      <div className="button">
        <button className="btn">Add Boam</button>
        <button className="btn go " onClick={() => onSetAlgo("Dijkstra")}>
          Visualize
        </button>
        <button
          className="btn stop"
          onClick={() => window.location.reload(false)}
        >
          Clear
        </button>
      </div>

      <div className="Symbols">
        <FaLessThan className="icon" />
        <h1>Start</h1>
        <GoGoal className="icon" />
        <h1>End</h1>
        <BiSolidBomb className="node wall" />
        <h1>Wall</h1>
        <BiSolidBomb className="icon" />
        <h1>Boam</h1>
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
