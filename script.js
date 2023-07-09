window.onload = function() {
  var audioPlayer = document.getElementById('audio-player');
  var playBtn = document.getElementById('play-btn');
  var backBtn = document.getElementById('back-btn');
  var forwardBtn = document.getElementById('forward-btn');
  var songsFolder = 'songfiles/'; 

  var songs = [
    { name: 'ACDC - Back In Black', file: 'ACDC - Back In Black.mp3' },
    { name: 'ACDC - Highway to Hell', file: 'ACDC - Highway to Hell.mp3' },
    { name: 'ACDC - Thunderstruck', file: 'ACDC - Thunderstruck.mp3' },
    { name: 'Guns N Roses - November Rain', file: 'Guns N Roses - November Rain.mp3' },
    { name: 'Guns N Roses - Patience', file: 'Guns N Roses - Patience.mp3' },
    { name: 'Guns N Roses - Sweet Child O Mine', file: 'Guns N Roses - Sweet Child O Mine.mp3' },
    { name: 'Metallica - The Unforgiven', file: 'Metallica - The Unforgiven.mp3' },
    { name: 'Metallica - Nothing Else Matters', file: 'Metallica - Nothing Else Matters.mp3' },
    { name: 'Metallica - One', file: 'Metallica - One.mp3' },
    { name: 'Skid Row - 18 And Life', file: 'Skid Row - 18 And Life.mp3' },
    { name: 'Skid Row - I Remember You', file: 'Skid Row - I Remember You.mp3' },
    { name: 'Skid Row - Wasted Time', file: 'Skid Row - Wasted Time.mp3' }
    
  ];

  var currentSongIndex = sessionStorage.getItem('currentSongIndex') || 0;

function playSong() {
  var song = songs[currentSongIndex];
    audioPlayer.src = songsFolder + song.file;
    audioPlayer.play();
    playBtn.textContent = 'Pause';
  }

function pauseSong() {
    audioPlayer.pause();
    playBtn.textContent = 'Play';
  }

function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
    playSong();
  }

function playPreviousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
    playSong();
  }

function togglePlayPause() {
    if (audioPlayer.paused) {
      playSong();
    } else {
      pauseSong();
    }
  }

playBtn.addEventListener('click', togglePlayPause);

forwardBtn.addEventListener('click', playNextSong);

backBtn.addEventListener('click', playPreviousSong);

audioPlayer.addEventListener('ended', function() {
  playNextSong();
});

function loadAllSongs() {
  songs.forEach(function(song, index) {
    var audio = new Audio(songsFolder + song.file);
    audio.addEventListener('loadedmetadata', function() {
      song.duration = audio.duration;
        if (index === Number(currentSongIndex)) {
          playSong();
        }
      });
    });
}

loadAllSongs();


window.addEventListener('beforeunload', function() {
  sessionStorage.setItem('currentSongIndex', currentSongIndex);
  });
};
