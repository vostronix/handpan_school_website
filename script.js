/**
 * handpan.school Landing Page – Interactions
 */

// ── Mobile Nav Toggle ──────────────────────────────────────
(function toggleNav() {
  const btn = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      links.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.classList.remove('active');
      links.classList.remove('open');
    }
  });
})();

// ── Navbar scroll effect ───────────────────────────────────
(function navScroll() {
  const navbar = document.querySelector('.navbar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
        } else {
          navbar.style.boxShadow = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ── Scroll Animations (Intersection Observer) ─────────────
(function scrollAnimations() {
  const elements = document.querySelectorAll('[data-feature]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    elements.forEach(el => el.classList.add('visible'));
  }
})();

// ── Theme Toggle (auto-detect) ────────────────────────────
(function detectTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Listen for changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    });
})();

// ── Smooth scroll for anchor links ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Parallax subtle effect on hero visual ─────────────────
(function parallaxHero() {
  const visual = document.querySelector('.hero-visual');
  if (!visual) return;

  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        visual.style.transform = `translate(${x}px, ${y}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ── Alphabet wheel hover interaction ──────────────────────
(function alphabetInteraction() {
  const letters = document.querySelectorAll('.alphabet-wheel text');

  letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
      letter.setAttribute('fill', '#FFB400');
      letter.setAttribute('font-size', '20');
    });

    letter.addEventListener('mouseleave', () => {
      const isMain = letter.getAttribute('font-size') === '12';
      letter.setAttribute('fill', isMain ? '#FFFFFF' : '#ADB1F3');
      letter.setAttribute('font-size', isMain ? '12' : '14');
    });
  });
})();

console.log('🎵 handpan.school – Welcome!');
