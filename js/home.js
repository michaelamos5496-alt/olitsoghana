document.title = SITE.name;
$('#headline').textContent = SITE.headline;
if (SITE.heroImage) $('#photo').style.backgroundImage = `url('${SITE.heroImage}')`; else $('#hero').classList.add('noimg');
videoLoop([$('#vidA'), $('#vidB')], innerWidth <= 860 ? SITE.heroVideos.slice(0, 1) : SITE.heroVideos);   // phones: one clip only
$('#heroCta').textContent = SITE.heroCta.label; $('#heroCta').href = SITE.heroCta.href; $('#heroCta').hidden = !SITE.heroCta.label;

/* ---------- About ---------- */
const A = SITE.about;
$('#aEyebrow').textContent = A.eyebrow;
$('#aTitle').textContent = A.title;
$('#aText').innerHTML = A.text.map(t => `<p>${esc(t)}</p>`).join('');
$('#aCta').textContent = A.cta; $('#aCta').hidden = !A.cta;
$('#pillars').innerHTML = (A.pillars || []).map((p, i) => `<div><span class="n">0${i + 1}</span><h3>${esc(p.title)}</h3>${p.text ? `<p>${esc(p.text)}</p>` : ''}</div>`).join('');
$('#pillars').hidden = !(A.pillars || []).length;

/* phones: the pillars become a swipeable slider with dots (CSS handles the layout) */
function makeSlider(track){
  const cards = [...track.children];
  if (cards.length < 2) return;
  track.insertAdjacentHTML('afterend', `<div class="pdots">${cards.map((_, i) => `<button type="button" aria-label="Show item ${i + 1}"${i === 0 ? ' class="on"' : ''}></button>`).join('')}</div>`);
  const dots = [...track.nextElementSibling.children];
  const step = () => cards[1].offsetLeft - cards[0].offsetLeft;
  track.addEventListener('scroll', () => {
    const i = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / (step() || 1))));
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
  }, { passive: true });
  dots.forEach((d, i) => d.onclick = () => track.scrollTo({ left: i * step(), behavior: 'smooth' }));
}
makeSlider($('#pillars'));

const media = $('#aMedia'), av = $('#aVideo');
if (A.image){ media.style.backgroundImage = `url('${A.image}')`; av.hidden = true; }
else if (A.video && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  // start the framed clip only when it scrolls into view
  new IntersectionObserver((es, io) => {
    if (!es[0].isIntersecting) return;
    av.src = encodeURI(A.video);
    av.addEventListener('playing', () => av.classList.add('on'));
    av.addEventListener('error', () => { av.hidden = true; });
    av.play().catch(() => {});
    io.disconnect();
  }, { rootMargin: '200px' }).observe(media);
} else av.hidden = true;

/* ---------- The Experience ---------- */
const X = SITE.experience;
$('#xEyebrow').textContent = X.eyebrow;
$('#xTitle').textContent = X.title;
$('#xText').textContent = X.text; $('#xText').hidden = !X.text;
$('#xList').innerHTML = X.items.map((it, i) => `
  <li class="reveal" style="transition-delay:${i * 90}ms"><span class="num">0${i + 1}</span><div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></div></li>`).join('');

makeSlider($('#xList'));   // phones: the list becomes a swipeable slider (CSS)

const xm = $('#xMedia'), xv = $('#xVideo');
const xImgs = (X.images || []).filter(Boolean);
if (xImgs.length){
  /* photo slideshow: slow crossfade + gentle zoom, loops forever */
  xv.remove();
  xm.insertAdjacentHTML('afterbegin', xImgs.map((src, i) => `<img class="slide${i === 0 ? ' on' : ''}" src="${esc(src)}" alt="${i === 0 ? esc(X.alt || 'Inside Olisto') : ''}" ${i === 0 ? '' : 'loading="lazy"'}>`).join(''));
  if (xImgs.length > 1){
    xm.insertAdjacentHTML('beforeend', `<div class="slide-dots" aria-hidden="true">${xImgs.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div>`);
    const slides = $$('.slide', xm), dots = $$('.slide-dots i', xm); let cur = 0, timer;
    const go = i => { slides[cur].classList.remove('on'); dots[cur].classList.remove('on'); cur = (i + slides.length) % slides.length; slides[cur].classList.add('on'); dots[cur].classList.add('on'); };
    const start = () => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => go(cur + 1), 5500); };
    start();
    document.addEventListener('visibilitychange', () => { clearInterval(timer); if (!document.hidden) start(); });
  }
} else if (X.image){ xm.style.backgroundImage = `url('${X.image}')`; xv.hidden = true; }
else if (X.video && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  new IntersectionObserver((es, io) => {
    if (!es[0].isIntersecting) return;
    xv.src = encodeURI(X.video);
    xv.addEventListener('playing', () => xv.classList.add('on'));
    xv.addEventListener('error', () => { xv.hidden = true; });
    xv.play().catch(() => {});
    io.disconnect();
  }, { rootMargin: '300px' }).observe(xm);
} else xv.hidden = true;

