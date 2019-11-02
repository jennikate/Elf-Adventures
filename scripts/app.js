

function pacnam() {




  // ===== CREATE STARTING VALUES =====

  const boardWidth = 10
  const boardSize = boardWidth ** 2
  const playerHome = Math.max(boardSize) - 1
  const cells = [] //declare so can push cell ids to it


  // ===== CREATE VARIABLES FOR ADJUSTING CELLS =====
  // these should only exist within their function and not be used cross function

  let cellIdRef = ''
  let cellElement = 0

  let playerDirection = ''
  // let playerMoveCal = 0
  let nextCellId
  let playerScore = 0
  let playerLives = 3

  let enemyState = 'deadly'
  let enemyHome = 54
  let enemyArrayIndex



  // ==== GET ELEMENTS TO USE ====

  const grid = document.querySelector('#grid') //position on html to create the cells
  //const playerElement = document.querySelector('.player') declaring in the function, check if that's best way

  //get cell element from refNumber
  function getCellElement(numRef) {
    cellIdRef = '#cell-' + numRef
    cellElement = document.querySelector(cellIdRef)
    return cellElement
  }

  // //get enemy home cell Id
  // function getEnemyHome(enemyId) {
  //   const enemyHome = enemies[enemyId].homeId
  //   return enemyHome
  // }



  // DECLARE WALL POSITIONS
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

  //DECLARE TREASURE BOXES & WEAPONS
  const treasureBoxes = [12, 39, 75, 90] //this can be randomised later
  const weapons = [42, 66] //this can be randomised later

  //DECLARE ENEMY DETAILS
  //create array of objects to set enemy home position, name, and movement pattern
  const enemies = [
    { enemyId: 0, homeId: 54, location: 54 },
    { enemyId: 1, homeId: 45, location: 45 },
    { enemyId: 2, homeId: 55, location: 55 }
  ]

  //DECLARE DIRECTION CALCULATIONS
  const directions = [
    { direction: 'top', mathType: '-', mathAmount: boardWidth },
    { direction: 'right', mathType: '+', mathAmount: 1 },
    { direction: 'bottom', mathType: '+', mathAmount: boardWidth },
    { direction: 'left', mathType: '-', mathAmount: 1 }
  ]
  const doMath = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y }
  }


  // ===== SETUP BOARD & PLACE ITEMS =====

  // GAME BOARD 
  function createBoard() {
    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('id', 'cell-' + [i])
      grid.appendChild(cell)
      cell.innerHTML = [i]
      cells.push(cell)
    }
    //add walls based on the wall array
    makeWalls()
  }


  // MAKE WALLS
  // called by createBoard
  function makeWalls() {
    for (let i = 0; i < walls.length; i++) {
      //get the cell that relates to this wall
      getCellElement(walls[i].cellId)
      //check the array to see what borders are needed and add them
      if (walls[i].top === true) {
        cellElement.classList.add('wall-top')
      }
      if (walls[i].right === true) {
        cellElement.classList.add('wall-right')
      }
      if (walls[i].bottom === true) {
        cellElement.classList.add('wall-bottom')
      }
      if (walls[i].left === true) {
        cellElement.classList.add('wall-left')
      }
    }
  }


  // SET TREASURE CHESTS
  //future version these appear in random places at start of game
  function addTreasureChests() {
    //called by start game 
    for (let i = 0; i < treasureBoxes.length; i++) {
      getCellElement(treasureBoxes[i])
      cellElement.classList.add('treasure-chest')
    }
  }

  // SET WEAPONS
  //future version these appear and disappear based on timers
  function addWeapons() {
    //called by start game (will be on timer later)
    for (let i = 0; i < weapons.length; i++) {
      getCellElement(weapons[i])
      cellElement.classList.add('weapon')
    }
  }

  // START ENEMY AT HOME
  function enemiesHome() {
    for (let i = 0; i < enemies.length; i++) {
      getCellElement(enemies[i].homeId)
      cellElement.classList.add('enemy')
      // cellElement.setAttribute('enemy-id', (enemies[i].enemyId))
    }
  }

  // ==== TOKEN MOVES ====
  function moveTokens(currentCellElement, className, nextCellId) {

    currentCellElement.classList.remove(className)
    getCellElement(nextCellId)
    cellElement.classList.add(className)
  }

  // ===== SEND PLAYER HOME =====

  function sendPlayerHome(cellElement) {
    cellElement.classList.remove('player')
    document.querySelector(`#cell-${playerHome}`).classList.add('player')
    playerLives = playerLives - 1
    document.querySelector('#player-lives span').innerHTML = playerLives
  }

  // ===== KILL ENEMY =====
  


  // ===== CELL ACTIONS ON PLAYER MOVE =====

  function trackPlayerMove() {
    document.addEventListener('keyup', (e) => {
      //get cellId of current player cell
      const className = 'player'
      const currentCellElement = document.querySelector('.player')
      const cellIdName = currentCellElement.id
      const cellIdArr = cellIdName.split('-')
      const cellIdNum = parseInt(cellIdArr[1])
      const currentCellClasslist = currentCellElement.classList

      //get actions
      if (e.key === 'w' || e.key === 'W') {
        playerDirection = 'top'
        nextCellId = cellIdNum - boardWidth
      } else if (e.key === 'd' || e.key === 'D') {
        playerDirection = 'right'
        nextCellId = cellIdNum + 1
      } else if (e.key === 's' || e.key === 'S') {
        playerDirection = 'bottom'
        nextCellId = cellIdNum + boardWidth
      } else if (e.key === 'a' || e.key === 'A') {
        playerDirection = 'left'
        nextCellId = cellIdNum - 1
      } else {
        return
      }

      //WALL
      if (currentCellClasslist.contains(`wall-${playerDirection}`) === true) {
        return
      } else {
        moveTokens(currentCellElement, className, nextCellId)
        //get new cell classlist
        getCellElement(nextCellId)
        const thisClasslist = cellElement.classList

        //KILLABLE ENEMY
        if (thisClasslist.contains('enemy-killable')) {
          console.log('enemy killable')
          //get the enemies index of this guy
          //get his cell id
          const enemyLocation = document.querySelector('.player')
          const enemyLocationId = parseInt(((enemyLocation.id).split('-'))[1])
          enemyArrayIndex = enemies.findIndex(e => e.location === enemyLocationId)
          console.log(enemyArrayIndex)
          sendEnemyHome(enemyLocation, enemyArrayIndex)

          //DEADLY ENEMY
        } else
        if (thisClasslist.contains('enemy')) {
          console.log('enemy')
          sendPlayerHome(cellElement)
          //WEAPON
        } else if (thisClasslist.contains('weapon')) {
          console.log('weapon')
          document.querySelector('#notification').innerHTML = 'You have a sword, kill the dragons!'
          //turn enemies killable
          const allEnemyLoc = document.querySelectorAll('.enemy')
          for (let i = 0; i < allEnemyLoc.length; i++) {
            allEnemyLoc[i].classList.remove('enemy')
            allEnemyLoc[i].classList.add('enemy-killable')
            enemyState = 'killable'
          }
          //clear weapons from board
          const allWeapons = document.querySelectorAll('.weapon')
          for (let i = 0; i < allWeapons.length; i++) {
            allWeapons[i].classList.remove('weapon')
          }

          //TREASURE
        } else if (thisClasslist.contains('treasure-chest')) {
          console.log('treasure-chest')
          playerScore = playerScore + 1000
          document.querySelector('#player-score span').innerHTML = playerScore
          thisClasslist.remove('treasure-chest')
        }
        //MOVE ENEMY
        enemyMove()
      }
    })
  }




  // ===== CELL ACTIONS ON ENEMY MOVE =====
  //start with attempting to move down, this can be adjusted later
  // let myDirection = 'bottom'
  // const directionChoice = ['wall-top', 'wall-right', 'wall-bottom', 'wall-left']

  function enemyMove() {
    let enemyList = []

    //get all enemy locations
    enemyList = enemies.map(elem => {
      return elem.location
    })
    //get the classlist for enemy cells
    enemyList.forEach(elem => {
      //get my enemies array value
      enemyArrayIndex = enemies.findIndex(e => e.location === elem)
      // console.log(enemyArrayIndex)
      const enemiesInCells = []

      //get walls from this cell, and remove from the usable cells array
      const myWalls = document.querySelector(('#cell-' + elem)).classList
      // enemiesInCell[0] = me
      if (!myWalls.contains('wall-top')) { enemiesInCells.push(elem - 10) }
      if (!myWalls.contains('wall-right')) { enemiesInCells.push(elem + 1) }
      if (!myWalls.contains('wall-bottom')) { enemiesInCells.push(elem + 10) }
      if (!myWalls.contains('wall-left')) { enemiesInCells.push(elem - 1) }
      // console.log(enemiesInCells)

      //remove the enemy cells
      const usableCells = []
      enemiesInCells.forEach(item => {
        if ((document.querySelector(('#cell-' + item)).classList).contains('enemy')) {
          return
        } else {
          usableCells.push(item)
        }
      })

      if (usableCells.length === 0) {
        nextCellId = elem
      } else {
        nextCellId = usableCells[Math.floor(Math.random() * usableCells.length)]
      }
      // console.log(nextCellId)

      //get cellElement for originating cell
      cellElement = document.querySelector('#cell-' + elem)

      if (enemyState === 'killable') {
        if (cellElement.classList.contains('player')) {
          sendEnemyHome(cellElement, enemyArrayIndex)
        } else {
          moveTokens(cellElement, 'enemy-killable', nextCellId)
          enemies[enemyArrayIndex].location = nextCellId
        }
      } else {
        moveTokens(cellElement, 'enemy', nextCellId)
        enemies[enemyArrayIndex].location = nextCellId
        if (cellElement.classList.contains('player')) { sendPlayerHome(cellElement) }
      }
    })
  }


  function sendEnemyHome(cellElement, enemyArrayIndex) {
    // console.log(cellElement, enemyArrayIndex)
    //send enemy home
    cellElement.classList.remove('enemy-killable')
    document.querySelector(`#cell-${enemyHome}`).classList.add('enemy-killable')
    enemies[enemyArrayIndex].location = enemyHome
    playerScore = playerScore + 10
    document.querySelector('#player-score span').innerHTML = playerScore
  }


  // ===== CREATE! =====
  createBoard()

  //start game assets
  addTreasureChests()
  enemiesHome()
  //set first player location
  document.querySelector(`#cell-${playerHome}`).classList.add('player')
  //watch for movement
  trackPlayerMove()

  //start timed assets
  setTimeout(addWeapons(), 500)



}

window.addEventListener('DOMContentLoaded', pacnam)