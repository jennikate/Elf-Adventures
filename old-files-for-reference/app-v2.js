// /* eslint-disable brace-style */


// function pacnam() {

//   // ===== CREATE STARTING VALUES =====

//   const boardWidth = 10
//   const boardSize = boardWidth ** 2
//   const playerHome = Math.max(boardSize) - 1

//   let cellIdRef
//   let cellElement
//   const arrLocation = [{ myRef: '', myCellId: 0, myClassList: '' }]
//   let moveTo = []
//   let moveToCellId
//   let playerDirection
//   let replaceWithLoopVar

//   const treasure = [12, 39, 75, 90] //this can be randomised later
//   const weapons = [42, 66] //this can be randomised later

//   let enemyState = 'deadly'
//   const enemyHome = 54 //only one can die at a time so same home for all



//   // ==== CREATE THINGS FOR TOKEN MOVEMENTS

//   const enemies = [
//     { enemyId: 0, homeId: 54, location: 54 },
//     { enemyId: 1, homeId: 45, location: 45 },
//     { enemyId: 3, homeId: 55, location: 55 } //I think I can remove enemyId and location
//   ]

//   function moveTokens(currentCellId, className, nextCellId) {
//     console.log(currentCellId, className, nextCellId)
//     const currentCellElement = document.querySelector(`#cell-${currentCellId}`)
//     // console.log( currentCellElement)

//     currentCellElement.classList.remove(className)
//     getCellElement(nextCellId)
//     // console.log(cellElement)
//     cellElement.classList.add(className)
//   }

//   function killEnemy(enemyCellId) {
//     //player gets 20 points
//     //enemy goes home
//     moveTokens(enemyCellId, 'enemy-killable', enemyHome)
//   }

//   function moveEnemyCalculation(moveTo, replaceWithLoopVar) {
//     if (moveTo.length === 0) { moveToCellId = replaceWithLoopVar.myCellId } //I have no viable options so I stay here
//     else if (typeof moveTo === 'number') { moveToCellId = moveTo } //I have only one option (or I am next to a player) so I want to move there
//     else {
//       //get a random location to move to
//       moveToCellId = moveTo[Math.floor(Math.random() * moveTo.length)]
//     }
//     // console.log(`I am in cell ${replaceWithLoopVar.myCellId} and I will move to ${moveToCellId}`)
//   }



//   // ==== GET ELEMENTS NEEDED ====

//   const grid = document.querySelector('#grid') //position on html to create the cells

//   //get cell element from refNumber
//   function getCellElement(numRef) {
//     cellIdRef = '#cell-' + numRef
//     cellElement = document.querySelector(cellIdRef)
//     return cellElement
//   }



//   // ==================================================
//   // CREATE GAME BOARD
//   // ==================================================

//   // DECLARE WALL POSITIONS
//   //create array of objects to say which borders have walls
//   const walls = [
//     { cellId: 0, top: true, right: false, bottom: false, left: true },
//     { cellId: 1, top: true, right: false, bottom: true, left: false },
//     { cellId: 2, top: true, right: false, bottom: false, left: false },
//     { cellId: 3, top: true, right: false, bottom: true, left: false },
//     { cellId: 4, top: true, right: true, bottom: false, left: false },
//     { cellId: 5, top: true, right: false, bottom: false, left: true },
//     { cellId: 6, top: true, right: false, bottom: true, left: false },
//     { cellId: 7, top: true, right: false, bottom: false, left: false },
//     { cellId: 8, top: true, right: false, bottom: true, left: false },
//     { cellId: 9, top: true, right: true, bottom: false, left: false },

//     { cellId: 10, top: false, right: true, bottom: false, left: true },
//     { cellId: 11, top: true, right: true, bottom: true, left: true },
//     { cellId: 12, top: false, right: true, bottom: false, left: true },
//     { cellId: 13, top: true, right: true, bottom: true, left: true },
//     { cellId: 14, top: false, right: true, bottom: false, left: true },
//     { cellId: 15, top: false, right: true, bottom: false, left: true },
//     { cellId: 16, top: true, right: true, bottom: true, left: true },
//     { cellId: 17, top: false, right: true, bottom: false, left: true },
//     { cellId: 18, top: true, right: true, bottom: true, left: true },
//     { cellId: 19, top: false, right: true, bottom: false, left: true },