/* ---------- Order online ---------- */
const OR = SITE.ordering;
const facts = [];
if (OR.delivery && OR.pickup) facts.push(['Options', 'Delivery &amp; pickup']); else if (OR.delivery) facts.push(['Options', 'Delivery']); else if (OR.pickup) facts.push(['Options', 'Pickup']);
if (OR.delivery && OR.deliveryFee != null) facts.push(['Delivery from', money(Math.min(OR.deliveryFee, ...(OR.areas || []).map(a => a.fee ?? Infinity)))]);
if (OR.delivery && OR.freeDeliveryOver) facts.push(['Free delivery over', money(OR.freeDeliveryOver)]);
if (OR.delivery && OR.minOrder) facts.push(['Minimum order', money(OR.minOrder)]);
if (OR.prepTime) facts.push(['Usually ready in', esc(OR.prepTime)]);
if (OR.hours) facts.push(['Ordering hours', esc(OR.hours)]);
$('#oFacts').innerHTML = facts.map(([k, v]) => `<span>${k}: <b>${v}</b></span>`).join(''); $('#oFacts').hidden = !facts.length;
$('#oNote').textContent = OR.note || ''; $('#oNote').hidden = !OR.note;
makeSlider($('.ord .steps'));   // phones: Choose / Checkout / Enjoy become a swipeable slider (CSS)
if (OR.image){ $('#oImg').src = OR.image; $('#oImg').hidden = false; } else $('.ord-grid').classList.add('no-photo');
if (SITE.phone){ $('#oCall').href = 'tel:' + SITE.phone.replace(/[^\d+]/g, ''); $('#oCall').hidden = false; }

/* ---------- Reservations ---------- */
const R = SITE.reservations;
$('#rEyebrow').textContent = R.eyebrow;
$('#rTitle').textContent = R.title;
$('#rText').textContent = R.text; $('#rText').hidden = !R.text;
$('#rNote').textContent = R.note; $('#rNote').hidden = !R.note;
const waLink = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello ' + SITE.name + '! I would like to reserve a table.')}` : '';
const bookUrl = R.bookUrl || waLink;
if (bookUrl){ $('#rBook').href = bookUrl; $('#rBook').target = '_blank'; $('#rBook').rel = 'noopener'; }
else $('#rBook').addEventListener('click', e => { e.preventDefault(); $('#rMsg').hidden = false; });
if (SITE.phone) $('#rCall').href = 'tel:' + SITE.phone.replace(/[^\d+]/g, ''); else $('#rCall').hidden = true;

/* ---------- Contact ---------- */
const phones = [SITE.phone, SITE.phone2, SITE.phone3].filter(Boolean);
const telHref = p => 'tel:' + p.replace(/[^\d+]/g, '');
const mapQuery = SITE.address ? encodeURIComponent(SITE.name + ' ' + SITE.address) : '';
const blocks = [
  SITE.address && ['Visit us', `<p>${esc(SITE.address)}</p>`],
  phones.length && ['Call us', phones.map(p => `<a href="${telHref(p)}">${esc(p)}</a>`).join('')],
  (SITE.hours || []).length && ['Opening hours', SITE.hours.map(h => `<p class="hr"><span>${esc(h.days)}</span>${esc(h.time)}</p>`).join('')],
  SITE.email && ['Email', `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`],
  (SITE.social || []).length && ['Follow us', SITE.social.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label) + (s.handle ? ' · ' + esc(s.handle) : '')}</a>`).join('')]
].filter(Boolean);
const ic = d => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  'Visit us': ic('<path d="M12 21s-7-6.2-7-11.2a7 7 0 0 1 14 0C19 14.800 12 21 12 21Z"/><circle cx="12" cy="9.800" r="2.400"/>'),
  'Call us': ic('<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
  'Opening hours': ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  'Email': ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  'Follow us': ic('<rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.800"/><circle cx="17" cy="7" r=".6" fill="currentColor"/>')
};
$('#cBlocks').innerHTML = blocks.map(([h, b]) => `<div class="cb"><h3>${ICONS[h] || ''}${h}</h3>${b}</div>`).join('');
if (mapQuery){ $('#cDir').href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`; $('#cDir').hidden = false; }
if (SITE.whatsapp){ $('#cWa').href = `https://wa.me/${SITE.whatsapp}`; $('#cWa').hidden = false; }
const mapSrc = SITE.mapEmbed || (mapQuery ? `https://www.google.com/maps?q=${mapQuery}&output=embed` : '');
if (mapSrc) $('#cFrame').src = mapSrc; else { $('#cFrame').remove(); $('#contact').classList.add('no-map'); }

/* fade-up on scroll */
const rv = $$('.reveal');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) rv.forEach(e => e.classList.add('in'));
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  rv.forEach(e => io.observe(e));
}
