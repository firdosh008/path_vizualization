import React,{Component,useEffect,useState} from 'react'
import Node from './Node/Node.jsx'
import './PathfindingVisualizer.css'


export default function PathfindingVisualizer() {
  
    const [grid,setGrid] = useState([])
    
    const update = () => {
        const grid = []
        for(let row = 0;row < 15;row++){
            const currentRow = []
            for(let col = 0;col < 50;col++){
                currentRow.push([])
            }
            grid.push(currentRow)
        }
        setGrid(grid)
    }
    useEffect(() => {
    update()
    }, [])

  return (
    <div>
    foo
  {grid.map((row, rowIdx) => {
    return (
      <div key={rowIdx}>
        {row.map((node, nodeIdx) => (
          <Node key={nodeIdx}></Node>
        ))}
      </div>
    );
  })}
</div>

  )
}
