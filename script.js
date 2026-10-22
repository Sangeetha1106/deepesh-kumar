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

  if (navToggle && menu && burger) {
    const setMenuOpen = (isOpen) => {
      navToggle.checked = isOpen;
      burger.classList.toggle('active', isOpen);
      menu.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    };

    burger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setMenuOpen(!navToggle.checked);
    });

    // Close menu when clicking any menu link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setMenuOpen(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navToggle.checked && !menu.contains(e.target) && !burger.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.checked) {
        setMenuOpen(false);
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

  // 6. Interactive Form Validation (Real-time, blur, & submission handling)
  const enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    const nameInput = document.getElementById('n');
    const emailInput = document.getElementById('e');
    const nameError = document.getElementById('n-error');
    const emailError = document.getElementById('e-error');
    const submitBtn = document.getElementById('submit-enquiry-btn');

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    const touched = {
      name: false,
      email: false
    };

    const validateName = (showError = true) => {
      if (!nameInput) return true;
      const val = nameInput.value.trim();
      let isValid = true;
      let msg = '';

      if (val === '') {
        isValid = false;
        msg = 'Name is required.';
      }

      if (!isValid && showError) {
        nameInput.classList.add('is-invalid');
        nameInput.setAttribute('aria-invalid', 'true');
        if (nameError) {
          nameError.textContent = msg;
          nameError.classList.add('visible');
        }
      } else if (isValid) {
        nameInput.classList.remove('is-invalid');
        nameInput.removeAttribute('aria-invalid');
        if (nameError) {
          nameError.textContent = '';
          nameError.classList.remove('visible');
        }
      }
      return isValid;
    };

    const validateEmail = (showError = true) => {
      if (!emailInput) return true;
      const val = emailInput.value.trim();
      let isValid = true;
      let msg = '';

      if (val === '') {
        isValid = false;
        msg = 'Email address is required.';
      } else if (!emailPattern.test(val) || val.indexOf('.') === -1 || val.endsWith('.')) {
        isValid = false;
        msg = 'Please enter a valid email address.';
      } else {
        const parts = val.split('@');
        const domain = parts[1] || '';
        const domainParts = domain.split('.');
        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2) {
          isValid = false;
          msg = 'Please enter a valid email address.';
        }
      }

      if (!isValid && showError) {
        emailInput.classList.add('is-invalid');
        emailInput.setAttribute('aria-invalid', 'true');
        if (emailError) {
          emailError.textContent = msg;
          emailError.classList.add('visible');
        }
      } else if (isValid) {
        emailInput.classList.remove('is-invalid');
        emailInput.removeAttribute('aria-invalid');
        if (emailError) {
          emailError.textContent = '';
          emailError.classList.remove('visible');
        }
      }
      return isValid;
    };

    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        touched.name = true;
        validateName(true);
      });
      nameInput.addEventListener('input', () => {
        if (touched.name || nameInput.classList.contains('is-invalid')) {
          validateName(true);
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        touched.email = true;
        validateEmail(true);
      });
      emailInput.addEventListener('input', () => {
        if (touched.email || emailInput.classList.contains('is-invalid')) {
          validateEmail(true);
        }
      });
    }

    let isSubmitting = false;
    enquiryForm.addEventListener('submit', (e) => {
      if (isSubmitting) {
        e.preventDefault();
        return;
      }

      touched.name = true;
      touched.email = true;

      const isNameValid = validateName(true);
      const isEmailValid = validateEmail(true);

      if (!isNameValid || !isEmailValid) {
        e.preventDefault();
        if (!isNameValid && nameInput) {
          nameInput.focus();
        } else if (!isEmailValid && emailInput) {
          emailInput.focus();
        }
        return;
      }

      // Valid form: prevent double submission briefly
      isSubmitting = true;
      if (submitBtn) {
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = '0.75';
      }
      setTimeout(() => {
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.removeAttribute('disabled');
          submitBtn.style.opacity = '1';
        }
      }, 3500);
    });
  }
});
