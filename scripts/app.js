/* eslint-disable brace-style */
<<<<<<< HEAD
//needs refactor
// MAKING A CHANGE
=======
 //needs refactor
 //needs audiogit
>>>>>>> 0662ba310a3974732f69e741a738db052b24d0c4

function pacnam() {

  // ===== CREATE STARTING VALUES =====

  const boardWidth = 10
  const boardSize = boardWidth ** 2
  const playerHome = Math.max(boardSize) - 1

  const treasureValue = 1000
  const treasureSmallValue = 500
  const treasureTinyValue = 100
  const treasureMaxValue = 2000

  const enemyValue = 20
  let playerLives = 3
  let playerScore = 0
  let level = 1
  const maxLevels = 4
  let playerDirection

  let cellIdRef
  let cellElement
  let moveToCellId
  let myWalls
  let arrLocation = []
  let moveTo = []

  const enemies = [54, 44, 45, 55]
  let enemyState = 'deadly'
  const enemyHome = 54

  let addWeaponId
  let deadlyTimeout
  let removeWeaponTimeout

  //these are viable locations that weapons or treasures drop in. Would be good to make this part of the collision array but that's a future thing
  //maybe make them the cells they should not appear in (not appear where enemies or player do, or next to player start cell)
  // const treasure = [2, 3]
  // const weapons = [7, 9]
  //track location of treasure so can avoid duplication
  let treasureLocations = [] //have to track so can avoid dropping weapons there
  const assignedCells = []
  assignedCells.push(playerHome)
  //include cells directly around player so nothing drops there
  assignedCells.push(playerHome - 10)
  assignedCells.push(playerHome + 1)
  assignedCells.push(playerHome + 10)
  assignedCells.push(playerHome - 1)
  enemies.forEach(elem => {
    assignedCells.push(elem)
  })




  // ==== GET ELEMENTS NEEDED ====

  const grid = document.querySelector('#grid') //position on html to create the cells

  //get cell element from refNumber
  function getCellElement(numRef) {
    cellIdRef = '#cell-' + numRef
    cellElement = document.querySelector(cellIdRef)
    return cellElement
  }

  const classListNotification = document.querySelector('#notification').classList


  //AUDIO
  /* audio structure */


  //ambient
  const player = document.querySelector('#load-game')
  const backgroundAudio = document.querySelector('.background-audio')
  backgroundAudio.src = './assets/forest.mp3'
  player.addEventListener('click', () => {
    backgroundAudio.play()
    console.log('playing ambient')
  })

  function soundEffect(soundFile) {
    const soundEffectAudio = document.querySelector('.audio')
    soundEffectAudio.src = soundFile
    soundEffectAudio.play()
    console.log('playing' + soundFile)
  }



  document.querySelector('#player').addEventListener('click', () => {
    document.querySelector('.background-audio').pause()
    document.querySelector('.audio').pause()
    console.log('sound stopped')
  })



  // ==================================================
  // CREATE GAME BOARD
  // ==================================================

  // DECLARE WALL POSITIONS
  //create array of objects to say which borders have walls
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

  // GAME BOARD 

  function createBoard() {
    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('id', 'cell-' + [i])
      grid.appendChild(cell)
    }
    //add walls based on the wall array
    makeWalls()
    //add start button
    const startButton = document.querySelector('#start').classList
    startButton.remove('hide')
  }

  // MAKE WALLS
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

  // SET INITIAL POSITIONS


  // function addTreasureChests() {
  //   //called by start game 
  //   for (let i = 0; i < treasure.length; i++) {
  //     getCellElement(treasure[i])
  //     cellElement.classList.add('treasure-chest')
  //   }
  // }
  function addTreasureChests() {
    // console.log('called add treasure')
    //decide on number of chests for level (initially, always 4)
    const numberOfChests = 4
    const maxChestLocationArray = numberOfChests * (numberOfChests + 1) //sets me a length to loop until so I can prevent adding to cells next to each other
    //clear my tracking array
    treasureLocations = []
    // console.log('looking for existing treasure chests')
    const treasureCells = document.querySelectorAll('.treasure-chest')
    treasureCells.forEach(elem => {
      elem.classList.remove('treasure-chest')
    })
    // console.log(`removed ${treasureCells.length}`)
    // //remove existing treasure chest sizes
    // const treasureCellsSmall = document.querySelectorAll('.treasure-small')
    // treasureCells.forEach(elem => {
    //   elem.classList.remove('treasure-small')
    // }) 
    // const treasureCellsTiny = document.querySelectorAll('.treasure-tiny')
    // treasureCells.forEach(elem => {
    //   elem.classList.remove('treasure-tiny')
    // })
    // const treasureCellsMax = document.querySelectorAll('.treasure-max')
    // treasureCells.forEach(elem => {
    //   elem.classList.remove('treasure-max')
    // })
    // console.log(`${treasureLocations.length} long vs ${maxChestLocationArray}`)
    while (treasureLocations.length < maxChestLocationArray) {
      // console.log('started treasure while loop')
      //get a random number 
      const randomNumber = Math.floor(Math.random() * 100)
      // const randomCell = `#cell-${randomNumber}`
      //check if that's allowable (if not in array of 'assignedCells')
      if (!assignedCells.includes(randomNumber) && !treasureLocations.includes(randomNumber)) {
        getCellElement(randomNumber)
        cellElement.classList.add('treasure-chest')
        //decide on size (small, medium, large) & add class
        //if level one, add one tiny, one small, two normal
        //how many chests are on the board
        const thisCell = (maxChestLocationArray - treasureLocations.length) / (numberOfChests + 1)
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
          }
        }

        //push to location array so know where not to place next box
        treasureLocations.push(randomNumber)
        //also push cells directly around me so two don't end up next to each other
        treasureLocations.push(randomNumber - 10)
        treasureLocations.push(randomNumber + 1)
        treasureLocations.push(randomNumber + 10)
        treasureLocations.push(randomNumber - 1)
        //decide on size (small, medium, large)
        //add box
        //if level 4 add a mega box
      }

    }
  }


  function addWeapons() {
    console.log(`starting add timer ${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`)
    //make sure remove timer isn't running
    console.log('calling addweapon')
    addWeaponId = setTimeout(() => {
      clearTimeout(removeWeaponTimeout)
      //playsound
      soundEffect('./assets/sword.mp3')
      // console.log('adding weapon')
      //decide on number of weapons
      const numberOfWeapons = 2
      const maxWeaponsLocationArray = numberOfWeapons * (numberOfWeapons + 1)
      //clear existing weapon locations
      const weaponLocations = []
      const weaponCells = document.querySelectorAll('.weapon')
      weaponCells.forEach(elem => {
        elem.classList.remove('weapon')
      })
      while (weaponLocations.length < maxWeaponsLocationArray) {
        const weaponRandomNumber = Math.floor(Math.random() * 100)
        if (!assignedCells.includes(weaponRandomNumber) && !weaponLocations.includes(weaponRandomNumber) && !treasureLocations.includes(weaponRandomNumber)) {
          console.log(`addingclass to ${weaponRandomNumber}`)
          getCellElement(weaponRandomNumber)
          const cellClassList = cellElement.classList
          // console.log(cellClassList)
          cellClassList.add('weapon')
          cellClassList.add('flash')
          // console.log(cellClassList.contains('weapon'))
          weaponLocations.push(weaponRandomNumber)
          //also push cells directly around me so two don't end up next to each other
          weaponLocations.push(weaponRandomNumber - 10)
          weaponLocations.push(weaponRandomNumber + 1)
          weaponLocations.push(weaponRandomNumber + 10)
          weaponLocations.push(weaponRandomNumber - 1)
        }
      }
      removeWeapons()
      console.log('weapons up')
    }, 3000)
  }


  function removeWeapons() {
    console.log(`starting remove timer ${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`)
    //clear weapon interval so it stops counting
    // clearInterval(intervalId)
    clearTimeout(addWeaponId)
    removeWeaponTimeout = setTimeout(() => {
      const weaponCells = document.querySelectorAll('.weapon')
      weaponCells.forEach(elem => {
        elem.classList.remove('weapon')
      })
      console.log('removeweapons ran')
      //start weapon timer again
      addWeapons()
      console.log(`ending remove timer ${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`)
      console.log('weapons down')
    }, 10000)
  }



  function addEnemies() {
    //remove any existing enemies
    document.querySelectorAll('.enemy').forEach(elem => {
      const currentEnemy = elem.classList
      currentEnemy.remove('enemy')
    })
    document.querySelectorAll('.enemy-killable').forEach(elem => {
      //currentEnemies.push(elem)
      const currentEnemy = elem.classList
      currentEnemy.remove('enemy-killable')
    })
    //create number of enemies
    const setEnemies = []
    // console.log(enemies)
    // console.log(setEnemies)
    if (level === 1) {
      setEnemies.push(enemies[0])
    }
    if (level === 2) {
      setEnemies.push(enemies[0])
      setEnemies.push(enemies[1])
    }
    if (level === 3) {
      setEnemies.push(enemies[0])
      setEnemies.push(enemies[1])
      setEnemies.push(enemies[2])
    }
    if (level === 4) {
      setEnemies.push(enemies[0])
      setEnemies.push(enemies[1])
      setEnemies.push(enemies[2])
      setEnemies.push(enemies[3])
    }
    //add enemies to cells
    for (let i = 0; i < setEnemies.length; i++) {
      getCellElement(setEnemies[i])
      cellElement.classList.add('enemy')
    }
  }

  function addPlayer() {
    //clear player
    if (document.querySelector('.player') || document.querySelector('.player-weapon')) {
      // console.log('player exists')
      // console.log(document.querySelector('.player'))
      // console.log(document.querySelector('.player-weapon'))
      if (document.querySelector('.player')) {
        const getPlayer = document.querySelector('.player').classList
        getPlayer.remove('player')
      }
      if (document.querySelector('.player-weapon')) {
        const getPlayer = document.querySelector('.player-weapon').classList
        getPlayer.remove('player-weapon')
      }
    }
    //add player
    const setPlayer = document.querySelector(`#cell-${playerHome}`).classList
    setPlayer.add('player')
  }

  // ==================================================
  // FUNCTIONS FOR TOKEN MOVEMENT
  // ==================================================

  function moveTokens(currentCellId, className, nextCellId) {
    // console.log(currentCellId, className, nextCellId)
    const currentCellElement = document.querySelector(`#cell-${currentCellId}`)
    // console.log( currentCellElement)
    currentCellElement.classList.remove(className)
    getCellElement(nextCellId)
    // console.log(cellElement)
    cellElement.classList.add(className)
  }

  function killEnemy(enemyCellId) {
    playerScore = playerScore + enemyValue
    document.querySelector('#player-score span').innerHTML = playerScore
    //enemy goes home
    moveTokens(enemyCellId, 'enemy-killable', enemyHome)
  }

  function moveEnemyCalculation(moveTo, replaceWithLoopVar) {
    if (moveTo.length === 0) { moveToCellId = replaceWithLoopVar.myCellId } //I have no viable options so I stay here
    else if (typeof moveTo === 'number') { moveToCellId = moveTo } //I have only one option (or I am next to a player) so I want to move there
    else {
      //get a random location to move to
      moveToCellId = moveTo[Math.floor(Math.random() * moveTo.length)]
    }
    // console.log(`I am in cell ${replaceWithLoopVar.myCellId} and I will move to ${moveToCellId}`)
  }

  function enemyKill(moveToCellId) {
    //return player home
    moveTokens(moveToCellId, 'player', playerHome)
    playerLives = playerLives - 1
    let myHeart
    // console.log(playerLives)
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
    // document.querySelector('#player-lives span').innerHTML = `<img src='assets/heart.png />`
  }


  function getWeapon() {
    console.log('weapon picked up')
    //stop weapon creation & removal timers
    // clearInterval(intervalId)
    clearTimeout(addWeaponId)
    clearTimeout(removeWeaponTimeout)
    console.log('clear weapon timers')
    //change state to killable
    enemyState = 'killable'
    //hide all weapons
    const weaponLocations = document.querySelectorAll('.weapon')
    weaponLocations.forEach(elem => {
      elem.classList.remove('weapon')
    })
    //change player class to player-weapon
    const playerLocation = document.querySelector('.player')
    const playerLocationClassList = playerLocation.classList
    playerLocationClassList.add('player-weapon')
    playerLocationClassList.remove('player')
    //change enemy class to enemy-killable
    const enemyLocations = document.querySelectorAll('.enemy')
    enemyLocations.forEach(elem => {
      elem.classList.remove('enemy')
      elem.classList.add('enemy-killable')
      elem.classList.add('flash')
      //show kill enemy message
      classListNotification.remove('hide')
      classListNotification.add('fade')
      document.querySelector('#alert').innerHTML = 'You have a sword, kill the dragons!'
    })
    //stop remove weapon timer
    //start enemies back to deadly timer
    deadlyEnemies()
  }



  function lootTreasure(thisCell) {

    //remove that treasure cell class
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
    //last treasure collected means level won
    if (document.querySelectorAll('.treasure-chest').length === 0) {
      levelWon()
    } else {
      return
    }
  }

  function deadlyEnemies() {
    deadlyTimeout = setTimeout(() => {
      soundEffect('./assets/dragon.mp3')
      // console.log('Im making things deadly soon')
      // console.log('enemies deadly')
      const enemyCells = document.querySelectorAll('.enemy-killable')
      enemyCells.forEach(elem => {
        elem.classList.remove('enemy-killable')
        elem.classList.add('enemy')
      })
      const playerCell = document.querySelector('.player-weapon').classList
      playerCell.remove('player-weapon')
      playerCell.add('player')
      enemyState = 'deadly'
      document.querySelector('#alert').innerHTML = ''
      // console.log('Im running addweapons')
      //start weapon timer again
      addWeapons()
    }, 5000)

  }


  // ==================================================
  // COLLISION LOGIC
  // ==================================================

  // Function(trigger) 
  // - player move
  // - weapon drop
  // - treasure drop
  // - start game 




  function collision(playerDirection) {
    // console.log(playerDirection)

    //set variables for this function
    let myRefArray
    let myRef
    let myId

    // console.log(arrLocation)
    // ===== FIND EVERYTHING & STORE LOCATION =====
    //PLAYER AND ENEMY (if deadly uses one class, if killable uses a different class)
    //make sure location array is empty for the loop
    arrLocation = [{ myRef: '', myCellId: 0, myClassList: '' }]

    //find everything and put in array
    if (enemyState === 'deadly') {
      myRef = document.querySelector('.player')
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': 'player', 'myCellId': myId, 'myClassList': myRef })

      myRefArray = document.querySelectorAll('.enemy')
      // console.log(myRefArray)
      myRefArray.forEach(elem => {
        myRef = elem
        myId = parseInt((myRef.id).split('-')[1])
        arrLocation.push({ 'myRef': 'enemy', 'myCellId': myId, 'myClassList': myRef })
      })
    } else if (enemyState === 'killable') {
      myRef = document.querySelector('.player-weapon')
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': 'player-weapon', 'myCellId': myId, 'myClassList': myRef })

      const myRefArray = document.querySelectorAll('.enemy-killable')
      myRefArray.forEach(elem => {
        myRef = elem
        myId = parseInt((myRef.id).split('-')[1])
        arrLocation.push({ 'myRef': 'enemy-killable', 'myCellId': myId, 'myClassList': myRef })
      })
    }
    //TREASURE AND WEAPON
    myRefArray = document.querySelectorAll('.treasure-chest')
    myRefArray.forEach(elem => {
      myRef = elem
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': 'treasure-chest', 'myCellId': myId, 'myClassList': myRef })
    })
    myRefArray = document.querySelectorAll('.weapon')
    myRefArray.forEach(elem => {
      myRef = elem
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': 'weapon', 'myCellId': myId, 'myClassList': myRef })
    })


    // ===== DETERMINE WHERE I CAN MOVE TO =====
    //for each myCellId in arrLocation
    // console.log(arrLocation)

    for (let loc = 0; loc < arrLocation.length; loc++) {
      const replaceWithLoopVar = arrLocation[loc]
      // console.log(arrLocation[loc])
      // console.log(`I am arrLocation position ${loc}, myCellId is ${replaceWithLoopVar.myCellId}, myRef is ${replaceWithLoopVar.myRef}`)
      //may sure moveTo array is empty and ready for this loop
      moveTo = []
      // console.log(moveTo)

      //get the walls of my cell
      myWalls = document.querySelector(('#cell-' + replaceWithLoopVar.myCellId)).classList
      //if there is no wall, then push the available cellIDs to my moveTo array
      if (!myWalls.contains('wall-top')) { moveTo.push(replaceWithLoopVar.myCellId - 10) } //I can move up
      if (!myWalls.contains('wall-right')) { moveTo.push(replaceWithLoopVar.myCellId + 1) } //I can move right
      if (!myWalls.contains('wall-bottom')) { moveTo.push(replaceWithLoopVar.myCellId + 10) } //I can move down
      if (!myWalls.contains('wall-left')) { moveTo.push(replaceWithLoopVar.myCellId - 1) } //I can move left

      // console.log(`my classes are ${myWalls}`)
      // console.log(`I can move to ${moveTo}`)

      //clear myWalls array ready for next loop
      myWalls = []

      // console.log(`my array location is ${arrLocation[loc]}, my walls are at ${myWalls}`)
      //loop through my new available cells for enemy move

      // console.log(replaceWithLoopVar.myRef)

      if (replaceWithLoopVar.myRef === 'enemy' || replaceWithLoopVar.myRef === 'enemy-killable') {
        for (let i = moveTo.length - 1; i >= 0; i--) {
          getCellElement(moveTo[i])
          const nextCellClasses = cellElement.classList
          // if cell contains an enemy & I am enemy : remove from array as I won't move there
          if ((replaceWithLoopVar.myRef === 'enemy' || replaceWithLoopVar.myRef === 'enemy-killable') &&
            (nextCellClasses.contains('enemy') || nextCellClasses.contains('enemy-killable'))) {
            moveTo.splice([i], 1)
          }
          //if cell contains a player and I am enemy and I am killable : I won't move there
          if (replaceWithLoopVar.myRef === 'enemy-killable' && nextCellClasses.contains('player-weapon')) {
            moveTo.splice([i], 1)
          }
          //if cell contains a player and I am enemy and I am deadly : I WANT TO move there
          if (replaceWithLoopVar.myRef === 'enemy' && nextCellClasses.contains('player')) {
            moveTo = moveTo[i]
            break //stop looping, I've found my direction
          }
        }
        //move enemies
        if (moveTo.length === 0) { moveToCellId = replaceWithLoopVar.myCellId } //I have no viable options so I stay here
        else if (typeof moveTo === 'number') { moveToCellId = moveTo } //I have only one option (or I am next to a player) so I want to move there
        else {
          //get a random location to move to
          moveToCellId = moveTo[Math.floor(Math.random() * moveTo.length)]
          moveEnemyCalculation(moveToCellId, replaceWithLoopVar.myRef)
        }
        if (replaceWithLoopVar.myRef === 'enemy') {
          moveTokens(replaceWithLoopVar.myCellId, replaceWithLoopVar.myRef, moveToCellId)
        } //deadly enemy moves first
        //if player in that location kill them
        // console.log(document.querySelector(`#cell-${moveToCellId}`))
        if ((document.querySelector(`#cell-${moveToCellId}`)).classList.contains('player')) {
          enemyKill(moveToCellId)
          break // no more moves this round
        }
      }


      //now loop for player move
      // console.log(replaceWithLoopVar.myRef)

      if (replaceWithLoopVar.myRef === 'player' || replaceWithLoopVar.myRef === 'player-weapon') {
        //get the cell ID I want to move to
        if (playerDirection === 'top') { moveToCellId = replaceWithLoopVar.myCellId - 10 }
        if (playerDirection === 'right') { moveToCellId = replaceWithLoopVar.myCellId + 1 }
        if (playerDirection === 'bottom') { moveToCellId = replaceWithLoopVar.myCellId + 10 }
        if (playerDirection === 'left') { moveToCellId = replaceWithLoopVar.myCellId - 1 }
        // console.log(`I am a player with a weapon, I am in cell ${replaceWithLoopVar.myCellId}, I want to move to ${playerDirection} ${moveToCellId}, I can move to ${moveTo}`)

        //can I move to the cell I want to move to?
        if (moveTo.includes(moveToCellId)) {
          // console.log('I can go there')
          //whats in that cell?
          getCellElement(moveToCellId)
          // console.log(`I am in cell ${replaceWithLoopVar.myCellId} I am looking at cell ${moveToCellId}. The class list for that cell is ${cellElement.classList}`)

          //is there a killable enemy?
          if ((cellElement.classList).contains('enemy-killable')) {
            killEnemy(moveToCellId)
            moveTokens(replaceWithLoopVar.myCellId, replaceWithLoopVar.myRef, moveToCellId)
            break //stop the loop if player kills an enemy!
          } else if ((cellElement.classList).contains('treasure-chest')) {
            lootTreasure(moveToCellId)
            moveTokens(replaceWithLoopVar.myCellId, replaceWithLoopVar.myRef, moveToCellId)
          } else if ((cellElement.classList).contains('weapon')) {
            getWeapon()
            moveTokens(replaceWithLoopVar.myCellId, 'player-weapon', moveToCellId)
            break
          } else if ((cellElement.classList).contains('enemy')) {
            // enemyKill(moveToCellId)
            console.log('player dumb')
          } else {
            //player can move to cell
            moveTokens(replaceWithLoopVar.myCellId, replaceWithLoopVar.myRef, moveToCellId)
          }
        } else {
          // console.log('no no ')
          //player tried to move into a wall
          return
        }
      } //player moves second
      if (replaceWithLoopVar.myRef === 'enemy-killable') {
        moveTokens(replaceWithLoopVar.myCellId, replaceWithLoopVar.myRef, moveToCellId)
      } //killable enemy moves last
    }


  }


  // ==================================================
  // INITIALISE
  // ==================================================


  // createBoard()
  start()
  nextLevel()




  // ==================================================
  // PLAYER MOVEMENT
  // ==================================================
  document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W' || e.keyCode === 38) { playerDirection = 'top' }
    else if (e.key === 'd' || e.key === 'D' || e.keyCode === 39) { playerDirection = 'right' }
    else if (e.key === 's' || e.key === 'S' || e.keyCode === 40) { playerDirection = 'bottom' }
    else if (e.key === 'a' || e.key === 'A' || e.keyCode === 37) { playerDirection = 'left' }
    else {
      return
    }

    // console.log(playerDirection)
    collision(playerDirection)
    return playerDirection
  })

  // ==================================================
  // START AND END THINGS
  // ==================================================


  //First load from splash screen
  document.querySelector('#load-game').addEventListener(('click'), () => {
    //hide landing page
    document.querySelector('#landing').classList.add('hide')
    //create board
    console.log('create')
    createBoard()
    //show grid page
    console.log('show grid')
    document.querySelector('#game').classList.remove('hide')
  })

  function start() {
    document.querySelector('#start').addEventListener('click', () => {
      const endNote = document.querySelector('#end-note').classList
      classListNotification.add('hide')
      classListNotification.remove('fade')
      endNote.add('hide')
      document.querySelector('#alert').innerHTML = ''
      document.querySelector('#game-result').innerHTML = ''
      document.querySelector('#final-score ').innerHTML = ''
      // console.log('clickedstart')
      addTreasureChests()
      addWeapons()
      addEnemies()
      addPlayer()
      enemyState = 'deadly'
      let myHeart = document.querySelector('.heart-one')
      myHeart.classList.add('heart')
      myHeart = document.querySelector('.heart-two')
      myHeart.classList.add('heart')
      myHeart = document.querySelector('.heart-three')
      myHeart.classList.add('heart')
      const startButton = document.querySelector('#start').classList
      startButton.add('hide')
    })
  }

  function nextLevel() {
    document.querySelector('#next-level').addEventListener('click', () => {
      level = level + 1
      const endNote = document.querySelector('#end-note').classList
      classListNotification.add('hide')
      classListNotification.remove('fade')
      endNote.add('hide')
      document.querySelector('#alert').innerHTML = ''
      document.querySelector('#game-result').innerHTML = ''
      document.querySelector('#final-score ').innerHTML = ''
      addTreasureChests()
      addWeapons()
      addEnemies()
      addPlayer()
      enemyState = 'deadly'
    })
  }

  function gameover() {
    // clearInterval(intervalId)
    clearTimeout(addWeaponId)
    clearTimeout(deadlyTimeout)
    clearTimeout(removeWeaponTimeout)
    const endNote = document.querySelector('#end-note').classList
    const nextLevelButton = document.querySelector('#next-level').classList
    const newGameButton = document.querySelector('#new-game').classList
    endNote.remove('hide')
    nextLevelButton.add('hide')
    newGameButton.remove('hide')
    document.querySelector('#game-result').innerHTML = 'Game Over'
    document.querySelector('#final-score ').innerHTML = `Your score ${playerScore}`
  }

  function levelWon() {
    if (level === maxLevels) {
      // clearInterval(intervalId)
      clearTimeout(addWeaponId)
      clearTimeout(deadlyTimeout)
      clearTimeout(removeWeaponTimeout)
      const endNote = document.querySelector('#end-note').classList
      const nextLevelButton = document.querySelector('#next-level').classList
      const newGameButton = document.querySelector('#new-game').classList
      // notificationUpdate.remove('hide')
      endNote.remove('hide')
      nextLevelButton.add('hide') // hidden when no more levels
      newGameButton.remove('hide') //show new game button
      document.querySelector('#alert').innerHTML = ''
      document.querySelector('#game-result').innerHTML = 'Congratulations, you have completed the final level!'
      document.querySelector('#final-score ').innerHTML = `Your score ${playerScore}`
    } else {
      // clearInterval(intervalId)
      clearTimeout(addWeaponId)
      clearTimeout(deadlyTimeout)
      clearTimeout(removeWeaponTimeout)
      // const notificationUpdate = document.querySelector('#notification').classList
      const endNote = document.querySelector('#end-note').classList
      const nextLevelButton = document.querySelector('#next-level').classList
      const newGameButton = document.querySelector('#new-game').classList
      // notificationUpdate.remove('hide')
      endNote.remove('hide')
      nextLevelButton.remove('hide')
      newGameButton.add('hide')
      document.querySelector('#alert').innerHTML = ''
      document.querySelector('#game-result').innerHTML = 'Level Complete'
      document.querySelector('#final-score ').innerHTML = `Your score ${playerScore}`
    }
  }

  document.querySelector('#new-game').addEventListener('click', () => {
    //probably a better way exists to do this
    location.reload()
  })

}

window.addEventListener('DOMContentLoaded', pacnam) 