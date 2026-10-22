/* ===== DEEPESH KUMAR — Interactive Animations & Responsive Enhancements ===== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect (subtle blur & shadow on scroll)
  const header = document.querySelector('.site-header');
  const updateHeader = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // 2. Mobile Menu toggle & auto-close on link click or outside click
  const navToggle = document.getElementById('nav-toggle');
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.burger');

  if (navToggle && menu) {
    // Close menu when clicking any menu link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.checked = false;
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navToggle.checked && !menu.contains(e.target) && !burger?.contains(e.target)) {
        navToggle.checked = false;
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  }

  // 3. Scroll Reveal Animations (All text and elements guaranteed 100% visible immediately)
  const revealElements = document.querySelectorAll(
    '.card, .spec-card, .sec-head, .split > div, .step, .quote, .strip .item, .for-box, .contact-grid, .banner, .checks li, .audience .card'
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal');
    el.classList.add('active'); // Guaranteed immediate visibility
  });

  // 4. Back to Top Button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = `
    <svg class="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  document.body.appendChild(backToTop);

  const toggleBackToTop = () => {
    if (window.scrollY > 450) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 5. Hero element smooth entrance
  const heroCopy = document.querySelector('.hero-copy');
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroCopy) heroCopy.classList.add('animate-fadeInUp');
  if (heroPhoto) heroPhoto.classList.add('animate-fadeIn');
});
