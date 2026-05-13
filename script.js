/* =============================================
   QUADRA CERTA — SCRIPTS
   ============================================= */

var isMobile = window.innerWidth <= 768;

/* =============================================
   MÍDIAS DO SITE — edite aqui para adicionar/remover fotos e vídeos
   Campos disponíveis por item:
     src     → caminho do arquivo (obrigatório)
     mobile  → versão mobile (opcional, usa src se omitido)
     type    → 'image' | 'video' (omitir = image)
     loop    → true para vídeo em loop contínuo
     duration→ tempo em ms no TQ-10 carousel (só tq10)
   ============================================= */
var IMAGENS = {

  /* ---- HERO (slider de entrada) ---- */
  hero: [
    { src: 'img/hero-01.jpg',   mobile: 'img/hero-01_mobile.png' },
    { src: 'img/hero-02.mp4',   type: 'video' },
    { src: 'img/hero-03.png',   mobile: 'img/hero-03_mobile.png' },
    { src: 'img/hero-04.png'    /* sem versão mobile, usa mesma imagem */ }
  ],

  /* ---- TQ-10 (carrossel da seção Equipamentos) ---- */
  tq10: [
    { src: 'img/1tq10.png',                                           duration: 2500 },
    { src: 'img/2tq10.png',                                           duration: 2500 },
    { src: 'img/3tq-10.mp4',   type: 'video',                        duration: 5000 },
    { src: 'img/4tq10.png',    mobile: 'img/4tq10_mobile.png',       duration: 2500 }
  ],

  /* ---- SOBRE ---- */
  sobre: {
    desktop: 'img/galeria-01.jpeg',
    mobile:  'img/galeria-01_mobile.png'
  },

  /* ---- SERVIÇOS (tabs da seção Nossos Serviços) ---- */
  servicos: {
    raspagem:    ['img/raspagem-01.png',   'img/raspagem-02.png'],
    fitas:       ['img/fita-01.png',       'img/fita-02.png'],
    cabeceiras:  ['img/cabeceira-01.png',  'img/cabeceira-02.png',  'img/cabeceira-03.png'],
    compactacao: ['img/compactacao-01.png',  'img/compactacao-02.png']
  },

  /* ---- MENTORIA (slider da seção Treinamentos) ---- */
  mentoria: [
    { src: 'img/mentoria-01.mp4',    type: 'video' },
    { src: 'img/mentoria-02.jpeg',   mobile: 'img/mentoria-02_mobile.png' },
    { src: 'img/mentoria-video.mp4', type: 'video', loop: true },
    { src: 'img/mentoria-03.jpeg',   mobile: 'img/mentoria-03_mobile.png' },
    { src: 'img/mentoria-04.jpeg',   mobile: 'img/mentoria-04_mobile.png' }
  ],

  /* ---- PRODUTOS (tabs da seção Produtos) ---- */
  produtos: {
    acessorios: [
      { src: 'img/suporte.png' },
      { src: 'img/suporte-02.mp4', type: 'video' }
    ],
    equipamentos: [
      { src: 'img/4tq10.png',    mobile: 'img/4tq10_mobile.png' },
      { src: 'img/2tq10prod.png' }
    ]
  },

  /* ---- EBOOKS (capas dos guias profissionais) ---- */
  ebooks: [
    'img/ebook-pt.png',
    'img/ebook-esp.png',
    'img/ebook-en.png',
    'img/ebook-rede.png'
  ]

};

