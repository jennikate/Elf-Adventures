
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

  //create array of objects to say which borders have walls
  const walls = [
    { cellId: 0,  top: true, right: false, bottom: false, left: true },
    { cellId: 1,  top: true, right: false, bottom: true, left: false },
    { cellId: 2,  top: true, right: false, bottom: false, left: false },
    { cellId: 3,  top: true, right: false, bottom: true, left: false },
    { cellId: 4,  top: true, right: true, bottom: false, left: false },
    { cellId: 5,  top: true, right: false, bottom: false, left: true },
    { cellId: 6,  top: true, right: false, bottom: true, left: false },
    { cellId: 7,  top: true, right: false, bottom: false, left: false },
    { cellId: 8,  top: true, right: false, bottom: true, left: false },
    { cellId: 9,  top: true, right: true, bottom: false, left: false },

    { cellId: 10,  top: false, right: true, bottom: false, left: true },
    { cellId: 11,  top: true, right: true, bottom: true, left: true },
    { cellId: 12,  top: false, right: true, bottom: false, left: true },
    { cellId: 13,  top: true, right: true, bottom: true, left: true },
    { cellId: 14,  top: false, right: true, bottom: false, left: true },
    { cellId: 15,  top: false, right: true, bottom: false, left: true },
    { cellId: 16,  top: true, right: true, bottom: true, left: true },
    { cellId: 17,  top: false, right: true, bottom: false, left: true },
    { cellId: 18,  top: true, right: true, bottom: true, left: true },
    { cellId: 19,  top: false, right: true, bottom: false, left: true },

    { cellId: 20,  top: false, right: false, bottom: false, left: true },
    { cellId: 21,  top: true, right: false, bottom: true, left: false },
    { cellId: 22,  top: false, right: false, bottom: false, left: false },
    { cellId: 23,  top: true, right: false, bottom: false, left: false },
    { cellId: 24,  top: false, right: false, bottom: true, left: false },
    { cellId: 25,  top: false, right: false, bottom: true, left: false },
    { cellId: 26,  top: true, right: false, bottom: false, left: false },
    { cellId: 27,  top: false, right: false, bottom: false, left: false },
    { cellId: 28,  top: true, right: false, bottom: true, left: false },
    { cellId: 29,  top: false, right: true, bottom: false, left: false },

    { cellId: 30,  top: false, right: false, bottom: true, left: true },
    { cellId: 31,  top: true, right: false, bottom: true, left: false },
    { cellId: 32,  top: false, right: true, bottom: false, left: false },
    { cellId: 33,  top: false, right: false, bottom: true, left: true },
    { cellId: 34,  top: true, right: true, bottom: false, left: false },
    { cellId: 35,  top: true, right: false, bottom: false, left: true },
    { cellId: 36,  top: false, right: true, bottom: true, left: false },
    { cellId: 37,  top: false, right: false, bottom: false, left: true },
    { cellId: 38,  top: true, right: false, bottom: true, left: false },
    { cellId: 39,  top: false, right: true, bottom: true, left: false },

    { cellId: 40,  top: true, right: false, bottom: true, left: true },
    { cellId: 41,  top: true, right: true, bottom: true, left: false },
    { cellId: 42,  top: false, right: true, bottom: false, left: true },
    { cellId: 43,  top: true, right: false, bottom: false, left: true },
    { cellId: 44,  top: false, right: false, bottom: false, left: false },
    { cellId: 45,  top: false, right: false, bottom: false, left: false },
    { cellId: 46,  top: true, right: true, bottom: false, left: false },
    { cellId: 47,  top: false, right: true, bottom: false, left: true },
    { cellId: 48,  top: true, right: false, bottom: true, left: true },
    { cellId: 49,  top: true, right: true, bottom: true, left: false },

  ]

  for (let i = 0; i < walls.length; i++) {
    const wallKey = Object.keys(walls[i])
    const wallValue = Object.values(walls[i])
    const cellId = '#cell' + walls[i].cellId
    // console.log(cellId)
    const cellLocation = document.querySelector(cellId)
    console.log(cellLocation)
    //check and add border
    if ( walls[i].top === true ) {
      cellLocation.classList.add('wall-top')
    }
    if ( walls[i].right === true ) {
      cellLocation.classList.add('wall-right')
    }
    if ( walls[i].bottom === true ) {
      cellLocation.classList.add('wall-bottom')
    }
    if ( walls[i].left === true ) {
      cellLocation.classList.add('wall-left')
    }


  }

  // //create wall array for index of top walls (class wall-top, sets border=top)
  // const wallsTop = [
  //   0,1,2,3,4,5,6,7,8,9,
  //   11,13,16,18,
  //   21,23,26,28,
  //   31,34,35,38,
  //   40,41,43,46, 48,49,
  //   50,51,58,59,
  //   64,65,
  //   74,75,
  //   81,83,86,88,
  //   94,95]
  // for (let i = 0; i < wallsTop.length; i++) {
  //   const cellId = '#cell' + wallsTop[i]
  //   const cellLocation = document.querySelector(cellId)
  //   cellLocation.classList.add('wall-top')
  // }

  // //create wall array for index of left walls (class wall-left, sets border-left)
  // const wallsLeft = [
  //   0,5,
  //   10,11,12,13,14,15,16,17,18,19,
  //   20,
  //   30,33,35,37,
  //   40,42,43,47,48,
  //   54,56,
  //   60,63,67,
  //   70,75,
  //   80,82,88,
  //   90]
  // for (let i = 0; i < wallsLeft.length; i++) {
  //   const cellId = '#cell' + wallsLeft[i]
  //   const cellLocation = document.querySelector(cellId)
  //   cellLocation.classList.add('wall-left')
  // }

  // //create wall array for index of right walls (class wall-right, sets border-right)
  // const wallsRight = [
  //   4,9,
  //   10,11,12,13,14,15,16,17,18,19,
  //   29,
  //   32,34,36,39,
  //   41,42,46,47,49,
  //   53,55,
  //   62,66,69,
  //   74,79,
  //   81,87,89,
  //   99]
  // for (let i = 0; i < wallsRight.length; i++) {
  //   const cellId = '#cell' + wallsRight[i]
  //   const cellLocation = document.querySelector(cellId)
  //   cellLocation.classList.add('wall-right')
  // }
  // //create wall array for index of bottom walls (class wall-bottom, sets border-bottom)
  // const wallsBottom = [
  //   1,3,6,8,
  //   11,13,16,18,
  //   21,24,25,28,
  //   30,31,33,36,38,39,
  //   40,41,48,49,
  //   54,55,
  //   64,65,
  //   71,73,76,78,
  //   84,85,
  //   90,91,92,93,94,95,96,97,98,99]
  // for (let i = 0; i < wallsBottom.length; i++) {
  //   const cellId = '#cell' + wallsBottom[i]
  //   const cellLocation = document.querySelector(cellId)
  //   cellLocation.classList.add('wall-bottom')
  // }


}

window.addEventListener('DOMContentLoaded', pacnam)