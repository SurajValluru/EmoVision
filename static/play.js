let video = document.querySelector("#video");
let click_button = document.querySelector("#play");
let canvas = document.querySelector("#canvas");

// var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)

async function start_cam() {
  let stream = await navigator.mediaDevices.getUserMedia({
    // video: {
    //     facingMode: facingMode
    //    }
    video: true,
    audio: false,
  });
  video.srcObject = stream;
}

start_cam();

function send_img() {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");

  // data url of the image
  console.log(image_data_url);
  $.post("/postmethod", {
    javascript_data: image_data_url,
  });
}

function closingCode() {
  $.post("/postmethodclose", {
    javascript_data: "loading",
  });
  return null;
}

let delay = 500;

function play_audio() {
  setTimeout(function () {
    fetch("static/emotion.txt")
      .then((response) => response.text())
      .then((data) => {
        const audio_mp3 = new Audio("static/audios/" + data + ".mp3");
        audio_mp3.play();
        console.log(data);
      });
  }, delay);
}

window.onbeforeunload = closingCode;
