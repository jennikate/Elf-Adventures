# Project 1: Elf Adventures

## Overview
Elf Adventures is a browser based maze style game. Move your elf through the maze collecting the treasure and avoiding the dragons. Along the way you may find weapons which will allow you to kill the dragons... until the weapons break!

This was my first project with General Assembly's Software Engineering Immersive. An individual project built over a week it focused on JavaScript, with HTML and CSS.

[Open and play on GitHub Pages.](https://jennikate.github.io/project-1/)

[Check out the GitHub Repo here.](https://github.com/jennikate/project-1)

![gif of Elf Adventures](https://github.com/jennikate/project-1/blob/master/reademe-assets/elfAdvenutres-Demo.gif?raw=true)


## Brief

- Render a game in the browser
- Switch turns between two players
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use Javascript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

There was a choice of starting game styles to work with, and then customise to be your own. I chose the PacMan style game which included these requirements:

- The player should be able to clear at least one board
- The player's score should be displayed at the end of the game

# Technologies Used

- HTML5 & audio
- CSS3 with animation
- JavaScript (ES6)
- Git
- GitHub
- Google Fonts & FontAwesome

# Approach Taken
### Grid Layout

I decided early on that I would limit v1 to a 100 cell grid, and that the walls of my maze would be added by using border-top, border-right, border-bottom, border-left.

To achieve this I create an array of wall objects stating if there was a wall or not.

This allowed me to build up the game board maze by creating each cell as a div, within a flex-box container, and giving each cell the appropriate border as well as a reference ID.

![Code of wall array](https://github.com/jennikate/project-1/blob/master/reademe-assets/code-wallarray.png?raw=true)

### HardCoded vs Variable

Although I'd decided to make a static 100 cell grid with a non-changing maze design, I wanted the rest of my code to be able to handle any size grid being created.

So in the future you could change the layout of the board and increase or reduce enemies, treasure chests, and weapons as you liked.

In the end I have left some elements as hard coded for now
- life icons
- size variation of treasure chests on each level

![Code of game parameters](https://github.com/jennikate/project-1/blob/master/reademe-assets/code-gameparameters.png?raw=true)


### Objects

For the MVP I wanted
- a player token : which would have a home location that was always the bottom right corner of the grid
- 4 treasure chests you can pick up: with a point value 
- 3 enemies who would kill you
- 2 weapons you can pick up
- those same 3 enemies but now you can kill them : with a point value

![Game tokens](https://github.com/jennikate/project-1/blob/master/reademe-assets/image-gametokens.png?raw=true)

To extend on that I added
- different sized treasure chests worth different points
- weapons spawn on a timer and disappear if not collected within [x] second
- weapons respawn on a timer in new locations
- treasure chests and weapons have almost random spawn points, the caveat being they cannot spawn on or in the cells directly around a player, on a cell occupied by an enemy, or on a cell already occupied by a treasure of weapon

### Functionality

#### Board Creation

The board is created at DOMContentLoaded and only recreated when a user clicks the 'new game' button.

Objects are spawned onto the board on 'Start game' being clicked.


#### Movement

- Player tokens will move on wsda, WSDA, or the arrow keys
- Enemy tokens movement is triggered when the player clicks a key, however their movement occurs before the players from a collision point of view
- When enemys are deadly they will try to reach the player*
- When enemys are killable they will try to run away from the player

*They currently only 'chase' the player when they're within one cell of it

#### Collision

##### Walls

Using CSS borders for walls presented an interesting problem.
I needed to know for the player and every enemy whether there was a wall blocking them.

I created a function to check what walls existed around 'me' and pushed the cell IDs that were either above, right, below, or left of 'me' AND that did not have a wall in that direction, to an array of cells the token could move to.

I now have an array of cells it's possible to move to.


##### Players

I collect the keypress of the player and know which way they want to move.
I then check what's in that direction
- if there's a wall, nothing happens the token stays as is
- if there's a treasure chest the token moves to that cell, the treasure chest class is removed, and the player score is updated
- if there's a weapon, the token moves to that cell, ALL weapons are removed from the board and their timers are stopped, and the enemies become killable
- if there's a killable enemy, the enemy is sent back to it's declared home cell and the player score is updated
- if there's a deadly enemy, the player is sent to their declared home cell and a player life is removed


##### Enemies

For the MVP enemies move on a player keypress.
The enemy will only attempt to move to cells that are in the array that their token can move to.

I collect the location of each enemy and check

- it's walls
- if there's an enemy next to it

If either of those are true, that cell ID is removed from the array of cells that the enemy can move to.

I then check that array and the first of these conditions to be met is run
- if there are no available cells, the enemy stays where it is
- if there is only one available cell, the enemy moves there
- if there is a player in a cell in that array, the enemy goes there, the player is sent to their declared home location, and the player lives are reduced
- a random index number is generated and the corresponding cell ID is obtained from the array

Then the enemy moves


#### Other Elements


##### Timers

Weapons
- at game start, a timer is set to create weapon tokens every [x] second
- once weapons are created, a timer is set to remove them after [x] seconds // if a player collects a weapon, this is ended early as they've picked it up

Enemies
- when enemies become killable, a timer is set to switch them back to deadly
- when enemies are switched back, the create weapon timer is started again

##### Randomisation

Weapons & Treasures
- spawn on random cells
- EXCEPT if that cell already has a weapon or treasure on it
- they are also prevented from spawning next to each other so you don't get two treasures side by side, or two weapons side by side


##### Level Won / Game Won / Game Lost

When all the chests are collected then a level is considered won and a message is shown with the players score, and a button to continue.

If the player continues, the next level is generated. 
This includes randomisation of treasure chest and weapon locations. 
It also includes adding an enemy to the board.

This repeats until the player has completed all available levels (Game Won), or they lose all their lives (Game Lost).

In either of those cases a game result message is shown as well as the player score.


#### Featured Code

##### Featured piece of code 1
##### Movement logic. 

This was both the most frustrating and rewarding part of the project. Psuedo-coding it out first meant I had a good idea of how the logic needed to flow to handle collisions on move, but my initial attempt was built as individual functions that broke when I tried to combine them.

A return to psuedo-code lead me to a new looping movement possibility check that was successful.

Below are some examples of parts of that code, the full code can be seen at the
  // ==================================================
  // MOVEMENT LOGIC
  // ==================================================
section of my [JavaScript](https://github.com/jennikate/project-1)

![Move and collide example 1](https://github.com/jennikate/project-1/blob/master/reademe-assets/code-collision1.png?raw=true)


![Move and collide example 2](https://github.com/jennikate/project-1/blob/master/reademe-assets/code-collision2.png?raw=true)



##### Featured piece of code 2

##### Adding and removing weapons

I first had weapons appearing and disappearing based on setInterval. This resulted in weapons appearing when enemies were killable, when there were already weapons on the board, and sometimes just spawning weapons faster and faster.

So I switched to using setTimeouts and calling them at the right moments. 

  the addWeapons and removeWeapons functions control 
  - adding weapons 
  - - occurs [x] seconds after game load
  - - occurs [x] seconds after removeWeapons runs
  - - occurs [x] seconds after enemies return to a killable state 
  - - adds weapons to the board in random positions
  - - ensures a weapon doesn't spawn on top of a treasure chest
  - - ensures two weapons don't spawn next to each other
  - - triggers the removeWeapon function

  - removing weapons
  - - occurs [x] seconds after the weapons are added to the board 
  - - is stopped if a weapon is picked up
  - - triggers the addWeapon function

![Weapon spawning](https://github.com/jennikate/project-1/blob/master/reademe-assets/code-weapons.png?raw=true)


### Screenshots

### Bugs
If you find any bugs please let me know! jennikate @ gmail.com

### Wins and Blockers
One of the choices I almost regretted was using border for the walls. I had to find the walls for the cell I (player or enemy) was in by looking at what classes were assigned to it. 

In the end I'm glad I took that route as it was a challenge that was very satisfying to solve.

Another key blocker I ran into was enemies eating each other! 
Enemies were moving onto cells that contained enemies, and because tokens were moved by changing cell classes, one of the two would disappear.

This was overcome by refactoring my approach to identify and store the cells it was possible to move to in an array, then if there was already an enemy in the cell I (the enemy) was trying to move into, it was removed from the array and therefore could not be moved into.

The two biggest wins for me were
1. working through the movement logic of the enemies and players and finding a way to ensure none went through a wall, enemies didn't eat each other, and players could collect weapons and treasures with the correct functions being triggered
2. getting the timeouts coordinated for showing weapons, hiding weapons, making enemies killable, and making enemies deadly again

I've had the opportunity to apply my new learnings with JavaScript in a real project and I achieved more than what I originally planned to build. 



### Future Content
There are a few features I would like to add, such as 

- enemies are smarter about chasing a player
- new maze designs on higher levels
- different weapons dropping with different capabilities: e.g. bow and arrow will let you kill an enemy 3 spaces away, sword 1 space, wand 5 spaces
- a leaderboard
- bonus treasure chests on a timer
- usable on mobile, for now it just shows an unavailable message

