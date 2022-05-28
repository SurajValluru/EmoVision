window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  document.querySelector("#btnNav").addEventListener("click", () => {
    nav.classList.add("nav--open");
  });
  document.querySelector(".nav__overlay").addEventListener("click", () => {
    nav.classList.remove("nav--open");
  });
});

function default_all() {
  for (let i = 0; i < 7; i++)
    Cookies.set(CUSTOM_KEYS[i], CUSTOM_DICT[CUSTOM_KEYS[i]]);
  Cookies.set("custom", "true");
  Cookies.set("lang", "en");
}
