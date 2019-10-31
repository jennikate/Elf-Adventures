
function pacnam() {

  // ===== FUNCTIONS =====

  // GAME BOARD
  const boardWidth = 10
  const boardSize = boardWidth ** 2
  //get element from html for where board is to be created
  const grid = document.querySelector('#grid')
  //create the cells, append, and store in array
  const cells = []
  for (let i = 0; i < boardSize; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', 'cell'+[i])
    grid.appendChild(cell)
    cells.push(cell)
  }

  // WALLS
  // CAN PROBABLY MAKE A FUNCTION FOR THE LOOP THAT CALLS THE ARRAYS, PERHAPS : THINK ABOUT IT
  //create wall array for index of top walls (class wall-top, sets border=top)
  const wallsTop = [
    0,1,2,3,4,5,6,7,8,9,
    11,13,16,18,
    21,23,26,28,
    31,34,35,38,
    40,41,43,46, 48,49,
    50,51,58,59,
    64,65,
    74,75,
    81,83,86,88,
    94,95]
  for (let i = 0; i < wallsTop.length; i++) {
    const cellId = '#cell' + wallsTop[i]
    const cellLocation = document.querySelector(cellId)
    cellLocation.classList.add('wall-top')
  }

  //create wall array for index of left walls (class wall-left, sets border-left)
  const wallsLeft = [
    0,5,
    10,11,12,13,14,15,16,17,18,19,
    20,
    30,33,35,37,
    40,42,43,47,48,
    54,56,
    60,63,67,
    70,75,
    80,82,88,
    90]
  for (let i = 0; i < wallsLeft.length; i++) {
    const cellId = '#cell' + wallsLeft[i]
    const cellLocation = document.querySelector(cellId)
    cellLocation.classList.add('wall-left')
  }

  //create wall array for index of right walls (class wall-right, sets border-right)
  const wallsRight = [
    4,9,
    10,11,12,13,14,15,16,17,18,19,
    29,
    32,34,36,39,
    41,42,46,47,49,
    53,55,
    62,66,69,
    74,79,
    81,87,89,
    99]
  for (let i = 0; i < wallsRight.length; i++) {
    const cellId = '#cell' + wallsRight[i]
    const cellLocation = document.querySelector(cellId)
    cellLocation.classList.add('wall-right')
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