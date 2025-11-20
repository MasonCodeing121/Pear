document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const gameContainer = document.getElementById("gameGroups");
  const noGameMessage = document.getElementById("noGameMessage");

  // Function to render games
  function renderGames(query = "") {
    gameContainer.innerHTML = ""; // Clear existing content
    noGameMessage.style.display = "none"; // Hide "No game found"

    let hasResults = false;

    // Combine all games into a single array, sorted alphabetically
    const sortedGames = Object.values(games)
      .flatMap((groupGames) =>
        groupGames.sort((a, b) => a.name.localeCompare(b.name))
      )
      .filter((game) => game.name.toLowerCase().includes(query.toLowerCase()));

    if (sortedGames.length > 0) {
      hasResults = true;

      // Create a button container for all games
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      sortedGames.forEach((game) => {
        const gameCard = document.createElement("div");
        gameCard.className = "game-card";
        gameCard.onclick = () => eval(game.url); // Dynamically execute the URL function

       gameCard.innerHTML = `
  <img src="${game.imageUrl}" 
       alt="${game.name}" 
       onerror="this.onerror=null; this.src='assets/img/avo.png';">
  <p>${game.name}</p>
  ${game.new ? '<span class="badge-new">New</span>' : ''}
  ${game.fixed ? '<span class="badge-fixed">Fixed</span>' : ''}
`;
        buttonContainer.appendChild(gameCard);
      });

      gameContainer.appendChild(buttonContainer);
    }

    // Show "No game found" message if no results
    if (!hasResults) {
      noGameMessage.style.display = "block";
    }
  }

  // Initial render of all games
  renderGames();

  // Search functionality
  searchInput.addEventListener("input", () => {
    renderGames(searchInput.value);
  });
});