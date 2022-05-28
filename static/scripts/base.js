window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  document.querySelector("#btnNav").addEventListener("click", () => {
    nav.classList.add("nav--open");
  });
  document.querySelector("#overlay").addEventListener("click", () => {
    nav.classList.remove("nav--open");
  });
});

const CUSTOM_DICT = {
  angry: "...",
  disgust: ".......",
  fear: "......",
  happy: ".",
  multi: "-.-",
  neutral: "..",
  no: "--",
  sad: ".....",
  surprise: "....",
};

CUSTOM_KEYS = Object.keys(CUSTOM_DICT);

function default_all() {
  for (let i = 0; i < 7; i++)
    Cookies.set(CUSTOM_KEYS[i], CUSTOM_DICT[CUSTOM_KEYS[i]]);
  Cookies.set("custom", "true");
  Cookies.set("lang", "en");
  Cookies.set("cam","environment");
}

config = Cookies.get("custom");
if (config == undefined) default_all();
else if(config != "true") window.alert("Cookies are corrupted. Please clear cookies in you browser.")