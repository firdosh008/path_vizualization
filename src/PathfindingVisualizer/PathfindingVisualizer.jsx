import React,{useEffect,useState} from 'react'
import './PathfindingVisualizer.css'
import Grid from '../components/Grid/Grid'
import Navbar from '../components/Nav_bar/Navbar'


export default function PathfindingVisualizer() {

  const [grid,setGrid] = useState([])
    
    const update = () => {
        const grid = []
        for(let row = 0;row < 20;row++){
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
        <Navbar></Navbar>
        <Grid grid={grid}></Grid>
    </div>
  )
}
