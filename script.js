/* ============================================================
   QUADRA CERTA — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ===================================================
     1. NAV — adiciona sombra ao rolar mais de 60px
     =================================================== */
  var nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  /* ===================================================
     2. SERVIÇOS — efeito sticky stacking
     Quando o card seguinte atinge top:120px, o card
     anterior recebe scale(0.97) translateY(-14px)
     =================================================== */
  var serviceCards = document.querySelectorAll('.service-card');

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function handleServicesScroll() {
    if (isMobile()) return;

    serviceCards.forEach(function (card, i) {
      if (i < serviceCards.length - 1) {
        var nextCard = serviceCards[i + 1];
        var nextTop = nextCard.getBoundingClientRect().top;

        if (nextTop <= 124) {
          card.classList.add('card-behind');
        } else {
          card.classList.remove('card-behind');
        }
      }
    });
  }

  window.addEventListener('scroll', handleServicesScroll, { passive: true });

  window.addEventListener('resize', function () {
    if (isMobile()) {
      serviceCards.forEach(function (card) {
        card.classList.remove('card-behind');
        card.style.transform = '';
      });
    }
  });


  /* ===================================================
     3. INTERSECTION OBSERVER — animações fade
     Seleciona .fade-up, .fade-left, .fade-right
     Aplica .visible quando entram na viewport (0.15)
     data-delay controla o atraso da transição
     =================================================== */
  var animatables = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  if (!('IntersectionObserver' in window)) {
    /* Fallback para navegadores sem suporte */
    animatables.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;

          el.style.transitionDelay = delay + 'ms';
          el.classList.add('visible');

          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -32px 0px'
    });

    animatables.forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ===================================================
     4. SMOOTH SCROLL — cliques em âncoras internas
     Compensa a altura do nav sticky
     =================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      var navHeight = nav ? nav.offsetHeight : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });

})();
