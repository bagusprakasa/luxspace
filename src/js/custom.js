import { addClass, removeClass } from './utils-class'

// menu toggler
const menuTogglerId = document.getElementById("menu-toggler");
menuTogglerId.addEventListener("click", function () {
    const menuId = document.getElementById("menu");
    if (menuId.className.indexOf("opacity-0") > -1) {
        addClass(menuTogglerId, "fixed top-0 right-0")
        removeClass(menuTogglerId, "relative")
        addClass(menuId, "opacity-100 z-30")
        removeClass(menuId, "opacity-0 invisible")
    } else {
        removeClass(menuTogglerId, "fixed top-0 right-0");
        addClass(menuTogglerId, "relative");
        addClass(menuId, "opacity-0 invisible")
        removeClass(menuId, "opacity-100 z-30")
    }
});

// modal
const modalTriggers = document.getElementsByClassName("modal-trigger");
const modalWrapperClassNames = "fixed inset-0 bg-black opacity-35";
for (let index = 0; index < modalTriggers.length; index++) {
    const e = modalTriggers[index];
    
    e.addEventListener("click", function () {
        const modalWrapper = document.createElement("div");
        const modalOverlay = document.createElement("div");

        modalOverlay.addEventListener("click", function () {
            modalWrapper.remove();
        });

        addClass(
            modalWrapper,
            "fixed inset-0 z-40 flex items-center justify-center w-100 min-h-screen"
        );

        addClass(modalOverlay, modalWrapperClassNames);
        const modalContent = document.createElement("div");
        modalContent.innerHTML = e.attributes?.["data-content"].value;
        addClass(modalContent, "bg-white p-0 md:p-6 z-10");
        modalWrapper.append(modalOverlay);
        modalWrapper.append(modalContent);
        document.body.append(modalWrapper);
    });
}