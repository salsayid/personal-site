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
