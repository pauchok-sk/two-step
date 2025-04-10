(() => {
    "use strict";
    function burger() {
        const burgerOpenBtn = document.querySelector("#burger-open");
        const burgerCloseBtn = document.querySelector("#burger-close");
        const burger = document.querySelector("#burger");
        const burgerOverlay = document.querySelector("#burger-overlay");
        if (burger) {
            burgerOverlay.addEventListener("click", burgerClose);
            burgerOpenBtn.addEventListener("click", (e => {
                e.stopPropagation();
                burgerOpen();
            }));
            burgerCloseBtn.addEventListener("click", (e => {
                e.stopPropagation();
                burgerClose();
            }));
            function burgerOpen() {
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                document.body.classList.add("body-hidden");
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function burgerClose() {
        const burger = document.querySelector("#burger");
        const burgerOverlay = document.querySelector("#burger-overlay");
        burger.classList.remove("_open");
        burgerOverlay.classList.remove("_active");
        document.body.classList.remove("body-hidden");
    }
    function anchors_anchor() {
        const anchors = document.querySelectorAll("[data-anchor]");
        if (anchors.length) anchors.forEach((link => {
            link.addEventListener("click", (function(e) {
                e.preventDefault();
                let href = this.getAttribute("href").substring(1);
                const scrollTarget = document.getElementById(href);
                if (scrollTarget) {
                    const offsetPosition = scrollTarget.getBoundingClientRect().top - document.querySelector(".header").clientHeight;
                    window.scrollBy({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                    if (document.querySelector("#burger").classList.contains("_open")) burgerClose();
                }
            }));
        }));
    }
    function coursesToggle() {
        const btn = document.querySelector("#courses-btn");
        if (btn) {
            const aside = document.querySelector("#aside-courses");
            const overlay = document.querySelector("#aside-overlay");
            const btnClose = document.querySelector("#courses-close");
            btn.addEventListener("click", (() => {
                if (aside.classList.contains("_open")) handleClose(); else handleOpen();
            }));
            btnClose.addEventListener("click", handleClose);
            overlay.addEventListener("click", handleClose);
            function handleOpen() {
                aside.classList.add("_open");
                overlay.classList.add("_active");
                document.body.classList.add("body-hidden");
            }
            function handleClose() {
                aside.classList.remove("_open");
                overlay.classList.remove("_active");
                document.body.classList.remove("body-hidden");
            }
        }
    }
    function faqToggle() {
        const btn = document.querySelector(".s-faq__more-btn");
        if (btn) {
            const spollersDom = document.querySelectorAll(".s-faq__spoller");
            const spollers = Array.from(spollersDom).splice(4, spollersDom.length);
            spollers.forEach((s => s.style.display = "none"));
            btn.addEventListener("click", (() => {
                if (btn.classList.contains("_active")) {
                    spollers.forEach((s => s.style.display = "none"));
                    btn.classList.remove("_active");
                    btn.textContent = "Чи є протипоказання?";
                } else {
                    spollers.forEach((s => s.style.display = "block"));
                    btn.classList.add("_active");
                    btn.textContent = "Сховавши";
                }
            }));
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", (() => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop) header.classList.add("_hide"); else header.classList.remove("_hide");
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
    }
    function sliders() {
        const reviewsSlider = document.querySelector(".s-reviews__slider");
        if (reviewsSlider) {
            new Swiper(reviewsSlider, {
                speed: 800,
                spaceBetween: 16,
                slidesPerView: 1,
                autoplay: {
                    delay: 3500
                },
                navigation: {
                    prevEl: ".s-reviews .slider-btn._prev",
                    nextEl: ".s-reviews .slider-btn._next"
                },
                pagination: {
                    el: ".s-reviews .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    768: {
                        spaceBetween: 32,
                        slidesPerView: 2
                    }
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                }));
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
    }
    function tab() {
        const buttonsTab = document.querySelectorAll("[data-tab-btn]");
        if (buttonsTab.length) buttonsTab.forEach((btn => {
            const parent = btn.closest(".tab-container");
            const currentTabs = parent.querySelectorAll("[data-tab]");
            const currentButtons = parent.querySelectorAll("[data-tab-btn]");
            btn.addEventListener("click", (() => {
                const idTab = btn.dataset.tabBtn;
                const currentTab = parent.querySelector(`[data-tab="${idTab}"]`);
                currentTabs.forEach((t => t.classList.remove("_open")));
                currentButtons.forEach((b => b.classList.remove("_active")));
                currentTab.classList.add("_open");
                btn.classList.add("_active");
            }));
        }));
    }
    function timer() {
        const timers = document.querySelectorAll(".product-card__time");
        if (timers.length) timers.forEach((timer => {
            const dataDate = timer.dataset.date;
            const endTime = new Date(dataDate);
            let interval;
            function updateTimer() {
                const timeLeft = countdown(endTime);
                timer.innerHTML = `${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`;
                if (endTime - new Date <= 0) {
                    timer.innerHTML = "Время вышло!";
                    clearInterval(interval);
                }
            }
            updateTimer();
            interval = setInterval(updateTimer, 1e3);
        }));
    }
    Fancybox.bind("[data-fancybox]", {
        closeButton: false
    });
    spoller();
    burger();
    tab();
    timer();
    anchors_anchor();
    sliders();
    headerScroll();
    faqToggle();
    coursesToggle();
    document.addEventListener("DOMContentLoaded", (() => {
        new Plyr("#player");
    }));
})();