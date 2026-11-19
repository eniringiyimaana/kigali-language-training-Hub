/* ============================================================
   Kigali Language Training Hub - interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Canonical / social URLs ----------
     Keeps the URLs in sync with the current host automatically. */
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    const pageUrl = window.location.href.split('#')[0].split('?')[0];
    const imageUrl = new URL('assests/logo.jpeg', pageUrl).href;

    const canonical = document.getElementById('canonicalUrl');
    const ogUrl = document.getElementById('ogUrl');
    const ogImage = document.getElementById('ogImage');
    const twitterImage = document.getElementById('twitterImage');

    if (canonical) canonical.setAttribute('href', pageUrl);
    if (ogUrl) ogUrl.setAttribute('content', pageUrl);
    if (ogImage) ogImage.setAttribute('content', imageUrl);
    if (twitterImage) twitterImage.setAttribute('content', imageUrl);
  }

  /* ---------- Program data ---------- */
  const programs = [
    {
      code: 'TCF',
      name: 'TCF - Test de Connaissance du Français',
      level: 'French knowledge test',
      desc: 'A recognised French language test used for immigration, study and professional projects.',
      points: ['Reading & listening practice', 'Speaking and writing preparation', 'Level targeting and mock tests'],
      details: 'Preparation focuses on the four tested skills, exam timing and the question types used in the TCF. We help you identify the score band you need and track your progress with timed practice.',
      goals: ['Canadian immigration and study applications', 'Prove your French level to institutions', 'Placement and professional requirements']
    },
    {
      code: 'TEF CAN',
      name: 'TEF Canada',
      level: 'Immigration & citizenship',
      desc: 'French evaluation test for Canadian immigration, citizenship and study applications.',
      points: ['Express Entry-focused coaching', 'Speaking interview rehearsal', 'Writing task correction'],
      details: 'TEF Canada preparation builds the listening, reading, writing and speaking skills needed for Canadian immigration and citizenship files. Sessions include exam-format drills and personalised feedback.',
      goals: ['Express Entry and provincial programmes', 'Canadian citizenship application', 'Study permit applications']
    },
    {
      code: 'TEFAQ',
      name: 'TEFaQ',
      level: 'Québec selection',
      desc: 'French evaluation test adapted for Québec immigration and selection procedures.',
      points: ['Québec-specific question formats', 'Oral expression practice', 'Score-target planning'],
      details: 'We prepare candidates for the TEFaQ format with a focus on oral comprehension and expression, plus strategies for the written sections. Your coach helps you work toward the level required by your file.',
      goals: ['Québec skilled worker applications', 'Québec study projects', 'Family sponsorship files']
    },
    {
      code: 'TEF',
      name: 'TEF',
      level: 'France applications',
      desc: 'French language evaluation used for French nationality, residence and integration processes.',
      points: ['Oral interview preparation', 'Writing and comprehension drills', 'Official-format mock exams'],
      details: 'Preparation for the TEF covers the language level expected in French nationality and residency procedures, with extra attention to the spoken interview and everyday administrative vocabulary.',
      goals: ['French nationality application', 'Long-term residence', 'Integration and civic life']
    },
    {
      code: 'DELF',
      name: 'DELF',
      level: 'Diploma - A1 to B2',
      desc: 'Official French language diplomas from beginner to independent user level.',
      points: ['CEFR-aligned syllabus', 'All four skill components', 'Exam technique and feedback'],
      details: 'DELF preparation follows the CEFR levels A1 to B2. Lessons combine grammar, vocabulary, comprehension and production with regular practice in the exact format of each diploma unit.',
      goals: ['School and university requirements', 'Proof of French level for work', 'A recognised international diploma']
    },
    {
      code: 'DALF',
      name: 'DALF',
      level: 'Diploma - C1 to C2',
      desc: 'Advanced French diplomas for learners aiming at C1 and C2 mastery.',
      points: ['Advanced argumentation', 'Complex listening and reading', 'Essay and oral defence practice'],
      details: 'DALF training develops advanced expression, comprehension and critical analysis. We work with authentic materials, structured essay writing and oral presentation practice for C1 and C2 candidates.',
      goals: ['French-speaking university study', 'Advanced professional roles', 'High-level language certification']
    }
  ];

  /* ---------- Render program cards ---------- */
  const grid = document.getElementById('programGrid');

  if (grid) {
    programs.forEach(function (program, index) {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-xl-4 reveal';
      col.setAttribute('data-delay', String((index % 3) * 90));

      const points = program.points.map(function (point) {
        return '<li>' + point + '</li>';
      }).join('');

      col.innerHTML =
        '<article class="program-card">' +
          '<div class="program-icon">' + program.code + '</div>' +
          '<h3>' + program.name + '</h3>' +
          '<div class="program-level">' + program.level + '</div>' +
          '<p class="program-desc">' + program.desc + '</p>' +
          '<ul class="program-points">' + points + '</ul>' +
          '<button type="button" class="program-link" data-index="' + index + '">View details &rarr;</button>' +
        '</article>';

      grid.appendChild(col);
    });
  }

  /* ---------- Program detail modal ---------- */
  const programModal = document.getElementById('programModal');

  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('.program-link');
    if (!trigger || !programModal) return;

    const program = programs[Number(trigger.dataset.index)];
    if (!program) return;

    document.getElementById('programModalTag').textContent = program.level;
    document.getElementById('programModalLabel').textContent = program.name;
    document.getElementById('programModalDesc').textContent = program.details;

    const list = document.getElementById('programModalList');
    list.innerHTML = program.goals.map(function (goal) {
      return '<li>' + goal + '</li>';
    }).join('');

    const cta = document.getElementById('programModalCta');
    cta.setAttribute('href', '#contact');
    cta.textContent = 'Enquire about ' + program.code;

    bootstrap.Modal.getOrCreateInstance(programModal).show();
  });

  /* ---------- Navbar state ---------- */
  const nav = document.getElementById('mainNav');
  const backTop = document.getElementById('backTop');

  function onScroll() {
    const scrolled = window.scrollY > 30;
    if (nav) nav.classList.toggle('scrolled', scrolled);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Reveal on scroll (includes cards rendered above) ---------- */
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('visible'); });
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');

  function animateCounter(element) {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && counters.length) {
    const countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (counter) { countObserver.observe(counter); });
  } else {
    counters.forEach(function (counter) {
      counter.textContent = counter.dataset.count + (counter.dataset.suffix || '');
    });
  }

  /* ---------- Active nav link ---------- */
  const navLinks = document.querySelectorAll('.site-nav .nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  if ('IntersectionObserver' in window && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          const isActive = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { threshold: 0.35 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- Toast helper ---------- */
  const toast = document.getElementById('siteToast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3800);
  }

  /* ---------- Enquiry form -> WhatsApp handoff ---------- */
  const form = document.getElementById('enquiryForm');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const value = function (id) { return document.getElementById(id).value.trim(); };

      const message =
        'Hello Kigali Language Training Hub,\n\n' +
        'I would like to enquire about: ' + value('program') + '\n\n' +
        'Name: ' + value('fullName') + '\n' +
        'Phone / WhatsApp: ' + value('phone') + '\n' +
        'Email: ' + value('email') + '\n' +
        'Message: ' + value('message') + '\n\n' +
        'Thank you.';

      const url = 'https://wa.me/250787462289?text=' + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener,noreferrer');
      showToast('Your message is ready in WhatsApp. Press send to continue.');

      form.reset();
      form.classList.remove('was-validated');
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