(function () {
  'use strict';

  /* ---- HELPERS DE INJEÇÃO ---- */

  /* Cria um elemento <img> ou <picture> (com source mobile) */
  function buildImg(item, alt) {
    if (item.mobile) {
      var pic = document.createElement('picture');
      var src = document.createElement('source');
      src.media  = '(max-width: 768px)';
      src.srcset = item.mobile;
      var img    = document.createElement('img');
      img.src    = item.src;
      img.alt    = alt || '';
      img.loading = 'lazy';
      pic.appendChild(src);
      pic.appendChild(img);
      return pic;
    }
    var img   = document.createElement('img');
    img.src   = item.src;
    img.alt   = alt || '';
    img.loading = 'lazy';
    return img;
  }

  /* Cria um <video> com os atributos corretos para mobile */
  function buildVideo(item) {
    var vid = document.createElement('video');
    vid.src = item.src;
    vid.muted = true;
    vid.setAttribute('playsinline', '');
    if (item.loop) { vid.loop = true; vid.autoplay = true; }
    return vid;
  }

  /* ---- HERO ---- */
  var heroSlider = document.getElementById('hero-slider');
  IMAGENS.hero.forEach(function (item, i) {
    var div = document.createElement('div');
    div.className = 'hero-slide' + (i === 0 ? ' active' : '');
    if (item.type === 'video') {
      var vid = buildVideo(item);
      vid.autoplay = true;
      vid.loop = false;
      div.appendChild(vid);
    } else {
      var src = (isMobile && item.mobile) ? item.mobile : item.src;
      div.style.backgroundImage = 'url(' + src + ')';
    }
    heroSlider.appendChild(div);
  });

  /* ---- TQ-10 (seção Equipamentos) ---- */
  var tq10Carousel = document.getElementById('tq10-carousel');
  IMAGENS.tq10.forEach(function (item, i) {
    var div = document.createElement('div');
    div.className = 'tq10-slide' + (i === 0 ? ' active' : '');
    if (item.type === 'video') {
      var vid = buildVideo(item);
      vid.loop = false;
      vid.dataset.duration = item.duration;
      div.appendChild(vid);
    } else {
      var el = buildImg(item, 'TQ-10');
      if (el.tagName === 'IMG') el.dataset.duration = item.duration;
      else el.querySelector('img').dataset.duration = item.duration;
      div.appendChild(el);
    }
    tq10Carousel.appendChild(div);
  });

  /* ---- SOBRE ---- */
  var sobreEl = document.getElementById('sobre-img');
  if (sobreEl) {
    sobreEl.src = IMAGENS.sobre.desktop;
    var sobreSource = sobreEl.closest('picture') && sobreEl.closest('picture').querySelector('source');
    if (sobreSource) sobreSource.srcset = IMAGENS.sobre.mobile;
  }

  /* ---- SERVIÇOS ---- */
  Object.keys(IMAGENS.servicos).forEach(function(tab) {
    var panel = document.querySelector('.servico-panel[data-panel="' + tab + '"]');
    if (!panel) return;
    var slider = panel.querySelector('.servico-slider');
    if (!slider) return;
    slider.innerHTML = '';
    IMAGENS.servicos[tab].forEach(function(src, i) {
      var slide = document.createElement('div');
      slide.className = 'servico-slide' + (i === 0 ? ' active' : '');
      var img = document.createElement('img');
      img.src = src;
      img.alt = tab;
      img.loading = 'lazy';
      slide.appendChild(img);
      slider.appendChild(slide);
    });
  });

  /* ---- MENTORIA ---- */
  var mentoriaSliderEl = document.querySelector('.mentoria-slider');
  if (mentoriaSliderEl) {
    mentoriaSliderEl.innerHTML = '';
    IMAGENS.mentoria.forEach(function(item, i) {
      var div = document.createElement('div');
      div.className = 'mentoria-slide' + (i === 0 ? ' active' : '');
      if (item.type === 'video') {
        div.appendChild(buildVideo(item));
      } else {
        div.appendChild(buildImg(item, 'Mentoria Quadra Certa'));
      }
      mentoriaSliderEl.appendChild(div);
    });
  }

  /* ---- PRODUTOS ---- */
  Object.keys(IMAGENS.produtos).forEach(function(tab) {
    var panel = document.querySelector('.produto-panel[data-panel="' + tab + '"]');
    if (!panel) return;
    var slider = panel.querySelector('.produto-slider');
    if (!slider) return;
    slider.innerHTML = '';
    IMAGENS.produtos[tab].forEach(function(item, i) {
      var slide = document.createElement('div');
      slide.className = 'produto-slide' + (i === 0 ? ' active' : '');
      if (item.type === 'video') {
        slide.appendChild(buildVideo(item));
      } else {
        slide.appendChild(buildImg(item, tab));
      }
      slider.appendChild(slide);
    });
  });

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

  /* ---- DESKTOP DROPDOWNS ---- */
  var navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(function(item) {
    var btn = item.querySelector('.nav-item-btn');
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      navItems.forEach(function(other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.nav-item-btn').setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', function() {
    navItems.forEach(function(item) {
      item.classList.remove('open');
      item.querySelector('.nav-item-btn').setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- MOBILE ACCORDION ---- */
  document.querySelectorAll('.mobile-nav-group-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var sub = btn.nextElementSibling;
      var isOpen = sub.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
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
      'https://wa.me/5554999494556?text=' + encodeURIComponent(msg),
      '_blank',
      'noopener,noreferrer'
    );
  });

 /* ---- HERO SLIDER COM DOTS ---- */
var heroSlides = document.querySelectorAll('.hero-slide');
var heroIndex  = 0;

// Cria os dots e injeta dentro de .hero-content
var dotsContainer = document.createElement('div');
dotsContainer.className = 'hero-dots';

heroSlides.forEach(function(_, i) {
  var dot = document.createElement('button');
  dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Slide ' + (i + 1));
  dot.addEventListener('click', function() { heroGoTo(i); });
  dotsContainer.appendChild(dot);
});

document.querySelector('.hero-content').appendChild(dotsContainer);

// Função central de troca de slide
function heroGoTo(n) {
  var dots = document.querySelectorAll('.hero-dot');
  heroSlides[heroIndex].classList.remove('active');
  dots[heroIndex].classList.remove('active');
  heroIndex = n;
  heroSlides[heroIndex].classList.add('active');
  dots[heroIndex].classList.add('active');
  var vid = heroSlides[heroIndex].querySelector('video');
  if (vid) { vid.currentTime = 0; vid.play(); }
}

// Troca automática: 6900ms no slide de vídeo, 5000ms nos de imagem
if (heroSlides.length > 1) {
  function heroAutoAdvance() {
    heroGoTo((heroIndex + 1) % heroSlides.length);
    var vid = heroSlides[heroIndex].querySelector('video');
    setTimeout(heroAutoAdvance, vid ? 5650 : 5000);
  }
  var _initVid = heroSlides[0].querySelector('video');
  setTimeout(heroAutoAdvance, _initVid ? 6900 : 5000);
}

  /* ---- PRODUTOS TABS ---- */
  var produtoTabs      = document.querySelectorAll('.produto-tab');
  var produtoPanels    = document.querySelectorAll('.produto-panel');
  var produtoSliderInt = null;
  var produtoSliderVideo = null;

  function startProdutoSlider(panel) {
    clearTimeout(produtoSliderInt);
    if (produtoSliderVideo) {
      produtoSliderVideo.removeEventListener('ended', produtoSliderVideo._onEnded);
      produtoSliderVideo = null;
    }
    var slides = panel.querySelectorAll('.produto-slide');
    if (slides.length <= 1) return;
    var idx = 0;

    function scheduleNext() {
      var video = slides[idx].querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play();
        produtoSliderVideo = video;
        video._onEnded = advance;
        video.addEventListener('ended', video._onEnded, { once: true });
      } else {
        produtoSliderInt = setTimeout(advance, 3000);
      }
    }

    function advance() {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
      scheduleNext();
    }

    scheduleNext();
  }

  if (produtoTabs.length) {
    var firstProdPanel = document.querySelector('.produto-panel.active');
    if (firstProdPanel) startProdutoSlider(firstProdPanel);

    produtoTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var target = this.dataset.tab;
        produtoTabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        produtoPanels.forEach(function(p) {
          p.classList.remove('active');
          p.querySelectorAll('.produto-slide').forEach(function(s, i) {
            s.classList.toggle('active', i === 0);
          });
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        var panel = document.querySelector('.produto-panel[data-panel="' + target + '"]');
        if (panel) {
          panel.classList.add('active');
          startProdutoSlider(panel);
        }
      });
    });
  }

  /* ---- CARROSSEL DE DEPOIMENTOS ---- */
  var testCards = document.querySelectorAll('.testimonial-card');
  var testDots  = document.querySelectorAll('.testimonials-dot');
  var testIdx   = 0;
  var testTimer = null;

  function showTestimonial(idx) {
    testCards.forEach(function(c) { c.classList.remove('active'); });
    testDots.forEach(function(d)  { d.classList.remove('active'); });
    testCards[idx].classList.add('active');
    if (testDots[idx]) testDots[idx].classList.add('active');
    testIdx = idx;
  }

  function startTestimonialCarousel() {
    clearInterval(testTimer);
    testTimer = setInterval(function() {
      showTestimonial((testIdx + 1) % testCards.length);
    }, 4000);
  }

  if (testCards.length > 1) {
    startTestimonialCarousel();
    testDots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        showTestimonial(parseInt(this.dataset.idx));
        startTestimonialCarousel();
      });
    });
  }

  /* ---- NAV: links que ativam uma aba de produto específica ---- */
  document.querySelectorAll('[data-activate-produto]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var tabName = this.dataset.activateProduto;
      var tab = document.querySelector('.produto-tab[data-tab="' + tabName + '"]');
      if (tab) tab.click();
      var section = document.getElementById('produtos');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      /* fecha menu mobile se estiver aberto */
      var mobileNav = document.getElementById('mobile-nav');
      if (mobileNav && mobileNav.classList.contains('open')) mobileNav.classList.remove('open');
    });
  });

  /* ---- UTILITARIO: inicia carrossel ao entrar na tela pela 1ª vez ---- */
  function onFirstView(el, callback) {
    if (!el) { callback(); return; }
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { obs.disconnect(); callback(); }
    }, { threshold: 0.25 });
    obs.observe(el);
  }

  /* ---- TQ-10 CARROSSEL ---- */
  var tq10Slides = document.querySelectorAll('.tq10-slide');
  if (tq10Slides.length > 1) {
    var tq10Index = 0;
    function tq10Next() {
      tq10Slides[tq10Index].classList.remove('active');
      tq10Index = (tq10Index + 1) % tq10Slides.length;
      tq10Slides[tq10Index].classList.add('active');
      var el = tq10Slides[tq10Index].querySelector('img, video');
      if (el.tagName === 'VIDEO') { el.currentTime = 0; el.play(); }
      var dur = parseInt(el.dataset.duration, 10);
      setTimeout(tq10Next, dur);
    }
    var firstEl = tq10Slides[0].querySelector('img, video');
    onFirstView(document.getElementById('equipamentos'), function() {
      setTimeout(tq10Next, parseInt(firstEl.dataset.duration, 10));
    });
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

  /* ---- MENTORIA SLIDER ---- */
  var mentoriaSlides = document.querySelectorAll('.mentoria-slide');
  if (mentoriaSlides.length > 1) {
    var mentoriaIndex = 0;

    function mentoriaNext() {
      mentoriaSlides[mentoriaIndex].classList.remove('active');
      mentoriaIndex = (mentoriaIndex + 1) % mentoriaSlides.length;
      var currentSlide = mentoriaSlides[mentoriaIndex];
      currentSlide.classList.add('active');
      var video = currentSlide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play();
        if (!video.loop) {
          setTimeout(mentoriaNext, 6000);
          return;
        }
      }
      setTimeout(mentoriaNext, 4000);
    }

    onFirstView(document.getElementById('treinamentos'), function() {
      var firstVideo = mentoriaSlides[0].querySelector('video');
      if (firstVideo && !firstVideo.loop) {
        firstVideo.play();
        setTimeout(mentoriaNext, 6000);
      } else {
        setTimeout(mentoriaNext, 4000);
      }
    });
  }

  /* ---- EBOOK DISPLAY SLIDER COM GSAP ---- */
  var ebookImg      = document.getElementById('ebook-display-img');
  var ebookCards    = document.querySelectorAll('.ebook-card');
  var ebookSrcs = IMAGENS.ebooks;
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
  onFirstView(document.getElementById('ebooks'), ebookStartTimer);

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

  /* ---- EBOOK MOBILE CAROUSEL ---- */
  var ebookCarouselItems = document.querySelectorAll('.ebook-carousel-item');
  var ebookCtaBtn        = document.getElementById('ebook-cta-btn');
  var ebookArrowLeft     = document.querySelector('.ebook-arrow-left');
  var ebookArrowRight    = document.querySelector('.ebook-arrow-right');
  var ebookMobileIndex   = 0;

  function ebookMobileUpdate(index) {
    var total = ebookCarouselItems.length;
    ebookCarouselItems.forEach(function(item, i) {
      item.classList.remove('active', 'prev', 'next', 'hidden', 'hidden-left');
      var diff = ((i - index) % total + total) % total;
      if      (diff === 0)         item.classList.add('active');
      else if (diff === 1)         item.classList.add('next');
      else if (diff === total - 1) item.classList.add('prev');
      else if (diff <= Math.floor(total / 2)) item.classList.add('hidden');
      else                         item.classList.add('hidden-left');
    });
    if (ebookCtaBtn && ebookCarouselItems[index]) {
      ebookCtaBtn.href = ebookCarouselItems[index].dataset.href || '#';
    }
  }

  if (ebookCarouselItems.length > 0) {
    ebookMobileUpdate(0);

    if (ebookArrowLeft) {
      ebookArrowLeft.addEventListener('click', function() {
        ebookMobileIndex = (ebookMobileIndex - 1 + ebookCarouselItems.length) % ebookCarouselItems.length;
        ebookMobileUpdate(ebookMobileIndex);
      });
    }

    if (ebookArrowRight) {
      ebookArrowRight.addEventListener('click', function() {
        ebookMobileIndex = (ebookMobileIndex + 1) % ebookCarouselItems.length;
        ebookMobileUpdate(ebookMobileIndex);
      });
    }

    ebookCarouselItems.forEach(function(item, i) {
      item.addEventListener('click', function() {
        if (i !== ebookMobileIndex) {
          ebookMobileIndex = i;
          ebookMobileUpdate(i);
        } else if (item.dataset.href) {
          window.open(item.dataset.href, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

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

  /* ---- SERVIÇOS TABS ---- */
  var servicoTabs      = document.querySelectorAll('.servico-tab');
  var servicoPanels    = document.querySelectorAll('.servico-panel');
  var servicoSliderInt = null;

  function startServicosSlider(panel) {
    clearInterval(servicoSliderInt);
    var slides = panel.querySelectorAll('.servico-slide');
    if (slides.length <= 1) return;
    var idx = 0;
    servicoSliderInt = setInterval(function() {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 3000);
  }

  if (servicoTabs.length) {
    var firstPanel = document.querySelector('.servico-panel.active');
    if (firstPanel) startServicosSlider(firstPanel);

    servicoTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var target = this.dataset.tab;
        servicoTabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        servicoPanels.forEach(function(p) {
          p.classList.remove('active');
          p.querySelectorAll('.servico-slide').forEach(function(s, i) {
            s.classList.toggle('active', i === 0);
          });
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        var panel = document.querySelector('.servico-panel[data-panel="' + target + '"]');
        if (panel) {
          panel.classList.add('active');
          startServicosSlider(panel);
        }
      });
    });
  }


})();
