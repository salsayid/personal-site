// Modal functionality for gallery images
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementsByClassName('close')[0];

// Open modal on image click
Array.from(document.getElementsByClassName('gallery-img')).forEach(img => {
  img.onclick = function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
});

// Close modal on X click
closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Optionally: Add beep sound for matrix rain Easter egg
function retroBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = 880;
    o.connect(ctx.destination);
    o.start();
    setTimeout(() => { o.stop(); ctx.close(); }, 80);
  } catch (e) {}
}
document.addEventListener('keydown', function(e) {
  if (e.key === '~') retroBeep();
});
