// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Select all buttons with the 'game-button' class
  const buttons = document.querySelectorAll(".game-button");

  // Add a click event listener to each button
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const url = button.getAttribute("data-url"); // Get the URL from the button's data-url attribute
      openGame(url); // Call the openGame function with the URL
    });
  });
});

// The openGame function
function openGame(url) {
  var win = window.open("","_blank","Pear");
  var iframe = win.document.createElement('iframe');
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.setAttribute("allowfullscreen", "true");
  iframe.setAttribute("allow", "fullscreen");
  iframe.src = url;
  win.document.body.appendChild(iframe);
}
