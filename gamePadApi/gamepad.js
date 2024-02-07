let gamepadButtonsColors = [];
window.addEventListener("gamepadconnected", (e) => {
  document.querySelector(".name").textContent = e.gamepad.id;

  e.gamepad.buttons.forEach((button, index) => {
    gamepadButtonsColors[index] = getRandomColor();
  });
  // // Function to generate random color

  // console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Get the gamepad state
function updateGamepadState() {
  const gamepads = navigator.getGamepads();
  const gamepad = gamepads[0]; // Assuming only one gamepad is connected

  if (gamepad) {
    // Get the left stick's X and Y axes values
    const stickX = gamepad.axes[0];
    const stickY = gamepad.axes[1];

    // Move the div based on the stick's values
    const div = document.getElementById("box");
    const leftOffset = div.offsetLeft + stickX * 10;
    const topOffset = div.offsetTop + stickY * 10;

    // Check if the box exceeds the screen boundaries
    if (leftOffset < 0 || leftOffset + div.offsetWidth > window.innerWidth || topOffset < 0 || topOffset + div.offsetHeight > window.innerHeight) {
      div.style.backgroundColor = "red"; // Turn the box red
    } else {
      div.style.backgroundColor = ""; // Reset the box color
      div.style.left = leftOffset + "px";
      div.style.top = topOffset + "px";
    }

    gamepad?.buttons?.forEach((button, index) => {
      if (button.pressed) {
        div.style.backgroundColor = gamepadButtonsColors[index];
      }
    });
  }

  requestAnimationFrame(updateGamepadState);
}

// Start updating the gamepad state
requestAnimationFrame(updateGamepadState);
