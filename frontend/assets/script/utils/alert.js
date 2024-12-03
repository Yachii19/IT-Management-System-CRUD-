// Function to display the custom alert
export function showCustomAlert(message) {
    const alertElement = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const closeButton = document.getElementById("alertCloseButton");

    alertMessage.textContent = message;
    document.body.classList.add("modal-open");
    alertElement.style.display = "flex"; // Show the alert

    closeButton.onclick = function() {
        alertElement.style.display = "none"; // Hide the alert
        document.body.classList.remove("modal-open");
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            alertElement.style.display = "none";
            document.body.classList.remove("modal-open");
        }
    });
}