//     { cellId: 20, top: false, right: false, bottom: false, left: true },
//     { cellId: 21, top: true, right: false, bottom: true, left: false },
//     { cellId: 22, top: false, right: false, bottom: false, left: false },
//     { cellId: 23, top: true, right: false, bottom: false, left: false },
//     { cellId: 24, top: false, right: false, bottom: true, left: false },
//     { cellId: 25, top: false, right: false, bottom: true, left: false },
//     { cellId: 26, top: true, right: false, bottom: false, left: false },
//     { cellId: 27, top: false, right: false, bottom: false, left: false },
//     { cellId: 28, top: true, right: false, bottom: true, left: false },
//     { cellId: 29, top: false, right: true, bottom: false, left: false },

//     { cellId: 30, top: false, right: false, bottom: true, left: true },
//     { cellId: 31, top: true, right: false, bottom: true, left: false },
//     { cellId: 32, top: false, right: true, bottom: false, left: false },
//     { cellId: 33, top: false, right: false, bottom: true, left: true },
//     { cellId: 34, top: true, right: true, bottom: false, left: false },
//     { cellId: 35, top: true, right: false, bottom: false, left: true },
//     { cellId: 36, top: false, right: true, bottom: true, left: false },
//     { cellId: 37, top: false, right: false, bottom: false, left: true },
//     { cellId: 38, top: true, right: false, bottom: true, left: false },
//     { cellId: 39, top: false, right: true, bottom: true, left: false },

//     { cellId: 40, top: true, right: false, bottom: false, left: true },
//     { cellId: 41, top: true, right: true, bottom: true, left: false },
//     { cellId: 42, top: false, right: true, bottom: false, left: true },
//     { cellId: 43, top: true, right: false, bottom: false, left: true },
//     { cellId: 44, top: false, right: false, bottom: false, left: false },
//     { cellId: 45, top: false, right: false, bottom: false, left: false },
//     { cellId: 46, top: true, right: true, bottom: false, left: false },
//     { cellId: 47, top: false, right: true, bottom: false, left: true },
//     { cellId: 48, top: true, right: false, bottom: true, left: true },
//     { cellId: 49, top: true, right: true, bottom: false, left: false },

//     { cellId: 50, top: false, right: false, bottom: true, left: true },
//     { cellId: 51, top: true, right: false, bottom: true, left: false },
//     { cellId: 52, top: false, right: false, bottom: false, left: false },
//     { cellId: 53, top: false, right: true, bottom: false, left: false },
//     { cellId: 54, top: false, right: false, bottom: true, left: true },
//     { cellId: 55, top: false, right: true, bottom: true, left: false },
//     { cellId: 56, top: false, right: false, bottom: false, left: true },
//     { cellId: 57, top: false, right: false, bottom: false, left: false },
//     { cellId: 58, top: true, right: false, bottom: true, left: false },
//     { cellId: 59, top: false, right: true, bottom: true, left: false },

//     { cellId: 60, top: true, right: false, bottom: false, left: true },
//     { cellId: 61, top: true, right: false, bottom: false, left: false },
//     { cellId: 62, top: false, right: true, bottom: false, left: false },
//     { cellId: 63, top: false, right: false, bottom: false, left: true },
//     { cellId: 64, top: true, right: false, bottom: true, left: false },
//     { cellId: 65, top: true, right: false, bottom: true, left: false },
//     { cellId: 66, top: false, right: true, bottom: false, left: false },
//     { cellId: 67, top: false, right: false, bottom: false, left: true },
//     { cellId: 68, top: true, right: false, bottom: false, left: false },
//     { cellId: 69, top: true, right: true, bottom: false, left: false },

