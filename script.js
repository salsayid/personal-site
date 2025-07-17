// Gallery modal functionality (robust, supports dynamic images)
(function(){
  // Remove any duplicate modals
  const oldModal = document.getElementById('modal');
  if (oldModal) oldModal.remove();
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.innerHTML = '<span class="close">&times;</span><img id="modal-img"><div id="caption"></div>';
  document.body.appendChild(modal);
  const modalImg = modal.querySelector('#modal-img');
  const captionText = modal.querySelector('#caption');
  const closeBtn = modal.querySelector('.close');
  // Open modal on image click (works for all .gallery-img, even if added later)
  function openModal(e) {
    modal.style.display = 'flex';
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    setTimeout(()=>{modalImg.focus();}, 10);
  }
  function attachModalEvents() {
    document.querySelectorAll('.gallery-img').forEach(img => {
      img.style.cursor = 'pointer';
      img.onclick = openModal;
    });
  }
  attachModalEvents();
  // Also re-attach on DOM changes (for dynamic galleries)
  const observer = new MutationObserver(attachModalEvents);
  observer.observe(document.body, {childList:true, subtree:true});
  // Close modal on X click
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };
  // Close modal on outside click
  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  // Close modal on ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });
})();

// --- ANIMATION BLAST ---
// Animated ASCII divider (waves)
(function(){
  function animateDividers() {
    document.querySelectorAll('.ascii-divider').forEach(div => {
      let base = '----------------------------------------------';
      let t = Date.now()/400;
      let wave = '';
      for (let i=0; i<base.length; ++i) {
        let y = Math.sin(t + i/2)*1.5;
        wave += y > 1 ? '=' : y < -1 ? '_' : '-';
      }
      div.textContent = wave;
    });
    requestAnimationFrame(animateDividers);
  }
  animateDividers();
})();


// Animated Tetris stats (count up)
(function(){
  const stat = document.querySelector('.tetris-preview div b');
  if (!stat) return;
  let target = 44.68, n = 0;
  function count() {
    n += (target-n)*0.18 + 0.01;
    if (Math.abs(n-target)<0.02) n = target;
    stat.textContent = n.toFixed(2)+'s';
    if (n!==target) setTimeout(count, 32);
  }
  count();
})();

// Animated footer (scrolls year)
(function(){
  const foot = document.querySelector('.footer-retro');
  if (!foot) return;
  let base = foot.textContent.replace(/\d{4}/,'');
  let year = 2025;
  setInterval(()=>{
    year++;
    foot.textContent = base + year;
    if (year>2040) year=2025;
  }, 1200);
})();

// --- INNOVATIVE RETRO UPGRADES ---
// 1. Secret Konami Code: unlocks a retro color theme
(function(){
  const code = [38,38,40,40,37,39,37,39,66,65];
  let pos = 0;
  document.addEventListener('keydown', function(e){
    if (e.keyCode === code[pos]) {
      pos++;
      if (pos === code.length) {
        document.body.classList.toggle('konami');
        pos = 0;
      }
    } else {
      pos = 0;
    }
  });
})();

// 2. Retro screensaver: after 60s idle, bounces your name
(function(){
  let timer, screensaver;
  function showSaver() {
    if (!screensaver) {
      screensaver = document.createElement('div');
      screensaver.id = 'screensaver';
      screensaver.style.position = 'fixed';
      screensaver.style.left = 0;
      screensaver.style.top = 0;
      screensaver.style.width = '100vw';
      screensaver.style.height = '100vh';
      screensaver.style.background = 'rgba(0,0,0,0.97)';
      screensaver.style.zIndex = 10010;
      screensaver.style.display = 'flex';
      screensaver.style.alignItems = 'center';
      screensaver.style.justifyContent = 'center';
      screensaver.innerHTML = '<span style="color:#ffb347;font-size:2.2em;font-family:monospace;">SAYID</span>';
      document.body.appendChild(screensaver);
      let x=100, y=100, dx=3, dy=2, el=screensaver.firstChild;
      function bounce() {
        x+=dx; y+=dy;
        if(x<0||x>window.innerWidth-320)dx=-dx;
        if(y<0||y>window.innerHeight-60)dy=-dy;
        el.style.position='absolute';
        el.style.left=x+'px';
        el.style.top=y+'px';
        if(screensaver.style.display==='flex')requestAnimationFrame(bounce);
      }
      bounce();
    }
    screensaver.style.display = 'flex';
  }
  function hideSaver() {
    if (screensaver) screensaver.style.display = 'none';
  }
  function resetTimer() {
    hideSaver();
    clearTimeout(timer);
    timer = setTimeout(showSaver, 60000);
  }
  ['mousemove','keydown','mousedown','touchstart'].forEach(evt=>{
    document.addEventListener(evt, resetTimer);
  });
  resetTimer();
})();

// --- SAYID'S MOVIE PICKS: Live Letterboxd Feed ---
window.addEventListener('DOMContentLoaded', function() {
  const feedContainer = document.getElementById('letterboxd-feed');
  if (!feedContainer) {
    console.warn('No #letterboxd-feed container found in the DOM.');
    return;
  }
  feedContainer.innerHTML = '<div style="color:#ffd600;">Loading Sayid\'s Movie Picks...</div>';
  const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://letterboxd.com/sayidal/rss/');
  console.log('[Letterboxd] Fetching:', url);
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error('Network error');
      return r.json();
    })
    .then(data => {
      if (!data || !data.contents) throw new Error('No data.contents from proxy');
      const parser = new window.DOMParser();
      const xml = parser.parseFromString(data.contents, 'text/xml');
      const items = Array.from(xml.querySelectorAll('item'));
      console.log(`[Letterboxd] Found ${items.length} items in RSS feed.`);
      if (!items.length) throw new Error('No entries found');
      feedContainer.innerHTML = '';
      let shown = 0;
      items.slice(0, 5).forEach((item, idx) => {
        const title = item.querySelector('title')?.textContent || 'Untitled';
        const link = item.querySelector('link')?.textContent || '#';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        let poster = '';
        const desc = item.querySelector('description')?.textContent || '';
        const imgMatch = desc.match(/<img src=\"(.*?)\"/);
        if (imgMatch) poster = imgMatch[1];
        const date = pubDate ? new Date(pubDate).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}) : '';
        // Log each entry
        console.log(`[Letterboxd] Entry ${idx+1}:`, {title, link, date, poster});
        // Card element
        const card = document.createElement('div');
        card.className = 'lb-card';
        card.style.opacity = 0;
        card.innerHTML =
          `<div class='lb-card-inner'>`+
            (poster ? `<img src='${poster}' alt='${title}' class='lb-poster'>` : '')+
            `<div class='lb-info'>
              <a href='${link}' target='_blank' class='lb-title'>${title}</a>
              <div class='lb-date'>${date}</div>
            </div>`+
          `</div>`;
        feedContainer.appendChild(card);
        // Animate in one at a time
        setTimeout(() => { card.style.opacity = 1; }, 200 + idx * 350);
        shown++;
      });
      if (!shown) {
        feedContainer.innerHTML = '<div style="color:#ffd600;">No recent movies found.</div>';
      }
    })
    .catch(err => {
      console.error('[Letterboxd] Error:', err);
      feedContainer.innerHTML = `<div style='color:#f44336;'>Could not load Letterboxd feed.</div>`;
    });
});
