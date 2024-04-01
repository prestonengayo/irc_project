/* document.addEventListener("DOMContentLoaded", () => {
  const usernameElement = document.getElementById("username");
  const passwordElement = document.getElementById("password");
  const loginForm = document.getElementById("login-form");

  if (
    usernameElement &&
    passwordElement &&
    loginForm &&
    usernameElement instanceof HTMLInputElement &&
    passwordElement instanceof HTMLInputElement
  ) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = usernameElement.value;
      const password = passwordElement.value;

      console.log("Tentative de connexion avec", username, password);
      // Ajoutez ici votre logique d'envoi des informations de connexion
    });
  } else {
    console.error("Un des éléments est manquant ou incorrect dans le DOM.");
  }
}); */
