### **Catch the Falling Objects**

In this exercise, you will build a **Catch the Falling Objects** game using JavaScript. You will be given the **HTML** and **CSS**, and your task is to write the **JavaScript** to make the game work.

#### **Requirements for the Game**:

1. **Game Setup**:

   - Objects will fall from the top of the game area at regular intervals.
   - The player controls a basket at the bottom of the game area using the left and right arrow keys.
   - The player’s goal is to move the basket to catch as many falling objects as possible.
2. **Player Interaction**:

   - The player uses the **left** and **right arrow keys** to move the basket horizontally.
   - The game should prevent the basket from moving outside the game area.
3. **Falling Objects**:

   - A falling object is created every second at a random horizontal position at the top of the game area.
   - Each object falls from the top to the bottom of the game area at a constant speed.
   - If the object reaches the basket's horizontal position when it gets to the bottom, the player "catches" it and earns a point.
4. **Score and Missed Objects**:

   - The player earns **1 point** for each object they catch.
   - The game tracks the number of **missed objects**.
   - The game stops if the player misses **3 objects**.
5. **Game Flow**:

   - The game starts when the **"Start Game"** button is pressed.
   - Falling objects appear regularly, and the player can control the basket to catch them.
   - The game stops either when the player presses the **"Stop Game"** button or when they miss 3 objects.
   - When the game stops, the falling objects stop, and the basket can no longer move.

### Continue reading if you need help on the logic

---

Continue reading if you need help on the logic

#### **JavaScript Tasks**:

1. **Create Variables**:

   - You will need variables to keep track of:
     - The **basket’s position**.
     - The **score** and **missed objects** counters.
     - The **interval** for creating falling objects.
2. **Handle the "Start Game" Button**:

   - When the player presses the **"Start Game"** button:
     - The game should reset the score, missed objects, and basket position.
     - A new falling object should be created every second using `setInterval`.
     - The player should be able to move the basket left and right using the arrow keys.
3. **Handle the "Stop Game" Button**:

   - When the player presses the **"Stop Game"** button:
     - The falling objects should stop.
     - The basket should no longer move, and the score and missed counters should remain visible.
4. **Handle Basket Movement**:

   - Use the **left** and **right arrow keys** to move the basket.
   - Ensure that the basket stays within the boundaries of the game area.
5. **Handle Falling Objects**:

   - Create a new falling object at a random position at the top of the game area.
   - Move the object down at a constant speed.
   - If the falling object reaches the bottom of the game area:
     - Check if the object’s horizontal position matches the basket’s position.
     - If it matches, the player earns a point.
     - If not, increase the missed object counter.
   - Stop the game if the player misses 3 objects.
6. **Update the Score and Missed Objects**:

   - Update the score when the player catches an object.
   - Update the missed objects counter when the player misses an object.
   - When the player misses 3 objects, stop the game and display an alert.

#### **Requirements Checklist**:

- [ ] The game starts when the **"Start Game"** button is clicked.
- [ ] The player can move the basket left and right using the arrow keys.
- [ ] Objects fall from the top of the game area at random positions every second.
- [ ] The player’s score increases by 1 for each caught object.
- [ ] The player can miss up to 3 objects, after which the game stops.
- [ ] The game stops when the **"Stop Game"** button is clicked.
