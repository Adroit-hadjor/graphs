import React, { useState, useEffect } from 'react'
import './navbar.css'
import './board.css'
import { getNodesInShortestPathOrder,search } from '../utils/search'
import { Node } from './node'
import { mazeOne } from '../utils/mazeGrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faCaretDown } from '@fortawesome/free-solid-svg-icons'


const Board = () => {

    const [startNodeRow, setStartNodeRow] = useState(1)
    const [endNodeRow, setEndNodeRow] = useState(18)
    const [startNodeCol, setStartNodeCol] = useState(1)
    const [endNodeCol, setEndNodeCol] = useState(39)
    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [grid, setGrid] = useState([])
    const [isMazeMenuOpen, setisMazeMenuOpen] = useState(false)
    const [isAlgorithmMenuOpen, setisAlgorithmMenuOpen] = useState(false)
    const [_type, setType] = useState('bfs')
    useEffect(() => {
       setGrid(getInitialGrid())
        //setGrid([...mazeOne])
    }, [])

 


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
          isStart: row === startNodeRow && col === startNodeCol,
          isFinish: row === endNodeRow && col === endNodeCol,
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
        return newGrid;
      };
      

    const animateSearch =(visitedNodes, nodesInShortestPathOrder)=> {
        for (let i = 0; i <= visitedNodes.length; i++) {
          if (i === visitedNodes.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodes[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
      const animateShortestPath =(nodesInShortestPath)=>{
        for (let i = 0; i < nodesInShortestPath.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPath[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }


    const handleMouseDown = (row, col) => {
        setGrid(getNewGridWithWallToggled(grid, row, col))
        setMouseIsPressed(true);
    }

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const visualizeGraph =()=>{
        const startNode = grid[startNodeRow][startNodeCol]
        const endNode = grid[endNodeRow][endNodeCol]
        const visitedNodes = search(grid,startNode,endNode,_type)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        animateSearch(visitedNodes, nodesInShortestPathOrder);
    }

    return (
      <>
      <div className='navbar'>
          <div className='startButton nav_btn ' onClick={()=>visualizeGraph()}>Start</div>
          <div  onClick={()=>setisMazeMenuOpen(!isMazeMenuOpen)} className='nav_btn' ><div>Maze Selection</div><div className='caretContainer'><FontAwesomeIcon icon={faCaretDown}  /></div>
          {isMazeMenuOpen ? 
           <div className='nav_submenu'>
               <div onClick={()=>setGrid(getInitialGrid())} className='menu_items'>No maze</div>
               <div onClick={()=>setGrid(mazeOne)} className='menu_items'>Maze One</div>
           </div>
            : <></>}
          </div>
          <div onClick={()=>setisAlgorithmMenuOpen(!isAlgorithmMenuOpen)} className='nav_btn' >Select Algorithm ({`${_type.toUpperCase()}`})<div className='caretContainer'><FontAwesomeIcon icon={faCaretDown}  /></div>
           {isAlgorithmMenuOpen ? 
           <div className='nav_submenu'>
               <div onClick={()=>setType('bfs')} className='menu_items'>BFS</div>
               <div onClick={()=>setType('dfs')} className='menu_items'>DFS</div>
           </div>
            : <></>}
           </div>

          <div className=' nav_btn ' onClick={()=>window.location.reload(true)}>Clear Grid</div>

         
      </div>
      <div className='_body'>
      <div className='board'>
      {grid.map(row => <div className='row'>
          {row.map((node,nodeIdx)=>{
          const { row, col, isFinish, isStart, isWall } = node;
          return(
          <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) =>handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                       handleMouseEnter(row, col)
                      }
                      onMouseUp={() =>handleMouseUp()}
                      row={row} /> )})}
      </div>)}
      </div>
      </div>
     
      </>
    )
}

export default Board