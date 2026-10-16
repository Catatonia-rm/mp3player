const audioElement = new Audio();

const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');
const remaining = document.getElementById('remaining');
const total = document.getElementById('total');
const slider = document.getElementById('slider');

const playbtn = document.getElementById("playbtn");
const nextbtn = document.getElementById("nextbtn");
const prevbtn = document.getElementById("prevbtn");

let paused = true;
let curTrack = 0;
let dragging = false;

class Track {
  constructor(file) {
    this.file = file;
    this.metaloaded = fetch(`${file}/meta`).then(data => data.json()).then(meta => {
      this.title = meta.title;
      this.artist = meta.artist;
      this.album = meta.album;
      this.cover = meta.picture;
    }).catch(error => { console.error(error) });
  };
  async play() {
    audioElement.src = this.file;
    audioElement.play();
    paused = false;
    await this.metaloaded;
    title.innerText = this.title;
    artist.innerText = this.artist;
    album.innerText = this.album;
    cover.src = this.cover;
  }
}
let tracks =
  [
    new Track('./assets/music/I Don\'t Wanna Be Me - Type O Negative.flac'),
    new Track('./assets/music/Panchiko - Failed at Math(s) - 01 - Failed at Math(s).mp3'),
    new Track('./assets/music/in the sea - kensuke ushio.flac'),
    new Track('./assets/music/01 - Duvet.flac'),
    new Track('./assets/music/02 - Malcolm Todd - Roommates.mp3')
  ]
tracks[curTrack].metaloaded.then(() => {
  title.innerText = tracks[curTrack].title;
  artist.innerText = tracks[curTrack].artist;
  album.innerText = tracks[curTrack].album;
  cover.src = tracks[curTrack].cover;
  audioElement.src = tracks[curTrack].file;
}
)

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

//load duration and slider
audioElement.addEventListener("loadedmetadata", function() {
  total.innerText = new Date(audioElement.duration * 1000).toISOString().substring(14, 19);
  slider.max = audioElement.duration;
  setInterval(function() {
    if (!dragging) {
      slider.value = audioElement.currentTime;
    }
    remaining.innerText = new Date(audioElement.currentTime * 1000).toISOString().substring(14, 19);
  }, 100)
})
slider.addEventListener("mousedown", function() {
  dragging = true;
})
slider.addEventListener("click", function() {
  audioElement.currentTime = slider.value;
  audioElement.play();
  dragging = false;
})

nextbtn.addEventListener("click", function() {
  if (curTrack < tracks.length - 1) {
    curTrack++;
  }
  tracks[curTrack].play();
});
prevbtn.addEventListener("click", function() {
  if (curTrack > 0) {
    curTrack--;
  }
  tracks[curTrack].play();
});

