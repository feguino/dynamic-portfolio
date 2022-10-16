const pswpContainer = getContainer();
const pswpcontainer = document.querySelector(".pswp-container");
const galleryClass = ".gallery-grid";

const muuri = new Muuri(galleryClass, {
  items: ".item",
  layout: {
    fillGaps: false,
    rounding: false,
  },
  showEasing: "ease-in-out",
  showDuration: 600,
  layoutOnResize: true,
});

window.addEventListener("load", () => {
  muuri.refreshItems().layout();
  document.querySelector(galleryClass).classList.add("loaded");

  const filters = document.querySelectorAll(".filter-button");
  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      e.preventDefault();
      filters.forEach((filter) => filter.classList.remove("active"));
      e.target.classList.add("active");

      const itemCategory = e.target.innerHTML.toLowerCase();

      itemCategory === "all"
        ? muuri.filter("[data-category]")
        : muuri.filter((item) => 
            item.getElement().dataset.category.includes(itemCategory)
      );
    });
  });

  document
    .querySelector(".gallery-search-bar")
    .addEventListener("input", (event) => {
      const searchInput = event.target.value;
      muuri.filter((item) =>
        item.getElement().dataset.tag.includes(searchInput)
      );
    });
});

const lightboxOptions = {
  gallery: galleryClass,
  children: "a",
  pswpModule: PhotoSwipe,
  bgOpacity: 0.95,
  wheelToZoom: true,
  errorMsg: "The image cannot be loaded.",
  closeTitle: 'Close',
  zoomTitle: 'Zoom',
  arrowPrevTitle: 'Previous',
  arrowNextTitle: 'Next',
  indexIndicatorSep: " / ",
  appendToEl: pswpcontainer,
};

