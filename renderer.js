const { ipcRenderer } = require('electron');

// Function to play the selected video
function playVideo(file) {
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');

  console.log(`Attempting to play video from path: ${file}`);

  videoSource.src = `file://${file}`;

  // Add event listeners to log video events
  videoPlayer.addEventListener('loadstart', () => window.electron.log('Video load started.'));
  videoPlayer.addEventListener('loadeddata', () => window.electron.log('Video data loaded.'));
  videoPlayer.addEventListener('canplay', () => window.electron.log('Video can play.'));
  videoPlayer.addEventListener('play', () => window.electron.log('Video playing.'));
  videoPlayer.addEventListener('pause', () => window.electron.log('Video paused.'));
  videoPlayer.addEventListener('ended', () => window.electron.log('Video ended.'));
  videoPlayer.addEventListener('error', (e) => console.error('Video error:', e));

  videoPlayer.load();
  videoPlayer.play()
    .then(() => window.electron.log('Video playback started successfully.'))
    .catch((error) => window.electron.log('Error starting video playback:', error));
}

// Function to handle file selection
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0].path;
  playVideo(file);
});

// Expose the API to the renderer process
window.electron = {
  log: (message) => ipcRenderer.send('log', message)
};
