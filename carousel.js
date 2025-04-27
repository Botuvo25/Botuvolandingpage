// carousel.js - Exact carousel implementation to match chatcipher.ai
document.addEventListener('DOMContentLoaded', function() {
  const phrases = ["Increase conversions", "Save time", "Solve problems"];
  const dynamicText = document.getElementById("dynamic-text");
  const staticText = document.getElementById("static-text");
  let i = 0;
  let j = 0;
  let currentPhrase = [];
  let isDeleting = false;
  let isEnd = false;

  function loop() {
    isEnd = false;
    
    // If we've reached the end of the phrases array, start over
    if (i === phrases.length) {
      i = 0;
    }
    
    // Set the text based on current phrase and whether we're deleting
    if (j === 0) {
      currentPhrase = phrases[i].split("");
    }
    
    // If we're not deleting, add a character
    if (!isDeleting && j <= currentPhrase.length) {
      dynamicText.textContent = currentPhrase.slice(0, j).join("");
      j++;
      
      // If we've typed the full phrase, start deleting after a delay
      if (j > currentPhrase.length) {
        isDeleting = true;
        isEnd = true;
        // Wait longer at the end of a complete phrase
        setTimeout(function() {
          loop();
        }, 2000); // Pause at end of phrase
        return;
      }
    }
    
    // If we're deleting, remove a character
    if (isDeleting && j >= 0) {
      dynamicText.textContent = currentPhrase.slice(0, j).join("");
      j--;
      
      // If we've deleted the entire phrase, move to the next one
      if (j === 0) {
        isDeleting = false;
        i++;
      }
    }
    
    // Speed adjustments
    const spedUp = 70; // Typing speed
    const normalSpeed = 100;
    const slowDown = 30; // Deleting speed
    
    // Calculate the delay based on whether we're at the end, deleting, etc.
    let time = isEnd ? 2000 : isDeleting ? slowDown : normalSpeed;
    
    setTimeout(loop, time);
  }

  // Start the typing effect
  setTimeout(loop, 1500);
});
