let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");

// Can be 'user' or 'environment' to access back or front camera (NEAT!)
var facingMode = "user";
// var facingMode = "environment";

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

start_cam().catch(function (err) {
  if (err == "NotAllowedError: Permission denied")
    window.alert("Web app requires camera permission to work.");
  else window.alert("Unknown Error Occured");
});

function send_img() {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height,
                        0,0,video.width,video.height);
  let image_data_url = canvas.toDataURL("image/jpeg");

  // data url of the image
  console.log(image_data_url);
  $.post("/postimage", {
    javascript_data: image_data_url,
  });
}

function closingCode() {
  $.post("/postclose", {
    javascript_data: "loading",
  });
  return null;
}

window.onbeforeunload = closingCode;

let delay = 400;

function play_audio() {
  setTimeout(function () {
    $.get("/getemotion", function (data) {
      const audio_mp3 = new Audio("static/audios/" + data + ".mp3");
      audio_mp3.play();
      console.log(data);
    });
  }, delay);
}