//     { cellId: 70, top: false, right: false, bottom: false, left: true },
//     { cellId: 71, top: false, right: false, bottom: true, left: false },
//     { cellId: 72, top: false, right: false, bottom: false, left: false },
//     { cellId: 73, top: false, right: false, bottom: true, left: false },
//     { cellId: 74, top: true, right: true, bottom: false, left: false },
//     { cellId: 75, top: true, right: false, bottom: false, left: true },
//     { cellId: 76, top: false, right: false, bottom: true, left: false },
//     { cellId: 77, top: false, right: false, bottom: false, left: false },
//     { cellId: 78, top: false, right: false, bottom: true, left: false },
//     { cellId: 79, top: false, right: true, bottom: false, left: false },

//     { cellId: 80, top: false, right: false, bottom: false, left: true },
//     { cellId: 81, top: true, right: true, bottom: false, left: false },
//     { cellId: 82, top: false, right: false, bottom: false, left: true },
//     { cellId: 83, top: true, right: false, bottom: false, left: false },
//     { cellId: 84, top: false, right: false, bottom: true, left: false },
//     { cellId: 85, top: false, right: false, bottom: true, left: false },
//     { cellId: 86, top: true, right: false, bottom: false, left: false },
//     { cellId: 87, top: false, right: true, bottom: false, left: false },
//     { cellId: 88, top: true, right: false, bottom: false, left: true },
//     { cellId: 89, top: false, right: true, bottom: false, left: false },

//     { cellId: 90, top: false, right: false, bottom: true, left: true },
//     { cellId: 91, top: false, right: false, bottom: true, left: false },
//     { cellId: 92, top: false, right: false, bottom: true, left: false },
//     { cellId: 93, top: false, right: false, bottom: true, left: false },
//     { cellId: 94, top: true, right: false, bottom: true, left: false },
//     { cellId: 95, top: true, right: false, bottom: true, left: false },
//     { cellId: 96, top: false, right: false, bottom: true, left: false },
//     { cellId: 97, top: false, right: false, bottom: true, left: false },
//     { cellId: 98, top: false, right: false, bottom: true, left: false },
//     { cellId: 99, top: false, right: true, bottom: true, left: false }
//   ]

//   // GAME BOARD 
//   function createBoard() {
//     for (let i = 0; i < boardSize; i++) {
//       const cell = document.createElement('div')
//       cell.classList.add('cell')
//       cell.setAttribute('id', 'cell-' + [i])
//       grid.appendChild(cell)
//     }
//     //add walls based on the wall array
//     makeWalls()
//   }

//   // MAKE WALLS
//   function makeWalls() {
//     for (let i = 0; i < walls.length; i++) {
//       //get the cell that relates to this wall
//       getCellElement(walls[i].cellId)
//       //check the array to see what borders are needed and add them
//       if (walls[i].top === true) {
//         cellElement.classList.add('wall-top')
//       }
//       if (walls[i].right === true) {
//         cellElement.classList.add('wall-right')
//       }
//       if (walls[i].bottom === true) {
//         cellElement.classList.add('wall-bottom')
//       }
//       if (walls[i].left === true) {
//         cellElement.classList.add('wall-left')
//       }
//     }
//   }

//   // SET INITIAL POSITIONS
//   function addTreasureChests() {
//     //called by start game 
//     for (let i = 0; i < treasure.length; i++) {
//       getCellElement(treasure[i])
//       cellElement.classList.add('treasure-chest')
//     }
//   }

//   function addWeapons() {
//     for (let i = 0; i < weapons.length; i++) {
//       getCellElement(weapons[i])
//       cellElement.classList.add('weapon')
//     }
//   }

//   function addEnemies() {
//     for (let i = 0; i < enemies.length; i++) {
//       getCellElement(enemies[i].homeId)
//       cellElement.classList.add('enemy')
//     }
//   }





//   // ==================================================
//   // COLLISION LOGIC
//   // ==================================================



//   // ===== MAKE AN ARRAY OF WHERE EVERYTHING IS =====
//   function makeCellStatusArray() {
//     //set variables for this function
//     let myRefArray
//     let myRef
//     let myId

