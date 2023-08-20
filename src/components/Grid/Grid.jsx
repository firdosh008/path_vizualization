import Node from "../Node/Node.jsx";
import "./Grid.css";
import { Context } from "../Contex/Context.jsx";
import { useContext, useEffect, useState } from "react";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../Algorithm/Algorithm.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
let visitedNodesInOrder=[];
let nodesInShortestPathOrder=[];

const Grid = (props) => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [Algorithm, setAlgorithm, Visualize, setVisualize, clear, setClear,cursor,setCursor] =useContext(Context);
  // console.log(Algorithm);
  // console.log(Visualize);
  // console.log(clear);

  //useEffect to set the grid
  useEffect(() => {
    const Initialgrid = getInitialGrid();
    setGrid(Initialgrid);
  }, []);

  //usEffect to clear the grid
  useEffect(() => {
    if (clear) {
      setGrid(getInitialGrid());
      clearGrid(visitedNodesInOrder,nodesInShortestPathOrder);
      setAlgorithm(null)
      setClear(false);
    }
  }, [clear]);

  //mouse events
  const handleMouseClicked = (row, col) => {
    const newGrid = getNewGridWithWeight(grid, row, col);
    setGrid(newGrid);
  };

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

  //clear the grid

  const clearGrid = (visitedNodesInOrder,nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        const node = visitedNodesInOrder[i];
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node";
      };
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        const node = nodesInShortestPathOrder[i];
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node";
      };
      setCursor("Cursor");
    };


   //animate the visited nodes and shortest path
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length ; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node node-visited";
      }, 10 * i);
    }
    setTimeout(() => {
      animateShortestPath(nodesInShortestPathOrder);
    }, 10 * visitedNodesInOrder.length);
    if(clear){
      clearGrid(visitedNodesInOrder,nodesInShortestPathOrder);
    }
  };  

  const animateShortestPath = (nodesInShortestPathOrder) => {
    let distance=0;
    for (let i = 0; i < nodesInShortestPathOrder.length ; i++) {
      const node = nodesInShortestPathOrder[i];
      distance += node.weight;
      setTimeout(() => {
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node node-shortest-path";
      }, 50 * i);
    }
    toast("Total Distance: "+distance+" km");
  };
 //visualize the algorithm
  const visualizeDijkstra = () => {
    const newgrid = grid;
    const startNode = newgrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = newgrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    visitedNodesInOrder = dijkstra(newgrid, startNode, finishNode);
    // console.log(visitedNodesInOrder);
    nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  if (Visualize) {
    if (Algorithm === "Dijkstra") {
      visualizeDijkstra();
    } else if(Algorithm !== null) {
      toast("Coming Soon!");
    }
    else{
      toast("Please Select an Algorithm");
    }
    setVisualize(false);
  }


  return (
    <>
      <div className="grid" id={cursor}>
        {grid.map((row, rowIdx) => (
          <div className="node_row" key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall,isWeight,weight } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  isWeight={isWeight}
                  weight={weight}
                  onMouseClick={(row, col) => handleMouseClicked(row, col)}
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
          theme="dark"
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
    isWeight:false,
    weight:1,
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
  // console.log(newNode);
  return newGrid;
};

const getNewGridWithWeight = (grid, row, col) => {
  if(row===START_NODE_ROW && col===START_NODE_COL) return grid;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const weight = node.weight;
  const newNode = {
    ...node,
    isWeight:true,
    weight:weight+1,
  };
  newGrid[row][col] = newNode;
  console.log(newNode);
  return newGrid;
};
