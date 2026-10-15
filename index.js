const audioElement = new Audio();

const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');
const remaining = document.getElementById('remaining');
const total = document.getElementById('total');

const playbtn = document.getElementById("playbtn");
const nextbtn = document.getElementById("nextbtn");
const prevbtn = document.getElementById("prevbtn");

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
async function playAudio(file) {
  audioElement.src = file;
  audioElement.play();
  paused = false;

  const meta = await fetch(`${file}/meta`).then(data => data.json());

  title.innerText = meta.common.title;
  artist.innerText = meta.common.artist;
  album.innerText = meta.common.album;
  cover.src = meta.common.picture;
}

nextbtn.addEventListener("click", function() {
  playAudio('./assets/music/102-type_o_negative-i_dont_wanna_be_me.flac')
});

