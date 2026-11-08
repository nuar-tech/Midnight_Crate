function productArt(p){return `background-image:url(images/campus-shelf-v5.webp);background-size:400% 300%;background-position:${p.image%4*100/3}% ${Math.floor(p.image/4)*50}%`; }
'use strict';
const money = value => new Intl.NumberFormat('en-US').format(value) + ' ₸';
const productById = id => products.find(product => product.id === id);
const storageKey = 'midnight-crate-cart-v1';
// Store product IDs and quantities only; never store contact details.
function readCart() {
 try {
  const value = JSON.parse(localStorage.getItem(storageKey) || '{}');
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id,qty]) => productById(id) && Number.isInteger(qty) && qty > 0 && qty <= 20));
 } catch { return {}; }
}
let cart = readCart();
let category = 'All';
let occasion = 'all';
let onlySaved = false;
function loadSavedPicks() {
 try { const ids = JSON.parse(localStorage.getItem('midnight-saved-picks') || '[]'); return Array.isArray(ids) ? ids.filter(id => productById(id)) : []; }
 catch { return []; }
}
let savedPicks = new Set(loadSavedPicks());
let toastTimer;
const form = document.querySelector('.order-form');
const dialog = document.querySelector('.cart-dialog');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const duration = reducedMotion ? 0 : 220;
function saveCart() {
 try { localStorage.setItem(storageKey,JSON.stringify(cart)); } catch { /* The cart still works in memory if storage is unavailable. */ }
 renderCart();
 document.dispatchEvent(new Event('cartupdated'));
}
function subtotal() { return Object.entries(cart).reduce((total,[id,qty]) => total + productById(id).price * qty,0); }
function notify(message) {
 clearTimeout(toastTimer);
 $('.toast-message').stop(true,true).text(message).fadeIn(duration);
 toastTimer = setTimeout(() => $('.toast-message').stop(true,true).fadeOut(duration),2500);
}
function addProduct(id) {
 if (!productById(id)) return;
 if ((cart[id] || 0) >= 20) return notify('Maximum 20 of each bundle per demo order.');
 cart[id] = (cart[id] || 0) + 1;
 saveCart(); notify(productById(id).name + ' added to your bag.');
}
function renderCatalog() {
 if(!document.querySelector('.product-grid')) return;
 const search = document.querySelector('.search').value.trim().toLowerCase();
 const sort = document.querySelector('.sort').value;
 const budget = Number(document.querySelector('#shelf-budget').value);
 const results = products.filter(product =>
  (category === 'All' || product.category === category) &&
  (occasion === 'all' || product.mood === occasion) &&
  (!onlySaved || savedPicks.has(product.id)) && product.price <= budget &&
  `${product.name} ${product.description} ${product.category} ${product.brands.join(' ')} ${product.contents.join(' ')}`.toLowerCase().includes(search));
 if (sort === 'low') results.sort((a,b) => a.price-b.price);
 if (sort === 'high') results.sort((a,b) => b.price-a.price);
 if (sort === 'name') results.sort((a,b) => a.name.localeCompare(b.name));
 const grid = document.querySelector('.product-grid');
 grid.replaceChildren();
 for (const product of results) {
  const card = document.createElement('article'); card.className='product-card';
  // All interpolated catalogue values are trusted static data from data.js.
  card.dataset.tone = product.tone;
  card.innerHTML = `<div class="card-media"><button class="product-image product-visual" data-detail="${product.id}" aria-label="View ${product.name} contents" style="${productArt(product)}"><span class="category-tag">${product.tag}</span><span class="view-inside">Look inside ↗</span></button><button class="save-pick" data-save="${product.id}" aria-label="Save ${product.name}" aria-pressed="${savedPicks.has(product.id)}">${savedPicks.has(product.id)?'♥':'♡'}</button></div><div class="card-copy"><span class="brand-line">${product.brands.join(' · ')}</span><h3><button class="product-title" data-detail="${product.id}">${product.name}</button></h3><p>${product.description}</p><div class="product-facts"><span>${product.serves===1?'For one':`For ${product.serves}`}</span><span>${product.prep}</span></div><div class="product-bottom"><span class="price">${money(product.price)}${product.serves>1?`<small>${money(Math.ceil(product.price/product.serves))} / person</small>`:''}</span><button class="add-product" aria-label="Add ${product.name} to bag" data-id="${product.id}">Add <span>+</span></button></div></div>`;
  grid.append(card);
 }
 document.querySelector('.result-count').textContent = `${results.length} ${results.length===1?'bundle':'bundles'}`;
 document.querySelector('.empty-results').hidden = results.length !== 0;
 document.querySelectorAll('.saved-count').forEach(counter => counter.textContent=savedPicks.size);
}
function renderCart() {
 const entries = Object.entries(cart);
 const count = entries.reduce((sum,[,qty]) => sum+qty,0);
 document.querySelector('.cart-count').textContent=count;
 document.querySelector('.cart-open').setAttribute('aria-label',`Open cart, ${count} items`);
 const holder=document.querySelector('#cart-items'); holder.replaceChildren();
 const receipt=document.querySelector('#receipt-items'); receipt?.replaceChildren();
 if (!entries.length) {
  holder.innerHTML='<p>Your bag is waiting for a little midnight fuel.</p>';
  if(receipt) receipt.innerHTML='<p>Your bag is empty. Choose a bundle on the Menu page.</p>';
 }
 for (const [id,qty] of entries) {
  const product=productById(id);
  const row=document.createElement('div'); row.className='cart-row';
  row.innerHTML=`<div><strong>${product.name}</strong><p>${money(product.price)} each</p><button class="text-button remove-item" data-id="${id}" aria-label="Remove ${product.name}">Remove</button></div><div class="qty-controls"><button data-id="${id}" data-delta="-1" aria-label="Decrease ${product.name}">−</button><span>${qty}</span><button data-id="${id}" data-delta="1" aria-label="Increase ${product.name}" ${qty>=20?'disabled':''}>+</button></div>`;
  holder.append(row);
  const line=document.createElement('div'); line.className='receipt-item';
  line.innerHTML=`<div>${product.name}<br><small>${qty} × ${money(product.price)}</small></div><div><strong>${money(qty*product.price)}</strong><br><button class="text-button remove-item" data-id="${id}" aria-label="Remove ${product.name} from order">Remove</button></div>`;
  receipt?.append(line);
 }
 document.querySelector('#cart-total').textContent=money(subtotal());
 if(!form) return;
 document.querySelector('#receipt-subtotal').textContent=money(subtotal());
 const zone=form.elements.dorm.value;
 const fee=entries.length && zone ? deliveryFees[zone] : 0;
 document.querySelector('#receipt-delivery').textContent=entries.length ? (zone ? money(fee) : 'Choose dorm') : '—';
 document.querySelector('#receipt-total').textContent=money(subtotal()+fee);
 if (entries.length) document.querySelector('.checkout-error').textContent='';
}
document.querySelector('.search')?.addEventListener('input',renderCatalog);
document.querySelector('.sort')?.addEventListener('change',renderCatalog);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click',() => {
 category=button.dataset.category;
 document.querySelectorAll('.filter').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
 renderCatalog();
}));
document.querySelector('.reset-filters')?.addEventListener('click',()=>{
 document.querySelector('.search').value='';document.querySelector('.sort').value='featured';occasion='all';onlySaved=false;document.querySelector('#shelf-budget').value='7000';document.querySelectorAll('[data-mood]').forEach(button=>{button.classList.toggle('active',button.dataset.mood==='all');button.setAttribute('aria-pressed',String(button.dataset.mood==='all'));});document.querySelector('.favorites-filter').setAttribute('aria-pressed','false');document.querySelector('[data-category="All"]').click();document.querySelector('.search').focus();
});
document.addEventListener('click',event=>{
 const add=event.target.closest('.add-product'); if(add) addProduct(add.dataset.id);
 const remove=event.target.closest('.remove-item'); if(remove){delete cart[remove.dataset.id];saveCart();notify('Bundle removed from your bag.');}
 const quantity=event.target.closest('[data-delta]'); if(quantity){const id=quantity.dataset.id;cart[id]=Math.min(20,(cart[id]||0)+Number(quantity.dataset.delta));if(cart[id]<=0)delete cart[id];saveCart();}
});
document.querySelector('.cart-open').addEventListener('click',()=>dialog.showModal());
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
document.querySelector('.clear-cart').addEventListener('click',()=>{cart={};saveCart();notify('Your bag is now empty.');});
document.querySelector('.nav-toggle').addEventListener('click',function(){const open=this.getAttribute('aria-expanded')!=='true';this.setAttribute('aria-expanded',String(open));this.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.querySelector('#navigation').classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.querySelector('#navigation').classList.remove('open');document.querySelector('.nav-toggle').setAttribute('aria-expanded','false');document.querySelector('.nav-toggle').setAttribute('aria-label','Open navigation');}});
// Three distinct jQuery effects: accordion slide, notification fade, scroll animation.
$('.faq-toggle').on('click',function(){
 const open=$(this).attr('aria-expanded')!=='true';
 $(this).attr('aria-expanded',String(open)).find('span').text(open?'−':'+');
 const answer=$('#'+this.getAttribute('aria-controls'));
 answer.stop(true,true)[open?'slideDown':'slideUp'](duration);
});
$('a[href^="#"]').not('.skip').on('click',function(event){
 const target=document.getElementById(this.hash.slice(1));if(!target)return;
 event.preventDefault();$('html, body').stop(true).animate({scrollTop:target.getBoundingClientRect().top+window.scrollY-100},reducedMotion?0:500);
 history.replaceState(null,'',this.hash);
});
$('.smooth-top').on('click',()=>{$('html, body').stop(true).animate({scrollTop:0},reducedMotion?0:500);});
const validators={
 name:value=>value.trim().length>=2&&value.trim().length<=60?'':'Enter a name between 2 and 60 characters.',
 email:value=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())?'':'Enter a valid email, such as alex@example.com.',
 phone:value=>/^\+?[\d\s()-]+$/.test(value)&&value.replace(/\D/g,'').length>=10&&value.replace(/\D/g,'').length<=15?'':'Enter a phone number with 10–15 digits.',
 room:value=>/^[\p{L}\d][\p{L}\d\s-]{0,19}$/u.test(value.trim())?'':'Enter a room number or label (1–20 letters/digits).',
 time:value=>/^\d{2}:\d{2}$/.test(value)&&(value>='20:00'||value<='04:00')?'':'Choose a time from 20:00 to 04:00.',
 dorm:value=>Object.hasOwn(deliveryFees,value)?'':'Choose your dorm zone.'
};
const touched=new Set();
function validateField(name){const field=form.elements[name];const error=!field.value.trim()?'This field is required.':validators[name](field.value);document.querySelector('#'+name+'-error').textContent=error;field.setAttribute('aria-invalid',String(Boolean(error)));return !error;}
if(form) for(const name of Object.keys(validators)){
 const field=form.elements[name];
 field.addEventListener('blur',()=>{touched.add(name);validateField(name);});
 field.addEventListener('input',()=>{if(touched.has(name))validateField(name);});
 field.addEventListener('change',()=>{if(touched.has(name))validateField(name);});
}
if(form) form.elements.dorm.addEventListener('change',renderCart);
if(form) form.addEventListener('submit',event=>{
 event.preventDefault();let valid=true;
 for(const name of Object.keys(validators)){touched.add(name);if(!validateField(name))valid=false;}
 if(!Object.keys(cart).length){document.querySelector('.checkout-error').textContent='Your bag is empty. Add at least one bundle before confirming.';valid=false;}
 if(!valid){const invalid=form.querySelector('[aria-invalid="true"]');if(invalid)invalid.focus();return;}
 const total=subtotal()+deliveryFees[form.elements.dorm.value];
 const summary=`Demo order confirmed for ${form.elements.name.value.trim()}: ${money(total)}, Dorm ${form.elements.dorm.value}, room ${form.elements.room.value.trim()}, at ${form.elements.time.value}. ${form.elements.quiet.checked?'Quiet knock selected.':'Standard knock selected.'} No real order or payment has been sent.`;
 const success=document.querySelector('.success-message');success.replaceChildren();const title=document.createElement('h3');title.textContent='Your night is sorted.';const detail=document.createElement('p');detail.textContent=summary;success.append(title,detail);
 form.reset();touched.clear();form.querySelectorAll('[aria-invalid]').forEach(field=>field.removeAttribute('aria-invalid'));form.querySelectorAll('.field-error').forEach(error=>error.textContent='');cart={};saveCart();
 $(success).stop(true,true).fadeIn(duration,()=>{success.focus({preventScroll:true});success.scrollIntoView({behavior:reducedMotion?'instant':'smooth',block:'center'});});
});
document.querySelectorAll('.add-plan').forEach(button=>button.addEventListener('click',()=>{
 const ids=plans[button.dataset.plan];
 if(ids.some(id=>(cart[id]||0)>=20))return notify('One of these bundles is already at the limit of 20.');
 ids.forEach(id=>cart[id]=(cart[id]||0)+1);saveCart();notify('Both bundles added. Your total is ready in the bag.');
}));
function splitCost(){const value=Number(document.querySelector('#people').value);document.querySelector('.split-result').textContent=Number.isInteger(value)&&value>=1&&value<=8?money(Math.ceil(Number(document.querySelector('#split-plan').value)/value))+' per person':'Enter a whole number from 1 to 8.';}
if(document.querySelector('#people')){document.querySelector('#people').addEventListener('input',splitCost);document.querySelector('#split-plan').addEventListener('change',splitCost);splitCost();}
function selectZone(zone){document.querySelector('#delivery-route').setAttribute('d',dormRoutes[zone]);document.querySelector('.selected-dorm').textContent=`Dorm ${zone} · residential quarter`;document.querySelector('#zone-select').value=zone;document.querySelector('.estimate').textContent=money(deliveryFees[zone]);document.querySelectorAll('[data-zone]').forEach(button=>{button.classList.toggle('active',button.dataset.zone===zone);button.setAttribute('aria-pressed',String(button.dataset.zone===zone));});sessionStorage.setItem('midnight-dorm',zone);if(form) form.elements.dorm.value=zone;renderCart();}
if(document.querySelector('#zone-select')){document.querySelectorAll('[data-zone]').forEach(button=>button.addEventListener('click',()=>selectZone(button.dataset.zone)));document.querySelector('#zone-select').addEventListener('change',event=>selectZone(event.target.value));selectZone(Object.hasOwn(deliveryFees,sessionStorage.getItem('midnight-dorm'))?sessionStorage.getItem('midnight-dorm'):'D1');}
window.addEventListener('storage',event=>{if(event.key===storageKey){cart=readCart();renderCart();}});
if(form && Object.hasOwn(deliveryFees,sessionStorage.getItem('midnight-dorm'))) form.elements.dorm.value=sessionStorage.getItem('midnight-dorm');
renderCatalog();renderCart();
// Subtle entrance motion; content remains visible if animations are unavailable.
if(!reducedMotion&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:.25,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'ease-out'});observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.section-heading,.steps article,.service-cards article,.plan,.team-grid article').forEach(element=>observer.observe(element));}

function updateHeader(){document.body.classList.toggle("scrolled",window.scrollY>50);}
window.addEventListener("scroll",updateHeader,{passive:true});updateHeader();
