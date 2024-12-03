

export function popupHandler(trigger, blocker, callback) {
    const deletePopupConfirm = document.querySelector("#delete_popup_btn_confirm");
    const deletePopupClose = document.querySelector("#delete_popup_btn_close");
    const deleteSuccess = document.querySelector("#delete_success");

    // Check if the elements exist before attaching event listeners
    if (deletePopupClose) {
        deletePopupClose.addEventListener("click", () => {
            blocker.classList.remove('show-popup');
            document.body.classList.remove('modal-open');
        });
    }

    if (deletePopupConfirm) {
        deletePopupConfirm.addEventListener("click", () => {
            callback();
            blocker.classList.remove('show-popup');
            showDeleteSuccess(deleteSuccess);
        });
    }

    // Check if the trigger exists before attaching the event listener
    if (trigger) {
        trigger.addEventListener("click", () => {
            blocker.classList.remove('show-popup');
            document.body.classList.remove('modal-open');
        });
    }

    // Ensure document listener only runs when the blocker is present
    if (blocker) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                blocker.classList.remove("show-popup");
                document.body.classList.remove("modal-open");
            }
        });
    }
}

function showDeleteSuccess(blocker) {

    blocker.classList.add('show-popup');
    const confirmDeleteSuccess = document.querySelector("#delete_popup_btn");

    confirmDeleteSuccess.addEventListener("click", () => {
        blocker.classList.remove('show-popup');
        document.body.classList.remove('modal-open');
    })
}