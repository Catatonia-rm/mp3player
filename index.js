const audioElement = new Audio('./assets/music/in the sea - kensuke ushio.flac');
const playbtn = document.getElementById("playbtn");
let paused = true;
playbtn.addEventListener("click", function() {
  if (paused) {
    audioElement.play();
    paused = false;
  }
  else {
    audioElement.pause();
    paused = true;
  }
})

function getMeta(file, func) {
  fetch(`${file}/meta`)
    .then(data => data.json())
    .then(data => { func(data); })
    .catch(error => {
      console.error(error);
    });
}

getMeta(audioElement.src, function(data) {
  console.log(data);
})

