let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");


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
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height,
    0,0,video.width,video.height);
    let image_data_url = canvas.toDataURL("image/jpeg");
    
    // data url of the image
    console.log(image_data_url);
    return new Promise((resolve) => {
      hey = $.post("/postimage", {
        javascript_data: image_data_url,
      });
      resolve(hey);
  });
}

function play(){
  $.get("/getemotion", function (data) {
    const audio_mp3 = new Audio("static/audios/" + data + ".mp3");
    audio_mp3.play();
    console.log(data);
  });
}

async function send_play() {
  await send_img();
  play();
}

function closingCode() {
  $.post("/postclose", {
    javascript_data: "loading",
  });
  return null;
}

window.onbeforeunload = closingCode;

// Can be 'user' or 'environment' to access back or front camera (NEAT!)
var facingMode = "user";
// var facingMode = "environment";

start_cam().catch(function (err) {
  if (err == "NotAllowedError: Permission denied")
    window.alert("Web app requires camera permission to work.");
    else window.alert("Unknown Error Occured");
  });

let cook = Cookies.get('action')

switch(cook){
  case undefined:
    Cookies.set('action','english');
    break;
  case 'english':
  case 'universal':
  case 'custom':
  case 'morse':
    console.log('defined')

}