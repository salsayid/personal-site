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
// Secret Konami Code: unlocks a retro color theme
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

// README MODAL FUNCTIONALITY (robust, supports dynamic buttons)
(function(){
  const projectReadmes = {
    rocket: `# Rocket Propulsion Simulator\n\n**Stack:** Python, MATLAB\n\nA physics-based simulator for rocket propulsion analysis and visualization.\n\n- Simulates thrust, ISP, and burn profiles for custom engines\n- Interactive plots and parameter sweeps\n- Used for research and coursework in astronautics\n`,
    burnplan: `# Burn Plan Evaluation App\n\n**Stack:** Python, OpenCV, SQL\n\nTool for evaluating and visualizing prescribed burn plans for land management.\n\n- Image analysis of satellite/aerial data\n- Generates reports and risk assessments\n- Used by researchers and land managers\n`,
    smarthome: `# Smart Home System\n\n**Stack:** Raspberry Pi, Python, JavaScript\n\nIoT system for automating and monitoring home devices.\n\n- Real-time sensor data and device control\n- Custom dashboard and alerting\n- Integrates with voice assistants\n`,
    rc_car: `# Automated Human-like RC Car\n\n**Stack:** Python, Embedded, Computer Vision\n\nRC car with human-like driving using computer vision and ML.\n\n- Lane detection and obstacle avoidance\n- Trained on real driving data\n- [GitHub](https://github.com/salsayid/Automated-human-like-RC-Car)\n`
  };
  const modal = document.getElementById('readme-modal');
  const modalBody = document.getElementById('readme-modal-body');
  const closeBtn = document.getElementById('readme-modal-close');
  // Use event delegation for all current/future .readme-btn
  document.addEventListener('click', function(e) {
    if (e.target.classList && e.target.classList.contains('readme-btn')) {
      e.preventDefault();
      const key = e.target.getAttribute('data-project');
      if (!modal || !modalBody) return;
      modalBody.innerHTML = '<pre style="white-space:pre-wrap;font-size:1.08em;line-height:1.7;">'+(projectReadmes[key]||'README not found.')+'</pre>';
      modal.style.display = 'flex';
      setTimeout(()=>{
        const content = document.getElementById('readme-modal-content');
        if(content) content.focus();
      }, 10);
    }
  });
  if (closeBtn) closeBtn.onclick = function(){ modal.style.display = 'none'; };
  if (modal) modal.onclick = function(e){ if(e.target===modal) modal.style.display='none'; };
  document.addEventListener('keydown', function(e){
    if(modal && modal.style.display==='flex' && (e.key==='Escape'||e.key==='Enter')) modal.style.display='none';
  });
})();
