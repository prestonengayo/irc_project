/* document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("send-button");
  const messageElement = document.getElementById("message-input");
  const messagesContainer = document.getElementById("messages");

  if (
    sendButton &&
    messageElement &&
    messagesContainer &&
    messageElement instanceof HTMLInputElement
  ) {
    sendButton.addEventListener("click", function () {
      const message = messageElement.value;
      messageElement.value = ""; // Réinitialiser le champ de saisie

      console.log("Message à envoyer :", message);
      // Ajoutez ici votre logique pour l'envoi du message au serveur

      // Exemple d'ajout du message dans l'interface utilisateur
      const newMessageDiv = document.createElement("div");
      newMessageDiv.textContent = message;
      messagesContainer.appendChild(newMessageDiv);
    });
  } else {
    console.error("Un des éléments est manquant ou incorrect dans le DOM.");
  }
});
 */