import Node from '../Node/Node.jsx'
import './Grid.css'

export default function grid(props) {
  return (
       <div className='grid'>
  {props.grid.map((row, rowIdx) => {
    return (
      <div className='node_row' key={rowIdx}>
        {row.map((node, nodeIdx) => (
          <Node key={nodeIdx}></Node>
        ))}
      </div>
    );
  })}
</div> 

  )
}
