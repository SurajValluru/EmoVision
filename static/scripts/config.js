function set_code() {
  const code_txt = document.getElementById("code").value;
  const emotion_txt = document.getElementById("emotion").value;
  //   console.log(code_txt.value.charAt(2));
  for (i = 0; i < code_txt.length; i++)
    switch(code_txt.charAt(i)){
        case '.':
        case '-':
        case ' ':
            Cookies.set(emotion_txt, code_txt);
            break;
        default:
            window.alert("Invalid Input");
            return;
    }
}

function set_lang(){
  const lang = document.getElementById("lang").value;
  Cookies.set("lang",lang)
}

function set_duration(){
  const duration = document.getElementById("duration").value;
  Cookies.set("duration_unit",duration);
}

const active = document.querySelector("#custom_config");
active.classList.add("nav__link--active");

let CUSTOM_DICT = {
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

let CUSTOM_KEYS = Object.keys(CUSTOM_DICT);

custom = Cookies.get("custom");
if (custom == undefined)
      default_all();