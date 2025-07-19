document.addEventListener('DOMContentLoaded', () => {

  /**
   * Initializes the language toggle functionality.
   */
  function initLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (!langBtn) return;

    let isArabic = false;

    const translations = {
        // Nav
        'nav_about': 'عني', 'nav_experience': 'الخبرات', 'nav_projects': 'المشاريع', 'nav_writing': 'كتابات', 'nav_home': 'الرئيسية',
        // Hero
        'hero_name': 'سيد السيد', 'hero_animated_prefix': 'أطمح أن أكون <span id="animated-title-word"></span><span class="typing-cursor">|</span>', 'hero_subtitle': 'طالب جامعي | هندسة ميكانيكية + علوم حاسب',
        'hero_email_link': 'الايميل', 'hero_linkedin_link': 'لينكدإن', 'hero_github_link': 'جيت هب',
        // Section Titles
        'about_title': 'عني', 'experience_title': 'الخبرات', 'projects_title': 'المشاريع', 'writing_title': 'كتابات',
        // About
        'about_p': 'أهلاً! أنا سيد، طالب تخصص مزدوج في الهندسة الميكانيكية وعلوم الحاسوب بجامعة نبراسكا لينكولن. شغوف بتقاطع الفيزياء التطبيقية والحوسبة. أحب بناء أدوات تحل مشاكل واقعية وأسعى دائمًا لتعلم المزيد واستكشاف العالم من حولي. هواياتي تشمل لعب التتريس ومشاهدة الأفلام وألعاب الكتابة.',
        // Experience
        'exp_hudl_role': 'متدرب مهندس ضمان جودة البرمجيات', 'exp_hudl_desc': 'طورت اختبارات آلية لواجهات برمجة التطبيقات و Playwright لأنظمة خط التماس في بيئة تطوير سريعة.',
        'exp_nasa_role': 'متدرب مهندس نظم طيران', 'exp_nasa_desc': 'محاكاة أنظمة الطيران والدفع. اختبار أجهزة لتجربة الغليان والتكثيف الانسيابي (FBCE).',
        'exp_unl_role': 'باحث جامعي', 'exp_unl_desc': 'نقل الحرارة النانوي وتحويل الطاقة الثرموأيونية. أجريت تجارب وحللت النتائج.',
        // Add these key-value pairs inside the `translations` object in script.js
        'exp_ntc_role': 'متدرب علم بيانات',
        'exp_ntc_desc': 'بنيت نماذج باستخدام بايثون لتحليل شبكات شحن السيارات الكهربائية وتحسين تخطيط النقل في المناطق الريفية.',
        // Writing
        'writing_post1': 'يوم الإطلاق: مشاهدة انطلاق أوروبا كليبر (أكتوبر ٢٠٢٥)', 'writing_post2': 'لماذا أبني أشياء تحاكي الواقع (سبتمبر ٢٠٢٥)', 'writing_post3': 'رسالة حب إلى سطر الأوامر (أغسطس ٢٠٢٥)',
        // Writing Page
        'writing_header': 'كتابات', 'writing_subheader': 'مجموعة أفكار حول التكنولوجيا والهندسة والفضاء.',
        'writing_post1_title': 'يوم الإطلاق: مشاهدة انطلاق أوروبا كليبر', 'writing_post1_date': '٨ أكتوبر ٢٠٢٥', 'writing_post1_p1': 'استيقظت في الخامسة صباحًا، والأدرينالين يسبق شروق الشمس. لقد حان الوقت — سيصعد مسبار أوروبا كليبر اليوم. سنوات من التصميم والمحاكاة والاختبار تتوج في دقائق قليلة من الصعود العنيف والمتحكم فيه.', 'writing_post1_p2': 'لحظة الاشتعال دائمًا سريالية. زهرة صامتة من النار، ثم هدير منخفض يهتز عبر شاشتك وفي عظامك. إنها شهادة على براعة الإنسان - قدرتنا على توجيه قوة هائلة بهذه الدقة.',
        'writing_post2_title': 'لماذا أبني أشياء تحاكي الواقع', 'writing_post2_date': '٢٠ سبتمبر ٢٠٢٥', 'writing_post2_p1': 'من المحاكاة المدارية إلى تجارب سيارات التحكم عن بعد، كنت دائمًا مهووسًا بجعل الأشياء الافتراضية تتصرف مثل نظيراتها في العالم الحقيقي. هناك سحر معين في التقاط فيزياء الكون في سطور من التعليمات البرمجية.', 'writing_post2_p2': 'المحاكاة الجيدة ليست مجرد أداة تنبؤية؛ إنها ملعب للفهم. يمكنك أن تسأل "ماذا لو؟" مليون مرة دون عواقب. كل تشغيل هو تجربة، وكل نتيجة تعمق من حدسك حول كيفية عمل العالم.',
        'writing_post3_title': 'رسالة حب إلى سطر الأوامر', 'writing_post3_date': '١٤ أغسطس ٢٠٢٥', 'writing_post3_p1': 'الطرفية ليست مجرد أداة - إنها لغة ولغز وملعب في آن واحد. في عالم الواجهات الرسومية المصقولة، يكون سطر الأوامر خامًا ومباشرًا وقويًا. لا يوجد تجريد، فقط أوامرك واستجابة الآلة.', 'writing_post3_p2': 'ربط الأوامر معًا باستخدام `|` يبدو وكأنه تأليف موسيقى. تأخذ إخراج أداة وتنسقه بسلاسة في إدخال أداة أخرى، مما يخلق تدفقات عمل معقدة من كتل بناء بسيطة. إنه تعبير أنيق عن فلسفة يونكس.',
        // Footer
        'footer_text': 'سيد السيد © ٢٠٢٥'
        
    };
    
    // Store original English text
    document.querySelectorAll('[data-translate]').forEach(el => {
      el.dataset.langEn = el.innerHTML;
    });

    // Load Arabic font
    const loadArabicFont = () => {
      if (!document.getElementById('arabic-font-link')) {
        const fontLink = document.createElement('link');
        fontLink.id = 'arabic-font-link';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
    };
    
    const updateLanguage = () => {
      isArabic = !isArabic;
      if (isArabic) {
        loadArabicFont();
        document.body.dir = 'rtl';
        langBtn.textContent = 'English';
      } else {
        document.body.dir = 'ltr';
        langBtn.textContent = 'عربي';
      }

      document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        el.innerHTML = isArabic ? (translations[key] || el.dataset.langEn) : el.dataset.langEn;
      });
      
      // Restart hero animation with new words
      initHeroAnimation(isArabic);
    };

    langBtn.addEventListener('click', updateLanguage);
  }

  /**
   * Initializes the animated hero title.
   * @param {boolean} isArabic - Determines which set of words to use.
   */
  function initHeroAnimation(isArabic = false) {
    const element = document.getElementById('animated-title-word');
    if (!element) return;
    
    // Clear any existing animation timeout
    if (window.heroAnimationTimeout) clearTimeout(window.heroAnimationTimeout);

    const wordsEn = ['engineer', 'developer', 'problem-solver', 'creator'];
    const wordsAr = ['مهندس', 'مطور', 'مبدع', 'مبتكر'];
    const words = isArabic ? wordsAr : wordsEn;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      let typeSpeed = isDeleting ? 60 : 120;
      
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }
      element.textContent = currentWord.substring(0, charIndex);

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause after typing
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
      }

      window.heroAnimationTimeout = setTimeout(type, typeSpeed);
    }
    type();
  }

  /**
   * Animates ASCII art dividers with a wave effect.
   */
  function initDividerAnimation() {
    const dividers = document.querySelectorAll('.divider');
    if (dividers.length === 0) return;

    function animate() {
      dividers.forEach(div => {
        const width = 60;
        let t = Date.now() / 1000;
        let wave = '';
        for (let i = 0; i < width; i++) {
          // Create two overlapping sine waves
          let y1 = Math.sin(t * 2 + i / 5) * 0.5;
          let y2 = Math.sin(t * 1.5 + i / 3) * 0.5;
          let y = y1 + y2;
          // Map the combined wave to characters
          if (y > 0.7) wave += '▲';
          else if (y > 0.2) wave += '▴';
          else if (y > -0.2) wave += '·';
          else if (y > -0.7) wave += '▾';
          else wave += '▼';
        }
        div.textContent = wave;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  /**
   * Project modal functionality
   */
  const projectDetails = {
    stellar: {
      title: 'StellarLab Propulsion Simulator',
      stack: 'Python, Streamlit, SciPy, NumPy, Plotly',
      description: `StellarLab is an interactive rocket propulsion simulator that models liquid, solid, and hybrid engines across multi-stage mission profiles. Users can visualize dynamic engine behavior, mass depletion, and altitude-based gravity changes in real-time through a sleek web UI built with Streamlit.

Under the hood, it runs a physics-based RK4 integrator to simulate trajectories with high precision. Users can define custom rockets and missions via simple JSON files and export flight logs for analysis. Perfect for aerospace engineering students or space enthusiasts who want to explore propulsion dynamics without writing equations from scratch.`,
      images: ['stellar1.png', 'stellar2.png'],
      repo: 'stellarlab'
    },
    burn: {
      title: 'Burn Plan Evaluation App',
      stack: 'Java, OpenWeather API',
      description: `This application supports land managers and fire control teams in making safe, data-informed decisions about prescribed burns. By combining user-entered details — such as location, fuel type, acreage, fire pattern, and available supplies — with real-time weather data from OpenWeather, the system classifies the burn plan as desired, acceptable, not recommended (with category-specific reasons), or completely prohibited.

The algorithm prioritizes certain conditions like wind speed and temperature thresholds and even factors in local burn bans or incomplete data scenarios. It's a rare blend of environmental science, risk modeling, and command-line interactivity.`,
      images: ['grc.png'],
      repo: 'Prescribed-Burn-App'
    },
    airport: {
      title: 'Worldwide Airport Tracker',
      stack: 'Python, Kivy, SQLAlchemy, Requests',
      description: `A suite of applications built to streamline how travelers, planners, and data enthusiasts manage airport and travel logistics. This multi-tool system allows users to track weather forecasts, manage international venues and operators, and plan multi-stop trips with real-time database sync — all from a desktop interface.

The apps are tightly integrated to work together but can also function independently. You can build a personalized airport database, connect to remote services, or use it as a forecasting tool before international trips. Whether you're planning travel routes or just geeking out over aviation data, this tool makes it visual, responsive, and scalable.`,
      images: ['air1.png', 'air2.png', 'air3.png'],
      repo: 'worldwide-airport-tracker'
    },
    rccar: {
      title: 'Automated Human-like Moving Target',
      stack: 'Embedded Systems, Pixhawk Autopilot, GPS, Wimu Sensors',
      description: `This project reimagines how we test sports tech — combining robotics, sensor integration, and field realism. At its core is an RC car modified to carry a life-sized dummy wearing a numbered jersey, designed to move across sports fields in a way that closely mimics real human motion. It was developed to help validate the performance of camera systems (like Hudl's Nexus) and wearable tracking sensors (like the Wimu device) under controlled, repeatable conditions.

The system supports both manual control and preloaded autonomous missions using the Pixhawk 6C flight controller. Real-world testing showed it could simulate realistic acceleration, turns, and stopping patterns — perfect for sideline camera calibration, motion tracking evaluation, or spatial data collection.`,
      images: ['rccar1.png', 'rccar2.png'],
      repo: 'Automated-human-like-RC-Car'
    }
  };

  /**
   * Loads and displays recent blog posts
   */
  async function initRecentPosts() {
    try {
      const response = await fetch('posts.json');
      const data = await response.json();
      const recentPostsContainer = document.getElementById('recent-posts');
      
      if (!recentPostsContainer) return;

      // Get the 3 most recent posts
      const recentPosts = data.posts.slice(0, 3);
      
      const postsHTML = recentPosts.map(post => `
        <a href="writing.html#${post.id}" class="post-item">
          <div class="post-title">${post.title}</div>
          <div class="post-meta">
            <span class="post-date">${post.displayDate}</span>
            <span class="read-more">read more →</span>
          </div>
          <div class="post-excerpt">${post.excerpt}</div>
        </a>
      `).join('');
      
      recentPostsContainer.innerHTML = postsHTML;
    } catch (error) {
      console.error('Error loading recent posts:', error);
    }
  }

  // Initialize project click handlers
  document.querySelectorAll('.project-list li').forEach(project => {
    project.addEventListener('click', (e) => {
      // Don't trigger if clicking the GitHub link
      if (e.target.classList.contains('github-link') || e.target.closest('.github-link')) {
        return;
      }
      
      const projectId = project.dataset.project;
      const projectData = projectDetails[projectId];
      const modal = document.getElementById('project-modal');
      const content = document.getElementById('modal-content');
      
      content.innerHTML = `
        <h3>${projectData.title}</h3>
        <div class="project-stack">${projectData.stack}</div>
        <div class="project-description">${projectData.description}</div>
        <div class="project-images">
          ${projectData.images.map(img => `<img src="images/${img}" alt="${projectData.title}" class="project-image">`).join('')}
        </div>
        <a href="https://github.com/salsayid/${projectData.repo}" target="_blank" class="modal-github-link">
          <img src="images/github-mark.png" alt="GitHub" class="github-icon">
          View project on GitHub
        </a>
      `;
      
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  // Setup modal close functionality
  document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('project-modal').classList.remove('show');
    document.body.style.overflow = '';
  });

  // Close modal on click outside
  document.getElementById('project-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
      document.getElementById('project-modal').classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('project-modal').classList.contains('show')) {
      document.getElementById('project-modal').classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Run initializations
  initLanguageToggle();
  initHeroAnimation();
  initDividerAnimation();
  initRecentPosts();

});