import Node from "../Node/Node.jsx";
import "./Grid.css";
import { Context } from "../Contex/Context";
import { useContext, useEffect, useState } from "react";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../Algorithum/Dijkstra.js";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [Algorithm, setAlgorithm, Visualize, setVisualize] = useContext(Context);
  // console.log(Algorithm);

  useEffect(() => {
    const Initialgrid = getInitialGrid();
    setGrid(Initialgrid);
  }, []);


  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setMouseIsPressed(true);
    setGrid(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
   for (let i = 1; i < visitedNodesInOrder.length-1; i++) {
     setTimeout(() => {
       const node = visitedNodesInOrder[i];
       const nodeId = `node-${node.row}-${node.col}`;
       document.getElementById(nodeId).className = "node node-visited";
     }, 10 * i);
   }
   setTimeout(() => {
    animateShortestPath(nodesInShortestPathOrder);
   }, 10 * visitedNodesInOrder.length);
  };


  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const newgrid=grid;
    const startNode = newgrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = newgrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(newgrid, startNode, finishNode);
    // console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  
 const notify = () => toast("Coming Soon!");

  if(Visualize){
    if (Algorithm === "Dijkstra") {
      visualizeDijkstra();
      setVisualize(false);
    }
    else{
      console.log("Coming Soon");
      notify();
    }
  }

  return (
    <>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div className="node_row" key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                  row={row}
                />
              );
            })}
          </div>
        ))}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default Grid;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  console.log(newNode);
  return
}