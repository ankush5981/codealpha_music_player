const audio = document.getElementById("audio");
const audioSource = document.getElementById("audio-source");
const playPauseButton = document.getElementById("playPause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
const playlist = document.getElementById("playlist");
const albumArt = document.getElementById("album-art");

let currentTrackIndex = 0;

// Playlist data
const tracks = [
    {
        title: "Jab Tak",
        artist: "Arman Malik",
        file: "song1.mp3",
        duration: 210, // in seconds
        albumArt: "https://via.placeholder.com/200",
    },

];

// Load the current track
function loadTrack(index) {
    const track = tracks[index];
    audioSource.src = track.file;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    albumArt.src = track.albumArt;
    audio.load();
    updateProgress();
}

// Play/Pause button toggle
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "Pause";
    } else {
        audio.pause();
        playPauseButton.textContent = "Play";
    }
}

// Update progress bar and time display
function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
}

// Change track on progress bar input
progressBar.addEventListener("input", () => {
    const progress = progressBar.value;
    audio.currentTime = (progress / 100) * audio.duration;
});

// Volume control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value / 100;
});

// Previous Track
prevButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseButton.textContent = "Pause";
});

// Next Track
nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseButton.textContent = "Pause";
});

// Playlist selection
playlist.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        currentTrackIndex = parseInt(e.target.getAttribute("data-index"));
        loadTrack(currentTrackIndex);
        audio.play();
        playPauseButton.textContent = "Pause";
    }
});

// Event listeners
audio.addEventListener("timeupdate", updateProgress);

// Load initial track
loadTrack(currentTrackIndex);
