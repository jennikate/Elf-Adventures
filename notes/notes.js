// Pac Man

// ====== GAME BOARD =====
// create an initial 'easy' board
// when a board has been 'won' create next level board that is x% bigger


// ===== FOODS =====
// on board creation set the food to eat
// to make this different maybe it's not every spot that needs eating but certain boxes that you need to travel to
// in that case the food boxes would need to be placed in positions that make you traverse the entire board
// food boxes need to be accessible by player

// at random intervals create a special food
// if special food is eaten then ghosts are eatable
// to make this different maybe player picks up a weapon and can kill an enemy rather than eat the ghost
// a more advanced version might offer different weapons, eg a sword needs to be in the adjacent square to kill, a wand can shoot a fireball 4 squares away etc


// ===== GHOSTS =====
// need a 'home' position to start from
// need to become 'killable' when the weapon is collected
// when killed, needs to regenerate at their home position
// need to be able to kill a player if they enter the same square as them :: which reduces player lives
// need to always be moving towards the player


// ===== PLAYER =====
// needs a starting position
// needs to be able to start the game
// needs to be able to move up down left right
// needs to be able to eat the food boxes :: which adds to their score
// needs to be able to collect a weapon
// needs to be able to kill a ghost
// needs to be able to finish a level
// needs a number of lives


//=============================================================

// ===== BOARD CREATION =====

// generate an x by x grid
// make certain squares walls :: this does not need to be random
// make it possible to go from top of grid to bottom of grid or side to side
// ideally make the board shape mirrored
// make the center of the board a 'home' space for the enemy
// make a square the home space for the player

// ===== ON START =====

// user clicks start
// user has 5 lives
// enemies are placed in their home
// user is placed on their home
// food is placed

// ===== FOOD PLACEMENT =====

// on board creation set y number of food boxes randomly about the board
// start a timeout to drop weapons on the board
// start a timeout to remove weapons if uncollected


// ===== GAME PLAY =====

// user can move up, down, left, right provided there is no wall in that direction
// enemy can move up, down, left, right provided there is no wall in that direction
// for every square a user moves, the ghosts also move a square

// at game start, each ghost must move one square in a different direction out of their home
// each time the player moves, the ghosts should move in a direction that is 'towards' the player s

// when timeout arrives, drop [x] weapons on the board randomly
// these cannot be on top of food, ghosts, or player, they must go in an empty square
// if user does not collect a weapon after [y] time they disappear and the drop weapon timeout starts again
// if user collects a weapon, the other weapons disappear and the drop weapon timeout starts again
// enemies change colour and become killable
// the killable timeout starts
// user must enter the square of enemy to kill it
// if killed enemy goes home
// enemies continue to move in their normal pattern??
// when killable timeout ends enemies return to normal color and are no longer killable
// for every enemy killed user gets [z] points (maybe)

// when an enemy enters the square of the player
// player loses 1 life
// player returns home
// if player has 0 lives game ends with a game over message and score displayed

// when player enters square of a food box
// player gets [x] points added to score
// if there are 0 food boxes left level ends with a score displayed message and a 'continue button'
// if continue clicked next level loads