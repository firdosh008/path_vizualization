import React from "react";
import "./Node.css";

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
  const extraClassName = isStart
    ? "node-start"
    : isFinish
    ? "node-end"
    : isWall
    ? "node-Wall"
    : "";
  return (
    <div 
    className={`node ${extraClassName}`} 
    id={`node-${row}-${col}`}
    onMouseDown={() => onMouseDown(row, col)}
    onMouseEnter={() => onMouseEnter(row, col)}
    onMouseUp={()=>onMouseUp()}> 
    </div>
  );
}
