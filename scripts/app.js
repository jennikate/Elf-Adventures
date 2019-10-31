
function pacnam() {

  // ===== FUNCTIONS =====

  // GAME BOARD
  const boardWidth = 10
  const boardSize = boardWidth ** 2
  //get element from html for where board is to be created
  const grid = document.querySelector('#grid')
  console.log(grid)
  const cells = []
  for ( let i = 0; i < boardSize; i++ ) {
    //create cell
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }


  //(create game board)
  // set width to level number * 5 [might change 5 to another number later]
  // create array of (wall positions)
  // loop to (width ** 2)
  // create div with class of cell
  // if div[index] === wall position then set class wall
  // attach to gameboard div

  //(wall positions)
  // *** needs thought on what the grid would look like and then translate that back to linear indexes ***
  // *** thinking static for MVP and designed for up to level [x] ***
  // array of arrays so can see horizontal and vertical
  // create array of wall positions with list of indexes for where the wall goes



}

window.addEventListener('DOMContentLoaded', pacnam)