// ORIGINAL PSEUDO CODE

//===============================

// ===== PAGELOAD : GENERATE ASSETS =====

// set level number to 1
// (create game board)
// set user score to 0
// set user lives to 5
// show 'new game' button

// ===== PAGELOAD : GENERATE ASSETS =====

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





// ===== (START LEVEL) : GAME READY ===== 

// (create food boxes)
// create number of enemies based on level (level * x) :: maybe
// send enemies home
// send player home
// start weapon timeout
// show countdown and go messages (3, 2, 1, go)

// ===== GAME PLAYING =====

// Player movement and enemy movement adjust array

//PLAYER MOVE
// on player move attempt
// is moving into a wall then do not allow move, do nothing, assume user figures it out 
// is moved then 
// switch if 
// case empty square: move player icon to that square, function (move enemy)
// case food square: move player icon to that square, function (remove foodbox inc score), function (move enemy)
// case enemy square (not-killable): function (remove life inc send player home), function (move enemy)
// case enemy square (is-killable) : move player icon to that square, increase playerscore, function (send enemy home))
// case weapon square: move player icon to that square, function (make enemy killable), function (move enemy), (remove weapons)

// (move enemy)
// if not killable and
// next to player square: move enemy to player square, function (remove life inc send player home)
// not next to player square:
// above player square && no wall below: move enemy down one square
// below player square && no wall above: move enemy up one square
// left of player square && no wall to right: move enemy right one square
// right of player square && no wall to left: move enemy left one square
// if there is a wall in the prefered direction then move enemy in following order to the first available square found : up, down, left, right
// [this should be improved I think with better logic as to which way to go if there are walls]
// if there is food or weapon in prefered direction enemy stands on it for that turn, and when they leave the item remains

// (remove foodbox)
// increase player score by value of foodbox
// remove foodbox class
// foodbox count - 1
// if foodboxes = 0 then (end level) else continue

// (remove life)
// player icon returned to their home square
// remove a player life
// if player life = 0 then (end game) else continue

// (make enemy killable)
// enemy change colour
// message shown on screen to advise killable
// maybe move enemy logic is reversed???
// set timeout for (endkillable)

// (end level)
// occurs when foodboxes = 0
// show level won message
// show player score
// increase difficulty by 1
// (create game board)
// show ready button
// on ready button click (start level)

// (endkillable) :: occurs at a timeout
// return enemy to normal colour
// remove killable message
// if have reversed enemy move logic then put it back to normal
// set timeout for (drop weapons)

//(drop weapons) :: occurs at a timeout
// generate [x] weapons - calculate number based on size of board
// generate random position for a weapon
// if that square is occupied (wall, player, enemy, or foodbox) then generate new position
// when found empty square set weapon class
// set (remove weapons) timeout

//(remove weapons) :: occurs at at timeout or on use
// remove weapon icons from board
// set (drop weapons) timeout

//(create food boxes)
// set number of foodboxes to create based on level (level * [x])
// generate random position for a food box [or maybe they have set positions???]
// if that square is occupied (wall, player, enemy home) then generate new position
// when found empty square set foodbox class

//(end game)
// show game over message
// show player score
// show 'new game' button
// [future] show leaderboard
