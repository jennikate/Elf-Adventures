
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



  // ==== GET ELEMENTS TO USE ====

  const grid = document.querySelector('#grid') //position on html to create the cells
  //const playerElement = document.querySelector('.player') declaring in the function, check if that's best way

  //get cell element from refNumber
  function getCellElement(numRef) {
    cellIdRef = '#cell-' + numRef
    cellElement = document.querySelector(cellIdRef)
    return cellElement
  }



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
    { enemyId: 0, homeId: 54, moveType: 'smart' },
    { enemyId: 1, homeId: 55, moveType: 'dumb' },
    { enemyId: 2, homeId: 45, moveType: 'average' }
  ]



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
    }
  }

  // ==== TOKEN MOVES ====
  function moveTokens(currentCellElement, className, nextCellId) {

    //remove class from original cell
    currentCellElement.classList.remove(className)

    //get element for cell moving into & all class
    getCellElement(nextCellId)
    cellElement.classList.add(className)
  }



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

      //check for WALL COLLISION
      if (currentCellClasslist.contains(`wall-${playerDirection}`) === true) {
        return
      } else {
        moveTokens(currentCellElement, className, nextCellId)
        //get new cell classlist
        getCellElement(nextCellId)
        const thisClasslist = cellElement.classList
        if (thisClasslist.contains('enemy') && thisClasslist.contains('killable')) {
          console.log('enemy killable')
        } else if (thisClasslist.contains('enemy')) {
          console.log('enemy')
        } else if (thisClasslist.contains('weapon')) {
          console.log('weapon')
        } else if (thisClasslist.contains('treasure-chest')) {
          console.log('treasure-chest')
          playerScore = playerScore + 1000
          document.querySelector('#player-score span').innerHTML = playerScore
          thisClasslist.remove('treasure-chest')
        } 
      }
    })
  }


  // ===== COLLISION ACTIONS =====

    // function 

  // // ===== PLAYER ACTIONS =====


  // // AWARD TREASURE
  // function collectTreasure(playerMove) {
  //   //called by player movement
  //   treasureCellName = '#cell' + playerMove
  //   treasureLocation = document.querySelector(treasureCellName)
  //   if (treasureLocation.classList.contains('treasure-chest')) {
  //     playerScore = playerScore + 1000
  //     document.querySelector('#player-score span').innerHTML = playerScore
  //     treasureLocation.classList.remove('treasure-chest')
  //   }
  // }

  // // ACTIVATE WEAPON
  // function collectWeapon(playerMove) {
  //   //called by player movement
  //   weaponCellName = '#cell' + playerMove
  //   weaponLocation = document.querySelector(weaponCellName)
  //   if (weaponLocation.classList.contains('weapon')) {
  //     document.querySelector('#notification').innerHTML = 'You have a sword, kill the dragons!'
  //     //turn all enemies into killable
  //     const allEnemyLoc = document.querySelectorAll('.enemy')
  //     for (let i = 0; i < allEnemyLoc.length; i++) {
  //       allEnemyLoc[i].classList.add('killable')
  //     }
  //     //clear weapons from board
  //     const allWeapons = document.querySelectorAll('.weapon')
  //     for (let i = 0; i < allWeapons.length; i++) {
  //       allWeapons[i].classList.remove('weapon')
  //     }
  //   }
  // }

  // // ENEMY COLLISION
  // function enemyAttack(playerMove) {
  //   //called by player movement
  //   enemyCellName = '#cell' + playerMove //is the player cell
  //   // console.log('enemycell' + enemyCellName)
  //   enemyLocation = document.querySelector(enemyCellName) //gets nothing
  //   // console.log('enemyloc' + enemyLocation)
  //   const enemyIdFromHTML = enemyLocation.getAttribute('enemy-id') //is null
  //   // console.log('enemyid' + enemyIdFromHTML)



  //   //look first for a killable enemy
  //   if (enemyLocation.classList.contains('killable')) {
  //     playerScore = playerScore + 10
  //     document.querySelector('#player-score span').innerHTML = playerScore

  //     //remove enemy class from this cell class
  //     // console.log(enemyLocation.classList)
  //     enemyLocation.classList.remove('killable')
  //     enemyLocation.classList.remove('enemy')
  //     enemyLocation.removeAttribute('enemy-id')

  //     //send this enemy home
  //     cellName = '#cell' + (enemies[enemyIdFromHTML]).homeId
  //     enemyLocation = document.querySelector(enemyCellName)
  //     document.querySelector(cellName).classList.add('enemy')
  //     document.querySelector(cellName).classList.add('killable')
  //     //set the enemyId attribute
  //     enemyLocation.setAttribute('enemy-id', enemies[enemyIdFromHTML].enemyId)
  //     //update enemystatus
  //     return enemyKilled = true



  //   } else {
  //     //if not killable then look for if the enemy is there
  //     if (enemyLocation.classList.contains('enemy')) {
  //       //send player to their home location
  //       changePlayerLocation(playerHome)
  //       playerLives = playerLives - 1
  //       document.querySelector('#player-lives span').innerHTML = playerLives
  //     }
  //   }
  // }


  // // ===== CONTROLS =====
  // //start game
  // const startGame = document.querySelector('#start')
  // startGame.addEventListener('click', () => {
  //   //set lives
  //   document.querySelector('#player-lives span').innerHTML = playerLives
  //   //add treasure chests
  //   addTreasureChests()
  //   //add weapons (in future will start rolling weapon timers)
  //   addWeapons()
  //   //start enemy at their home location
  //   enemiesHome(enemies) //send their home array
  //   //start player at their home location
  //   changePlayerLocation(playerHome)
  // })

  // //player movement
  // document.addEventListener('keyup', (e) => {

  //   switch (e.key) {
  //     // if there is a wall in the direction I'm trying to move, don't let me move, else move me appropriately
  //     case 'w': {
  //       console.log(enemyKilled)
  //       playerMove = playerLocation - boardWidth
  //       playerDirection = 'top'
  //       if (playerClasses.contains(`wall-${playerDirection}`) === true) {
  //         return
  //       } else {
  //         collectTreasure(playerMove) //activates if treasure on square, if not does nothing
  //         collectWeapon(playerMove) //activates if weapon on square, if not does nothing
  //         changePlayerLocation(playerMove)
  //         enemyAttack(playerMove) //activates if player moves into an unkillable enemy, has to be last as it moves the player automatically after they move themselves
  //         changeEnemyPosition(playerDirection)
  //       }
  //       break
  //     }
  //     case 'd': {
  //       playerMove = playerLocation + 1
  //       playerDirection = 'right'
  //       if (playerClasses.contains(`wall-${playerDirection}`) === true) {
  //         return
  //       } else {
  //         collectTreasure(playerMove) //activates if treasure on square, if not does nothing
  //         collectWeapon(playerMove) //activates if weapon on square, if not does nothing
  //         changePlayerLocation(playerMove)
  //         enemyAttack(playerMove) //activates if player moves into an unkillable enemy
  //         changeEnemyPosition(playerDirection)
  //       }
  //       break
  //     }
  //     case 's': {
  //       playerMove = playerLocation + boardWidth
  //       playerDirection = 'bottom'
  //       if (playerClasses.contains(`wall-${playerDirection}`) === true) {
  //         return
  //       } else {
  //         collectTreasure(playerMove) //activates if treasure on square, if not does nothing
  //         collectWeapon(playerMove) //activates if weapon on square, if not does nothing
  //         changePlayerLocation(playerMove)
  //         enemyAttack(playerMove) //activates if player moves into an unkillable enemy
  //         changeEnemyPosition(playerDirection)
  //       }
  //       break
  //     }
  //     case 'a': {
  //       playerMove = playerLocation - 1
  //       playerDirection = 'left'
  //       if (playerClasses.contains(`wall-${playerDirection}`) === true) {
  //         return
  //       } else {
  //         collectTreasure(playerMove) //activates if treasure on square, if not does nothing
  //         collectWeapon(playerMove) //activates if weapon on square, if not does nothing
  //         changePlayerLocation(playerMove)
  //         enemyAttack(playerMove) //activates if player moves into an unkillable enemy
  //         changeEnemyPosition(playerDirection)
  //       }
  //       break
  //     }
  //   }
  // })

  // //enemy movement
  // //each enemy has it's own movement pattern
  // //enemiesHome[0] : - always moves towards player unless there is a wall, then it goes (top, bottom, left, right)
  // //enemiesHome[1] - makes first move towards player, then continues in that direction until it hits a wall, then it moves towards player again
  // //enemiesHome[2] - makes first move towards player, second move towards player, then continues in that direction until it hits a wall, then it moves towards players again

  // //assign enemies their movement patterns
  // // on player move move enemy0 one space in prefered direction

  // function changeEnemyPosition(direction) {

  //   //get enemy position
  //   let enemyPosition = enemies[0].locateId
  //   // console.log(enemyPosition)
  //   enemyCellName = '#cell' + enemyPosition


  //   //clear original location
  //   enemyLocation = document.querySelector(enemyCellName) //this is the cell I'm coming from
  //   enemyLocation.classList.remove('enemy') //remove the enemy from that cell
  //   const isKillableTrue = enemyLocation.classList.contains('killable')

  //   if (isKillableTrue === true) {
  //     enemyLocation.classList.remove('killable') //removes killable class in case it was there
  //   }

  //   switch (direction) {
  //     //set to move opposite of player move
  //     case 'top': enemyPosition = enemyPosition + boardWidth; break
  //     case 'right': enemyPosition = enemyPosition - 1; break
  //     case 'bottom': enemyPosition = enemyPosition - boardWidth; break
  //     case 'left': enemyPosition = enemyPosition + 1; break
  //   }



  //   enemyCellName = '#cell' + enemyPosition
  //   enemyLocation = document.querySelector(enemyCellName) //this is the cell I'm moving to
  //   enemyLocation.classList.add('enemy') //remove the enemy from that cell
  //   enemyLocation.setAttribute('enemy-id', enemies[0].enemyId) //set my enemy cell attribute so I can find it
  //   if (isKillableTrue === true) {
  //     enemyLocation.classList.add('killable') //removes killable class in case it was there
  //   }
  //   enemies[0].locateId = enemyPosition
  // }

  // ===== CREATE! =====
  createBoard()

  //start game assets
  addTreasureChests()
  addWeapons()
  enemiesHome()
  //set first player location
  document.querySelector(`#cell-${playerHome}`).classList.add('player')
  //watch for movement
  trackPlayerMove()





  // changePlayerCell(89)




}

window.addEventListener('DOMContentLoaded', pacnam)