/* ---------- banner ---------- */
$('#eyebrow').textContent = SITE.name;
$('#menuTitle').textContent = SITE.menuTitle;
$('#menuIntro').textContent = SITE.menuIntro; $('#menuIntro').hidden = !SITE.menuIntro;
$('#menuNote').textContent = SITE.menuNote; $('#menuNote').hidden = !SITE.menuNote;
videoLoop([$('#bannerVideo')], matchMedia('(max-width: 860px)').matches && SITE.heroVideosMobile && SITE.heroVideosMobile.length ? SITE.heroVideosMobile : SITE.heroVideos.slice(0, 1));

/* ---------- menu sections ---------- */
const TAG = { spicy: ['🌶', 'Spicy'], veg: ['🌿', 'Vegetarian'] };
const cats = CATEGORIES.filter(c => DISHES.some(d => d.cat === c.id));
$('#cats').innerHTML = `<div class="catrow">${cats.map((c, i) => `<a href="#${c.id}" data-c="${c.id}" class="${i === 0 ? 'on' : ''}">${esc(c.label)}</a>`).join('')}</div>`;

$('#menuRoot').innerHTML = cats.map(c => `
  <section class="cat" id="${c.id}">
    <h2>${esc(c.label)}</h2>${c.note ? `<p class="cat-note">${esc(c.note)}</p>` : ''}
    <div class="dishes">${DISHES.filter(d => d.cat === c.id).map(d => `
      <article class="dish ${d.image ? 'has-img' : ''}">
        ${d.image ? `<img src="${esc(d.image)}" alt="${esc(d.name)}" loading="lazy">` : ''}
        <div class="body">
          <div class="head"><h3>${esc(d.name)}</h3>${(d.tags || []).map(t => TAG[t] ? `<span class="tag" title="${TAG[t][1]}" aria-label="${TAG[t][1]}">${TAG[t][0]}</span>` : '').join('')}<span class="dots"></span><span class="price">${money(d.price)}${d.unit ? `<small>${esc(d.unit)}</small>` : ''}</span></div>
          <p>${esc(d.desc || '')}</p>
        </div>
        <button class="plus" data-add="${esc(d.name)}" aria-label="Add ${esc(d.name)} to order">+</button>
      </article>`).join('')}
    </div>
  </section>`).join('');

const links = $$('#cats a');
const spy = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.dataset.c === e.target.id)); });
}, { rootMargin: '-35% 0px -60% 0px' });
$$('.cat').forEach(s => spy.observe(s));
$('#cats').onclick = e => {
  const a = e.target.closest('a'); if (!a) return;
  links.forEach(x => x.classList.toggle('on', x === a));
  a.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
};

/* =====================================================================
   ONLINE ORDERING
   ===================================================================== */
const OR = SITE.ordering;
const form = $('#ofForm');
let cart = {}, mode = OR.delivery ? 'delivery' : 'pickup';
try { cart = JSON.parse(localStorage.getItem('olitso_cart') || '{}'); } catch (e) {}
const priceOf = n => (DISHES.find(d => d.name === n) || {}).price || 0;
function toast(m){ const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600); }

/* ---- form setup from config ---- */
const modes = [OR.delivery && 'delivery', OR.pickup && 'pickup'].filter(Boolean);
$$('#mode button').forEach(b => b.hidden = !modes.includes(b.dataset.m));
$('#mode').hidden = modes.length < 2;
if (OR.areas && OR.areas.length) form.area.innerHTML = `<option value="">Select your area…</option>` + OR.areas.map(a => `<option value="${esc(a.name)}">${esc(a.name)}${a.fee != null ? ' — ' + money(a.fee) : ''}</option>`).join('');
else $('#areaWrap').hidden = true;
const pays = OR.payments || [];
form.payment.innerHTML = pays.map(p => `<option>${esc(p)}</option>`).join(''); $('#payWrap').hidden = !pays.length;

/* remember the customer's details on this device only */
try { const me = JSON.parse(localStorage.getItem('olitso_me') || '{}'); ['name', 'phone', 'address', 'area'].forEach(k => { if (me[k] && form[k]) form[k].value = me[k]; }); } catch (e) {}

/* ---- pricing ---- */
function deliveryFee(subtotal){
  if (mode !== 'delivery') return 0;
  const a = (OR.areas || []).find(x => x.name === form.area.value);
  if (a && a.fee != null) return OR.freeDeliveryOver && subtotal >= OR.freeDeliveryOver ? 0 : a.fee;
  if (OR.freeDeliveryOver && subtotal >= OR.freeDeliveryOver) return 0;
  return OR.deliveryFee;                       // number or null (= to be confirmed)
}

