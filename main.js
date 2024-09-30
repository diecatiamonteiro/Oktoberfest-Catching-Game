// ************************************************************************* Game variables

// Initialize game variables for DOM elements, game state, and settings.

const gameArea = document.querySelector("#gameArea"); // <div></div>
const collector = document.querySelector("#collector"); // <div></div>
const scoreDisplay = document.querySelector("#score"); // <span></span>
const missedDisplay = document.querySelector("#missed"); // <span></span>
const startButton = document.querySelector("#startButton"); // <button></button>
const stopButton = document.querySelector("#stopButton"); // <button></button>
const backgroundMusic = document.getElementById("backgroundMusic"); // <audio></audio>
const volumeIcon = document.querySelector(".volume-icon"); // <i></i>

let gameAreaWidth = 1000;
let collectorWidth = 190;
let collectorPosition = (gameAreaWidth - collectorWidth) / 2; // Collecter in center
let score = 0;
let missed = 0;
let gameRunning = false;
let fallingObjectInterval; // Repeatedly generates new objects (brezels and beers)
let isMuted = false;
let isPlaying = false;

// ************************************************************************* Collecter position on page load

// Set the collector's position at the left side of the game area when the page loads.

window.onload = function () {
  collectorPosition = 0; // Start the collector at the very left
  collector.style.left = `${collectorPosition}px`; // Set the left position
  collector.style.transition = "none"; // Ensure no transition on page load
};

// ************************************************************************* Start game

// Start the game, reset score/miss, move the collector to the center, and begin falling objects.

function startGame() {
  gameRunning = true;
  score = 0;
  missed = 0;
  scoreDisplay.textContent = score;
  missedDisplay.textContent = missed;

  // If music isn't playing yet, start it when the game starts
  if (!isPlaying) {
    backgroundMusic.play().catch((error) => {
      console.log("Autoplay blocked. Waiting for user interaction.");
    });
    isPlaying = true;
  }

  // Smooth transition when moving collector to center
  collector.style.transition = "left 1s ease-in-out";
  collectorPosition = (gameAreaWidth - collectorWidth) / 2; // center
  collector.style.left = `${collectorPosition}px`;

  // Remove transition for normal gameplay
  setTimeout(() => {
    collector.style.transition = "none";
  }, 1000);

  // Start creating falling objects
  fallingObjectInterval = setInterval(createFallingObject, 1000);
}

// ************************************************************************* Volume on/off

// Toggle background music between play/mute using the volume icon.

function toggleVolume() {
  if (!isPlaying) {
    backgroundMusic.play().catch((error) => {
      console.log("Autoplay blocked. Waiting for user interaction.");
    });
    isPlaying = true; // Play music
    return; // Exit the function, don't toggle to mute
  }

  // Toggle between mute/unmute
  if (isMuted) {
    backgroundMusic.muted = false; // Unmute
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-high");
  } else {
    backgroundMusic.muted = true; // Mute
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
  }
  isMuted = !isMuted; // Update the muted state
}

// ************************************************************************* Move collector

// Move the collector left or right using arrow keys, ensuring it stays within game boundaries.

function moveCollector(e) {
  if (!gameRunning) return;

  // Set left/right edges
  if (e.key === "ArrowLeft") {
    collectorPosition = Math.max(0, collectorPosition - 20); // subtract 20 from the current position of the collector, but if the result is less than 0 (left edge), use 0 instead. Math.max for the left ensures the position doesn't go below the left boundary (0).
  } else if (e.key === "ArrowRight") {
    collectorPosition = Math.min(
      gameAreaWidth - collectorWidth,
      collectorPosition + 20
    ); // Math.min for the right ensures the position doesn't exceed the right boundary (gameAreaWidth - collectorWidth).
  }

  // Update collector's position
  collector.style.left = `${collectorPosition}px`; // If the collectorPosition is 100, this line moves the collector 100 pixels from the left edge of the #gameArea. If the player presses the right arrow and collectorPosition becomes 120, this line moves the collector 120 pixels from the left edge.
}

// ************************************************************************* Create falling object

// Generate random falling objects (beer/pretzel) and animate them falling. Detect if caught or missed.

function createFallingObject() {
  if (!gameRunning) return;

  // Create a falling object (beer or pretzel)
  const fallingObject = document.createElement("img");

  // Randomly decide if it's a beer or pretzel
  const isBeer = Math.random() < 0.5;
  fallingObject.src = isBeer ? "./images/beer.png" : "./images/brezel.png";
  fallingObject.alt = isBeer ? "Beer" : "Pretzel";
  fallingObject.classList.add("fallingObject");

  // Set a random horizontal position within gameArea
  const randomX = Math.floor(Math.random() * (gameAreaWidth - 50)); // Ensure the object stays within game bounds
  fallingObject.style.left = `${randomX}px`;

  // Append falling object to gameArea
  gameArea.appendChild(fallingObject);

  // Animate the object falling
  let fallingPosition = 0;
  let fallSpeed = isBeer ? 5 : 3; // Beer falls faster than pretzels

  // Create an animation loop that updates the object's position
  const fallAnimation = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fallAnimation);
      return;
    }

    // Increment vertical position of falling object based on its speed
    fallingPosition += fallSpeed;
    fallingObject.style.top = `${fallingPosition}px`;

    // Calculate top position of collector
    const collectorTop = gameArea.offsetHeight - 300 - 20; // Collector height (290px  but gave it a bit more to match the tray better) and 20px from the bottom
    const gameAreaBottom = gameArea.offsetHeight;

    // Check if object is within the collector's horizontal range
    const collectorLeft = collector.offsetLeft;
    const collectorRight = collectorLeft + collectorWidth;

    const isCaught =
      randomX >= collectorLeft &&
      randomX <= collectorRight &&
      fallingPosition >= collectorTop;

    if (isCaught) {
      // Object is caught at the collector's height
      clearInterval(fallAnimation);
      gameArea.removeChild(fallingObject);

      // Update score for catching
      score += isBeer ? 1 : 2;
      scoreDisplay.textContent = score;
    } else if (fallingPosition >= gameAreaBottom - 50) {
      // Object reached the bottom and is missed
      clearInterval(fallAnimation);
      gameArea.removeChild(fallingObject);

      missed++;
      missedDisplay.textContent = missed;

      // End the game if 3 objects are missed
      if (missed >= 3) {
        setTimeout(() => {
          stopGame();
        }, 100); // Small delay to ensure the DOM updates and 3 is visible on "Missed"
      }
    }
  }, 20);
}

// ************************************************************************* Stop game

// Stop the game, remove all falling objects, and display the final score.

function stopGame() {
  gameRunning = false;

  // Clear interval that creates new falling objects
  clearInterval(fallingObjectInterval);

  // Remove all falling objects from game area
  const fallingObjects = document.querySelectorAll(".fallingObject");
  fallingObjects.forEach((object) => object.remove());

  // Display final score before resetting
  alert(`Game Over!
Final score: ${score}`);

  // Reset score and missed count for next game
  score = 0;
  missed = 0;
  scoreDisplay.textContent = score;
  missedDisplay.textContent = missed;
}

// ************************************************************************* Event listeners

// Set up event listeners for starting/stopping the game, moving the collector, and toggling volume.

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
document.addEventListener("keydown", moveCollector);
volumeIcon.addEventListener("click", toggleVolume);
