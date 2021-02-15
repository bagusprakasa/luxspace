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


// anchor link smooth
const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");

for (let index = 0; index < smoothScrollAnchor.length; index++) {
  const el = smoothScrollAnchor[index];

  el.addEventListener("click", function (ev) {
    ev.preventDefault();

    if (document.getElementById(this.getAttribute("href").replace("#", "")))
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
  });
}


// carousel
const carouselId = document?.getElementById("carousel");
const carouselItems = carouselId?.getElementsByClassName("flex")[0];
const carouselContainer = carouselId?.getElementsByClassName("container")[0];

function carouselCalculateOffset() {
    const carouselOffset = carouselContainer.getBoundingClientRect().left;
    // console.log(carouselOffset);
    carouselItems.style.paddingLeft = `${carouselOffset - 16}px`
    carouselItems.style.paddingRight = `${carouselOffset - 16}px`
}

function slide(wrapper, items) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        itemToShow = 4,
        slides = items.getElementsByClassName("card"),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName("card")[0].offsetWidth,
        index = 0,
        allowShift = true;
    
    wrapper.classList.add("loaded")

    items.onmousedown = dragStart;

    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);

    items.addEventListener("transitionend", checkIndex);

    function dragStart(e) {
        e = e || window.event
        e.preventDefault()
        posInitial = items.offsetLeft;

        if (e.type == "touchstart") {
            console.log(e.touches)
            posX1 = e.touches[0].clientX
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event

        if (e.type == "touchmove") {
            console.log(e.touches)
            posX2 = posX1 - e.touches[0].clientX
            posX1 = e.touches[0].clientX
        } else {
            posX2 = posX1 - e.clientX
            posX1 = e.clientX
        }

        items.style.left = `${items.offsetLeft - posX2}px` 
    }

    function dragEnd() {
        posFinal = items.offsetLeft;
        
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, "drag");
        } else if (posFinal - posInitial > threshold){
            shiftSlide(-1, "drag");
        } else {
            items.style.left = posInitial + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(direction, action) {
        addClass(items, "transition-all duration-200");
        
        if (allowShift) {
            if (!action)
                posInitial = items.offsetLeft;
            
            if (direction == 1) {
                items.style.left = `${posInitial - slideSize}px`;
                index++;
            } else if (direction == - 1) {
                items.style.left = `${posInitial + slideSize}px`;
                index--;
            }
        }

        allowShift = false;
    }

    function checkIndex() {
        setTimeout(() => {
            removeClass(items, "transition-all duration-200");
        }, 200);

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength - itemToShow) {
            items.style.left = -((slidesLength - itemToShow - 1) * slideSize) + "px";
            index = slidesLength - itemToShow - 1;
        }

        if (index == slidesLength || index == slidesLength - 1) {
            items.style.left = "0px";
            index = 0;
        }

        allowShift = true;
    }
}

if (carouselId) {
    slide(carouselId, carouselItems)
    window.addEventListener("load", carouselCalculateOffset);
    window.addEventListener("resize", carouselCalculateOffset);
}


// Accordion
function accordion() {
  const accordionContainer = document.getElementsByClassName("accordion");

  for (let index = 0; index < accordionContainer.length; index++) {
    const e = accordionContainer[index];

    const button = document.createElement("button");
    addClass(
      button,
      "absolute block md:hidden right-0 transform -translate-y-1/2 focus:outline-none transition duration-200 rotate-0"
    );

    button.style.top = "50%";
    button.innerHTML = `<svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9.75 7.5L18.5 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const ulList = e.getElementsByTagName("ul")[0];
    addClass(ulList, "transition duration-200");

    function onClickAccordion() {
      if (ulList.className.indexOf("h-0") > -1) {
        addClass(button, "rotate-180");
        addClass(ulList, "opacity-100");
        removeClass(ulList, "h-0 invisible opacity-0");
      } else {
        removeClass(button, "rotate-180");
        removeClass(ulList, "opacity-100");
        addClass(ulList, "h-0 invisible opacity-0");
      }
    }
    button.addEventListener("click", onClickAccordion);

    e.getElementsByTagName("h5")[0].append(button);
  }
}

if (window.innerWidth < 768) window.addEventListener("load", accordion);