function render(){
  Object.keys(cart).forEach(k => { if (!cart[k] || !DISHES.some(d => d.name === k)) delete cart[k]; });
  localStorage.setItem('olitso_cart', JSON.stringify(cart));
  if (typeof updateCartBadge === 'function') updateCartBadge();
  const items = Object.entries(cart), n = items.reduce((a, [, q]) => a + q, 0);
  const sub = items.reduce((s, [k, q]) => s + priceOf(k) * q, 0), fee = deliveryFee(sub);

  $('#orderBar').hidden = !n;
  $('#obText').textContent = `${n} ${n === 1 ? 'item' : 'items'} · ${money(sub)}`;
  $('#items').innerHTML = items.length ? items.map(([k, q]) => `
    <div class="line"><b>${esc(k)}</b><button data-n="${esc(k)}" data-d="-1" aria-label="Remove one">−</button><span>${q}</span><button data-n="${esc(k)}" data-d="1" aria-label="Add one">+</button><span class="lp">${money(priceOf(k) * q)}</span></div>`).join('')
    : '<p class="empty">Your order is empty.<br>Tap + on any dish to add it.</p>';

  form.hidden = !n; $('.dfoot').hidden = !n;
  $$('#mode button').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
  $('#deliveryFields').hidden = mode !== 'delivery';
  form.address.required = mode === 'delivery';
  $('#feeRow').hidden = mode !== 'delivery';

  $('#subtotal').textContent = money(sub);
  $('#fee').textContent = fee === null ? 'Confirmed on WhatsApp' : fee === 0 ? 'Free' : money(fee);
  $('#total').textContent = money(sub + (fee || 0)) + (fee === null ? ' + delivery' : '');

  const min = mode === 'delivery' ? (OR.minOrder || 0) : 0;
  const hints = [];
  if (min && sub < min) hints.push(`Minimum order for delivery is ${money(min)} — add ${money(min - sub)} more.`);
  if (OR.freeDeliveryOver && mode === 'delivery' && sub < OR.freeDeliveryOver && !(min && sub < min)) hints.push(`Add ${money(OR.freeDeliveryOver - sub)} more for free delivery.`);
  $('#hint').textContent = hints.join(' '); $('#hint').hidden = !hints.length;
  $('#checkout').disabled = !n || (min && sub < min);
  $('#checkout').textContent = SITE.whatsapp ? 'Send order on WhatsApp' : 'Copy order details';

  /* payment helper text */
  const mm = /momo|mobile/i.test(form.payment.value) && OR.momoNumber;
  $('#momoNote').hidden = !mm; if (mm) $('#momoNote').textContent = `Send payment to ${OR.momoNumber} and keep your confirmation — we'll check it when we confirm your order.`;
  $('#timeWrap').hidden = form.when.value !== 'later';
  $('#clear').hidden = !n;
}

/* ---- events ---- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (b){ cart[b.dataset.add] = (cart[b.dataset.add] || 0) + 1; render(); b.classList.add('pop'); setTimeout(() => b.classList.remove('pop'), 300); toast(`${b.dataset.add} added`); }
});
$('#items').onclick = e => { const b = e.target.closest('button'); if (!b) return; cart[b.dataset.n] = (cart[b.dataset.n] || 0) + Number(b.dataset.d); render(); };
$('#mode').onclick = e => { const b = e.target.closest('button'); if (b){ mode = b.dataset.m; render(); } };
form.addEventListener('change', render);
const drawer = open => document.body.classList.toggle('open-d', open);
$('#orderBar').onclick = () => drawer(true);
$('#dclose').onclick = $('#dbg').onclick = () => drawer(false);
$('#clear').onclick = () => { cart = {}; render(); };
addEventListener('keydown', e => { if (e.key === 'Escape') drawer(false); });

/* ---- build + send ---- */
function buildMessage(){
  const f = Object.fromEntries(new FormData(form));
  const items = Object.entries(cart), sub = items.reduce((s, [k, q]) => s + priceOf(k) * q, 0), fee = deliveryFee(sub);
  const ref = 'OG-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  const L = [`Hello ${SITE.name}! New order ${ref}`, '', `Type: ${mode === 'delivery' ? 'Delivery' : 'Pickup'}`, `Name: ${f.name}`, `Phone: ${f.phone}`];
  if (mode === 'delivery'){ if (f.area) L.push(`Area: ${f.area}`); L.push(`Address: ${f.address}`); }
  L.push(`When: ${f.when === 'later' && f.time ? 'Today at ' + f.time : 'As soon as possible'}`);
  if (f.payment) L.push(`Payment: ${f.payment}`);
  L.push('', 'Items:', ...items.map(([k, q]) => `• ${q} × ${k} — ${money(priceOf(k) * q)}`), '', `Subtotal: ${money(sub)}`);
  if (mode === 'delivery') L.push(`Delivery: ${fee === null ? 'to be confirmed' : fee === 0 ? 'Free' : money(fee)}`);
  L.push(`Total: ${money(sub + (fee || 0))}${fee === null ? ' + delivery' : ''}`);
  if (f.notes && f.notes.trim()) L.push('', `Notes: ${f.notes.trim()}`);
  return { text: L.join('\n'), f };
}
$('#checkout').onclick = async () => {
  if (!Object.keys(cart).length) return;
  if (mode === 'delivery' && (OR.areas || []).length && !form.area.value){ form.area.focus(); return toast('Please choose your delivery area'); }
  if (!form.reportValidity()) return;
  const { text, f } = buildMessage();
  try { localStorage.setItem('olitso_me', JSON.stringify({ name: f.name, phone: f.phone, address: f.address, area: f.area })); } catch (e) {}
  if (!SITE.whatsapp){
    try { await navigator.clipboard.writeText(text); toast('Order copied. Add a WhatsApp number in js/data.js to send orders automatically.'); }
    catch (e) { toast('WhatsApp number not set up yet.'); }
    return;
  }
  window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  toast('Opening WhatsApp — press send to place your order');
};

render();

/* header cart icon: keep its badge in step, and open the drawer when arriving via #cart */
updateCartBadge();
if (location.hash === '#cart') drawer(true);
