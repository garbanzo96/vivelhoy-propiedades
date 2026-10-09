/* Vivelhoy Propiedades · interacción de la página */
(function () {
  'use strict';

  var WHATSAPP = '56985131516';
  var props = Array.isArray(window.PROPIEDADES) ? window.PROPIEDADES : [];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Utilidades ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(name, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  // Las fotos van en dos tamaños (01-living.webp y 01-living-sm.webp). Si el nombre trae extensión
  // (por ejemplo "01-living.jpg"), se usa ese mismo archivo para todo.
  function photo(p, i, size) {
    var f = p.fotos[i].archivo;
    if (/\.(jpe?g|png|webp|avif)$/i.test(f)) return p.carpeta + f;
    return p.carpeta + f + (size === 'sm' ? '-sm' : '') + '.webp';
  }
  function waUrl(text) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  // Origen de la visita (por ejemplo ?origen=instagram) para saber de dónde llegan las consultas
  var origen = '';
  try { origen = (new URLSearchParams(location.search).get('origen') || '').replace(/[^\wáéíóúñ -]/gi, '').slice(0, 30); } catch (e) {}
  function withOrigin(text) { return origen ? text + '\n\n(Llegué desde ' + origen + ')' : text; }

  function closedLabel(p) {
    var fem = String(p.tipo).toLowerCase() !== 'departamento';
    if (p.estado === 'vendida') return fem ? 'Vendida' : 'Vendido';
    return fem ? 'Arrendada' : 'Arrendado';
  }
  function place(p) { return p.sector ? p.sector + ', ' + p.comuna : p.comuna; }
  function listingMessage(p) {
    var op = p.operacion === 'venta' ? 'en venta' : 'en arriendo';
    var price = p.precio ? ' (' + p.precio + (p.periodo ? ' ' + p.periodo : '') + ')' : '';
    return 'Hola Clarisa, vi en tu página la ' + p.tipo.toLowerCase() + ' ' + op + ' en ' + place(p) + price + '. Me gustaría coordinar una visita.';
  }

  var MESSAGES = {
    general: 'Hola Clarisa, vi tu página de Vivelhoy Propiedades y quiero hacerte una consulta.',
    vender: 'Hola Clarisa, quiero vender mi propiedad y me gustaría conversar contigo.',
    arrendar: 'Hola Clarisa, quiero arrendar mi propiedad y me gustaría conversar contigo.',
    administrar: 'Hola Clarisa, me interesa que administres el arriendo de mi propiedad.',
    'busco-arriendo': 'Hola Clarisa, estoy buscando una propiedad en arriendo. Te cuento lo que necesito: ',
    'busco-compra': 'Hola Clarisa, estoy buscando una propiedad para comprar. Te cuento lo que necesito: '
  };

  /* ---------- Propiedades ---------- */
  function featureHTML(p) {
    var idx = props.indexOf(p);
    var n = p.fotos.length;
    var d = p.datos || {};
    var specs = [];
    if (d.dormitorios) specs.push('<li class="spec">' + icon('bed') + '<strong>' + plural(d.dormitorios, 'dormitorio', 'dormitorios') + '</strong></li>');
    if (d.banos) specs.push('<li class="spec">' + icon('bath') + '<strong>' + plural(d.banos, 'baño', 'baños') + '</strong>' + (d.detalleBanos ? '<span>' + esc(d.detalleBanos) + '</span>' : '') + '</li>');
    if (d.pisos) specs.push('<li class="spec">' + icon('stairs') + '<strong>' + plural(d.pisos, 'piso', 'pisos') + '</strong></li>');
    if (d.m2Construidos) specs.push('<li class="spec wide">' + icon('area') + '<strong>' + esc(d.m2Construidos) + ' m²</strong><span>construidos</span></li>');
    if (d.m2Totales) specs.push('<li class="spec wide">' + icon('plot') + '<strong>' + esc(d.m2Totales) + ' m²</strong><span>totales</span></li>');

    var picks = (Array.isArray(p.mosaico) && p.mosaico.length ? p.mosaico : [0, 1, 2, 3]).filter(function (i) { return i < n; }).slice(0, 4);
    var tiles = picks.map(function (i, k) {
      var extra = k === picks.length - 1 ? '<span class="more">' + icon('images') + '<span class="more-long">Ver las&nbsp;</span>' + n + ' fotos</span>' : '';
      return '<button type="button" class="tile tile-' + (k + 1) + '" data-gallery="' + idx + '" data-start="' + i + '" aria-label="Ver foto: ' + esc(p.fotos[i].texto) + '">' +
        '<img src="' + photo(p, i, k === 0 ? '' : 'sm') + '" alt="" ' + (k === 0 ? '' : 'loading="lazy" ') + 'decoding="async">' + extra + '</button>';
    }).join('');

    return '<article class="feature" data-reveal aria-label="' + esc(p.titulo) + '">' +
      '<div class="mosaic tiles-' + picks.length + '">' + tiles + '</div>' +
      '<div class="feature-body">' +
        '<div class="feature-main">' +
          '<div class="feature-tags"><span class="badge badge-available">Disponible</span><span class="badge badge-op">' + esc(p.tipo) + ' en ' + esc(p.operacion) + '</span></div>' +
          '<h4>' + esc(p.titulo) + '</h4>' +
          '<p class="where">' + icon('pin') + esc(place(p)) + '</p>' +
          (p.precio ? '<p class="price"><strong>' + esc(p.precio) + '</strong>' + (p.periodo ? '<span>' + esc(p.periodo) + '</span>' : '') + '</p>' : '<p class="price"><span>Precio a consultar</span></p>') +
          (p.descripcion ? '<p class="desc">' + esc(p.descripcion) + '</p>' : '') +
          (p.caracteristicas && p.caracteristicas.length ? '<ul class="chips">' + p.caracteristicas.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' : '') +
        '</div>' +
        '<div class="feature-side">' +
          (specs.length ? '<ul class="specs">' + specs.join('') + '</ul>' : '') +
          '<div class="feature-actions">' +
            '<a class="btn btn-primary" href="' + waUrl(withOrigin(listingMessage(p))) + '" target="_blank" rel="noopener">' + icon('whatsapp') + 'Agendar una visita</a>' +
            '<button class="btn btn-secondary" type="button" data-gallery="' + idx + '" data-start="0">' + icon('images') + 'Ver las ' + n + ' fotos</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function cardHTML(p) {
    var idx = props.indexOf(p);
    return '<article class="card" data-reveal>' +
      '<div class="card-media">' +
        '<img src="' + photo(p, 0, 'sm') + '" alt="" loading="lazy" decoding="async">' +
        '<span class="badge badge-closed">' + closedLabel(p) + '</span>' +
        '<span class="photos">' + icon('images') + p.fotos.length + ' fotos</span>' +
      '</div>' +
      '<div class="card-body"><h4>' + esc(p.titulo) + '</h4><p class="meta">' + esc(p.descripcion || p.tipo) + '</p></div>' +
      '<button class="card-link" type="button" data-gallery="' + idx + '" data-start="0" aria-label="Ver fotos de ' + esc(p.titulo) + ', ' + closedLabel(p).toLowerCase() + '"></button>' +
    '</article>';
  }

  function askHTML(op, hasAvailable) {
    var arriendo = op === 'arriendo';
    var title, text, link;
    if (arriendo) {
      title = hasAvailable ? '¿Buscas algo distinto?' : 'Por ahora no tengo propiedades en arriendo';
      text = 'Cuéntame qué necesitas: comuna, presupuesto y cuántas personas son. Te aviso cuando tenga algo que te sirva.';
      link = '<a class="text-link" href="#servicios">Quiero arrendar la mía' + icon('arrow') + '</a>';
    } else {
      title = hasAvailable ? '¿Buscas algo distinto?' : 'Por ahora no tengo propiedades en venta';
      text = 'Si buscas comprar, cuéntame qué necesitas y te aviso cuando tenga una que te sirva.';
      link = '<a class="text-link" href="#servicios">Quiero vender la mía' + icon('arrow') + '</a>';
    }
    return '<article class="ask" data-reveal>' +
      '<span class="ask-icon">' + icon(arriendo ? 'key' : 'home') + '</span>' +
      '<h4>' + title + '</h4><p>' + text + '</p>' +
      '<div class="ask-actions"><a class="btn btn-primary btn-sm" href="' + waUrl(withOrigin(MESSAGES[arriendo ? 'busco-arriendo' : 'busco-compra'])) + '" target="_blank" rel="noopener">' + icon('whatsapp') + 'Avísame</a>' + link + '</div>' +
    '</article>';
  }

  function renderListings() {
    ['arriendo', 'venta'].forEach(function (op) {
      var list = $('[data-list="' + op + '"]');
      if (!list) return;
      var mine = props.filter(function (p) { return p.operacion === op && p.fotos && p.fotos.length; });
      var available = mine.filter(function (p) { return p.estado === 'disponible'; });
      var closed = mine.filter(function (p) { return p.estado !== 'disponible'; });

      var html = available.map(featureHTML).join('');
      var cards = closed.map(cardHTML);
      if (available.length) cards.push(askHTML(op, true));
      else cards.unshift(askHTML(op, false));
      html += '<div class="cards">' + cards.join('') + '</div>';
      list.innerHTML = html;

      var pill = $('[data-count-pill="' + op + '"]');
      if (pill) {
        pill.textContent = available.length ? plural(available.length, 'disponible', 'disponibles') : 'Sin disponibles por ahora';
        pill.classList.toggle('has-available', available.length > 0);
      }
      var count = $('[data-count="' + op + '"]');
      if (count) {
        count.textContent = available.length
          ? plural(available.length, 'propiedad disponible', 'propiedades disponibles')
          : 'Cuéntame qué buscas';
      }
    });

    // Tarjeta de la portada con la primera propiedad disponible
    var first = props.filter(function (p) { return p.estado === 'disponible' && p.fotos && p.fotos.length; })[0];
    var hero = $('#hero-listing');
    if (first && hero) {
      hero.href = '#' + first.operacion;
      hero.innerHTML = '<img src="' + photo(first, 0, 'sm') + '" alt="">' +
        '<span class="hl-text"><span class="badge badge-available">Disponible · ' + esc(first.operacion) + '</span>' +
        '<span class="hl-title">' + esc(first.titulo) + ', ' + esc(first.comuna) + '</span>' +
        (first.precio ? '<span class="hl-price">' + esc(first.precio) + (first.periodo ? ' <small>' + esc(first.periodo) + '</small>' : '') + '</span>' : '') +
        '</span><span class="hl-go">' + icon('arrow') + '</span>';
      hero.setAttribute('aria-label', 'Disponible en ' + first.operacion + ': ' + first.titulo + ', ' + first.comuna + (first.precio ? ', ' + first.precio + ' ' + (first.periodo || '') : ''));
      hero.hidden = false;
      hero.classList.add('is-shown');
    }
  }

  /* ---------- Galería ---------- */
  var dlg = $('#gallery');
  var gImg = $('#gallery-img');
  var gThumbs = $('#gallery-thumbs');
  var current = null, pos = 0, lastFocus = null;

  function showPhoto(i) {
    if (!current) return;
    var n = current.fotos.length;
    pos = (i + n) % n;
    var src = photo(current, pos);
    gImg.classList.add('is-loading');
    var pre = new Image();
    pre.onload = pre.onerror = function () {
      gImg.src = src;
      gImg.alt = current.fotos[pos].texto + ', ' + current.titulo;
      gImg.classList.remove('is-loading');
    };
    pre.src = src;
    $('#gallery-caption').textContent = current.fotos[pos].texto;
    $('#gallery-count').textContent = (pos + 1) + ' de ' + n;
    $all('button', gThumbs).forEach(function (b, k) {
      if (k === pos) { b.setAttribute('aria-current', 'true'); b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); }
      else b.removeAttribute('aria-current');
    });
    // precarga la siguiente
    var next = new Image(); next.src = photo(current, (pos + 1) % n);
  }

  function openGallery(index, start) {
    current = props[index];
    if (!current || !dlg) return;
    lastFocus = document.activeElement;
    var available = current.estado === 'disponible';
    $('#gallery-kicker').textContent = available ? 'Disponible · ' + current.tipo + ' en ' + current.operacion : closedLabel(current) + ' · ' + current.comuna;
    $('#gallery-title').textContent = current.titulo;
    gThumbs.innerHTML = current.fotos.map(function (f, k) {
      return '<button type="button" data-k="' + k + '" aria-label="Foto ' + (k + 1) + ': ' + esc(f.texto) + '"><img src="' + photo(current, k, 'sm') + '" alt="" loading="lazy"></button>';
    }).join('');
    var cta = $('#gallery-cta');
    if (available) {
      cta.innerHTML = '<p>' + (current.precio ? '<strong>' + esc(current.precio) + '</strong>' + esc(current.periodo || '') + ' · ' : '') + esc(place(current)) + '</p>' +
        '<a class="btn btn-primary btn-sm" href="' + waUrl(withOrigin(listingMessage(current))) + '" target="_blank" rel="noopener">' + icon('whatsapp') + 'Agendar una visita</a>';
      cta.hidden = false;
    } else { cta.hidden = true; cta.innerHTML = ''; }
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.focus({ preventScroll: true });
    document.body.classList.add('is-locked');
    showPhoto(start || 0);
  }

  function closeGallery() {
    if (!dlg) return;
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }

  if (dlg) {
    dlg.addEventListener('close', function () {
      document.body.classList.remove('is-locked');
      gImg.removeAttribute('src');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    });
    $('.gallery-close', dlg).addEventListener('click', closeGallery);
    $('.gallery-prev', dlg).addEventListener('click', function () { showPhoto(pos - 1); });
    $('.gallery-next', dlg).addEventListener('click', function () { showPhoto(pos + 1); });
    gThumbs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-k]');
      if (b) showPhoto(+b.getAttribute('data-k'));
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeGallery(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); showPhoto(pos - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); showPhoto(pos + 1); }
    });
    // deslizar con el dedo
    var sx = 0, sy = 0;
    var stage = $('.gallery-stage', dlg);
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) showPhoto(pos + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-gallery]');
    if (t) { e.preventDefault(); openGallery(+t.getAttribute('data-gallery'), +t.getAttribute('data-start') || 0); }
  });

  /* ---------- Enlaces de WhatsApp ---------- */
  function wireWhatsApp() {
    $all('[data-wa]').forEach(function (a) {
      var key = a.getAttribute('data-wa');
      var msg = MESSAGES[key] || MESSAGES.general;
      a.setAttribute('href', waUrl(withOrigin(msg)));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  /* ---------- Formulario de contacto ---------- */
  function initComposer() {
    var form = $('#composer');
    if (!form) return;
    var msg = form.elements.mensaje;
    var edited = false;
    var intents = {
      'busco-arriendo': 'estoy buscando una propiedad en arriendo',
      'busco-compra': 'estoy buscando una propiedad para comprar',
      'vender': 'quiero vender mi propiedad',
      'arrendar': 'quiero arrendar mi propiedad',
      'administrar': 'me interesa que administres el arriendo de mi propiedad'
    };
    function build() {
      var nombre = form.elements.nombre.value.trim();
      var comuna = form.elements.comuna.value.trim();
      var motivo = (form.querySelector('input[name="motivo"]:checked') || {}).value || 'busco-arriendo';
      var buscando = motivo.indexOf('busco') === 0;
      var s = 'Hola Clarisa' + (nombre ? ', soy ' + nombre : '') + '. ' + intents[motivo].charAt(0).toUpperCase() + intents[motivo].slice(1);
      if (comuna) s += buscando ? ' en ' + comuna : ', que está en ' + comuna;
      s += buscando ? '.' : '. ¿Podemos coordinar una reunión?';
      return s;
    }
    function refresh() { if (!edited) msg.value = build(); }
    form.addEventListener('input', function (e) { if (e.target === msg) edited = msg.value.trim() !== '' && msg.value !== build(); else refresh(); });
    form.addEventListener('change', function (e) { if (e.target.name === 'motivo') { edited = false; refresh(); } });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = msg.value.trim() || build();
      window.open(waUrl(withOrigin(text)), '_blank', 'noopener');
    });
    refresh();
  }

  /* ---------- Encabezado y menú ---------- */
  function initHeader() {
    var header = $('.site-header');
    var toggle = $('.menu-toggle');
    var nav = $('#menu');
    function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
    }
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    // Sección activa en el menú
    var links = $all('.main-nav ul a');
    var targets = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
    if ('IntersectionObserver' in window && targets.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      targets.forEach(function (t) { io.observe(t); });
    }
  }

  /* ---------- Preguntas ---------- */
  function initAccordion() {
    $all('.acc-item button').forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.closest('.acc-item');
        var open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open);
        b.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  function initReveal() {
    var els = $all('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    // pequeño desfase entre elementos hermanos
    els.forEach(function (el) {
      var sibs = $all(':scope > [data-reveal]', el.parentElement);
      var k = sibs.indexOf(el);
      if (k > 0) el.style.setProperty('--delay', Math.min(k, 5) * 80 + 'ms');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Botón flotante ---------- */
  function initFloat() {
    var wa = $('.wa-float');
    if (!wa) return;
    setTimeout(function () { wa.classList.add('is-ready'); }, reduceMotion ? 0 : 900);
    if (!reduceMotion && window.matchMedia('(min-width: 721px)').matches) {
      setTimeout(function () { wa.classList.add('is-peek'); }, 2600);
      setTimeout(function () { wa.classList.remove('is-peek'); }, 6200);
    }
  }

  /* ---------- Enlace directo a las fotos: index.html#fotos-<id> ---------- */
  function openFromHash() {
    var m = location.hash.match(/^#fotos-(.+)$/);
    if (!m) return;
    var id = decodeURIComponent(m[1]);
    for (var i = 0; i < props.length; i++) {
      if (props[i].id === id) { openGallery(i, 0); return; }
    }
  }

  renderListings();
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
  wireWhatsApp();
  initComposer();
  initHeader();
  initAccordion();
  initReveal();
  initFloat();
  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