var lightbox = new PhotoSwipeLightbox(lightboxOptions);
lightbox.on("uiRegister", function () {
  lightbox.pswp.ui.registerElement({
    name: "download-button",
    title: "Download",
    order: 8,
    isButton: true,
    tagName: "a",
    html: {
      isCustomSVG: true,
      size: 512,
      inner:
        '<path id="pswp__icn-download" d="M448 304h-53.5l-48 48H448c8.822 0 16 7.178 16 16V448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16v-80C48 359.2 55.18 352 64 352h101.5l-48-48H64c-35.35 0-64 28.65-64 64V448c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64v-80C512 332.7 483.3 304 448 304zM432 408c0-13.26-10.75-24-24-24S384 394.7 384 408c0 13.25 10.75 24 24 24S432 421.3 432 408zM239 368.1C243.7 373.7 249.8 376 256 376s12.28-2.344 16.97-7.031l136-136c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L280 294.1V24C280 10.75 269.3 0 256 0S232 10.75 232 24v270.1L136.1 199c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L239 368.1z"/>',
      outlineID: "pswp__icn-download",
    },
    onInit: (el, pswp) => {
      el.setAttribute("download", "");
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");

      pswp.on("change", () => {
        el.href = pswp.currSlide.data.src;
      });
    },
  });

  lightbox.pswp.ui.registerElement({
    name: "custom-caption",
    order: 9,
    isButton: false,
    appendTo: "root",
    html: "Caption text",
    onInit: (el, pswp) => {
      lightbox.pswp.on("change", () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = "";
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.querySelector(
            ".hidden-caption-content"
          );
          if (hiddenCaption) {
            // get caption from element with class hidden-caption-content
            captionHTML = hiddenCaption.innerHTML;
          } else {
            // get caption from alt attribute
            captionHTML = currSlideElement
              .querySelector("img")
              .getAttribute("alt");
          }
        }
        el.innerHTML = captionHTML || "";
      });
    },
  });

  lightbox.pswp.ui.registerElement({
    name: "full-screen",
    order: 7,
    isButton: true,
    appendTo: "bar",
    title: "Toggle Fullscreen",
    html: {
      isCustomSVG: true,
      size: 512,
      inner:
        '<use class="pswp__icn-shadow" xlink:href="#pswp__icn-fullscreen-exit"/>' +
        '<use class="pswp__icn-shadow" xlink:href="#pswp__icn-fullscreen-request"/>' +
        '<path id="pswp__icn-fullscreen-request" transform="translate(4,4)" d="M136 32h-112C10.75 32 0 42.75 0 56v112C0 181.3 10.75 192 24 192C37.26 192 48 181.3 48 168V80h88C149.3 80 160 69.25 160 56S149.3 32 136 32zM424 32h-112C298.7 32 288 42.75 288 56c0 13.26 10.75 24 24 24h88v88C400 181.3 410.7 192 424 192S448 181.3 448 168v-112C448 42.75 437.3 32 424 32zM136 432H48v-88C48 330.7 37.25 320 24 320S0 330.7 0 344v112C0 469.3 10.75 480 24 480h112C149.3 480 160 469.3 160 456C160 442.7 149.3 432 136 432zM424 320c-13.26 0-24 10.75-24 24v88h-88c-13.26 0-24 10.75-24 24S298.7 480 312 480h112c13.25 0 24-10.75 24-24v-112C448 330.7 437.3 320 424 320z"/></g>' +
        '<path id="pswp__icn-fullscreen-exit" style="display:none" transform="translate(4,4)" d="M136 320h-112C10.75 320 0 330.7 0 344c0 13.25 10.75 24 24 24H112v88C112 469.3 122.7 480 136 480S160 469.3 160 456v-112C160 330.7 149.3 320 136 320zM312 192h112C437.3 192 448 181.3 448 168c0-13.26-10.75-24-24-24H336V56C336 42.74 325.3 32 312 32S288 42.74 288 56v112C288 181.3 298.7 192 312 192zM136 32C122.7 32 112 42.74 112 56V144H24C10.75 144 0 154.7 0 168C0 181.3 10.75 192 24 192h112C149.3 192 160 181.3 160 168v-112C160 42.74 149.3 32 136 32zM424 320h-112C298.7 320 288 330.7 288 344v112c0 13.25 10.75 24 24 24s24-10.75 24-24V368h88c13.25 0 24-10.75 24-24C448 330.7 437.3 320 424 320z"/>',
    },
    onClick: function () {
      toggleFullscreen(pswpcontainer);
    },
  });

  lightbox.pswp.ui.registerElement({
    name: "caption-icon",
    order: 7,
    isButton: true,
    appendTo: "bar",
    title: "Caption",
    html: {
      isCustomSVG: true,
      size: 512,
      inner:
        '<g class="pwsp-caption-on"><path fill-rule="evenodd" clip-rule="evenodd" d="M84.5714 16C46.7005 16 16 46.7005 16 84.5714V427.429C16 465.3 46.7005 496 84.5714 496H427.429C465.3 496 496 465.3 496 427.429V84.5714C496 46.7005 465.3 16 427.429 16H84.5714ZM82.6122 55.1837C67.4639 55.1837 55.1837 67.4639 55.1837 82.6122V429.388C55.1837 444.536 67.4639 456.816 82.6122 456.816H429.388C444.536 456.816 456.816 444.536 456.816 429.388V82.6122C456.816 67.4639 444.536 55.1837 429.388 55.1837H82.6122Z"/><path d="M159.304 320.212C185.724 320.212 210.322 308.369 225.809 287.416C242.511 266.462 209.714 242.776 193.923 263.425C185.724 274.661 174.184 280.431 159.304 280.431C124.686 280.431 110.413 250.064 110.413 212.408C110.413 176.271 124.078 144.385 159.304 144.385C174.184 144.385 185.42 150.155 194.227 161.087C209.107 181.13 241.6 158.658 225.505 136.793C209.714 115.536 185.724 104.604 159.304 104.604C104.036 104.604 70.3282 150.762 70.3282 212.408C70.3282 272.536 102.214 320.212 159.304 320.212Z"/><path d="M368.899 320.212C395.318 320.212 419.916 308.369 435.403 287.416C452.105 266.462 419.308 242.776 403.517 263.425C395.318 274.661 383.778 280.431 368.899 280.431C334.28 280.431 320.007 250.064 320.007 212.408C320.007 176.271 333.672 144.385 368.899 144.385C383.778 144.385 395.014 150.155 403.821 161.087C418.701 181.13 451.194 158.658 435.099 136.793C419.308 115.536 395.318 104.604 368.899 104.604C313.63 104.604 279.922 150.762 279.922 212.408C279.922 272.536 311.808 320.212 368.899 320.212Z"/><path d="M151.184 364.735C151.184 356.619 157.762 350.041 165.878 350.041H421.551C429.666 350.041 436.245 356.619 436.245 364.735C436.245 372.85 429.666 379.429 421.551 379.429H165.878C157.762 379.429 151.184 372.85 151.184 364.735Z"/><path d="M94.3673 409.796C94.3673 401.681 100.946 395.102 109.061 395.102H422.531C430.646 395.102 437.224 401.681 437.224 409.796C437.224 417.911 430.646 424.49 422.531 424.49H109.061C100.946 424.49 94.3673 417.911 94.3673 409.796Z"/></g><rect class="pwsp-caption-off" x="486" y="515" width="692" height="50" rx="25" transform="rotate(-135 486 515)"/>',
    },
    onInit: function() {

    },
    onClick: function () {
      document
        .querySelector(".pswp__button--caption-icon")
        .classList.toggle("hidden");
      document
        .querySelector(".pswp__custom-caption")
        .classList.toggle("hidden");
    },
  });

  pswpContainer.style.display = "block";
  pswpContainer.style.opacity = 1;

});

