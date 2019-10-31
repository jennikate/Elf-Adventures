
function pacnam() {

  // ===== CREATE STARTING VALUES =====

  const boardWidth = 10
  const boardSize = boardWidth ** 2
  const cells = [] //declare so can push cell ids to it

  const cellId = 0 //setup so we can find the id and use it in various places
  let cellName = ''
  let cellLocation = 0 //setup so we can push the id of the cell we're looking for to it

  const playerHome = boardSize - 1 //get bottom right most cell
  let playerLocation = 0 //so we can find and move them



  // WALLS
  //create array of objects to say which borders have walls
  const walls = [
    { cellId: 0, top: true, right: false, bottom: false, left: true },
    { cellId: 1, top: true, right: false, bottom: true, left: false },
    { cellId: 2, top: true, right: false, bottom: false, left: false },
    { cellId: 3, top: true, right: false, bottom: true, left: false },
    { cellId: 4, top: true, right: true, bottom: false, left: false },
    { cellId: 5, top: true, right: false, bottom: false, left: true },
    { cellId: 6, top: true, right: false, bottom: true, left: false },
    { cellId: 7, top: true, right: false, bottom: false, left: false },
    { cellId: 8, top: true, right: false, bottom: true, left: false },
    { cellId: 9, top: true, right: true, bottom: false, left: false },

    { cellId: 10, top: false, right: true, bottom: false, left: true },
    { cellId: 11, top: true, right: true, bottom: true, left: true },
    { cellId: 12, top: false, right: true, bottom: false, left: true },
    { cellId: 13, top: true, right: true, bottom: true, left: true },
    { cellId: 14, top: false, right: true, bottom: false, left: true },
    { cellId: 15, top: false, right: true, bottom: false, left: true },
    { cellId: 16, top: true, right: true, bottom: true, left: true },
    { cellId: 17, top: false, right: true, bottom: false, left: true },
    { cellId: 18, top: true, right: true, bottom: true, left: true },
    { cellId: 19, top: false, right: true, bottom: false, left: true },

    { cellId: 20, top: false, right: false, bottom: false, left: true },
    { cellId: 21, top: true, right: false, bottom: true, left: false },
    { cellId: 22, top: false, right: false, bottom: false, left: false },
    { cellId: 23, top: true, right: false, bottom: false, left: false },
    { cellId: 24, top: false, right: false, bottom: true, left: false },
    { cellId: 25, top: false, right: false, bottom: true, left: false },
    { cellId: 26, top: true, right: false, bottom: false, left: false },
    { cellId: 27, top: false, right: false, bottom: false, left: false },
    { cellId: 28, top: true, right: false, bottom: true, left: false },
    { cellId: 29, top: false, right: true, bottom: false, left: false },

    { cellId: 30, top: false, right: false, bottom: true, left: true },
    { cellId: 31, top: true, right: false, bottom: true, left: false },
    { cellId: 32, top: false, right: true, bottom: false, left: false },
    { cellId: 33, top: false, right: false, bottom: true, left: true },
    { cellId: 34, top: true, right: true, bottom: false, left: false },
    { cellId: 35, top: true, right: false, bottom: false, left: true },
    { cellId: 36, top: false, right: true, bottom: true, left: false },
    { cellId: 37, top: false, right: false, bottom: false, left: true },
    { cellId: 38, top: true, right: false, bottom: true, left: false },
    { cellId: 39, top: false, right: true, bottom: true, left: false },

    { cellId: 40, top: true, right: false, bottom: true, left: true },
    { cellId: 41, top: true, right: true, bottom: true, left: false },
    { cellId: 42, top: false, right: true, bottom: false, left: true },
    { cellId: 43, top: true, right: false, bottom: false, left: true },
    { cellId: 44, top: false, right: false, bottom: false, left: false },
    { cellId: 45, top: false, right: false, bottom: false, left: false },
    { cellId: 46, top: true, right: true, bottom: false, left: false },
    { cellId: 47, top: false, right: true, bottom: false, left: true },
    { cellId: 48, top: true, right: false, bottom: true, left: true },
    { cellId: 49, top: true, right: true, bottom: true, left: false },

    { cellId: 50, top: true, right: false, bottom: true, left: false },
    { cellId: 51, top: true, right: false, bottom: true, left: false },
    { cellId: 52, top: false, right: false, bottom: false, left: false },
    { cellId: 53, top: false, right: true, bottom: false, left: false },
    { cellId: 54, top: false, right: false, bottom: true, left: true },
    { cellId: 55, top: false, right: true, bottom: true, left: false },
    { cellId: 56, top: false, right: false, bottom: false, left: true },
    { cellId: 57, top: false, right: false, bottom: false, left: false },
    { cellId: 58, top: true, right: false, bottom: true, left: false },
    { cellId: 59, top: true, right: false, bottom: true, left: false },

    { cellId: 60, top: true, right: false, bottom: false, left: true },
    { cellId: 61, top: true, right: false, bottom: false, left: false },
    { cellId: 62, top: false, right: true, bottom: false, left: false },
    { cellId: 63, top: false, right: false, bottom: false, left: true },
    { cellId: 64, top: true, right: false, bottom: true, left: false },
    { cellId: 65, top: true, right: false, bottom: true, left: false },
    { cellId: 66, top: false, right: true, bottom: false, left: false },
    { cellId: 67, top: false, right: false, bottom: false, left: true },
    { cellId: 68, top: true, right: false, bottom: false, left: false },
    { cellId: 69, top: true, right: true, bottom: false, left: false },

    { cellId: 70, top: false, right: false, bottom: false, left: true },
    { cellId: 71, top: false, right: false, bottom: true, left: false },
    { cellId: 72, top: false, right: false, bottom: false, left: false },
    { cellId: 73, top: false, right: false, bottom: true, left: false },
    { cellId: 74, top: true, right: true, bottom: false, left: false },
    { cellId: 75, top: true, right: false, bottom: false, left: true },
    { cellId: 76, top: false, right: false, bottom: true, left: false },
    { cellId: 77, top: false, right: false, bottom: false, left: false },
    { cellId: 78, top: false, right: false, bottom: true, left: false },
    { cellId: 79, top: false, right: true, bottom: false, left: false },

    { cellId: 80, top: false, right: false, bottom: false, left: true },
    { cellId: 81, top: true, right: true, bottom: false, left: false },
    { cellId: 82, top: false, right: false, bottom: false, left: true },
    { cellId: 83, top: true, right: false, bottom: false, left: false },
    { cellId: 84, top: false, right: false, bottom: true, left: false },
    { cellId: 85, top: false, right: false, bottom: true, left: false },
    { cellId: 86, top: true, right: false, bottom: false, left: false },
    { cellId: 87, top: false, right: true, bottom: false, left: false },
    { cellId: 88, top: true, right: false, bottom: false, left: true },
    { cellId: 89, top: false, right: true, bottom: false, left: false },

    { cellId: 90, top: false, right: false, bottom: true, left: true },
    { cellId: 91, top: false, right: false, bottom: true, left: false },
    { cellId: 92, top: false, right: false, bottom: true, left: false },
    { cellId: 93, top: false, right: false, bottom: true, left: false },
    { cellId: 94, top: true, right: false, bottom: true, left: false },
    { cellId: 95, top: true, right: false, bottom: true, left: false },
    { cellId: 96, top: false, right: false, bottom: true, left: false },
    { cellId: 97, top: false, right: false, bottom: true, left: false },
    { cellId: 98, top: false, right: false, bottom: true, left: false },
    { cellId: 99, top: false, right: true, bottom: true, left: false }
  ]



  // ===== FUNCTIONS =====

  // FIND THE CELL TO DO SOMETHING WITH


  // GAME BOARD 
  function createBoard() {
    //get element from html for where board is to be created
    const grid = document.querySelector('#grid')
    //create the cells, append, and store in array
    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('id', 'cell' + [i])
      grid.appendChild(cell)
      cells.push(cell)
    }
    makeWalls()
  }

  // MAKE WALLS
  // called by createBoard
  function makeWalls() {
    for (let i = 0; i < walls.length; i++) {
      //get the cell ID so we can assign things to it
      cellName = '#cell' + walls[i].cellId
      cellLocation = document.querySelector(cellName)
      //check the array to see what borders are needed and add them
      if (walls[i].top === true) {
        cellLocation.classList.add('wall-top')
      }
      if (walls[i].right === true) {
        cellLocation.classList.add('wall-right')
      }
      if (walls[i].bottom === true) {
        cellLocation.classList.add('wall-bottom')
      }
      if (walls[i].left === true) {
        cellLocation.classList.add('wall-left')
      }
    }
  }

  function changePlayerLocation(newCellId) {
    // console.log(cellName)
    // console.log(cellId)
    // console.log(newCellId)
    cellLocation = document.querySelector(cellName)
    cellLocation.classList.remove('player')

    cellName = '#cell' + newCellId
    cellLocation = document.querySelector(cellName)
    cellLocation.classList.add('player')
    playerLocation = newCellId
    // console.log(playerLocation)
    return playerLocation
  }

  function sendPlayerHome() {
    changePlayerLocation(playerHome)
  }


  // ===== CONTROLS =====
  //start button
  const startGame = document.querySelector('#start')
  startGame.addEventListener('click', () => {
    sendPlayerHome()
  })

  //player movement
  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'w': {
        //get classes from the cell I'm in
        const classesCurrentCell = document.querySelector(cellName).classList
        console.log(classesCurrentCell)
        // if there is a wall in the direction I'm trying to move, don't let me move
        if (classesCurrentCell.contains('wall-top')) {
          console.log('blocked')
          return
        } else {
          console.log('move')
        }
        //get the cell I'm trying to move into (for other collisons)
        // const classesNewCell = document.querySelector(cellName).classList
        //move the player
        const cellMoveDirection = (playerLocation - boardWidth)
        console.log(cellMoveDirection)
        changePlayerLocation(cellMoveDirection)
        break
      }
      case 'd': {
        //get classes from the cell I'm in
        const classesCurrentCell = document.querySelector(cellName).classList
        console.log(classesCurrentCell)
        // if there is a wall in the direction I'm trying to move, don't let me move
        if (classesCurrentCell.contains('wall-right')) {
          console.log('blocked')
          return
        } else {
          console.log('move')
        }
        //get the cell I'm trying to move into (for other collisons)
        // const classesNewCell = document.querySelector(cellName).classList
        //move the player
        const cellMoveDirection = (playerLocation + 1)
        console.log(cellMoveDirection)
        changePlayerLocation(cellMoveDirection)
        break
      }
      case 's': {
        //get classes from the cell I'm in
        const classesCurrentCell = document.querySelector(cellName).classList
        console.log(classesCurrentCell)
        // if there is a wall in the direction I'm trying to move, don't let me move
        if (classesCurrentCell.contains('wall-bottom')) {
          console.log('blocked')
          return
        } else {
          console.log('move')
        }
        //get the cell I'm trying to move into (for other collisons)
        // const classesNewCell = document.querySelector(cellName).classList
        //move the player
        const cellMoveDirection = (playerLocation + boardWidth)
        console.log(cellMoveDirection)
        changePlayerLocation(cellMoveDirection)
        break
      }
      case 'a': {
        //get classes from the cell I'm in
        const classesCurrentCell = document.querySelector(cellName).classList
        console.log(classesCurrentCell)
        // if there is a wall in the direction I'm trying to move, don't let me move
        if (classesCurrentCell.contains('wall-left')) {
          console.log('blocked')
          return
        } else {
          console.log('move')
        }
        //get the cell I'm trying to move into (for other collisons)
        // const classesNewCell = document.querySelector(cellName).classList
        //move the player
        const cellMoveDirection = (playerLocation -1 )
        console.log(cellMoveDirection)
        changePlayerLocation(cellMoveDirection)
        break
      }
    }
  })

  // ===== CREATE! =====
  createBoard()



}

window.addEventListener('DOMContentLoaded', pacnam)