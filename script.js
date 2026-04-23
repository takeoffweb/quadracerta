/* =============================================
   QUADRA CERTA — SCRIPTS
   ============================================= */

var IMAGENS = {
  hero: [
    'img/hero-01.jpg',
    'img/hero-02.jpg',
    'img/hero-03.jpg'
  ],
  servicos: [
    'img/servico-01.png',
    'img/servico-02.png'
  ],
  tq10: [
    { src: 'img/1tq10.jpg',   duration: 6000 },
    { src: 'img/2tq10.png',   duration: 3000 },
    { src: 'img/3tq10.jpeg',  duration: 4000 },
    { src: 'img/4tq10.png',   duration: 4000 }
  ],
  treinamentos: [
    'img/detalhe-01.jpeg',
    'img/detalhe-02.jpeg'
  ],
  sobre: 'img/galeria-01.jpeg',
  mentoria: [
    'img/mentoria-01.jpg',
    'img/mentoria-02.jpg',
    'img/mentoria-video.mp4',
    'img/mentoria-03.jpg',
    'img/mentoria-04.jpg'
  ]
};

(function () {
  'use strict';

  /* ---- INJEÇÃO DE IMAGENS ---- */

  var heroSlider = document.getElementById('hero-slider');
  IMAGENS.hero.forEach(function (src, i) {
    var div = document.createElement('div');
    div.className = 'hero-slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = 'url(' + src + ')';
    heroSlider.appendChild(div);
  });


  var tq10Carousel = document.getElementById('tq10-carousel');
  IMAGENS.tq10.forEach(function (item, i) {
    var div = document.createElement('div');
    div.className = 'tq10-slide' + (i === 0 ? ' active' : '');
    var img = document.createElement('img');
    img.src = item.src;
    img.dataset.duration = item.duration;
    img.loading = 'lazy';
    div.appendChild(img);
    tq10Carousel.appendChild(div);
  });

  IMAGENS.treinamentos.forEach(function (src, i) {
    var img = document.getElementById('treinamento-img-' + i);
    if (img) img.src = src;
  });

  var sobreImg = document.getElementById('sobre-img');
  if (sobreImg) sobreImg.src = IMAGENS.sobre;

  /* ---- HEADER: efeito scroll ---- */
  var header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---- MENU MOBILE ---- */
  var hamburger  = document.getElementById('hamburger');
  var mobileNav  = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- FORMULARIO → WHATSAPP ---- */
  var form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nome     = document.getElementById('nome').value.trim();
    var tipo     = document.getElementById('tipo').value;
    var cidade   = document.getElementById('cidade').value.trim();
    var mensagem = document.getElementById('mensagem').value.trim();

    var msg = 'Olá, vim pelo site da Quadra Certa e gostaria de solicitar um orçamento.';
    if (nome)     msg += '\n\nNome: '           + nome;
    if (tipo)     msg += '\nTipo de quadra: '   + tipo;
    if (cidade)   msg += '\nCidade: '           + cidade;
    if (mensagem) msg += '\nMensagem: '         + mensagem;

    window.open(
      'https://wa.me/5554994945556?text=' + encodeURIComponent(msg),
      '_blank',
      'noopener,noreferrer'
    );
  });

  /* ---- HERO SLIDER ---- */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroIndex  = 0;

  if (heroSlides.length > 1) {
    setInterval(function () {
      heroSlides[heroIndex].classList.remove('active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('active');
    }, 5000);
  }

  /* ---- FILTRO DE PRODUTOS ---- */
  var filterBtns   = document.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('.product-card');
  var productsGrid = document.getElementById('products-grid');

  function updateGridClass(filter) {
    var count = Array.from(productCards).filter(function(c) {
      return c.dataset.category === filter;
    }).length;
    productsGrid.classList.toggle('products-grid--single', count === 1);
    productsGrid.classList.toggle('products-grid--duo', filter === 'ebooks');
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.dataset.filter;

      productCards.forEach(function (card) {
        var match = card.dataset.category === filter;
        if (match) {
          card.style.display = '';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              card.classList.remove('product-hidden');
            });
          });
        } else {
          card.classList.add('product-hidden');
          setTimeout(function () {
            if (card.classList.contains('product-hidden')) {
              card.style.display = 'none';
            }
          }, 260);
        }
      });

      updateGridClass(filter);
    });
  });

  // Inicializa com filtro padrão: acessorios
  productCards.forEach(function(card) {
    if (card.dataset.category !== 'acessorios') {
      card.classList.add('product-hidden');
      card.style.display = 'none';
    }
  });
  updateGridClass('acessorios');

  /* ---- TQ-10 CARROSSEL ---- */
  var tq10Slides = document.querySelectorAll('.tq10-slide');
  if (tq10Slides.length > 1) {
    var tq10Index = 0;
    function tq10Next() {
      tq10Slides[tq10Index].classList.remove('active');
      tq10Index = (tq10Index + 1) % tq10Slides.length;
      tq10Slides[tq10Index].classList.add('active');
      var dur = parseInt(tq10Slides[tq10Index].querySelector('img').dataset.duration, 10);
      setTimeout(tq10Next, dur);
    }
    var firstDur = parseInt(tq10Slides[0].querySelector('img').dataset.duration, 10);
    setTimeout(tq10Next, firstDur);
  }

  /* ---- SCROLL SUAVE (fallback para browsers antigos) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---- TQ-10 COMPARE — SCROLL TRIGGER ---- */
  var tq10Compare = document.getElementById('tq10-compare');
  if (tq10Compare) {
    var compareObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var manual  = tq10Compare.querySelector('.tq10-compare-manual');
          var tq10    = tq10Compare.querySelector('.tq10-compare-tq10');
          if (manual) manual.classList.add('animate-in-left');
          if (tq10)   tq10.classList.add('animate-in-right');
          compareObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    compareObserver.observe(tq10Compare);
  }

  /* ---- MENTORIA SLIDER ---- */
  var mentoriaSlides = document.querySelectorAll('.mentoria-slide');
  if (mentoriaSlides.length > 1) {
    var mentoriaIndex = 0;
    setInterval(function() {
      mentoriaSlides[mentoriaIndex].classList.remove('active');
      mentoriaIndex = (mentoriaIndex + 1) % mentoriaSlides.length;
      var currentSlide = mentoriaSlides[mentoriaIndex];
      currentSlide.classList.add('active');
      var video = currentSlide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    }, 4000);
  }

  /* ---- EBOOK DISPLAY SLIDER COM GSAP ---- */
  var ebookImg      = document.getElementById('ebook-display-img');
  var ebookCards    = document.querySelectorAll('.ebook-card');
  var ebookSrcs     = [
    'img/ebook-pt.png',
    'img/ebook-esp.png',
    'img/ebook-en.png',
    'img/ebook-rede.png'
  ];
  var ebookCurrent  = 0;
  var ebookPaused   = false;
  var ebookTimer    = null;

  function ebookSwitch(src, direction) {
    if (!ebookImg) return;
    direction = direction || 1;
    gsap.to(ebookImg, {
      duration: 0.35,
      opacity: 0,
      x: direction * -40,
      ease: 'power2.in',
      onComplete: function() {
        ebookImg.src = src;
        gsap.fromTo(ebookImg,
          { opacity: 0, x: direction * 40 },
          { duration: 0.45, opacity: 1, x: 0, ease: 'power2.out' }
        );
      }
    });
  }

  function ebookSetActive(index) {
    ebookCards.forEach(function(c) { c.classList.remove('active'); });
    if (ebookCards[index]) ebookCards[index].classList.add('active');
  }

  function ebookNext() {
    var next = (ebookCurrent + 1) % ebookSrcs.length;
    ebookSwitch(ebookSrcs[next], 1);
    ebookSetActive(next);
    ebookCurrent = next;
  }

  function ebookStartTimer() {
    ebookTimer = setInterval(function() {
      if (!ebookPaused) ebookNext();
    }, 3000);
  }

  ebookSetActive(0);
  ebookStartTimer();

  ebookCards.forEach(function(card, i) {
    card.addEventListener('mouseenter', function() {
      ebookPaused = true;
      if (i !== ebookCurrent) {
        var dir = i > ebookCurrent ? 1 : -1;
        ebookSwitch(ebookSrcs[i], dir);
        ebookSetActive(i);
        ebookCurrent = i;
      }
    });
    card.addEventListener('mouseleave', function() {
      ebookPaused = false;
    });
  });

  /* ---- MENTORIA — SCROLL TRIGGER ---- */
  var mentoriaHeader = document.querySelector('.mentoria-header');
  var mentoriaItems  = document.querySelectorAll('.mentoria-list li');
  if (mentoriaHeader) {
    var mentoriaObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          mentoriaHeader.classList.add('visible');
          var mentoriaCards = document.querySelectorAll('.mentoria-card');
          mentoriaCards.forEach(function(card) { card.classList.add('visible'); });
          mentoriaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    mentoriaObserver.observe(mentoriaHeader);
  }

  var portfolioCarousel = document.getElementById('portfolio-carousel');
  if (portfolioCarousel) {
    var portfolioDots = document.querySelectorAll('.portfolio-dot');
    var portfolioIndex = 0;
    setInterval(function() {
      portfolioDots[portfolioIndex].classList.remove('active');
      portfolioIndex = (portfolioIndex + 1) % 3;
      portfolioCarousel.style.transform = 'translateX(-' + (portfolioIndex * 100) + '%)';
      portfolioDots[portfolioIndex].classList.add('active');
    }, 3000);
  }

})();
