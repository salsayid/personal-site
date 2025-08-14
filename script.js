document.addEventListener('DOMContentLoaded', () => {

  const projectDetails = {

    prepspective: {
      title: 'PrepSpective – AI Interview Practice',
      titleArabic: 'PrepSpective – تدريب مقابلات الذكاء الاصطناعي',
      stack: 'React, Node.js, Express, WebSockets, OpenAI API',
      stackArabic: 'React، Node.js، Express، WebSockets، OpenAI API',
      description: `PrepSpective is a real-time, AI-powered interview practice platform that simulates technical and behavioral interview sessions. Users can select job roles, difficulty levels, and interview styles, then receive tailored questions in a live chat interface. The AI evaluates responses for clarity, technical accuracy, and communication skills, providing instant feedback and follow-up questions. It supports multiple modes: timed challenges, mock panel interviews, and skill-specific drills, making it a versatile tool for job seekers and students alike.`,
      descriptionArabic: `PrepSpective هو منصة تدريب مقابلات تعتمد على الذكاء الاصطناعي في الوقت الفعلي، 
    وتحاكي جلسات المقابلات التقنية والسلوكية. يمكن للمستخدمين اختيار الأدوار الوظيفية، مستويات الصعوبة، وأنماط المقابلات، 
    ثم يتلقون أسئلة مخصصة في واجهة دردشة مباشرة. يقوم الذكاء الاصطناعي بتقييم الإجابات من حيث الوضوح، الدقة التقنية، ومهارات التواصل، 
    مع تقديم ملاحظات فورية وأسئلة متابعة. يدعم أوضاع متعددة: تحديات زمنية، مقابلات جماعية تجريبية، وتمارين خاصة بالمهارات، 
    مما يجعله أداة متعددة الاستخدام للباحثين عن عمل والطلاب.`,
      images: ['prepspective1.png'],
      repo: 'prepspective'
    },    
    gym: {
      title: 'GymSync Planning Application',
      titleArabic: 'تطبيق تخطيط الصالة الرياضية',
      stack: 'React, Firebase, JavaScript, Vite',
      stackArabic: 'React، Firebase، JavaScript، Vite',
      description: `Gym Sync is a real-time coordination tool built for a small lifting group struggling to stay in sync. As someone who prefers working out with friends, I found it increasingly difficult to lock in sessions due to split mismatches (push/pull/legs), misaligned availability, and general flakiness. So I built a solution — lightweight, frictionless, and mobile-first.

The app allows each member to input their preferred workout focus, availability window, and intent to lift that day. It then computes overlap across the group to highlight optimal meet-up times. There’s no authentication; identities are selected locally for a seamless experience. It uses Firebase Firestore for instant updates, React with Vite for a snappy frontend, and plain CSS for fast loading and smooth responsiveness.`,
      descriptionArabic: `Gym Sync هو أداة تنسيق في الوقت الفعلي تم إنشاؤها لمجموعة صغيرة من رفع الأثقال التي تكافح للبقاء متزامنة. كشخص يفضل ممارسة الرياضة مع الأصدقاء، وجدت أنه من الصعب بشكل متزايد تحديد الجلسات بسبب عدم تطابق الانقسامات (دفع/سحب/أرجل)، وعدم توافق التوافر، وعدم الالتزام العام. لذلك قمت ببناء حل - خفيف الوزن، بدون احتكاك، ومصمم للجوال أولاً.

يسمح التطبيق لكل عضو بإدخال تركيز التمرين المفضل لديه، نافذة التوافر، ونية الرفع في ذلك اليوم. ثم يحسب التداخل عبر المجموعة لتسليط الضوء على أوقات اللقاء المثلى. لا يوجد مصادقة؛ يتم اختيار الهويات محليًا لتجربة سلسة. يستخدم Firebase Firestore للتحديثات الفورية، React مع Vite للواجهة الأمامية السريعة، وCSS العادي للتحميل السريع والاستجابة السلسة.`,
      images: ['gym1.png', 'gym2.png'],
      repo: 'gym-planning-app'
    },
    stellar: {
      title: 'StellarLab Propulsion Simulator',
      titleArabic: 'محاكي دفع الصواريخ StellarLab',
      stack: 'Python, Streamlit, SciPy, NumPy, Plotly',
      stackArabic: 'Python، Streamlit، SciPy، NumPy، Plotly',
      description: `StellarLab is an interactive rocket propulsion simulator that models liquid, solid, and hybrid engines across multi-stage mission profiles. Users can visualize dynamic engine behavior, mass depletion, and altitude-based gravity changes in real-time through a sleek web UI built with Streamlit.

Under the hood, it runs a physics-based RK4 integrator to simulate trajectories with high precision. Users can define custom rockets and missions via simple JSON files and export flight logs for analysis. Perfect for aerospace engineering students or space enthusiasts who want to explore propulsion dynamics without writing equations from scratch.`,
      descriptionArabic: `StellarLab هو محاكي دفع صواريخ تفاعلي يقوم بنمذجة المحركات السائلة، الصلبة، والهجينة عبر ملفات تعريف مهام متعددة المراحل. يمكن للمستخدمين تصور سلوك المحرك الديناميكي، استنفاد الكتلة، وتغيرات الجاذبية بناءً على الارتفاع في الوقت الفعلي من خلال واجهة ويب أنيقة تم إنشاؤها باستخدام Streamlit.

تحت الغطاء، يقوم بتشغيل مكامل RK4 قائم على الفيزياء لمحاكاة المسارات بدقة عالية. يمكن للمستخدمين تعريف الصواريخ والمهام المخصصة عبر ملفات JSON بسيطة وتصدير سجلات الرحلات للتحليل. مثالي لطلاب هندسة الطيران أو عشاق الفضاء الذين يرغبون في استكشاف ديناميكيات الدفع دون كتابة المعادلات من الصفر.`,
      images: ['stellar1.png', 'stellar2.png'],
      repo: 'stellarlab'
    },
    burn: {
      title: 'Burn Plan Evaluation App',
      titleArabic: 'تطبيق تقييم خطة الحرق',
      stack: 'Java, OpenWeather API',
      stackArabic: 'Java، OpenWeather API',
      description: `This application supports land managers and fire control teams in making safe, data-informed decisions about prescribed burns. By combining user-entered details — such as location, fuel type, acreage, fire pattern, and available supplies — with real-time weather data from OpenWeather, the system classifies the burn plan as desired, acceptable, not recommended (with category-specific reasons), or completely prohibited.

The algorithm prioritizes certain conditions like wind speed and temperature thresholds and even factors in local burn bans or incomplete data scenarios. It's a rare blend of environmental science, risk modeling, and command-line interactivity.`,
      descriptionArabic: `يدعم هذا التطبيق مديري الأراضي وفرق التحكم في الحرائق في اتخاذ قرارات آمنة ومستنيرة بالبيانات حول الحرائق الموصوفة. من خلال الجمع بين التفاصيل التي يدخلها المستخدم - مثل الموقع، نوع الوقود، المساحة، نمط الحريق، والإمدادات المتاحة - مع بيانات الطقس في الوقت الفعلي من OpenWeather، يصنف النظام خطة الحرق على أنها مرغوبة، مقبولة، غير موصى بها (مع أسباب خاصة بالفئة)، أو محظورة تمامًا.

يعطي الخوارزمية الأولوية لظروف معينة مثل سرعة الرياح وعتبات درجة الحرارة وحتى يأخذ في الاعتبار حظر الحرق المحلي أو سيناريوهات البيانات غير المكتملة. إنه مزيج نادر من علم البيئة، نمذجة المخاطر، وتفاعل سطر الأوامر.`,
      images: [],
      repo: 'Prescribed-Burn-App'
    },
    airport: {
      title: 'Worldwide Airport Tracker',
      titleArabic: 'متتبع المطارات العالمية',
      stack: 'Python, Kivy, SQLAlchemy, Requests',
      stackArabic: 'Python، Kivy، SQLAlchemy، Requests',
      description: `A suite of applications built to streamline how travelers, planners, and data enthusiasts manage airport and travel logistics. This multi-tool system allows users to track weather forecasts, manage international venues and operators, and plan multi-stop trips with real-time database sync — all from a desktop interface.

The apps are tightly integrated to work together but can also function independently. You can build a personalized airport database, connect to remote services, or use it as a forecasting tool before international trips. Whether you're planning travel routes or just geeking out over aviation data, this tool makes it visual, responsive, and scalable.`,
      descriptionArabic: `مجموعة من التطبيقات التي تم إنشاؤها لتبسيط كيفية إدارة المسافرين والمخططين وعشاق البيانات لوجستيات المطارات والسفر. يتيح هذا النظام متعدد الأدوات للمستخدمين تتبع توقعات الطقس، إدارة الأماكن والمشغلين الدوليين، وتخطيط الرحلات متعددة التوقف مع مزامنة قاعدة البيانات في الوقت الفعلي - كل ذلك من واجهة سطح المكتب.

تم دمج التطبيقات بشكل وثيق للعمل معًا ولكن يمكنها أيضًا العمل بشكل مستقل. يمكنك بناء قاعدة بيانات مطارات مخصصة، الاتصال بالخدمات عن بُعد، أو استخدامها كأداة للتنبؤ قبل الرحلات الدولية. سواء كنت تخطط لطرق السفر أو تستمتع بالبيانات الجوية، فإن هذه الأداة تجعلها مرئية، مستجيبة، وقابلة للتطوير.`,
      images: ['air1.png', 'air2.png', 'air3.png'],
      repo: 'worldwide-airport-tracker'
    },
    rccar: {
      title: 'Automated Human-like Moving Target',
      titleArabic: 'هدف متحرك آلي يشبه الإنسان',
      stack: 'Embedded Systems, Pixhawk Autopilot, GPS, Wimu Sensors',
      stackArabic: 'أنظمة مدمجة، Pixhawk Autopilot، GPS، Wimu Sensors',
      description: `This project reimagines how we test sports tech — combining robotics, sensor integration, and field realism. At its core is an RC car modified to carry a life-sized dummy wearing a numbered jersey, designed to move across sports fields in a way that closely mimics real human motion. It was developed to help validate the performance of camera systems (like Hudl's Nexus) and wearable tracking sensors (like the Wimu device) under controlled, repeatable conditions.

The system supports both manual control and preloaded autonomous missions using the Pixhawk 6C flight controller. Real-world testing showed it could simulate realistic acceleration, turns, and stopping patterns — perfect for sideline camera calibration, motion tracking evaluation, or spatial data collection.`,
      descriptionArabic: `يعيد هذا المشروع تصور كيفية اختبار التكنولوجيا الرياضية - الجمع بين الروبوتات، تكامل المستشعرات، وواقعية الميدان. في جوهره سيارة RC معدلة لحمل دمية بحجم الإنسان ترتدي قميصًا مرقمًا، مصممة للتحرك عبر ملاعب الرياضة بطريقة تحاكي حركة الإنسان الحقيقية عن كثب. تم تطويره للمساعدة في التحقق من أداء أنظمة الكاميرا (مثل Nexus من Hudl) وأجهزة تتبع الحركة القابلة للارتداء (مثل جهاز Wimu) في ظل ظروف محكومة وقابلة للتكرار.

يدعم النظام التحكم اليدوي والمهام الذاتية المحملة مسبقًا باستخدام وحدة التحكم في الطيران Pixhawk 6C. أظهرت الاختبارات الواقعية أنه يمكنه محاكاة التسارع الواقعي، المنعطفات، وأنماط التوقف - مثالي لمعايرة الكاميرا الجانبية، تقييم تتبع الحركة، أو جمع البيانات المكانية.`,
      images: ['rccar1.png', 'rccar2.png'],
      repo: 'Automated-human-like-RC-Car'
    }
  };

  /**
   * Initializes the language toggle functionality.
   */
  function initLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (!langBtn) return;

    let isArabic = false;

    const translations = {
        'nav_about': 'عني', 'nav_experience': 'الخبرات', 'nav_projects': 'المشاريع', 'nav_writing': 'كتابات', 'nav_home': 'الرئيسية',
        'hero_name': 'سيد السيد', 'hero_subtitle': 'طالب جامعي | هندسة ميكانيكية + علوم حاسب',
        'hero_email': 'الايميل', 'hero_linkedin': 'لينكدإن', 'hero_github': 'جيت هب',
        'about_title': 'عني', 'experience_title': 'الخبرات', 'projects_title': 'المشاريع', 
        'writing_title': 'كتابات', 'writing_subheader': 'مجموعة من الأفكار حول أي شيء تقريبًا.',
        'about_p': 'أهلاً! أنا سيد، طالب تخصص مزدوج في الهندسة الميكانيكية وعلوم الحاسوب بجامعة نبراسكا لينكولن. شغوف بتقاطع الفيزياء التطبيقية والحوسبة. أحب بناء أدوات تحل مشاكل واقعية وأسعى دائمًا لتعلم المزيد واستكشاف العالم من حولي. هواياتي تشمل لعب التتريس ومشاهدة الأفلام وألعاب الكتابة.',
        'exp_hudl_role': 'متدرب مهندس ضمان جودة البرمجيات', 'exp_hudl_desc': 'طورت اختبارات آلية لواجهات برمجة التطبيقات و Playwright لأنظمة خط التماس في بيئة تطوير سريعة.',
        'exp_nasa_role': 'متدرب مهندس نظم طيران', 'exp_nasa_desc': 'محاكاة أنظمة الطيران والدفع. اختبار أجهزة لتجربة الغليان والتكثيف الانسيابي (FBCE).',
        'exp_unl_role': 'باحث جامعي', 'exp_unl_desc': 'نقل الحرارة النانوي وتحويل الطاقة الثرموأيونية. أجريت تجارب وحللت النتائج.',
        'exp_ntc_role': 'متدرب علم بيانات', 'exp_ntc_desc': 'بنيت نماذج باستخدام بايثون لتحليل شبكات شحن السيارات الكهربائية وتحسين تخطيط النقل في المناطق الريفية.',
        'current_hudl': 'التدريب في Hudl والعمل على ضمان جودة البرمجيات (صيف 2025)',
        'current_chess_bot': 'العمل على روبوت شطرنج يتحكم فيه XYZ gantry ويعمل بواسطة Stockfish',
    };
    
    document.querySelectorAll('[data-translate]').forEach(el => {
      el.dataset.langEn = el.innerHTML.trim();
    });

    const loadArabicFont = () => {
      if (!document.getElementById('arabic-font-link')) {
        const fontLink = document.createElement('link');
        fontLink.id = 'arabic-font-link';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
    };
    
    langBtn.addEventListener('click', () => {
      isArabic = !isArabic;
      
      if (isArabic) {
        loadArabicFont();
        document.body.dir = 'rtl';
        langBtn.textContent = 'English';
      } else {
        document.body.dir = 'ltr';
        langBtn.textContent = 'Arabic';
      }

      document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (isArabic) {
          el.innerHTML = translations[key] || el.dataset.langEn;
        } else {
          el.innerHTML = el.dataset.langEn;
        }
      });

      document.querySelectorAll('.english, .arabic').forEach(el => {
        if (isArabic) {
          el.style.display = el.classList.contains('arabic') ? '' : 'none';
        } else {
          el.style.display = el.classList.contains('english') ? '' : 'none';
        }
      });
    });
  }

  /**
   * Animates ASCII art dividers with a wave effect.
   */
  function initDividerAnimation() {
    const dividers = document.querySelectorAll('.divider');
    if (dividers.length === 0) return;

    let animationFrameId;

    const animate = () => {
      const t = Date.now() / 1000;
      dividers.forEach(div => {
        const width = 60;
        let wave = '';
        for (let i = 0; i < width; i++) {
          const y1 = Math.sin(t * 2 + i / 5) * 0.5;
          const y2 = Math.sin(t * 1.5 + i / 3) * 0.5;
          const y = y1 + y2;
          if (y > 0.7) wave += '▲';
          else if (y > 0.2) wave += '▴';
          else if (y > -0.2) wave += '·';
          else if (y > -0.7) wave += '▾';
          else wave += '▼';
        }
        div.textContent = wave;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationFrameId) animate();
        } else {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      });
    });
    
    dividers.forEach(d => observer.observe(d));
  }

  /**
   * Sets up the project modal functionality.
   */
  function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalContentBody = document.getElementById('modal-content-body');
    const closeModalBtn = document.querySelector('.close-modal');

    if (!modal || !modalContentBody || !closeModalBtn) return;
    
    document.querySelectorAll('.project-list li').forEach(project => {
      project.addEventListener('click', (e) => {
        if (e.target.closest('.github-link')) return;

        const projectId = project.dataset.project;
        const data = projectDetails[projectId];
        const isArabic = document.body.dir === 'rtl';

        modalContentBody.innerHTML = `
          <h3>${isArabic ? data.titleArabic : data.title}</h3>
          <div class="project-stack">${isArabic ? data.stackArabic : data.stack}</div>
          <div class="project-description">${isArabic ? data.descriptionArabic : data.description}</div>
          <div class="project-images">
            ${data.images.map(img => `<img src="images/${img}" alt="${isArabic ? data.titleArabic : data.title}" class="project-image">`).join('')}
          </div>
          <a href="https://github.com/salsayid/${data.repo}" target="_blank" class="modal-github-link">
            <img src="images/github-mark.png" alt="GitHub" class="github-icon">
            ${isArabic ? 'عرض المشروع على جيتهاب' : 'View project on GitHub'}
          </a>
        `;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // Run all initializations
  initLanguageToggle();
  initDividerAnimation();
  initProjectModal();
});