function play(emo) {
  // var audio = document.getElementById("audio");
  const audio = new Audio('static/audios/'+emo+'.mp3');
   audio.play();
}

function reload(id){
  var container = document.getElementById(id);
  var content = container.innerHTML;
  container.innerHTML= content; 
  
 //this line is to watch the result in console , you can remove it later	
  console.log("Refreshed"); 
}