//     //PLAYER AND ENEMY (if deadly uses one class, if killable uses a different class)
//     if (enemyState === 'deadly') {
//       myRef = document.querySelector('.player')
//       myId = parseInt((myRef.id).split('-')[1])
//       arrLocation.push({ 'myRef': 'player', 'myCellId': myId, 'myClassList': myRef })
      
//       myRefArray = document.querySelectorAll('.enemy')
//       myRefArray.forEach(elem => {
//         myRef = elem
//         myId = parseInt((myRef.id).split('-')[1])
//         arrLocation.push({ 'myRef': 'enemy', 'myCellId': myId, 'myClassList': myRef })
//       })
//     } else if (enemyState === 'killable') {
//       myRef = document.querySelector('.player-weapon')
//       myId = parseInt((myRef.id).split('-')[1])
//       arrLocation.push({ 'myRef': 'player-weapon', 'myCellId': myId, 'myClassList': myRef })

//       const myRefArray = document.querySelectorAll('.enemy-killable')
//       myRefArray.forEach(elem => {
//         myRef = elem
//         myId = parseInt((myRef.id).split('-')[1])
//         arrLocation.push({ 'myRef': 'enemy-killable', 'myCellId': myId, 'myClassList': myRef })
//       })
//     }
//     //TREASURE AND WEAPON
//     myRefArray = document.querySelectorAll('.treasure-chest')
//     myRefArray.forEach(elem => {
//       myRef = elem
//       myId = parseInt((myRef.id).split('-')[1])
//       arrLocation.push({ 'myRef': 'treasure-chest', 'myCellId': myId, 'myClassList': myRef })
//     })
//     myRefArray = document.querySelectorAll('.weapon')
//     myRefArray.forEach(elem => {
//       myRef = elem
//       myId = parseInt((myRef.id).split('-')[1])
//       arrLocation.push({ 'myRef': 'weapon', 'myCellId': myId, 'myClassList': myRef })
//     })
//     // console.log(arrLocation)

//   }

  

//   //A LOOP WILL GO AROUND THIS EVENTUALLY, STARTING WITH ONE FOR NOW

//   // ===== DETERMINE WHERE THE WALLS ARE =====
//   //for each myCellId in arrLocation
//   //start with one
//   function findWalls() {
//     console.log(`the location array: ${arrLocation}`)
//     // replaceWithLoopVar = arrLocation[1]

//     // console.log(replaceWithLoopVar.myCellId)
//     // console.log(replaceWithLoopVar.myRef)

//     //get the walls of my cell
//     const myWalls = document.querySelector(('#cell-' + replaceWithLoopVar.myCellId)).classList
//     //if there is no wall, then push the available cellIDs to my moveTo array
//     if (!myWalls.contains('wall-top')) { moveTo.push(replaceWithLoopVar.myCellId - 10) } //I can move up
//     if (!myWalls.contains('wall-right')) { moveTo.push(replaceWithLoopVar.myCellId + 1) } //I can move right
//     if (!myWalls.contains('wall-bottom')) { moveTo.push(replaceWithLoopVar.myCellId + 10) } //I can move down
//     if (!myWalls.contains('wall-left')) { moveTo.push(replaceWithLoopVar.myCellId - 1) } //I can move left


//     // console.log(replaceWithLoopVar)
//     return replaceWithLoopVar
//   }




//   function moveEnemy() {
//     // console.log(replaceWithLoopVar)
//     //loop through my new available cells for enemy move
//     if (replaceWithLoopVar.myRef === 'enemy' || replaceWithLoopVar.myRef === 'enemy-killable') {
//       for (let i = moveTo.length - 1; i >= 0; i--) {
//         getCellElement(moveTo[i])
//         const nextCellClasses = cellElement.classList
//         // if cell contains an enemy & I am enemy : remove from array as I won't move there
//         if ((replaceWithLoopVar.myRef === '.enemy' || replaceWithLoopVar.myRef === '.enemy-killable') &&
//           (nextCellClasses.contains('enemy') || nextCellClasses.contains('enemy-killable'))) {
//           moveTo.splice([i], 1)
//         }
//         //if cell contains a player and I am enemy and I am killable : I won't move there
//         if (replaceWithLoopVar.myRef === 'enemy-killable' && nextCellClasses.contains('player-weapon')) {
//           moveTo.splice([i], 1)
//         }
//         //if cell contains a player and I am enemy and I am deadly : I WANT TO move there
//         if (replaceWithLoopVar.myRef === 'enemy' && nextCellClasses.contains('player')) {
//           moveTo = moveTo[i]
//           break //stop looping, I've found my direction
//         }
//         moveEnemyCalculation(moveTo, replaceWithLoopVar)
//         moveTokens(replaceWithLoopVar.myCellId, replaceWithLoopVar.myRef, moveToCellId)
//       }
//     }
//   }