lightbox.on("close", () => {
  pswpContainer.style.removeProperty("opacity");
  setTimeout(function () {
    pswpContainer.style.display = "none";
  }, 500);
  if (document.fullscreenElement) {
    document.exitFullscreen() ||
      document.mozCancelFullScreen() ||
      document.webkitCancelFullScreen() ||
      document.msExitFullscreen();
  }

  document.querySelector(".filter-button:first-child").click();

});

lightbox.on("afterInit", () => {
  const pswpUIElements = document.querySelector('.pswp--open');
  let idleTimer = null;
  let idleState = false;

  if(!window.matchMedia("(pointer: coarse)").matches) {
    // touchscreen
    displayUIElements(5000)
    document.onmousemove = ()=>{displayUIElements(5000)};
    document.onkeydown = ()=>{displayUIElements(5000)};
  }

  function displayUIElements(time){
    clearTimeout(idleTimer);

    if (idleState==true){
      if(!pswpUIElements.classList.contains('pswp--ui-visible')){
        pswpUIElements.classList.add('pswp--ui-visible')
      }
    }
    idleState = false;
    idleTimer = setTimeout(()=>{
      if(pswpUIElements.classList.contains('pswp--ui-visible')){
        pswpUIElements.classList.remove('pswp--ui-visible')
      }
      
      idleState = true;
    }, time)
  }
 
  window.addEventListener("resize", () => {
    if (!document.fullscreenElement) {
      if(pswpcontainer.innerHTML == ''){
        return
      }
      compressScreen();
    } else {
      expandScreen();
    }
  }); 

});

lightbox.init();

function getContainer() {
  const pswpContainer = document.createElement("div");
  pswpContainer.classList.add("pswp-container");
  pswpContainer.style.display = "none";
  document.body.appendChild(pswpContainer);
  return pswpContainer;
}


function expandScreen() {
  setTimeout(function () {
    document.getElementById("pswp__icn-fullscreen-exit").style.display = "inline";
    document.getElementById("pswp__icn-fullscreen-request").style.display = "none";
  }, 300);
}

function compressScreen() {
   setTimeout(function () {
    document.getElementById("pswp__icn-fullscreen-exit").style.display = "none";
    document.getElementById("pswp__icn-fullscreen-request").style.display = "inline";
  }, 300);
}

function toggleFullscreen(elem) {
  if (
    (document.fullScreenElement !== undefined &&
      document.fullScreenElement === null) ||
    (document.msFullscreenElement !== undefined &&
      document.msFullscreenElement === null) ||
    (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
    (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
  ) {
    expandScreen();
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    compressScreen();
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}



