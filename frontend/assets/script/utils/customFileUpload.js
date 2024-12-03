export function fileUploadHandler() {
    
    const fileUpload = document.querySelector("#image_container");

    fileUpload.addEventListener("click", () => {
        document.querySelector("#updateImageUpload").click();
    })

    const addFileUpload = document.querySelector("#add_image_container");

    addFileUpload.addEventListener("click", () => {
        document.querySelector("#addImageUpload").click();
    })

}