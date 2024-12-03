const closeModal = document.querySelector("#close_btn");

export function modalHandler(trigger, form){

    trigger.addEventListener("click", () => {
        form.classList.add('show-blocker');
        document.body.classList.add("modal-open");
    });

    closeModal.addEventListener("click", () => {
        form.classList.remove('show-blocker');
        document.body.classList.remove("modal-open");
    });
    

    // Close modals using Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            form.classList.remove("show-blocker");
            form.classList.remove("show-blocker");
            document.body.classList.remove("modal-open");
        }
    });
}


export function updateModalHandler(updateForm, updateCloseModal, updateCloseModalSubmit) {

    updateCloseModal.addEventListener("click", () => {
        updateForm.classList.remove('show-blocker');
        document.body.classList.remove("modal-open");
    });

    updateCloseModalSubmit.addEventListener("click", () => {
        updateForm.classList.remove('show-blocker');
        document.body.classList.remove("modal-open");
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            updateForm.classList.remove("show-blocker");
            document.body.classList.remove("modal-open");
        }
    });
}
    