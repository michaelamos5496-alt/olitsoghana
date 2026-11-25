/* Shared on every page: notice bar, header, full-screen menu */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money = n => SITE.currency + n;

/* ---------- header + overlay ---------- */
const logoHTML = SITE.logo
  ? `<img src="${esc(SITE.logo)}" alt="${esc(SITE.name)}">`
  : `<span class="lg">${esc(SITE.logoText || SITE.name)}</span>` + (SITE.logoTag ? `<span class="tag">${esc(SITE.logoTag)}</span>` : '');
const menuLink = (SITE.links.find(l => /menu/i.test(l.label)) || SITE.links[0]).href;
const bookHref = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello ' + SITE.name + '! I would like to reserve a table.')}` : 'index.html#reservations';

document.body.insertAdjacentHTML('afterbegin', `
<header class="top" id="top">
  <div class="left"><button class="menu-btn" id="menuBtn" aria-label="Open menu"><i></i></button></div>
  <a href="index.html" class="logo">${logoHTML}</a>
  <div class="right">
    <a href="${esc(menuLink)}" class="txt">Order online</a>
    <a href="${esc(bookHref)}" class="btn-o" ${SITE.whatsapp ? 'target="_blank" rel="noopener"' : ''}>Book a table</a>
    <button class="cart-btn" id="cartBtn" type="button" aria-label="Open your food basket"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.5 10C7.5 4.5 16.5 4.5 16.5 10"/><path d="M3 10h18l-1.7 9.2a1.6 1.6 0 0 1-1.6 1.3H6.300a1.600 1.600 0 0 1-1.600-1.300L3 10Z"/><path d="M9 10.500v9.500M15 10.500v9.500M3.700 14.800h16.600"/></svg><span class="cart-count" id="cartCount" hidden>0</span></button>
  </div>
</header>
<div class="overlay" id="overlay" aria-label="Menu">
  <button class="close" id="closeBtn" aria-label="Close menu">✕</button>
  ${SITE.links.map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
</div>`);

const ov = $('#overlay');
const toggle = open => { ov.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; (open ? $('#closeBtn') : $('#menuBtn')).focus(); };
$('#menuBtn').onclick = () => toggle(true);
$('#closeBtn').onclick = () => toggle(false);
ov.onclick = e => { if (e.target.closest('a')) toggle(false); };
addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('open')) toggle(false); });

/* ---------- notice bar ---------- */
const nb = $('#notice');
if (nb){
  if (SITE.notice && SITE.notice.text){
    nb.innerHTML = `<button aria-expanded="false">${esc(SITE.notice.label)}<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m1 4 5 5 5-5"/></svg></button><p>${esc(SITE.notice.text)}</p>`;
    nb.firstChild.onclick = e => { const o = nb.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); setTimeout(place, 400); place(); };
  } else nb.hidden = true;
}

/* header sits below the notice bar, then sticks and turns solid on scroll */
const hdr = $('#top');
function place(){
  const nh = nb && !nb.hidden ? nb.offsetHeight : 0;
  document.documentElement.style.setProperty('--nh', nh + 'px');
  hdr.style.top = Math.max(0, nh - scrollY) + 'px';
  hdr.classList.toggle('solid', scrollY > nh + 40);
  document.documentElement.style.setProperty('--hh', hdr.offsetHeight + 'px');
}
addEventListener('scroll', place, { passive: true }); addEventListener('resize', place); place();

