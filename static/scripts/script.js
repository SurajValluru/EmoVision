let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");

function setCookie(action) {
  Cookies.set("action", action);
}

async function start_cam() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: facingMode,
    },
    // video: true,
    audio: false,
  });
  video.srcObject = stream;
}

function send_img() {
  canvas
    .getContext("2d")
    .drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      video.width,
      video.height
    );
  let image_data_url = canvas.toDataURL("image/jpeg");

  // data url of the image
  // console.log(image_data_url);
  return new Promise((resolve) => {
    returned_post = $.post("/postimage", {
      javascript_data: image_data_url,
    });
    resolve(returned_post);
  });
}

function play_audio(action, emotion) {
  const audio_mp3 = new Audio(
    "static/audios/" + action + "/" + emotion + ".mp3"
  );
  audio_mp3.play();
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function vibrate_dit_dash(message) {
  let unit = 100;
  for (i = 0; i < message.length; i++) {
    switch (message[i]) {
      case ".":
        navigator.vibrate(unit);
        await delay(2 * unit);
        break;
      case "-":
        navigator.vibrate(3 * unit);
        await delay(4 * unit);
        break;
      case " ":
        await delay(3 * unit);
        if (message[i + 1] == " ") await delay(unit);
        break;
      default:
        window.alert(
          "Custom messages are corrupted. Please clear cookies in you browser."
        );
    }
  }
  console.log(message);
}

function act(action) {
  $.get("/getemotion", function (emotion) {
    console.log(action, emotion);

    switch (action) {
      case "universal":
      case "english":
        play_audio(action, emotion);
        break;
      case "morse":
        vibrate_dit_dash(MORSE_DICT[emotion]);
        break;
      case "custom":
        vibrate_dit_dash(CUSTOM_DICT[emotion]);
        break;
      default:
        window.alert(
          "Cookies are corrupted. Please clear cookies in you browser."
        );
    }
  });
}

async function send_play() {
  await send_img();
  let cook = Cookies.get("action");
  if (cook == undefined) {
    cook = "universal";
    Cookies.set("action", "universal");
  }
  act(cook);
}

let MORSE_DICT = {
  angry: ".- -. --. .-. -.--",
  disgust: "-.. .. ... --. ..- ... -",
  fear: "..-. . .- .-.",
  happy: ".... .- .--. .--. -.--",
  multi: "-- ..- .-.. - ..",
  neutral: "-. . ..- - .-. .- .-..",
  no: "-. ---  ..-. .- -.-. .",
  sad: "... .- -..",
  surprise: "... ..- .-. .--. .-. .. ... .",
};

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

// Can be 'user' or 'environment' to access back or front camera
var facingMode = "user";
// var facingMode = "environment";

// if(facingMode == "user"){
// video.setAttribute(  "transform", "rotateY(180deg)");
// video.setAttribute(  "-webkit-transform", "rotateY(180deg)");
// video.setAttribute(  "-moz-transform", "rotateY(180deg)");
// }

start_cam().catch(function (err) {
  if (err == "NotAllowedError: Permission denied")
    window.alert("Web app requires camera permission to work.");
  else window.alert("Unknown Error Occured");
});
