/* eslint-disable brace-style */

function elfAdventures() {

  // =================================
  // GLOBAL ITEMS
  // =================================

  // ===== Global variables & starting values =====
  const boardWidth = 10
  const boardSize = boardWidth ** 2
  const maxLevels = 4
  let level = 1

  let addWeaponTimeout
  let deadlyTimeout
  let removeWeaponTimeout

  let audioState = 'audioOn'

  const treasureValue = 1000
  const treasureSmallValue = 500
  const treasureTinyValue = 100
  const treasureMaxValue = 2000
  const enemyValue = 20
  const numberOfChests = 4
  const numberOfWeapons = 2

  const playerHome = Math.max(boardSize) - 1
  const maxPlayerLives = 3
  let playerLives = 3
  let playerScore = 0

  const enemyHome = 54
  const numberEnemyPerLevel = 1

  let cellIdRef
  let cellElement
  let arrLocation = [] //finds the cells with tokens
  let myWalls //figures out which cells have walls for 'me'
  let moveTo = [] //used to determine available cells to move into for 'me'
  let moveToCellId //holds the cell I've decided to move into
  let playerDirection //set by player keypress function

  // ===== Global DOM elements used =====
  const grid = document.querySelector('#grid') //position on html to create the cells
  //get cell element from numRef : frequently need to get the cell element from a cellId to then adjust classes/innerHTML/other
  function getCellElement(numRef) {
    cellIdRef = '#cell-' + numRef
    cellElement = document.querySelector(cellIdRef)
    return cellElement
  }

  //clear all tokens for that class
  function clearTokens(className) {
    const tokens = document.querySelectorAll(`.${className}`)
    tokens.forEach(elem => {
      elem.classList.remove(className)
    })
  }

  //change token state(s)
  function changeTokenState(classFrom, classTo) {
    const tokens = document.querySelectorAll(`.${classFrom}`)
    tokens.forEach(elem => {
      const tokenLocation = elem.classList
      tokenLocation.remove(classFrom)
      tokenLocation.add(classTo)
    })
  }

  //hide elements
  function hideElement(elementRef) {
    const elementClassList = document.querySelector(elementRef).classList
    elementClassList.add('hide')
  }
  //show elements
  function showElement(elementRef) {
    const elementClassList = document.querySelector(elementRef).classList
    elementClassList.remove('hide')
  }

  // =================================
  // CONTROLS
  // =================================

  // ===== Audio ===== 
  //ambient : triggered on load game button click
  const player = document.querySelector('#load-game')
  const backgroundAudio = document.querySelector('.background-audio')
  backgroundAudio.src = './assets/forest.mp3'
  player.addEventListener('click', () => {
    backgroundAudio.play()
  })

  //sound effects : triggered by events
  function soundEffect(soundFile) {
    if (audioState === 'audioOn') {
      const soundEffectAudio = document.querySelector('.audio')
      soundEffectAudio.src = soundFile
      soundEffectAudio.play()
    } else {
      return
    }
  }

  //stop sounds
  document.querySelector('#audio-player').addEventListener('click', () => {
    if (audioState === 'audioOn') {
      document.querySelector('.background-audio').pause()
      changeTokenState('audio-on', 'audio-off')
      audioState = 'audioOff'
    } else {
      audioState = 'audioOn'
      document.querySelector('.background-audio').play()
      changeTokenState('audio-off', 'audio-on')
    }
  })

  // ===== Player keypresses =====
  document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W' || e.keyCode === 38) { playerDirection = 'top' }
    else if (e.key === 'd' || e.key === 'D' || e.keyCode === 39) { playerDirection = 'right' }
    else if (e.key === 's' || e.key === 'S' || e.keyCode === 40) { playerDirection = 'bottom' }
    else if (e.key === 'a' || e.key === 'A' || e.keyCode === 37) { playerDirection = 'left' }
    else {
      return
    }
    collision(playerDirection)
    return playerDirection
  })

  // =================================
  // GAME BOARD
  // =================================

  // ===== Wall array =====
  // array of cell objects to say which borders have walls
  const walls = [
    { cellId: 0, top: true, right: false, bottom: false, left: true },
    { cellId: 1, top: true, right: false, bottom: true, left: false },
    { cellId: 2, top: true, right: false, bottom: false, left: false },
    { cellId: 3, top: true, right: false, bottom: false, left: false },
    { cellId: 4, top: true, right: true, bottom: false, left: false },
    { cellId: 5, top: true, right: false, bottom: false, left: true },
    { cellId: 6, top: true, right: false, bottom: false, left: false },
    { cellId: 7, top: true, right: false, bottom: false, left: false },
    { cellId: 8, top: true, right: false, bottom: true, left: false },
    { cellId: 9, top: true, right: true, bottom: false, left: false },

    { cellId: 10, top: false, right: true, bottom: false, left: true },
    { cellId: 11, top: true, right: true, bottom: false, left: true },
    { cellId: 12, top: false, right: true, bottom: false, left: true },
    { cellId: 13, top: false, right: true, bottom: true, left: true },
    { cellId: 14, top: false, right: true, bottom: false, left: true },
    { cellId: 15, top: false, right: true, bottom: false, left: true },
    { cellId: 16, top: false, right: true, bottom: true, left: true },
    { cellId: 17, top: false, right: true, bottom: false, left: true },
    { cellId: 18, top: true, right: true, bottom: false, left: true },
    { cellId: 19, top: false, right: true, bottom: false, left: true },

    { cellId: 20, top: false, right: false, bottom: false, left: true },
    { cellId: 21, top: false, right: false, bottom: true, left: false },
    { cellId: 22, top: false, right: false, bottom: false, left: false },
    { cellId: 23, top: true, right: false, bottom: false, left: false },
    { cellId: 24, top: false, right: false, bottom: true, left: false },
    { cellId: 25, top: false, right: false, bottom: true, left: false },
    { cellId: 26, top: true, right: false, bottom: false, left: false },
    { cellId: 27, top: false, right: false, bottom: false, left: false },
    { cellId: 28, top: false, right: false, bottom: true, left: false },
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

    { cellId: 40, top: true, right: false, bottom: false, left: true },
    { cellId: 41, top: true, right: true, bottom: true, left: false },
    { cellId: 42, top: false, right: true, bottom: false, left: true },
    { cellId: 43, top: true, right: false, bottom: false, left: true },
    { cellId: 44, top: false, right: false, bottom: false, left: false },
    { cellId: 45, top: false, right: false, bottom: false, left: false },
    { cellId: 46, top: true, right: true, bottom: false, left: false },
    { cellId: 47, top: false, right: true, bottom: false, left: true },
    { cellId: 48, top: true, right: false, bottom: true, left: true },
    { cellId: 49, top: true, right: true, bottom: false, left: false },

    { cellId: 50, top: false, right: false, bottom: true, left: true },
    { cellId: 51, top: true, right: false, bottom: true, left: false },
    { cellId: 52, top: false, right: false, bottom: false, left: false },
    { cellId: 53, top: false, right: true, bottom: false, left: false },
    { cellId: 54, top: false, right: false, bottom: true, left: true },
    { cellId: 55, top: false, right: true, bottom: true, left: false },
    { cellId: 56, top: false, right: false, bottom: false, left: true },
    { cellId: 57, top: false, right: false, bottom: false, left: false },
    { cellId: 58, top: true, right: false, bottom: true, left: false },
    { cellId: 59, top: false, right: true, bottom: true, left: false },

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

  // =====Enemy array =====
  const enemies = [54, 44, 45, 55, 34, 35, 64, 65, 24, 25, 74, 75] //these are cell ID's

  // =====Create board =====
  //create cells and thier IDs
  function createBoard() {
    for (let i = 0; i < boardSize; i++) {
      //create element
      const cell = document.createElement('div')
      //set it's values
      cell.classList.add('cell')
      cell.setAttribute('id', 'cell-' + [i])
      grid.appendChild(cell) //add it to the grid
    }
    makeWalls() //add walls based on the wall array
    showElement('#start') //show start button
  }

  // MAKE WALLS
  function makeWalls() {
    for (let i = 0; i < walls.length; i++) {
      //get the cell that relates to this wall
      getCellElement(walls[i].cellId)
      //check the array to see what borders are needed and add them
      if (walls[i].top === true) { cellElement.classList.add('wall-top') }
      if (walls[i].right === true) { cellElement.classList.add('wall-right') }
      if (walls[i].bottom === true) { cellElement.classList.add('wall-bottom') }
      if (walls[i].left === true) { cellElement.classList.add('wall-left') }
    }
  }

  //ADD PLAYER
  function addPlayer() {
    //clear player in case its token remains somewhere, look for both normal player, and player with weapon tokens
    clearTokens('player')
    clearTokens('player-weapon')
    //Add a standard player token
    const setPlayer = document.querySelector(`#cell-${playerHome}`).classList
    setPlayer.add('player')
  }

  function addEnemies() {
    //remove any existing enemies
    clearTokens('enemy')
    clearTokens('enemy-killable')
    //declare/clear local array to store level positions to add in
    const setEnemies = []
    //get max levels & loop until reached, adding extra enemies to array each time
    for (let i = 1; i <= level; i++) {
      for (let j = 1; j <= (numberEnemyPerLevel * i); j++) {
        setEnemies.push(enemies[j - 1]) //-1 as pulling from array but our count starts at 1 as we're checking against a number variable
      }
      //add enemies to cells
      for (let i = 0; i < setEnemies.length; i++) {
        getCellElement(setEnemies[i])
        cellElement.classList.add('enemy')
      }
    }
  }

  // =====Random/Timed Token Functions ===== 
  // Find any cells with declared default positions and store them as assigned (so we don't add anything to them)
  const assignedCells = []
  assignedCells.push(playerHome)
  assignedCells.push(playerHome - 10)
  assignedCells.push(playerHome + 1)
  assignedCells.push(playerHome + 10)
  assignedCells.push(playerHome - 1)
  enemies.forEach(elem => {
    assignedCells.push(elem)
  })

  //Add treasure chests
  let treasureLocations = [] //have to declare outside function so addWeapon can use it
  function addTreasureChests() {
    //calculate how long the loop should run to prevent adding items next to each other
    //number of chests is declared in the global variables, multiply it by 5 (cell with item + 4 around it) 
    const maxChest = numberOfChests * 5
    //clear my tracking array
    treasureLocations = []
    //find any existing treasure chest classes and clear them (incase a remove failed at any point)
    clearTokens('treasure-chest')
    clearTokens('treasure-small')
    clearTokens('treasure-tiny')
    clearTokens('treasure-max')
    //add chests until we reach our max number
    while (treasureLocations.length < maxChest) {
      //get a random number 
      const randomNumber = Math.floor(Math.random() * 100)
      //check if that's allowable (if not in our arrays of assignedCells or treasureLocations
      if (!assignedCells.includes(randomNumber) && !treasureLocations.includes(randomNumber)) {
        //get the cell element
        getCellElement(randomNumber)
        cellElement.classList.add('treasure-chest')
        //THIS IS DECLARED ABSOLUTELY - WOULD BE GOOD TO MAKE IT DYNAMIC
        const thisCell = (maxChest - treasureLocations.length) / (numberOfChests + 1)
        // console.log(thisCell)
        if (level === 4) {
          cellElement.classList.add('treasure-chest')
          cellElement.classList.add('treasure-max')
        } else {
          switch (thisCell) {
            case 4: cellElement.classList.add('treasure-chest'); break
            case 3: cellElement.classList.add('treasure-chest'); break
            case 2: cellElement.classList.add('treasure-small'); break
            case 1: cellElement.classList.add('treasure-tiny'); break
            default: cellElement.classList.add('treasure-chest')
          }
        }
        //push the location of this treasure to location array so know not to try to place another treasure here
        treasureLocations.push(randomNumber)
        //also push cells directly around me so two don't end up next to each other
        treasureLocations.push(randomNumber - 10)
        treasureLocations.push(randomNumber + 1)
        treasureLocations.push(randomNumber + 10)
        treasureLocations.push(randomNumber - 1)
      }
    }
  }

  //Add weapons : this operates similarly to addTreasure
  function addWeapons() {
    addWeaponTimeout = setTimeout(() => {
      clearTimeout(removeWeaponTimeout)  //stop the removeWeaponTimeout if it's running
      const maxWeapons = numberOfWeapons * 5
      const weaponLocations = []
      clearTokens('weapon')
      while (weaponLocations.length < maxWeapons) {
        const weaponRandomNumber = Math.floor(Math.random() * 100)
        if (!assignedCells.includes(weaponRandomNumber) && !weaponLocations.includes(weaponRandomNumber) && !treasureLocations.includes(weaponRandomNumber)) {
          // console.log(`addingclass to ${weaponRandomNumber}`)
          getCellElement(weaponRandomNumber)
          const cellClassList = cellElement.classList
          cellClassList.add('weapon')
          weaponLocations.push(weaponRandomNumber)
          weaponLocations.push(weaponRandomNumber - 10)
          weaponLocations.push(weaponRandomNumber + 1)
          weaponLocations.push(weaponRandomNumber + 10)
          weaponLocations.push(weaponRandomNumber - 1)
        }
      }
      //start the timer to remove weapons from visible
      removeWeapons()
    }, 3000) //show weapons 3 seconds after game load / enemies deadly / weapons removed due to not collected
  }

  //Remove weapons : automatically runs [x] seconds after weapons are added to the board, if no weapon was collected
  function removeWeapons() {
    //clear the addWeapon timeout so it doesn't add more until we're ready to
    clearTimeout(addWeaponTimeout)
    removeWeaponTimeout = setTimeout(() => {
      clearTokens('weapon')
      //start weapon timer again
      addWeapons()
    }, 10000)
  }

  // =================================
  // COLLISIONS
  // =================================

  // ===== Token movement =====
  function moveTokens(currentCellId, className, nextCellId) {
    //get the element of the current cell & remove the token
    const currentCellElement = document.querySelector(`#cell-${currentCellId}`)
    currentCellElement.classList.remove(className)
    //get the ID of the next cell & add the token
    getCellElement(nextCellId)
    cellElement.classList.add(className)
  }

  // ===== Deaths =====
  //Enemy
  function enemyDeath(enemyCellId) {
    playerScore = playerScore + enemyValue
    document.querySelector('#player-score span').innerHTML = playerScore
    //enemy goes home
    moveTokens(enemyCellId, 'enemy-killable', enemyHome)
  }

  //Player
  function playerDeath(currentCellId) {
    //return player home
    moveTokens(currentCellId, 'player', playerHome)
    playerLives = playerLives - 1
    let myHeart
    switch (playerLives) {
      case 2: {
        myHeart = document.querySelector('.heart-three')
        myHeart.classList.add('empty-heart')
        myHeart.classList.remove('heart')
        break
      }
      case 1: {
        myHeart = document.querySelector('.heart-two')
        myHeart.classList.add('empty-heart')
        myHeart.classList.remove('heart')
        break
      }
      case 0: {
        myHeart = document.querySelector('.heart-one')
        myHeart.classList.add('empty-heart')
        myHeart.classList.remove('heart')
        break
      }
      default: {
        document.querySelector('.heart-one').classList = 'heart heart-one'
        document.querySelector('.heart-two').classList = 'heart heart-two'
        document.querySelector('.heart-three').classList = 'heart heart-three'
      }
    }
    if (playerLives === 0) {
      gameover()
    }
  }

  // ===== Weapon picked up =====
  function getWeapon() {
    //hide other weapons from board and stop generating them
    clearTokens('weapon')
    clearTimeout(addWeaponTimeout)
    clearTimeout(removeWeaponTimeout)
    //change player class to player-weapon
    changeTokenState('player', 'player-weapon')
    //change enemy class to killable
    changeTokenState('enemy', 'enemy-killable')
    //show alter of state change with a cool transition and text
    soundEffect('./assets/sword.mp3')
    showElement('#notification')
    document.querySelector('#alert').innerHTML = 'You have a sword, kill the dragons!'
    const notifyFade = document.querySelector('#notification').classList
    notifyFade.add('fade')
    //start the timer to turn enemies deadly again
    makeEnemiesDeadly()
  }

  // ===== Return enemies to deadly =====
  function makeEnemiesDeadly() {
    deadlyTimeout = setTimeout(() => {
      soundEffect('./assets/dragon.mp3')
      changeTokenState('enemy-killable', 'enemy')
      changeTokenState('player-weapon', 'player')
      document.querySelector('#alert').innerHTML = ''
      const notifyFade = document.querySelector('#notification').classList
      notifyFade.remove('fade')
      hideElement('#notification')
      //start weapon timer again
      addWeapons()
    }, 5000)
  }

  // ===== Treasure picked up =====
  function lootTreasure(thisCell) {
    //set this specific cell element into local variable
    const thisTreasureLocation = document.querySelector(`#cell-${thisCell}`)

    //give user points
    if (thisTreasureLocation.classList.contains('treasure-small')) {
      playerScore = playerScore + treasureSmallValue
    } else if (thisTreasureLocation.classList.contains('treasure-tiny')) {
      playerScore = playerScore + treasureTinyValue
    } else if (thisTreasureLocation.classList.contains('treasure-max')) {
      playerScore = playerScore + treasureMaxValue
    } else {
      playerScore = playerScore + treasureValue
    }
    //show points
    document.querySelector('#player-score span').innerHTML = playerScore

    //clear chest classes
    thisTreasureLocation.classList.remove('treasure-chest')
    thisTreasureLocation.classList.remove('treasure-small')
    thisTreasureLocation.classList.remove('treasure-tiny')
    thisTreasureLocation.classList.remove('treasure-max')

    //if this was the last treasure then this level has been won
    if (document.querySelectorAll('.treasure-chest').length === 0) {
      levelWon()
    } else {
      return
    }
  }

  // ==================================================
  // MOVEMENT LOGIC
  // ==================================================

  function pushItemToLocationArray(className) {
    const myRefArray = document.querySelectorAll(`.${className}`)
    if (myRefArray !== 0) {
      myRefArray.forEach(elem => {
        const myRef = elem
        const myId = parseInt(myRef.id.split('-')[1])
        arrLocation.push({ 'myRef': className, 'myCellId': myId, 'myClassList': myRef })
      })
    }
    return arrLocation
  }

  function collision() {
    arrLocation = [{ myRef: '', myCellId: 0, myClassList: '' }]

    //find all tokens and put them in a location array
    pushItemToLocationArray('enemy')
    pushItemToLocationArray('enemy-killable')
    pushItemToLocationArray('player')
    pushItemToLocationArray('player-weapon')
    //loop through the location array and take relevant action
    for (let loc = 0; loc < arrLocation.length; loc++) {
      const locationVar = arrLocation[loc]
      //clear the moveTo array (cells I can move to) before looping again
      moveTo = []

      //get the walls of my cell
      myWalls = document.querySelector(('#cell-' + locationVar.myCellId)).classList
      //if there is no wall, then push the available cellIDs to my moveTo array
      if (!myWalls.contains('wall-top')) { moveTo.push(locationVar.myCellId - 10) } //I can move up
      if (!myWalls.contains('wall-right')) { moveTo.push(locationVar.myCellId + 1) } //I can move right
      if (!myWalls.contains('wall-bottom')) { moveTo.push(locationVar.myCellId + 10) } //I can move down
      if (!myWalls.contains('wall-left')) { moveTo.push(locationVar.myCellId - 1) } //I can move left
      myWalls = [] //clear myWalls array ready for next loop

      //get next cell to move to for enemies (of all types)
      if (locationVar.myRef === 'enemy' || locationVar.myRef === 'enemy-killable') {
        for (let i = moveTo.length - 1; i >= 0; i--) {
          getCellElement(moveTo[i])
          const nextCellClasses = cellElement.classList

          // if cell contains an enemy & I am enemy : remove from array as I won't move there
          if ((locationVar.myRef === 'enemy' || locationVar.myRef === 'enemy-killable') &&
            (nextCellClasses.contains('enemy') || nextCellClasses.contains('enemy-killable'))) {
            moveTo.splice([i], 1)
          }
          //if cell contains a player and I am enemy and I am killable : I won't move there
          if (locationVar.myRef === 'enemy-killable' && nextCellClasses.contains('player-weapon')) {
            moveTo.splice([i], 1)
          }
          //if cell contains a player and I am enemy and I am deadly : I WANT TO move there
          if (locationVar.myRef === 'enemy' && nextCellClasses.contains('player')) {
            moveTo = moveTo[i]
            break //stop looping, I've found my direction
          }
        }
        //get a new cell to move the enemy to
        if (moveTo.length === 0) { moveToCellId = locationVar.myCellId } //I have no viable options so I stay here
        else if (typeof moveTo === 'number') { moveToCellId = moveTo } //I have only one option (or I am next to a player) so I want to move there
        else {
          //get a random location to move to
          moveToCellId = moveTo[Math.floor(Math.random() * moveTo.length)]
          if (moveTo.length === 0) { moveToCellId = locationVar.myCellId } //I have no viable options so I stay here
          else if (typeof moveTo === 'number') { moveToCellId = moveTo } //I have only one option (or I am next to a player) so I want to move there
          else { moveToCellId = moveTo[Math.floor(Math.random() * moveTo.length)] }
        }

        //move deadly enemies
        if (locationVar.myRef === 'enemy') {
          moveTokens(locationVar.myCellId, locationVar.myRef, moveToCellId)
        }
        if ((document.querySelector(`#cell-${moveToCellId}`)).classList.contains('player')) {
          playerDeath(moveToCellId)
          break // no more moves this round
        }
      }
      //check for where to move if I'm a player
      if (locationVar.myRef === 'player' || locationVar.myRef === 'player-weapon') {
        //get the cell ID I want to move to
        if (playerDirection === 'top') { moveToCellId = locationVar.myCellId - 10 }
        if (playerDirection === 'right') { moveToCellId = locationVar.myCellId + 1 }
        if (playerDirection === 'bottom') { moveToCellId = locationVar.myCellId + 10 }
        if (playerDirection === 'left') { moveToCellId = locationVar.myCellId - 1 }
        //can I move to the cell I want to move to?
        if (moveTo.includes(moveToCellId)) {
          getCellElement(moveToCellId)
          if ((cellElement.classList).contains('enemy-killable')) {
            enemyDeath(moveToCellId)
            moveTokens(locationVar.myCellId, locationVar.myRef, moveToCellId)
            break //stop the loop if player kills an enemy!
          } else if ((cellElement.classList).contains('treasure-chest')) {
            lootTreasure(moveToCellId)
            moveTokens(locationVar.myCellId, locationVar.myRef, moveToCellId)
          } else if ((cellElement.classList).contains('weapon')) {
            getWeapon()
            moveTokens(locationVar.myCellId, 'player-weapon', moveToCellId)
            break
          } else if ((cellElement.classList).contains('enemy')) {
            // if a player actually walks into an enemy then the enemy move check handles it
            playerDeath(moveToCellId)
            console.log('player dumb')
          } else {
            //player can move to cell
            moveTokens(locationVar.myCellId, locationVar.myRef, moveToCellId)
          }
        } else {
          //player tried to move into a wall so do nothing
          return
        }
      }
      //finally move the killable enemies (their logic for where to move to exists under the enemy section above)
      if (locationVar.myRef === 'enemy-killable') {
        moveTokens(locationVar.myCellId, locationVar.myRef, moveToCellId)
      } //killable enemy moves last
    }
  }

  // ==================================================
  // GAME START AND END
  // ==================================================

  //First load from splash screen
  document.querySelector('#load-game').addEventListener(('click'), () => {
    hideElement('#landing')
    createBoard()
    showElement('#game')
    createGame()
    showElement('header')
  })

  //create a new game
  function createGame() {
    hideElement('#notification')
    hideElement('#end-note')
    document.querySelector('#alert').innerHTML = ''
    document.querySelector('#game-result').innerHTML = ''
    document.querySelector('#final-score ').innerHTML = ''
  }

  //end a game or level
  function endGame() {
    console.log('running end game')
    clearTimeout(addWeaponTimeout)
    clearTimeout(deadlyTimeout)
    clearTimeout(removeWeaponTimeout)
    showElement('#end-note')
    document.querySelector('#final-score ').innerHTML = `Your score ${playerScore}`
    //clear any existing tokens
    clearTokens('player')
    clearTokens('player-weapon')
    clearTokens('enemy')
    clearTokens('enemy-killable')
    clearTokens('treasure-chest')
    clearTokens('weapon')
    console.log(playerLives, playerScore)
  }

  //start game (on button click)
  document.querySelector('#start').addEventListener('click', () => {
    hideElement('#start')
    //set my hearts
    let myHeart = document.querySelector('.heart-one').classList
    myHeart.add('heart')
    myHeart = document.querySelector('.heart-two').classList
    myHeart.add('heart')
    myHeart = document.querySelector('.heart-three').classList
    myHeart.add('heart')
    playerLives = maxPlayerLives
    document.querySelector('#player-score span').innerHTML = 0 //must always reset to 0 at start click
    addTreasureChests()
    addWeapons()
    addEnemies()
    addPlayer()
  })

  //start next level (on button click)
  document.querySelector('#next-level').addEventListener('click', () => {
    level = level + 1
    createGame()
    addTreasureChests()
    addWeapons()
    addEnemies()
    addPlayer()
  })

  //end level or game if won
  function levelWon() {
    if (level === maxLevels) {
      endGame()
      document.querySelector('#game-result').innerHTML = 'Congratulations! You beat all the levels'
      hideElement('#next-level')
      showElement('#new-game')
    } else {
      endGame()
      showElement('#next-level')
      hideElement('#new-game')
      document.querySelector('#game-result').innerHTML = 'Level Complete'
    }
  }

  //end game if lost
  function gameover() {
    hideElement('#next-level')
    showElement('#new-game')
    document.querySelector('#game-result').innerHTML = 'Game Over'
    endGame()
  }

  //start new game
  document.querySelector('#new-game').addEventListener('click', () => {
    //reset level
    level = 1
    createGame()
    showElement('#start')
    //reset my hearts
    let myHeart = document.querySelector('.heart-one').classList
    myHeart.remove('empty-heart')
    myHeart = document.querySelector('.heart-two').classList
    myHeart.remove('empty-heart')
    myHeart = document.querySelector('.heart-three').classList
    myHeart.remove('empty-heart')
  })
}

window.addEventListener('DOMContentLoaded', elfAdventures) 