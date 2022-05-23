// function reload(id){
//   var container = document.getElementById(id);
//   var content = container.innerHTML;
//   container.innerHTML= content; 
//   console.log("Refreshed"); 
// }

function play_audio() {
  fetch('static/emotion.txt')
  .then(response => response.text())
  .then(data => {
    const audio_mp3 = new Audio('static/audios/'+data+'.mp3');
     audio_mp3.play();
  	console.log(data);
  });
}
