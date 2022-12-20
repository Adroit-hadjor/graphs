import React from 'react'
import './node.css'

export const Node = ({...props}) => {
    const {
        col,
        isFinish,
        isStart,
        isWall,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        row,
      } = props;
    const _className = isFinish ? 
     'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';
  return (
    <div
    id={`node-${row}-${col}`}
    className={`node ${_className}`}
    onMouseDown={() => onMouseDown(row, col)}
    onMouseEnter={() => onMouseEnter(row, col)}
    onMouseUp={() => onMouseUp()}>
      {isStart?'Start':isFinish?'End':''}
    </div>
  )
}
