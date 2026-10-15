const audioElement = new Audio('./assets/music/Panchiko - Failed at Math(s) - 01 - Failed at Math(s).mp3');

const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');

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

async function getMeta(file) {
  const meta = await fetch(`${file}/meta`).then(data => data.json());
  console.log(meta);
  console.log(meta.common.picture.data);

  title.innerText = meta.common.title;
  artist.innerText = meta.common.artist;
  album.innerText = meta.common.album;
  cover.src = meta.common.picture;

}

getMeta(audioElement.src);
