var sound = new Howl({
  // src: ["images/aud_0.mp3"],
});

/*
          // REDUCE NAVBAR HEIGHT ON SCROLL
          */
$(window).scroll(function (event) {
  var y = $(this).scrollTop(); //set position from top when to change style in pixels
  if (y >= window.innerHeight + 150) {
    $(".ds-navbar .navbar").addClass("slim");
  } else {
    $(".ds-navbar .navbar").removeClass("slim");
  }
});
/*
          // SWIPER CAROSUEL SETTINGS
          */
var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  // init: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    180: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});
var swiper_single = new Swiper(".swiper-container-single", {
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  // init: false,
  pagination: {
    el: ".swiper-container-single .swiper-pagination",
    clickable: true,
  },
});

/*
          // ON SCROLL ANIMATION SETTINGS
          */
var s;
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 150, // offset (in px) from the original trigger point
  delay: 50, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
$(".nav-link").on("click", function () {
  $(".navbar-collapse").collapse("hide");
});

/*
          // CARD TILT ANIMATION EFFECT - TILT JS
          */
const tilt = $(".ds-tilt").tilt({
  maxTilt: 10,
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 300, // Speed of the enter/exit transition.
  transition: true, // Set a transition on enter/exit.
  disableAxis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  glare: false, // Enables glare effect
  maxGlare: 0, // From 0 - 1.
});

/*
          ::::::::::::::::::::::::::::::::::::::::::::::::::::
          FORM FOCUS HANDLING
          — To enable material design like labels
          ::::::::::::::::::::::::::::::::::::::::::::::::::::
          */
// on input focus label add class
$(".form-group input, .form-group select").on("focus", function () {
  $(this).siblings("label").addClass("focus");
});
$(".form-group input, .form-group select").on("blur", function () {
  if ($(this).val() == "") {
    $(this).siblings("label").removeClass("focus");
  }
});
$(".form-group textarea").on("focus", function () {
  // $(this).siblings("label").hide();
});

/*
      // LOGO ANIMATION
      */
var animation = lottie.loadAnimation({
  container: document.getElementById("logo"), // Required
  path: "logo.json", // Required
  renderer: "svg", // Requireds vg/canvas/html
  loop: true, // Optional
  autoplay: true, // Optional
  name: "Hello World", // Name for future reference. Optional.
});

var heroVideo = lottie.loadAnimation({
  container: document.getElementById("hero-video"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "two_intro.json",
});
var dominoVideo = lottie.loadAnimation({
  container: document.getElementById("domino-video"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "domino.json",
});

var contactVideo = lottie.loadAnimation({
  container: document.getElementById("contact-video"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets10.lottiefiles.com/packages/lf20_REOnx3.json",
});

// on complete, hide it
contactVideo.addEventListener("complete", hideContactAnimation);
// add click event listener for contact form
document
  .getElementById("contact-button")
  .addEventListener("click", function () {
    console.log("submit");
    // play contact submit video
    document.getElementById("contact-video").classList.add("play");
    contactVideo.play();
  });
function hideContactAnimation() {
  // $("#contact-video").removeClass("play");
  document.getElementById("contact-video").classList.remove("play");
}

$(function () {
  // var autostart = touchStarted();
  console.log("ready");
  // AOS.refresh();
  // $("body").scrollTo(50);
});

/*
        ::::::::::::::::::::::::::::::::::::::::::::::::::::
        CAROUSEL
        ::::::::::::::::::::::::::::::::::::::::::::::::::::
        */
$("#work-carousel-left").bind("slide.bs.carousel", function (e) {
  // e.preventDefault();
  console.log($(this));
  // $(this).carousel("next");
  console.log(e.relatedTarget);
  // e.relatedTarget.classList.add("animate");\
  var animEndEv = "webkitAnimationEnd animationend";

  $(e.relatedTarget)
    .find(".carousel-caption")
    .first()
    .addClass("animate__fadeInLeft")
    .one(animEndEv, function () {
      console.log("animEnd");
      console.log(this);
      console.log($(this));
      this.classList.remove("animate__fadeInLeft");
    });
});

$("#work-carousel-left").bind("slid.bs.carousel", function (e) {
  console.log("slid event!");
  // e.relatedTarget.classList.remove("animate");
});
