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
  }
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
      let t = Date.now()/600; // slower, smoother
      let wave = '';
      for (let i=0; i<base.length; ++i) {
        let y = Math.sin(t + i/3)*1.7;
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
document.addEventListener('DOMContentLoaded', function () {
  const projectReadmes = {
    rocket: `# Rocket Propulsion Simulator\n\n**Stack:** Python, MATLAB\n\nA physics-based simulator for rocket propulsion analysis and visualization.\n\n- Simulates thrust, ISP, and burn profiles for custom engines\n- Interactive plots and parameter sweeps\n- Used for research and coursework in astronautics\n`,
    burnplan: `# Burn Plan Evaluation App\n\n**Stack:** Python, OpenCV, SQL\n\nTool for evaluating and visualizing prescribed burn plans for land management.\n\n- Image analysis of satellite/aerial data\n- Generates reports and risk assessments\n- Used by researchers and land managers\n`,
    worldwide_airport_tracker: `# Worldwide Airport Tracker\n\n**Stack:** Python, Kivy, SQLAlchemy, Requests\n\nA suite of apps for tracking airports, venues, and planning travel worldwide.\n\n- **First Tracking App:** Manage venues/operators, check forecasts.\n- **Second Tracking App:** Create airports/cities, check forecasts.\n- **Travel Planner App:** Enter DB credentials, plan travel, manage remote DB.\n\n**Status:** All three main components are finished and complete.\n\n**Building & Running:**\n- Python 3.10+ required\n- Install dependencies: \`pip install kivy sqlalchemy mysql-connector-python requests\`\n- Run \`installer.py\` to set up the database\n- Run \`airport_main.py\` to start the tracking app\n- For travel planner, set up \`credentials.json\` and run \`travel_main.py\`\n\n[GitHub Repository](https://github.com/salsayid/worldwide-airport-tracker)\n\n**Authors:** Sayid Alsayid, Ethan Friedman, James Benton, Nathaniel McVay\n`,
    rc_car: `# Automated Human-like RC Car\n\n**Stack:** Python, Embedded, Computer Vision\n\nRC car with human-like driving using computer vision and ML.\n\n- Lane detection and obstacle avoidance\n- Trained on real driving data\n- [GitHub](https://github.com/salsayid/Automated-human-like-RC-Car)\n`
  };

  const modal = document.getElementById('readme-modal');
  const modalBody = document.getElementById('readme-modal-body');
  const closeBtn = document.getElementById('readme-modal-close');

  // Open modal on .readme-btn click
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('readme-btn')) {
      e.preventDefault();
      const key = e.target.getAttribute('data-project');
      if (!modal || !modalBody) return;
      modalBody.innerHTML =
        '<pre style="white-space:pre-wrap;font-size:1.08em;line-height:1.7;">' +
        (projectReadmes[key] || 'README not found.') +
        '</pre>';
      modal.style.display = 'flex';
      setTimeout(() => {
        const content = document.getElementById('readme-modal-content');
        if (content) content.focus();
      }, 10);
    }
  });

  // Close modal on close button
  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = 'none';
    };
  }

  // Close modal on background click
  if (modal) {
    modal.onclick = function (e) {
      if (e.target === modal) modal.style.display = 'none';
    };
  }

  // Close modal on Escape or Enter
  document.addEventListener('keydown', function (e) {
    if (modal && modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Enter')) {
      modal.style.display = 'none';
    }
  });
});

