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

// --- INNOVATIVE RETRO UPGRADES ---



// README MODAL FUNCTIONALITY (robust, supports dynamic buttons)
document.addEventListener('DOMContentLoaded', function () {
  const projectReadmes = {
    rocket: `# Rocket Propulsion Simulator

**Stack:** Python, MATLAB

A physics-based simulator for rocket propulsion analysis and visualization.

- Simulates thrust, ISP, and burn profiles for custom engines
- Interactive plots and parameter sweeps
- Used for research and coursework in astronautics
`,

    burnplan: `# Burn Plan Evaluation App

**Stack:** Java, OpenWeather API

This application supports land managers and fire control teams in making safe, data-informed decisions about prescribed burns. By combining user-entered details — such as location, fuel type, acreage, fire pattern, and available supplies — with real-time weather data from OpenWeather, the system classifies the burn plan as desired, acceptable, not recommended (with category-specific reasons), or completely prohibited. The tool is especially useful in scenarios where regulatory requirements or public safety concerns demand high accountability for burn operations.

The algorithm prioritizes certain conditions like wind speed and temperature thresholds and even factors in local burn bans or incomplete data scenarios. It’s a rare blend of environmental science, risk modeling, and command-line interactivity.

<a href="https://github.com/salsayid/Prescribed-Burn-App" target="_blank" style="display: inline-block; margin-top: 12px;">
View full project on GitHub
`,

    worldwide_airport_tracker: `# Worldwide Airport Tracker

**Stack:** Python, Kivy, SQLAlchemy, Requests

<img src="images/air1.png" alt="Airport Tracker App Screenshot 1" style="width: 100%; max-width: 500px; margin: 12px 0; border-radius: 6px;" />

A suite of applications built to streamline how travelers, planners, and data enthusiasts manage airport and travel logistics. This multi-tool system allows users to track weather forecasts, manage international venues and operators, and plan multi-stop trips with real-time database sync — all from a desktop interface.

<img src="images/air2.png" alt="City and Airport Creation Tool" style="width: 100%; max-width: 500px; margin: 12px 0; border-radius: 6px;" />

The apps are tightly integrated to work together but can also function independently. You can build a personalized airport database, connect to remote services, or use it as a forecasting tool before international trips. Whether you're planning travel routes or just geeking out over aviation data, this tool makes it visual, responsive, and scalable.

<img src="images/air3.png" alt="Travel Planner Interface" style="width: 100%; max-width: 500px; margin: 12px 0; border-radius: 6px;" />

Built with cross-platform UI in mind, it's meant for enthusiasts who want a custom alternative to bloated, one-size-fits-all travel apps — putting control and clarity back into global planning.

<a href="https://github.com/salsayid/worldwide-airport-tracker" target="_blank" style="display: inline-block; margin-top: 12px;">
View full project on GitHub
`,

    rc_car: `# Automated Human-like Moving Target

**Stack:** Embedded Systems, Pixhawk Autopilot, GPS, Wimu Sensors

<img src="images/rccar1.png" alt="RC Car with Dummy" style="width: 100%; max-width: 500px; margin: 12px 0; border-radius: 6px;" />

This project reimagines how we test sports tech — combining robotics, sensor integration, and field realism. At its core is an RC car modified to carry a life-sized dummy wearing a numbered jersey, designed to move across sports fields in a way that closely mimics real human motion. It was developed to help validate the performance of camera systems (like Hudl’s Nexus) and wearable tracking sensors (like the Wimu device) under controlled, repeatable conditions.

The system supports both manual control and preloaded autonomous missions using the Pixhawk 6C flight controller. Real-world testing showed it could simulate realistic acceleration, turns, and stopping patterns — perfect for sideline camera calibration, motion tracking evaluation, or spatial data collection.

<img src="images/rccar2.png" alt="RC Car Test Run" style="width: 100%; max-width: 500px; margin: 12px 0; border-radius: 6px;" />

The dummy's custom 3D mounting solution provides wind resistance and balance, while GPS and onboard sensors log every move for later analysis. Every field run produces actionable data, closing the gap between lab-grade test setups and real-world sports performance.

<a href="https://github.com/salsayid/Automated-human-like-RC-Car" target="_blank" style="display: inline-block; margin-top: 12px;">
View full project on GitHub
`,
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

// --- LANGUAGE TOGGLE: FINALIZED & CORRECTED ---
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (!langBtn) return;

    if (document.body.dataset.langInitialized) return;
    document.body.dataset.langInitialized = 'true';

    window._isArabic = false; // Initial language state
    
    const wordsEn = ['engineer', 'computer scientist', 'full-stack developer', 'embedded systems engineer'];
    const wordsAr = ['مهندس', 'عالم كمبيوتر', 'مطور شامل', 'مهندس أنظمة مدمجة'];

    window.getAnimatedTitleWords = () => window._isArabic ? wordsAr : wordsEn;

    // --- Fix: Ensure hero animation cycles through all words on first load ---
    if (window.restartHeroAnimation) {
        window.restartHeroAnimation();
    } else {
        // If not yet defined, wait for DOMContentLoaded and then run
        document.addEventListener('DOMContentLoaded', function() {
            if (window.restartHeroAnimation) window.restartHeroAnimation();
        });
    }

    // The translations object must use the new keys
    const translations = {
        'nav_about': 'عنّي',
        'nav_experience': 'الخبرات',
        'nav_projects': 'المشاريع',
        'nav_gallery': 'المعرض',
        'nav_tetris': 'تتريس',
        'nav_resume': 'السيرة الذاتية',
        'nav_contact': 'تواصل',
        'btn_random_fact': 'معلومة عشوائية',
        'btn_terminal': 'تيرمنال',
        'hero_name': 'سيد السيد',
        'hero_animated_prefix': 'طموح <span id="animated-title-word"></span><span class="typing-cursor" style="display:inline-block;width:1ch;">|</span>',
        // This key must match the data-translate attribute in your HTML
        'hero_subtitle': 'طالب جامعي في جامعة نبراسكا لينكولن | هندسة ميكانيكية + علوم حاسوب | متدرب في ناسا و هدل',
        'hero_email': 'البريد الإلكتروني: <a href="mailto:alsayidoff@gmail.com" style="color:#ffd600;">alsayidoff@gmail.com</a>',
        'hero_linkedin': 'لينكدإن: <a href="https://linkedin.com/in/sayidalsayid" style="color:#ffd600;">/in/sayidalsayid</a>',
        'hero_github': 'جيت هب: <a href="https://github.com/salsayid" style="color:#ffd600;">github.com/salsayid</a>',
        'title_about': 'عنّي',
        'p_about': 'أهلاً بالجميع! أنا سيد، طالب في تخصص مزدوج في الهندسة الميكانيكية وعلوم الحاسوب بجامعة نبراسكا لينكولن. شغوف بتقاطع الفيزياء التطبيقية والملاحة الفضائية والحوسبة. هدفي هو العمل على أنظمة مادية مدعومة ببرمجيات ذكية. أحب بناء الأدوات التي تحل مشاكل العالم الحقيقي، وأسعى دائمًا لتعلم المزيد وتجاوز الحدود واستكشاف العالم من حولي. خارج النطاق الأكاديمي، تشمل هواياتي لعب <a href=\'https://jstris.jezevec10.com/u/sayid\'>التتريس</a> ومشاهدة <a href=\'https://letterboxd.com/sayidal/\'>الأفلام</a> وممارسة <a href=\'https://www.nitrotype.com/racer/sayidal\'>ألعاب الكتابة</a> والسفر حول العالم!',
        'title_experience': 'الخبرات',
        'exp_hudl_role': 'متدرب مهندس ضمان جودة البرمجيات',
        'exp_hudl_desc': 'طورت اختبارات التشغيل الآلي لـ Playwright و API لأنظمة sideline في بيئة تطوير سريعة',
        'exp_nasa_role': 'متدرب مهندس نظم طيران',
        'exp_nasa_desc': 'محاكاة أنظمة الطيران والدفع. اختبار أجهزة لتجربة الغليان والتكثيف (FBCE)',
        'exp_unl_role': 'باحث جامعي',
        'exp_unl_desc': 'نقل الحرارة النانوي وتحويل الطاقة الحرارية. أجريت تجارب وحللت النتائج وساهمت في أنظمة الطاقة من الجيل التالي.',
        'exp_ntc_role': 'متدرب مهندس برمجيات',
        'exp_ntc_desc': 'بنيت نماذج بلغة بايثون لتحليل شبكات شحن السيارات الكهربائية. حسنت تخطيط النقل في المناطق الريفية.',
        'title_projects': 'المشاريع',
        'btn_readme': 'اقرأني',
        'proj_rocket': 'محاكي دفع صواريخ (python) <a href="https://github.com/salsayid/worldwide-airport-tracker" target="_blank">g</a>',
        'proj_burnplan': 'تطبيق تقييم خطط الحرق (python, sql) <a href="https://github.com/salsayid/worldwide-airport-tracker" target="_blank">g</a>',
        'proj_airport': 'متتبع مطارات عالمي (python, kivy, sql) <a href="https://github.com/salsayid/worldwide-airport-tracker" target="_blank">g</a>',
        'proj_rc_car': 'سيارة تحكم عن بعد آلية تشبه الإنسان <a href="https://github.com/salsayid/Automated-human-like-RC-Car" target="_blank">g</a>',
        'title_gallery': 'المعرض',
        'title_tetris': 'تتريس',
        'tetris_fastest': 'أسرع إنهاء ٤٠ خط:',
        'tetris_sprint_mode': '(طور السرعة في جستريس)',
        'tetris_bests': 'أفضل إنجازاتي: ٤٠ خط ٤٤.٦٨ ثانية، ماراثون ١٬٢٣٤٬٠٠٠، أعلى مستوى ٢٩',
        'tetris_where_i_play': 'أين ألعب:',
        'title_resume': 'السيرة الذاتية',
        'resume_download': 'حمّل سيرتي الذاتية المحدثة <a href="docs/Resume.pdf">من هنا</a>.',
        'title_social': 'التواصل الاجتماعي',
        'social_insta': 'انستغرام',
        'social_x': 'إكس/تويتر',
        'social_letterboxd': 'ليتربوكسد'
    };

    // Store original English text in a data attribute ONCE.
    document.querySelectorAll('[data-translate]').forEach(el => {
        el.dataset.langEn = el.innerHTML;
    });

    function updateLanguage() {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            const englishText = el.dataset.langEn;
            const arabicText = translations[key];
            el.innerHTML = window._isArabic && arabicText ? arabicText : englishText;
        });

        const elementsToAlign = document.querySelectorAll('main, .experience-details');
        elementsToAlign.forEach(el => {
            el.style.textAlign = window._isArabic ? 'right' : 'left';
        });

        document.querySelectorAll('.experience-item').forEach(item => {
            item.style.flexDirection = 'row';
            item.style.gap = window._isArabic ? '0' : '22px';
            item.querySelector('.company-logo').style.marginLeft = window._isArabic ? '22px' : '0';
            item.querySelector('.company-logo').style.marginRight = window._isArabic ? '0' : '22px';
        });

        const fontLink = document.getElementById('arabic-font-link');
        if (window._isArabic && !fontLink) {
            const newFontLink = document.createElement('link');
            newFontLink.id = 'arabic-font-link';
            newFontLink.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono+Arabic:wght@400;700&display=swap';
            newFontLink.rel = 'stylesheet';
            document.head.appendChild(newFontLink);
            document.body.style.fontFamily = "'IBM Plex Mono Arabic', 'IBM Plex Mono', monospace";
            document.body.style.fontSize = '1.08em';
        } else if (!window._isArabic) {
            if (fontLink) fontLink.remove();
            document.body.style.fontFamily = "'IBM Plex Mono', monospace";
            document.body.style.fontSize = '1em';
        }

        // Font logic: always force correct font and size for hero animated title and subtitle
        const animatedTitle = document.getElementById('animated-title');
        const heroSubtitle = document.querySelector('[data-translate="hero_subtitle"]');
        if (animatedTitle) {
            if (window._isArabic) {
                animatedTitle.style.fontFamily = "'IBM Plex Mono Arabic', 'IBM Plex Mono', monospace";
                animatedTitle.style.fontSize = '1.7em'; // slightly larger for Arabic
            } else {
                animatedTitle.style.fontFamily = "'IBM Plex Mono', monospace";
                animatedTitle.style.fontSize = '1.3em';
            }
        }
        if (heroSubtitle) {
            if (window._isArabic) {
                heroSubtitle.style.fontFamily = "'IBM Plex Mono Arabic', 'IBM Plex Mono', monospace";
                heroSubtitle.style.fontSize = '1.18em'; // slightly larger for Arabic
            } else {
                heroSubtitle.style.fontFamily = "'IBM Plex Mono', monospace";
                heroSubtitle.style.fontSize = '1.08em';
            }
        }

        // Fix typing cursor position for both directions: always at end of animated word
        const typingCursor = document.querySelector('.typing-cursor');
        if (animatedTitle && typingCursor) {
            const wordSpan = document.getElementById('animated-title-word');
            if (wordSpan && wordSpan.nextSibling !== typingCursor) {
                wordSpan.parentNode.insertBefore(typingCursor, wordSpan.nextSibling);
            }
            // For RTL, also set direction on parent for correct cursor blink
            if (window._isArabic) {
                animatedTitle.style.direction = 'rtl';
            } else {
                animatedTitle.style.direction = 'ltr';
            }
        }

        if (window.restartHeroAnimation) {
            window.restartHeroAnimation();
        }
    }

    langBtn.addEventListener('click', function() {
        window._isArabic = !window._isArabic;
        updateLanguage();
    });
});