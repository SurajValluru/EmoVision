function set_code() {
  const code_txt = code.value;
  const emotion_txt = document.getElementById("emotion").value;
  code.value = "";
  //   console.log(code_txt.value.charAt(2));
  for (i = 0; i < code_txt.length; i++)
    switch (code_txt.charAt(i)) {
      case ".":
      case "-":
      case " ":
        Cookies.set(emotion_txt, code_txt);
        break;
      default:
        window.alert("Invalid Input");
        return;
    }
}

function set(id) {
  const set = document.getElementById(id).value;
  if (set != "") Cookies.set(id, set);
}

const active = document.querySelector("#custom_config");
active.classList.add("nav__link--active");

const code = document.getElementById("code");
code.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById("code_submit").click();
    code.blur();
  }
});
