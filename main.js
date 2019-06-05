const closeMainMenu = document.querySelector(".close-main-menu");
const mainMenuBlock = document.querySelector(".main-menu__block");
const mainMenuCover = document.querySelector(".main-menu__cover");
const menuBurger = document.querySelector(".menu-burger");
const aActive = document.querySelector(".main-menu-item__active a");
const scrollText = document.querySelector(".scroll");
const formItems = document.querySelectorAll(".contact-item");
const upArrow = document.querySelector(".up-arrow__container");

const controller = new ScrollMagic.Controller();
const scrollController = new ScrollMagic.Controller();

const menuAnimation = new TimelineLite({ paused: true })
  .staggerFrom(".main-menu li", 0.5, {
    opacity: 0,
    y: 10,
    x: 20,
    rotation: "-10deg",
    scale: 1.2,
    onComplete: () => {
      aActive.classList.add("active");
    }
  } ,0.1);

const aboutAnimation = new TimelineLite()
.from(".about__line", .5, {
  width: 0
})
.from(".about__content p", 0.8, {
  opacity: 0,
  y: 100
});

const servicesAnimation = new TimelineLite()
.staggerFrom(".services__title .word", 1.5, {opacity: 0, top: 60}, 0.1)
.staggerFrom(".service__content img", 1, {opacity: 0, scale: 0.8}, 0.2, 0.2)
.staggerFrom(".service__content h4", 1, {opacity: 0, y: 15}, 0.2, 0.4)
.staggerFrom(".service__content p", 1, {opacity: 0, y: 15}, 0.2, 0.6);


const contactFormAnimation = new TimelineLite()
.staggerFrom(".contact-item input, .contact-item textarea", 1, {width: 0, opacity: 0}, 0.2)
.staggerFrom(".contact-send", 1, {opacity: 0, y: 15}, 0.2);


const width = window.innerWidth;
console.log(width);
if (width > 700) {
  const menuBurgerAnimation = new TimelineLite()
  .to(".menu-burger__line", 0.1, {backgroundColor: "#111", height: "2px"}, 0)
  .to(CSSRulePlugin.getRule(".menu-burger:after"), 0.1, {backgroundColor: '#111', height: "2px"}, 0, 0)
  .to(CSSRulePlugin.getRule(".menu-burger:before"), 0.1, {backgroundColor: '#111', height: "2px"}, 0, 0);

  new ScrollMagic.Scene({
    triggerHook: 0.01,
    triggerElement: '.about'
  }).addTo(controller).setTween(menuBurgerAnimation);
}

const proudAnimation = new TimelineLite()
.staggerFrom(".proud__title .word", 1, {top: 45}, 0.2)
.from(".website", 1, {width: "0px"}, 0.2)
.from(".website__image", 0.5, {opacity: 0});

const subtitleAnimation = new TimelineLite()
.staggerFrom(".h2 .word", 1.5, {top: 36}, 0.1).delay(0.2);

const titleAnimation = new TimelineLite()
.staggerFrom(".h1 .word", 1.5, {top: 60}, 0.1).delay(0.2);

const servicesTitleAnimation = new TimelineLite()
.staggerFrom("services__title .word", 1.5, {top: 60}, 0.1);

const upArrowAnimation = new TimelineLite()
.from(".up-arrow__container", 0, { display: "none" })
.from(".up-arrow__container", 0.8, { opacity: 0 });

new ScrollMagic.Scene({
  triggerHook: 0,
  triggerElement: '.about'
})
.addTo(controller).setTween(upArrowAnimation);

new ScrollMagic.Scene({
  triggerHook: 0.85,
  triggerElement: '.block'
}).addTo(controller).setTween(aboutAnimation);

new ScrollMagic.Scene({
  triggerHook: 0.75,
  triggerElement: '.websites'
}).addTo(controller).setTween(proudAnimation);

new ScrollMagic.Scene({
  triggerHook: 0.75,
  triggerElement: '.services'
}).addTo(controller).setTween(servicesAnimation);

new ScrollMagic.Scene({
  triggerHook: 0.75,
  triggerElement: '.contact'
}).addTo(controller).setTween(contactFormAnimation);

formItems.forEach(formItem => {
  let input = formItem.querySelector("input");
  !input && (input = formItem.querySelector("textarea"));
  input.addEventListener("keydown", () => {
    input.value.length > 0 ? formItem.classList.add("placeholder-shown") : formItem.classList.remove("placeholder-shown");
    input.nodeName === "TEXTAREA" && (input.style.height = input.scrollHeight+'px');
  })
})

closeMainMenu.addEventListener("click", () => {
  mainMenuBlock.classList.add("main-menu__inactive");
  mainMenuCover.style.display = "none";
  menuAnimation.restart().pause();
  aActive.classList.remove("active");
});

menuBurger.addEventListener("click", () => {
  mainMenuBlock.classList.remove("main-menu__inactive");
  mainMenuCover.style.display = "block";
  menuAnimation.resume();
});

scrollText.addEventListener("click", () => TweenLite.to(window, 0.8, { scrollTo: ".about", ease: Back.easeOut.config(1.7) }));
upArrow.addEventListener("click", () => TweenLite.to(window, 0.8, { scrollTo: "html", ease: Power3.easeOut}));
document.addEventListener("resize", () => window.reload());