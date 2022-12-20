export const search=(grid,startNode,finishNode,_type)=>{
startNode.distance=0
const visitedNodes = []
const unvisited = getAllNodes(grid)
while(unvisited.length!=0){
    let sortedUnvisitedList = sortNodesByDistance(unvisited,_type)
    const currentNode = _type=='bfs' ? sortedUnvisitedList.shift() : sortedUnvisitedList.pop()
    if (currentNode.isWall) continue;

    if(currentNode.distance==Infinity) return visitedNodes;
    currentNode.isVisited=true
    visitedNodes.push(currentNode)
    if(currentNode == finishNode) return visitedNodes
    updateVisitedNodes(currentNode,grid,_type)


}
}

function sortNodesByDistance(unvisitedNodes,_type) {
  return _type=='bfs'? unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance) :unvisitedNodes.sort((nodeA, nodeB) => -nodeA.distance + nodeB.distance) ;
}


const getUnvisitedNodes =(node,grid)=>{
  const {row,col} = node
const neighbors = []

if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
if (col > 0) neighbors.push(grid[row][col - 1]);
if (row > 0) neighbors.push(grid[row - 1][col]);
if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);



return neighbors.filter(neighbor => !neighbor.isVisited);

}

const updateVisitedNodes =(node,grid,_type)=>{
    const unvisitedNeighbors = getUnvisitedNodes(node, grid);
    let count = node.distance
    for (const neighbor of unvisitedNeighbors){
      neighbor.distance = node.distance + (_type=='bfs' ? 1 : count);
      count++
      neighbor.previousNode = node;
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }


  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }