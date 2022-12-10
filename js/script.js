// Swiper
const swiper = new Swiper('.our-works__slider', {
  navigation: {
    nextEl: '.our-works__next',
    prevEl: '.our-works__prev',
  },
  spaceBetween: 30,
  slidesPerView: 3,
  speed: 1000,
  breakpoints: {
    // mobile + tablet - 320-500
    0: {
      slidesPerView: 1
    },
        // mobile + tablet - 500-1200
    500: {
      slidesPerView: 2
    },
    // Desctop
    1200: {
      slidesPerView: 3
    }
  }
})

// Menu burger start
let menuBurger = document.querySelector(".menu__burger");
let menu = document.querySelector(".menu");
let boxShadow = document.querySelector(".first-screen__wrapper");
let menuScroll = document.querySelector(".first-screen__nav");
const body = document.querySelector("body");

menuBurger.addEventListener("click", (evt) => {
  menuBurger.classList.toggle("active")
  menu.classList.toggle("active");
  body.classList.toggle("overflowHidden");
  boxShadow.classList.toggle("underlay");
  menuScroll.scrollTop = "0";
});

// Menu burger end

// Phone input js start

document.addEventListener("DOMContentLoaded", function () {
  let phoneInputs = document.querySelectorAll("input[data-tel-input]");

  let getInputsNumberValue = function (input) {
    return input.value.replace(/\D/g, "");
  };

  let onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputsNumberValue(input);
    let formattedInputValue = "";
    selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      input.value = "";
      return;
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      // Russian phone number
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "7";
      formattedInputValue = "+" + firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else if (
      inputNumbersValue[0] == "3" &&
      inputNumbersValue[1] == "8" &&
      inputNumbersValue[2] == "0"
    ) {
      // Ukraine phone number
      let firstSymbols = inputNumbersValue[0] == "3" ? "3" : "3";
      formattedInputValue = "+" + firstSymbols + "";
      if (inputNumbersValue.length > 2) {
        formattedInputValue += inputNumbersValue.substring(1, 3);
        input.maxLength = "19";
        console.log(input);
      }
      if (inputNumbersValue.length >= 4) {
        formattedInputValue += " (" + inputNumbersValue.substring(3, 5);
      }
      if (inputNumbersValue.length >= 6) {
        formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
      }
      if (inputNumbersValue.length >= 9) {
        formattedInputValue += " " + inputNumbersValue.substring(8, 10);
      }
      if (inputNumbersValue.length >= 11) {
        formattedInputValue += " " + inputNumbersValue.substring(10, 12);
      }

      if (inputNumbersValue.length >= 13) {
        formattedInputValue += " " + inputNumbersValue.substring(12, 14);
      }
    } else {
      // Not Russian number
      formattedInputValue = input.value =
        "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
    console.log(`inputValue`, inputNumbersValue);
  };

  let onPhoneKeyDown = function (e) {
    let input = e.target;
    if (e.keyCode == 8 && getInputsNumberValue(input).length == 1) {
      input.value = "";
    }
  };
  let onPhonePaste = function (e) {
    let pastedText = e.clipboardData || window.clipboardData,
      input = e.target,
      inputNumbersValue = getInputsNumberValue(input);

    if (pastedText) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  for (i = 0; i < phoneInputs.length; i++) {
    let input = phoneInputs[i];
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
  }
});

// Phone input js end

// Popup start

const popupLinks = document.querySelectorAll(".popup-link");
const popup = document.querySelector(".popup-js");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupInputs = document.querySelectorAll(".popup-js input");

const btnFurniture = document.querySelectorAll(".furniture__item-btn")


function addPopupContent(e) {
  let popupDiv = document.querySelector(".calc-cost__material")
  popupDiv.innerHTML = ""
  let element = e
  let img = element.closest(".furniture__item").querySelector("img").cloneNode()
  let title = element.closest(".furniture__item").querySelector(".furniture__item-name")
  let cloneNode = title.cloneNode(true)
  console.log(popupDiv)
  popupDiv.appendChild(img)
  popupDiv.appendChild(cloneNode)
}

let unlock = true;

const timeout = 600;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", (e) => {
      if(e.target.classList.contains("furniture__item-btn")) {
        addPopupContent(e.target)
      }
      const popupName = popupLink.getAttribute(`href`).replace("#", "");
      const currentPopup = document.getElementById(popupName);
      checkInputs(currentPopup);
      e.preventDefault;
    });
  }
}


const popupCloseIcon = document.querySelectorAll(".close-popup");

if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", (e) => {
      popupClose(el.closest(".popup-js"));
      e.preventDefault();
    });
  }
}

function checkInputs(currentPopup) {
  const popupThanks = document.querySelector(".popup-thanks");
  let form = currentPopup.querySelector("form");

  if (currentPopup.contains(form)) {
    formOnSubmit = form;
    popupOpen(currentPopup);
  } else {
    if (currentPopup == popupThanks) {
      console.log(formOnSubmit);
      formOnSubmit.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch()
        popupOpen(currentPopup);
      });
    }
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup-js.open");

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    currentPopup.classList.add("open");
    currentPopup.addEventListener("click", (e) => {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup-js"));
      }
    });
  }

}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
  if(popupActive.id == "popup-calc-cost") {
    let img = popupActive.querySelector("img")
    let title = popupActive.querySelector(".furniture__item-name")
    setTimeout(() => {
      img.remove()
      title.remove()
    }, 1000);
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth -
    document.querySelector(".first-screen").offsetWidth +
    "px";
  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = "0px";
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", (e) => {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup-js.open");
    popupClose(popupActive);
  }
});

// Popup end



// Tabs start
let tabNavItem = document.querySelectorAll('.tab-nav-item');
let tabContentItem = document.querySelectorAll('.tab_content');

tabNavItem.forEach(function(eLem) {
  eLem.addEventListener('click', activeTab);
})

function activeTab() {
  tabNavItem.forEach(function(eLem) {
    eLem.classList.remove('active');
  })
  this.classList.add('active');
  let tabName = this.getAttribute('data-tab');
  activeTabContent(tabName);
}

function activeTabContent(tabName) {
  tabContentItem.forEach(function(item) {
    if (item.classList.contains(tabName)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  })
}

// Tabs end
