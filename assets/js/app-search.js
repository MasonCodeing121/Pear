document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const appContainer = document.getElementById("appGroups");
  const noAppMessage = document.getElementById("noAppMessage");

  // Function to render apps
  function renderApps(query = "") {
    appContainer.innerHTML = ""; // Clear existing content
    noAppMessage.style.display = "none"; // Hide "No app found"

    let hasResults = false;

    // Combine all app into a single array, sorted alphabetically
    const sortedApps = Object.values(apps)
      .flatMap((groupApps) =>
        groupApps.sort((a, b) => a.name.localeCompare(b.name))
      )
      .filter((app) => app.name.toLowerCase().includes(query.toLowerCase()));

    if (sortedApps.length > 0) {
      hasResults = true;

      // Create a button container for all apps
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      sortedApps.forEach((app) => {
        const appCard = document.createElement("div");
        appCard.className = "app-card";
        appCard.onclick = () => eval(app.url); // Dynamically execute the URL function

        appCard.innerHTML = `
  <img src="${app.imageUrl}" 
       alt="${app.name}" 
       onerror="this.onerror=null; this.src='./assets/img/image.png';">
  <p>${app.name}</p>
  ${app.new ? '<span class="badge-new">New</span>' : ''}
  ${app.fixed ? '<span class="badge-fixed">Fixed</span>' : ''}
`;
        buttonContainer.appendChild(appCard);
      });

      appContainer.appendChild(buttonContainer);
    }

    // Show "No app found" message if no results
    if (!hasResults) {
      noAppMessage.style.display = "block";
    }
  }

  // Initial render of all apps
  renderApps();

  // Search functionality
  searchInput.addEventListener("input", () => {
    renderApps(searchInput.value);
  });
});