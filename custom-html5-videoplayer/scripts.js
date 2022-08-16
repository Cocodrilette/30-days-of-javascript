// Getting the player

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = document.querySelector('#fullscreen-button');

// Build out functions

const togglePlay = () => {
    video.paused ? 
                (video.play(),
                toggle.textContent = '⏸️')
                : 
                (video.pause(), 
                toggle.textContent = '▶️')
        
};

const skip = (e) => video.currentTime += parseFloat(e.target.dataset.skip)

const handleRange = (e) => video[e.target.name] = e.target.value

const handleProgress = () => progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%` 

const scrub = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

const handleFullscreen = (e) => {
    // Many if to allow cross browser compatibility
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { 
        video.msRequestFullscreen();
      }
}
// Hook up the event listeners

video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreenBtn.addEventListener('click', handleFullscreen);