// Retro Starfield/Phosphor Particle Dots Background for Hero Section + Occasional Space Objects
(function(){
  const canvas = document.getElementById('hero-particles-bg');
  if (!canvas) return;
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const ctx = canvas.getContext('2d');
  const DOTS = 64;
  const dots = [];
  for(let i=0;i<DOTS;++i){
    const r = 0.7 + Math.random()*1.2;
    dots.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight*0.7+window.innerHeight*0.05,
      r,
      dx: (Math.random()-0.5)*0.04,
      dy: (Math.random()-0.5)*0.03,
      o: 0.18+Math.random()*0.22,
      c: Math.random()<0.7 ? '#ffd600' : '#ffb347',
      tw: Math.random()*Math.PI*2,
      tws: 0.01+Math.random()*0.02
    });
  }
  // Space objects: shooting stars, ISS, galaxies
  const spaceObjects = [];
  function spawnSpaceObject() {
    const w = canvas.width, h = canvas.height;
    const typeRand = Math.random();
    if (typeRand < 0.5) {
      // Shooting star
      const angle = Math.random()*Math.PI/3 - Math.PI/6;
      const speed = 2.2 + Math.random()*1.8;
      spaceObjects.push({
        type: 'shooting',
        x: Math.random()<0.5 ? 0 : w,
        y: Math.random()*h*0.5+h*0.1,
        dx: Math.cos(angle)*(Math.random()<0.5?speed:-speed),
        dy: Math.sin(angle)*speed,
        life: 0,
        max: 60+Math.random()*30
      });
    } else if (typeRand < 0.8) {
      // ISS (simple rectangle)
      spaceObjects.push({
        type: 'iss',
        x: -60,
        y: Math.random()*h*0.5+h*0.1,
        dx: 1.2+Math.random()*0.7,
        dy: 0.05+Math.random()*0.04,
        life: 0,
        max: 180+Math.random()*60
      });
    } else {
      // Galaxy (swirl)
      spaceObjects.push({
        type: 'galaxy',
        x: Math.random()*w*0.8+w*0.1,
        y: Math.random()*h*0.5+h*0.1,
        r: 8+Math.random()*10,
        a: Math.random()*Math.PI*2,
        life: 0,
        max: 120+Math.random()*60
      });
    }
  }
  setInterval(()=>{ if(Math.random()<0.5) spawnSpaceObject(); }, 3200);
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const d of dots){
      // Twinkle effect
      const twinkle = 0.7 + 0.5*Math.sin(d.tw);
      ctx.save();
      ctx.globalAlpha = d.o * twinkle;
      ctx.shadowColor = d.c;
      ctx.shadowBlur = 8 + 8*twinkle;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r*(1+0.5*twinkle),0,2*Math.PI);
      ctx.fillStyle = d.c;
      ctx.fill();
      ctx.restore();
      // Move
      d.x += d.dx;
      d.y += d.dy;
      d.tw += d.tws;
      // Wrap around edges
      if(d.x<0) d.x=canvas.width;
      if(d.x>canvas.width) d.x=0;
      if(d.y<window.innerHeight*0.05) d.y=window.innerHeight*0.85;
      if(d.y>window.innerHeight*0.85) d.y=window.innerHeight*0.05;
    }
    // Draw and update space objects
    for(let i=spaceObjects.length-1;i>=0;--i){
      const o = spaceObjects[i];
      ctx.save();
      if(o.type==='shooting'){
        // Shooting star: white/yellow streak
        ctx.globalAlpha = 0.7*(1-o.life/o.max);
        ctx.strokeStyle = '#fffbe6';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(o.x, o.y);
        ctx.lineTo(o.x-o.dx*12, o.y-o.dy*12);
        ctx.stroke();
        ctx.globalAlpha = 0.5*(1-o.life/o.max);
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = '#ffd600';
        ctx.beginPath();
        ctx.moveTo(o.x, o.y);
        ctx.lineTo(o.x-o.dx*7, o.y-o.dy*7);
        ctx.stroke();
      } else if(o.type==='iss'){
        // ISS: rectangle with solar panels
        ctx.globalAlpha = 0.82*(1-o.life/o.max);
        ctx.save();
        ctx.translate(o.x, o.y);
        ctx.rotate(-0.18);
        ctx.fillStyle = '#b3e5fc';
        ctx.fillRect(-12,-3,24,6);
        ctx.fillStyle = '#ffd600';
        ctx.fillRect(-22,-2,10,4);
        ctx.fillRect(12,-2,10,4);
        ctx.restore();
      } else if(o.type==='galaxy'){
        // Galaxy: swirl of faint dots
        ctx.globalAlpha = 0.13*(1-o.life/o.max);
        for(let j=0;j<18;++j){
          const a = o.a + j*Math.PI/9;
          const rr = o.r*(0.7+0.5*Math.sin(o.life/12+j));
          ctx.beginPath();
          ctx.arc(o.x+Math.cos(a)*rr, o.y+Math.sin(a)*rr, 2.2, 0, 2*Math.PI);
          ctx.fillStyle = j%3===0?'#ffd600':(j%3===1?'#ffb347':'#fffbe6');
          ctx.fill();
        }
      }
      ctx.restore();
      // Move/update
      if(o.type==='shooting'||o.type==='iss'){
        o.x += o.dx;
        o.y += o.dy;
      }
      o.life++;
      if(o.life>o.max) spaceObjects.splice(i,1);
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
