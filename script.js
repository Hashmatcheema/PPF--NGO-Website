/**
 * Pak-Palestine Forum (PPF) — Phase 1
 * Language toggle, mobile nav, chatbot, form handling
 */

(function () {
  'use strict';

  const HTML = document.documentElement;
  const LANG_KEY = 'ppf-lang';
  const LANG_EN = 'en';
  const LANG_UR = 'ur';

  // ----- Language toggle -----
  function getStoredLang() {
    try {
      return localStorage.getItem(LANG_KEY) || LANG_EN;
    } catch (_) {
      return LANG_EN;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {}
  }

  function applyLang(lang) {
    const isUrdu = lang === LANG_UR;
    HTML.lang = lang;
    HTML.dir = isUrdu ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en][data-ur]').forEach(function (el) {
      const en = el.getAttribute('data-en');
      const ur = el.getAttribute('data-ur');
      if (en != null && ur != null) {
        el.textContent = isUrdu ? ur : en;
      }
    });

    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function (el) {
      const en = el.getAttribute('data-placeholder-en');
      const ur = el.getAttribute('data-placeholder-ur');
      if (en != null && ur != null) {
        el.placeholder = isUrdu ? ur : en;
      }
    });

    const langCurrent = document.querySelector('.lang-current');
    const langOther = document.querySelector('.lang-other');
    if (langCurrent) langCurrent.textContent = isUrdu ? 'اردو' : 'EN';
    if (langOther) langOther.textContent = isUrdu ? 'EN' : 'اردو';

    setStoredLang(lang);
  }

  function initLangToggle() {
    applyLang(getStoredLang());
    const btn = document.querySelector('.lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const next = HTML.lang === LANG_UR ? LANG_EN : LANG_UR;
        applyLang(next);
      });
    }
  }

  // ----- Mobile nav -----
  function initNavToggle() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    if (!header || !toggle) return;

    toggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
      toggle.setAttribute('aria-label', header.classList.contains('nav-open') ? 'Close menu' : 'Open menu');
    });

    document.querySelectorAll('.nav-main a, .nav-mobile a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
      });
    });
  }

  // ----- Chatbot -----
  function initChatbot() {
    const trigger = document.querySelector('.chatbot-trigger');
    const panel = document.getElementById('chatbot-panel');
    const closeBtn = panel && panel.querySelector('.chatbot-close');

    if (trigger && panel) {
      trigger.addEventListener('click', function () {
        const isHidden = panel.hidden;
        panel.hidden = !isHidden;
        trigger.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          panel.hidden = true;
          trigger.setAttribute('aria-expanded', 'false');
        });
      }
    }
  }

  // ----- Contact form (placeholder: prevent submit, show message) -----
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Phase 1: no backend; show brief feedback. Replace with real submit later.
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = HTML.lang === LANG_UR ? 'بھیجا گیا!' : 'Sent!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        form.reset();
      }, 2000);
    });
  }

  // ----- Scroll reveal -----
  function initScrollReveal() {
    var sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    function checkSection(section) {
      var rect = section.getBoundingClientRect();
      var top = rect.top;
      var windowHeight = window.innerHeight;
      if (top < windowHeight * 0.82) {
        section.classList.add('animate-in');
      }
    }

    var observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) entry.target.classList.add('animate-in');
            });
          },
          { rootMargin: '0px 0px -12% 0px', threshold: 0 }
        )
      : null;

    sections.forEach(function (section) {
      checkSection(section);
      if (observer) observer.observe(section);
    });

    window.addEventListener('load', function () {
      sections.forEach(checkSection);
    });
  }

  // ----- Run -----
  initLangToggle();
  initNavToggle();
  initChatbot();
  initContactForm();
  initScrollReveal();
})();