//   //now loop for player move
//   // console.log(replaceWithLoopVar.myRef)
//   function movePlayer(playerDirection) {
//     if (replaceWithLoopVar.myRef === 'player' || replaceWithLoopVar.myRef === 'player-weapon') {
//       //get the cell ID I want to move to
//       if (playerDirection === 'top') { moveToCellId = replaceWithLoopVar.myCellId - 10 }
//       if (playerDirection === 'right') { moveToCellId = replaceWithLoopVar.myCellId + 1 }
//       if (playerDirection === 'bottom') { moveToCellId = replaceWithLoopVar.myCellId + 10 }
//       if (playerDirection === 'left') { moveToCellId = replaceWithLoopVar.myCellId - 1 }
//       // console.log(`I am a player with a weapon, I am in cell ${replaceWithLoopVar.myCellId}, I want to move to ${playerDirection} ${moveToCellId}, I can move to ${moveTo}`)

//       //can I move to the cell I want to move to?
//       if (moveTo.includes(moveToCellId)) {
//         // console.log('I can go there')
//         //whats in that cell?
//         getCellElement(moveToCellId)
//         // console.log(`I am in cell ${replaceWithLoopVar.myCellId} I am looking at cell ${moveToCellId}. The class list for that cell is ${cellElement.classList}`)

//         //is there a killable enemy?
//         if ((cellElement.classList).contains('enemy-killable')) {
//           //kill enemy function
//           killEnemy(moveToCellId)
//           //move player function

//         } else if ((cellElement.classList).contains('treasure-chest')) {
//           //is there a treasure chest?
//         } else if ((cellElement.classList).contains('weapon')) {
//           //is there a weapon?
//         } else if ((cellElement.classList).contains('enemy')) {
//           //is there an enemy
//         }
//       } else {
//         // console.log('no no ')
//         //player tried to move into a wall
//         return
//       }
//     }
//     moveTokens(replaceWithLoopVar.myCellId, replaceWithLoopVar.myRef, moveToCellId)
//   }


//   // ==================================================
//   // INITIALISE
//   // ==================================================


//   createBoard()
//   addTreasureChests()
//   addWeapons()
//   addEnemies()
//   document.querySelector(`#cell-${playerHome}`).classList.add('player')


//   //testing, can remove these

//   // enemyState = 'killable'
//   // // document.querySelector('#cell-54').classList.add('enemy-killable')
//   // document.querySelector('#cell-98').classList.add('enemy-killable')
//   // document.querySelector('#cell-99').classList.add('player-weapon')
//   // document.querySelector('#cell-99').classList.remove('player')

//   // ==================================================
//   // PLAYER MOVEMENT
//   // ==================================================
//   document.addEventListener('keyup', (e) => {
//     if (e.key === 'w' || e.key === 'W') { playerDirection = 'top' }
//     else if (e.key === 'd' || e.key === 'D') { playerDirection = 'right' }
//     else if (e.key === 's' || e.key === 'S') { playerDirection = 'bottom' }
//     else if (e.key === 'a' || e.key === 'A') { playerDirection = 'left' }
//     else {
//       return
//     }

//     // console.log(playerDirection)
//     makeCellStatusArray()
//     console.log(arrLocation)
//     findWalls(arrLocation)
//     return playerDirection
//   })


//   // findWalls()
//   // moveEnemy()
//   // movePlayer(playerDirection)

// }

// window.addEventListener('DOMContentLoaded', pacnam) 