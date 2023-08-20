import React from "react";
import "./Node.css";
import { BiSolidBomb, BiMap } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GoGoal } from "react-icons/go";

export default function Node(props) {
  const {
    isStart,
    isFinish,
    isWall,
    row,
    col,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props;

  let Icon = null;
  const extraClassName = isStart
    ? Icon=BiMap
    : isFinish
    ? Icon=GoGoal
    : isWall
    ? "node-Wall"
    : "";
   console.log(Icon);
  return (
    <div 
    className={`node ${extraClassName}`} 
    id={`node-${row}-${col}`}
    onMouseDown={() => onMouseDown(row, col)}
    onMouseEnter={() => onMouseEnter(row, col)}
    onMouseUp={()=>onMouseUp()}> 
    {Icon && <Icon className="nodeIcon"/>}
    </div>
  );
}
