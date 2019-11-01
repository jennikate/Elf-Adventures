
function pacnam() {

  // ===== CREATE STARTING VALUES =====

  const boardWidth = 10
  const boardSize = boardWidth ** 2
  const cells = [] //declare so can push cell ids to it

  let cellName = ''
  let cellLocation = 0 //setup so we can push the id of the cell we're looking for to it

  const playerHome = boardSize - 1 //get bottom right most cell
  let playerHomeName = ''
  let playerLocation = 0 //so we can find and move them
  let playerClasses = ''
  let playerMove = 0
  let playerDirection = ''

  const treasureBoxes = [12, 39, 75, 90] //this can be randomised later
  let treasureCellName = ''
  let treasureLocation = 0

  const weapons = [42, 66] //this can be randomised later
  let weaponCellName = ''
  let weaponLocation = 0

  let enemyId = 0
  let enemyCellName = ''
  let enemyLocation = 0

  let playerScore = 0
  let playerLives = 3



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

  //DECLARE ENEMY DETAILS
  //create array of objects to set enemy home position, name, and movement pattern
  const enemies = [
    { enemyId: 0, homeId: 54, moveId: 'smart' },
    { enemyId: 1, homeId: 55, moveId: 'dumb' },
    { enemyId: 2, homeId: 45, moveId: 'average' }
  ]


  // ===== FUNCTIONS =====

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
      cell.innerHTML = [i]
      cells.push(cell)
    }
    makeWalls()
  }

  // MAKE WALLS
  // called by createBoard
  function makeWalls() {
    for (let i = 0; i < walls.length; i++) {
      //get the cell ID so we can assign things to it
      cellName = '#cell' + walls[i].cellId //cellId is the key that we want to return the value of (cause you keep forgetting that's why it's here Jen!!)
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
  // // if I refactor above I need to loop through each object, if value is true then set key as wall-keyname


  // SET TREASURE CHESTS
  function addTreasureChests() {
    //called by start game 
    for (let i = 0; i < treasureBoxes.length; i++) {
      treasureCellName = '#cell' + treasureBoxes[i]
      treasureLocation = document.querySelector(treasureCellName)
      treasureLocation.classList.add('treasure-chest')
    }
  }

  // SET WEAPONS
  function addWeapons() {
    //called by start game (will be on timer later)
    for (let i = 0; i < weapons.length; i++) {
      weaponCellName = '#cell' + weapons[i]
      weaponLocation = document.querySelector(weaponCellName)
      weaponLocation.classList.add('weapon')
      //weapons.push(weaponCellName) in future create weapon locations in this function and push to the weapons array
    }
  }

  // START ENEMY AT HOME
  function enemiesHome(enemyList) {
    for (let i = 0; i < enemyList.length; i++) {
      enemyCellName = '#cell' + enemies[i].homeId
      enemyId = 'enemyId' + enemies[i].enemyId
      enemyLocation = document.querySelector(enemyCellName)
      enemyLocation.classList.add('enemy')
      enemyLocation.setAttribute('enemyId', enemies[i].enemyId)
    }
  }



  // ===== PLAYER ACTIONS =====

  // CHANGE PLAYER LOCATION
  // change player class location, clear/set the list of classes on the cell the player is in
  function changePlayerLocation(playerMove) {
    //called by start game, player movement
    //clear original location
    cellLocation = document.querySelector(cellName) //this is the cell I'm coming from
    cellLocation.classList.remove('player') //remove the player from that cell
    playerClasses = ''
    //update with new location details
    cellName = '#cell' + playerMove
    cellLocation = document.querySelector(cellName) //this is the cell I'm going to
    cellLocation.classList.add('player')
    playerLocation = playerMove
    playerClasses = document.querySelector(cellName).classList
    //return the location
    return playerLocation
  }

  // AWARD TREASURE
  function collectTreasure(playerMove) {
    //called by player movement
    treasureCellName = '#cell' + playerMove
    treasureLocation = document.querySelector(treasureCellName)
    if (treasureLocation.classList.contains('treasure-chest')) {
      playerScore = playerScore + 1000
      document.querySelector('#player-score span').innerHTML = playerScore
      treasureLocation.classList.remove('treasure-chest')
    }
  }

  // ACTIVATE WEAPON
  function collectWeapon(playerMove) {
    //called by player movement
    weaponCellName = '#cell' + playerMove
    weaponLocation = document.querySelector(weaponCellName)
    if (weaponLocation.classList.contains('weapon')) {
      document.querySelector('#notification').innerHTML = 'You have a sword, kill the dragons!'
      //turn all enemies into killable
      const allEnemyLoc = document.querySelectorAll('.enemy')
      for (let i = 0; i < allEnemyLoc.length; i++) {
        allEnemyLoc[i].classList.add('killable')
      }
      //clear weapons from board
      const allWeapons = document.querySelectorAll('.weapon')
      for (let i = 0; i < allWeapons.length; i++) {
        allWeapons[i].classList.remove('weapon')
      }
    }
  }

  // ENEMY COLLISION
  function enemyAttack(playerMove) {
    //called by player movement
    enemyCellName = '#cell' + playerMove
    enemyLocation = document.querySelector(enemyCellName)
    console.log(enemyLocation)
    const enemyIdFromHTML = enemyLocation.getAttribute('enemyId')
    console.log(enemyIdFromHTML)



    //look first for a killable enemy
    if (enemyLocation.classList.contains('killable')) {


      playerScore = playerScore + 10
      document.querySelector('#player-score span').innerHTML = playerScore
      //send that enemy to home
      //remove its class
      enemyLocation.classList.remove('killable')
      enemyLocation.classList.remove('enemy')

      //find the homeId for this enemyId
      console.log(Object(enemies[enemyIdFromHTML]))
      console.log(Object(enemies[enemyIdFromHTML]).homeId)
      //send this enemy home
      cellName = '#cell' + (enemies[enemyIdFromHTML]).homeId
      document.querySelector(cellName).classList.add('enemy')
      document.querySelector(cellName).classList.add('killable')

      
    } else {
      //if not killable then look for if the enemy is there
      if (enemyLocation.classList.contains('enemy')) {
        //send player to their home location
        changePlayerLocation(playerHome)
        playerLives = playerLives - 1
        document.querySelector('#player-lives span').innerHTML = playerLives
      }
    }
  }


  // ===== CONTROLS =====
  //start game
  const startGame = document.querySelector('#start')
  startGame.addEventListener('click', () => {
    //set lives
    document.querySelector('#player-lives span').innerHTML = playerLives
    //add treasure chests
    addTreasureChests()
    //add weapons (in future will start rolling weapon timers)
    addWeapons()
    //start enemy at their home location
    enemiesHome(enemies) //send their home array
    //start player at their home location
    changePlayerLocation(playerHome)
  })

  //player movement
  document.addEventListener('keyup', (e) => {

    switch (e.key) {
      // if there is a wall in the direction I'm trying to move, don't let me move, else move me appropriately
      case 'w': {
        playerMove = playerLocation - boardWidth
        playerDirection = 'top'
        if (playerClasses.contains(`wall-${playerDirection}`) === true) {
          return
        } else {
          collectTreasure(playerMove) //activates if treasure on square, if not does nothing
          collectWeapon(playerMove) //activates if weapon on square, if not does nothing
          changePlayerLocation(playerMove)
          enemyAttack(playerMove) //activates if player moves into an unkillable enemy, has to be last as it moves the player automatically after they move themselves
        }
        break
      }
      case 'd': {
        playerMove = playerLocation + 1
        playerDirection = 'right'
        if (playerClasses.contains(`wall-${playerDirection}`) === true) {
          return
        } else {
          collectTreasure(playerMove) //activates if treasure on square, if not does nothing
          collectWeapon(playerMove) //activates if weapon on square, if not does nothing
          changePlayerLocation(playerMove)
          enemyAttack(playerMove) //activates if player moves into an unkillable enemy
        }
        break
      }
      case 's': {
        playerMove = playerLocation + boardWidth
        playerDirection = 'bottom'
        if (playerClasses.contains(`wall-${playerDirection}`) === true) {
          return
        } else {
          collectTreasure(playerMove) //activates if treasure on square, if not does nothing
          collectWeapon(playerMove) //activates if weapon on square, if not does nothing
          changePlayerLocation(playerMove)
          enemyAttack(playerMove) //activates if player moves into an unkillable enemy
        }
        break
      }
      case 'a': {
        playerMove = playerLocation - 1
        playerDirection = 'left'
        if (playerClasses.contains(`wall-${playerDirection}`) === true) {
          return
        } else {
          collectTreasure(playerMove) //activates if treasure on square, if not does nothing
          collectWeapon(playerMove) //activates if weapon on square, if not does nothing
          changePlayerLocation(playerMove)
          enemyAttack(playerMove) //activates if player moves into an unkillable enemy
        }
        break
      }
    }
  })

  //enemy movement
  //each enemy has it's own movement pattern
  //enemiesHome[0] : - always moves towards player unless there is a wall, then it goes (top, bottom, left, right)
  //enemiesHome[1] - makes first move towards player, then continues in that direction until it hits a wall, then it moves towards player again
  //enemiesHome[2] - makes first move towards player, second move towards player, then continues in that direction until it hits a wall, then it moves towards players again

  //assign enemies their movement patterns

  // ===== CREATE! =====
  createBoard()



}

window.addEventListener('DOMContentLoaded', pacnam)