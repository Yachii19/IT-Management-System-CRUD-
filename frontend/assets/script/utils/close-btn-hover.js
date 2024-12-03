// Function to update the x icon on the top right side of the form to become the red image icon

export function closeButton(){
    const exitButton = document.querySelector("#top_close_btn");
    const form = document.querySelector("#form")
    exitButton.addEventListener("mouseover", () => {
        exitButton.src = "./assets/images/close-red.svg"
    })
    exitButton.addEventListener("mouseout", () => {
        exitButton.src = "./assets/images/close-black.svg"
    })
    exitButton.addEventListener("click", () => {
        form.classList.remove("show-blocker");
        document.body.classList.remove("modal-open");
    })
}

export function updateCloseButton(){
    const exitButton = document.querySelector("#update_top_close_btn");
    const updateForm = document.querySelector("#update_form")
    exitButton.addEventListener("mouseover", () => {
        exitButton.src = "./assets/images/close-red.svg"
    })
    exitButton.addEventListener("mouseout", () => {
        exitButton.src = "./assets/images/close-black.svg"
    })
    exitButton.addEventListener("click", () => {
        updateForm.classList.remove("show-blocker");
        document.body.classList.remove("modal-open");
    })
}