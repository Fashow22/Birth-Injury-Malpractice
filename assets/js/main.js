/* ============================================
   THE ALVAREZ LAW FIRM — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Page Loader ---
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 400);
    });
    // Fallback: hide after 3s
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  // --- Navbar Scroll Effect ---
  const nav = document.querySelector('.nav-glass');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('translate-x-0');
      if (isOpen) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });

    if (menuOverlay) {
      menuOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Counter Animation ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // --- Testimonial Carousel ---
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    const cards = carousel.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let currentIndex = 0;
    let autoplayTimer;

    function showTestimonial(index) {
      cards.forEach((card, i) => {
        card.classList.remove('active', 'exit-left');
        if (i === index) {
          card.classList.add('active');
        }
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('bg-gold', i === index);
        dot.classList.toggle('opacity-100', i === index);
        dot.classList.toggle('bg-white', i !== index);
        dot.classList.toggle('opacity-40', i !== index);
      });
      currentIndex = index;
    }

    function nextTestimonial() {
      showTestimonial((currentIndex + 1) % cards.length);
    }

    function prevTestimonial() {
      showTestimonial((currentIndex - 1 + cards.length) % cards.length);
    }

    function startAutoplay() {
      autoplayTimer = setInterval(nextTestimonial, 6000);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextTestimonial(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevTestimonial(); startAutoplay(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAutoplay(); showTestimonial(i); startAutoplay(); });
    });

    showTestimonial(0);
    startAutoplay();

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // --- Sticky CTA (Mobile) ---
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    }, { passive: true });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Form Handling ---
  const forms = document.querySelectorAll('form[data-form]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<svg class="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>';
      btn.disabled = true;

      // Simulated submission
      setTimeout(() => {
        btn.innerHTML = 'Thank You! We\'ll Be in Touch.';
        btn.classList.remove('btn-gold');
        btn.style.background = 'var(--teal)';
        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.classList.add('btn-gold');
          btn.style.background = '';
        }, 4000);
      }, 1500);
    });
  });

  // --- Active Nav Link Highlighting ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('text-gold');
    }
  });

});

/* --- Utility: throttle --- */
function throttle(fn, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