/* ---------- background video: plays the sources in turn, crossfading, forever ---------- */
function videoLoop(els, srcs){
  els = els.filter(Boolean);
  if (!els.length || !srcs.length || matchMedia('(prefers-reduced-motion: reduce)').matches){ els.forEach(e => e.remove()); return; }
  const net = navigator.connection;                                 // data-saver or 2G: keep the still image, skip video
  if (net && (net.saveData || /(^|-)2g$/.test(net.effectiveType || ''))){ els.forEach(e => e.remove()); return; }
  const FADE = 1.2;                                   // seconds; keep in sync with the CSS transition
  const multi = srcs.length > 1 && els.length > 1;
  let idx = 0, active = els[0], busy = false;
  const load = (el, i) => { el.src = encodeURI(srcs[i % srcs.length]); el.load(); };
  const fail = () => els.forEach(e => e.remove());

  els.forEach(e => { e.loop = !multi; e.addEventListener('error', fail); });
  load(active, 0);
  // the 2nd clip only starts downloading once the 1st is playing, so the first one loads fast
  active.addEventListener('playing', () => { active.classList.add('on'); if (multi) setTimeout(() => load(els[1], 1), 1200); }, { once: true });
  active.play().catch(() => {});
  if (!multi) return;

  function next(){
    busy = true;
    const out = active, inn = els[0] === active ? els[1] : els[0];
    idx++;
    inn.currentTime = 0;
    inn.play().then(() => {
      out.classList.remove('top'); inn.classList.add('on', 'top');       // new clip fades in on top of the old one
      setTimeout(() => { out.classList.remove('on'); out.pause(); load(out, idx + 1); active = inn; busy = false; }, FADE * 1000 + 150);
    }).catch(() => { busy = false; });
  }
  els.forEach(e => e.addEventListener('timeupdate', () => {
    if (e !== active || busy || !e.duration) return;
    if (e.duration - e.currentTime <= FADE + 0.15) next();
  }));
}

/* ---------- footer (shared by every page) ---------- */
(function(){
  const phones = [SITE.phone, SITE.phone2, SITE.phone3].filter(Boolean);
  const tel = p => 'tel:' + p.replace(/[^\d+]/g, '');
  const dir = SITE.address ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SITE.name + ' ' + SITE.address) : '';
  const col = (h, body) => body ? `<div><h4>${h}</h4>${body}</div>` : '';
  const visit = [SITE.address && `<p>${esc(SITE.address)}</p>`, ...(SITE.hours || []).map(h => `<p><span class="d">${esc(h.days)}</span> ${esc(h.time)}</p>`), dir && `<a href="${dir}" target="_blank" rel="noopener">Get directions →</a>`].filter(Boolean).join('');
  const contact = [...phones.map(p => `<a href="${tel(p)}">${esc(p)}</a>`), SITE.email && `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`, ...(SITE.social || []).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}${s.handle ? ' · ' + esc(s.handle) : ''}</a>`)].filter(Boolean).join('');
  const brand = SITE.logo ? `<img src="${esc(SITE.logo)}" alt="${esc(SITE.name)}">` : `<span class="fl">${esc(SITE.logoText || SITE.name)}</span>${SITE.logoTag ? `<span class="ft">${esc(SITE.logoTag)}</span>` : ''}`;
  document.body.insertAdjacentHTML('beforeend', `
<footer class="sitefoot">
  <div class="sf-grid">
    <div class="sf-brand"><a href="index.html" class="sf-logo">${brand}</a><p>${esc(SITE.intro || '')}</p></div>
  </div>
  <div class="sf-bar"><span>© ${new Date().getFullYear()} ${esc(SITE.name)}. All rights reserved.</span><span class="sf-credit">Designed and developed by <a href="https://theimagedept.vercel.app" target="_blank" rel="noopener">TheImageDept</a></span><a href="#top-of-page" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Back to top ↑</a></div>
</footer>`);
})();

/* ---------- header cart icon ---------- */
function updateCartBadge(){
  let n = 0;
  try { n = Object.values(JSON.parse(localStorage.getItem('olitso_cart') || '{}')).reduce((a, b) => a + (Number(b) || 0), 0); } catch (e) {}
  const c = $('#cartCount'); if (!c) return;
  c.textContent = n > 99 ? '99+' : n; c.hidden = !n;
  $('#cartBtn').setAttribute('aria-label', n ? `Open your food basket (${n} ${n === 1 ? 'item' : 'items'})` : 'Open your food basket');
}
$('#cartBtn').onclick = () => {
  if ($('#drawer')) document.body.classList.add('open-d');     // on the menu page: open the checkout drawer
  else location.href = 'menu.html#cart';                        // elsewhere: go to the menu with the cart open
};
addEventListener('storage', updateCartBadge);
updateCartBadge();
