

function pacnam() {

  // ===== CREATE STARTING VALUES =====

  const boardWidth = 10
  const boardSize = boardWidth ** 2
  const playerHome = Math.max(boardSize) - 1

  let cellIdRef
  let cellElement
  const arrLocation = [{ myRef: '', myCellId: 0, myClassList: '' }]
  let moveTo = []
  let moveToCellId

  const treasure = [12, 39, 75, 90] //this can be randomised later
  const weapons = [42, 66] //this can be randomised later

  let enemyState = 'deadly'


  // ==== CREATE ARRAYS FOR TOKEN TRACKING

  const enemies = [
    { enemyId: 0, homeId: 54, location: 54 },
    { enemyId: 1, homeId: 45, location: 45 },
    { enemyId: 3, homeId: 55, location: 55 }
  ]




  // ==== GET ELEMENTS NEEDED ====

  const grid = document.querySelector('#grid') //position on html to create the cells

  //get cell element from refNumber
  function getCellElement(numRef) {
    cellIdRef = '#cell-' + numRef
    cellElement = document.querySelector(cellIdRef)
    return cellElement
  }



  // ==================================================
  // CREATE GAME BOARD
  // ==================================================

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
  function addTreasureChests() {
    //called by start game 
    for (let i = 0; i < treasure.length; i++) {
      getCellElement(treasure[i])
      cellElement.classList.add('treasure-chest')
    }
  }

  function addWeapons() {
    for (let i = 0; i < weapons.length; i++) {
      getCellElement(weapons[i])
      cellElement.classList.add('weapon')
    }
  }

  function addEnemies() {
    for (let i = 0; i < enemies.length; i++) {
      getCellElement(enemies[i].homeId)
      cellElement.classList.add('enemy')
    }
  }





  // ==================================================
  // COLLISION LOGIC
  // ==================================================

  // Function(trigger) 
  // - player move
  // - weapon drop
  // - treasure drop
  // - start game 

  function collision() {
    //TESTING
    // enemyState = 'killable'
    // document.querySelector('#cell-54').classList.add('enemy-killable')
    document.querySelector('#cell-98').classList.add('enemy')
    // document.querySelector('#cell-99').classList.add('player-weapon')

    //set variables for this function
    let myRefArray
    let myRef
    let myId

    // ===== CHECK CELLS AROUND ME =====
    //PLAYER AND ENEMY (if deadly uses one class, if killable uses a different class)
    if (enemyState === 'deadly') {
      myRef = document.querySelector('.player')
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': '.player', 'myCellId': myId, 'myClassList': myRef })

      myRefArray = document.querySelectorAll('.enemy')
      myRefArray.forEach(elem => {
        myRef = elem
        myId = parseInt((myRef.id).split('-')[1])
        arrLocation.push({ 'myRef': '.enemy', 'myCellId': myId, 'myClassList': myRef })
      })
    } else if (enemyState === 'killable') {
      myRef = document.querySelector('.player-weapon')
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': '.player-weapon', 'myCellId': myId, 'myClassList': myRef })

      const myRefArray = document.querySelectorAll('.enemy-killable')
      myRefArray.forEach(elem => {
        myRef = elem
        myId = parseInt((myRef.id).split('-')[1])
        arrLocation.push({ 'myRef': '.enemy-killable', 'myCellId': myId, 'myClassList': myRef })
      })
    }
    //TREASURE AND WEAPON
    myRefArray = document.querySelectorAll('.treasure-chest')
    myRefArray.forEach(elem => {
      myRef = elem
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': '.treasure-chest', 'myCellId': myId, 'myClassList': myRef })
    })
    myRefArray = document.querySelectorAll('.weapon')
    myRefArray.forEach(elem => {
      myRef = elem
      myId = parseInt((myRef.id).split('-')[1])
      arrLocation.push({ 'myRef': '.weapon', 'myCellId': myId, 'myClassList': myRef })
    })


    // ===== DETERMINE WHERE I CAN MOVE TO =====
    //for each myCellId in arrLocation
    //start with one
    console.log(arrLocation)
    const replaceWithLoopVar = arrLocation[4]
    //trigger is a userkeypress, but we move enemy first


    //get the walls of my cell
    const myWalls = document.querySelector(('#cell-' + replaceWithLoopVar.myCellId)).classList
    //if there is no wall, then push the available cellIDs to my moveTo array
    if (!myWalls.contains('wall-top')) { moveTo.push(replaceWithLoopVar.myCellId - 10) } //I can move up
    if (!myWalls.contains('wall-right')) { moveTo.push(replaceWithLoopVar.myCellId + 1) } //I can move right
    if (!myWalls.contains('wall-bottom')) { moveTo.push(replaceWithLoopVar.myCellId + 10) } //I can move down
    if (!myWalls.contains('wall-left')) { moveTo.push(replaceWithLoopVar.myCellId - 1) } //I can move left

    //loop through my new available cells for enemy move
    if (replaceWithLoopVar.myRef === '.enemy' || replaceWithLoopVar.myRef === '.enemy-killable') {
      for (let i = moveTo.length - 1; i >= 0; i--) {
        getCellElement(moveTo[i])
        const nextCellClasses = cellElement.classList
        // if cell contains an enemy & I am enemy : remove from array as I won't move there
        if ((replaceWithLoopVar.myRef === '.enemy' || replaceWithLoopVar.myRef === '.enemy-killable') &&
          (nextCellClasses.contains('enemy') || nextCellClasses.contains('enemy-killable'))) {
          moveTo.splice([i], 1)
        }
        //if cell contains a player and I am enemy and I am killable : I won't move there
        if (replaceWithLoopVar.myRef === '.enemy-killable' && nextCellClasses.contains('player-weapon')) {
          moveTo.splice([i], 1)
        }
        //if cell contains a player and I am enemy and I am deadly : I WANT TO move there
        if (replaceWithLoopVar.myRef === '.enemy' && nextCellClasses.contains('player')) {
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
      }
      console.log(`I am in cell ${replaceWithLoopVar.myCellId} and I will move to ${moveToCellId}`)
    }


    //now loop for player move
    if (replaceWithLoopVar.myRef === '.player' || replaceWithLoopVar.myRef === '.player-weapon') {
      console.log(`I am a player`)
    }

    //if I am a player and I move to a cell with a deadly enemy on it, I die
    //if I am a player and I move to a cell with a killable enemy on it, I kill it
    //if I am a player and I move to a cell with a treasure chest on it, I loot it
    //if I am a player and I move to a cell with a weapon on it, I have a sword and enemies will die







    //select position for enemy to move to


    //call move token and pass moveToCellId, myClassName






    // console.log(`I am cell ${replaceWithLoopVar.myCellId}, I am checking the moveTo array item number ${[i]}
    // that array item is cell ${moveTo[i]} element has the following classes ${nextCellClasses}`)
    // console.log(`Does cell ${moveTo[i]} have an enemy in it? ${nextCellClasses.contains('enemy')}`)



    //ENEMY MOVES
    //enemy moves to enemy : don't move there, remove from array
    //enemy killable moves to enemy killable : don't move there, remove from array
    //enemy killable moves to player : don't move there, remove from array
    //enemy moves to player : GO HERE AND KILL THEM

    //PLAYER MOVES
    //w, W, uparrow : if cell available go up
    //d, D, right arrow: if cell available go right
    //s, S, down arrow: if cell available go down
    //a, A, left arrow: if cell available go left






  }





  // Loop through this array and do the followong

  // Get classes and I'd of cells around me and me
  // Make move to array of movable cells
  // - if my cell has wall too, remove top cell I'd from move to array

  // Check cells around me
  // - if I am [class type] and there is [class type] in next cell remove from move to array

  // Now I have array of moveable cells

  // //determine if enemy wants to hit player or run away
  // If enemy cell has a player in move to array
  // Then if enemy deadly move to that cell
  // Else if enemy killable remove that cell from array
  // If enemy and no cells available in move to array then do not move
  // Else randomly pick cell and move to it


  // Get player keypress move direction
  // If not in move to array do nothing
  // If is in move to array then
  // Is there a class in next cell
  // - if yes take actuon
  // -- killable enemu
  // -- treasure
  // -- weapon
  // -- enemy
  // And move player accordingly




  // ==================================================
  // INITIALISE
  // ==================================================


  createBoard()
  addTreasureChests()
  addWeapons()
  addEnemies()
  document.querySelector(`#cell-${playerHome}`).classList.add('player')

  collision()

  //testing, can remove these

}
window.addEventListener('DOMContentLoaded', pacnam)