import React, { useContext } from "react";
import "./Node.css";
import { BiSolidBomb, BiMap } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Context } from "../Contex/Context.jsx";

export default function Node(props) {
  const [
    Algorithm,
    setAlgorithm,
    Visualize,
    setVisualize,
    clear,
    setClear,
    cursor,
    setCursor,
  ] = useContext(Context);
  const {
    isStart,
    isFinish,
    isWall,
    row,
    col,
    isWeight,
    weight,
    onMouseClick,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props;

  let Icon = null;
  const extraClassName = isStart
    ? (Icon = BiMap)
    : isFinish
    ? (Icon = GoGoal)
    : isWall
    ? "node-Wall"
    : isWeight
    ? (Icon = FaWeightHanging)
    : "";

  return (
    <div
      className={`node ${extraClassName}`}
      id={`node-${row}-${col}`}
      onClick={
        cursor === "weightCursor" ? () => onMouseClick(row, col) : undefined
      }
      onMouseDown={
        cursor !== "weightCursor" ? () => onMouseDown(row, col) : undefined
      }
      onMouseEnter={
        cursor !== "weightCursor" ? () => onMouseEnter(row, col) : undefined
      }
      onMouseUp={cursor !== "weightCursor" ? () => onMouseUp() : undefined}
    >
      {Icon && <Icon className="nodeIcon" />}
      {weight > 1 && isWeight && <h3 className="weight">{weight}</h3>}
    </div>
  );
}
