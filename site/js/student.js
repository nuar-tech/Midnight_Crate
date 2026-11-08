'use strict';
// Student-focused catalogue controls share the existing cart and checkout.
const productDialog = document.querySelector('.product-dialog');
let detailProductId = null;
function setOccasion(value) {
 occasion = value;
 document.querySelectorAll('[data-mood]').forEach(button => {
  const selected = button.dataset.mood === value;
  button.classList.toggle('active',selected);
  button.setAttribute('aria-pressed',String(selected));
 });
 renderCatalog();
}
document.querySelectorAll('[data-mood]').forEach(button => button.addEventListener('click',() => setOccasion(button.dataset.mood)));
document.querySelector('#shelf-budget')?.addEventListener('change',renderCatalog);
document.querySelector('.favorites-filter')?.addEventListener('click',function(){
 onlySaved = !onlySaved; this.setAttribute('aria-pressed',String(onlySaved)); renderCatalog();
});
function openProduct(id) {
 const product = productById(id); if(!product) return;
 detailProductId = id;
 productDialog.querySelector('#product-detail-title').textContent = product.name;
 productDialog.querySelector('.detail-tag').textContent = product.tag;
 productDialog.querySelector('.detail-brands').textContent = product.brands.join(' · ');
 productDialog.querySelector('.detail-description').textContent = product.description;
 const list = productDialog.querySelector('.detail-contents'); list.replaceChildren();
 product.contents.forEach(item=>{const li=document.createElement('li');li.textContent=item;list.append(li);});
 productDialog.querySelector('.detail-meta').textContent = `${product.serves===1?'For one':`Suggested sharing: ${product.serves}`} · ${product.prep}`;
 productDialog.querySelector('.detail-note').textContent = product.note;
 productDialog.querySelector('.detail-price').textContent = money(product.price);
 const art = productDialog.querySelector('.detail-art');
 art.style.cssText = productArt(product);
 art.setAttribute('aria-label',`${product.name}: ${product.brands.join(', ')} product illustration`);
 productDialog.showModal();
}
document.addEventListener('click',event=>{
 const detail = event.target.closest('[data-detail]'); if(detail) openProduct(detail.dataset.detail);
 const save = event.target.closest('[data-save]');
 if(save){
  const id=save.dataset.save;
  if(savedPicks.has(id)) savedPicks.delete(id); else savedPicks.add(id);
  try{localStorage.setItem('midnight-saved-picks',JSON.stringify([...savedPicks]));}catch{/* In-memory favourites remain usable. */}
  renderCatalog();
  document.querySelector(`[data-save="${id}"]`)?.focus({preventScroll:true});
  notify(savedPicks.has(id)?'Saved for your next late night.':'Removed from your saved picks.');
 }
});
productDialog.querySelector('.product-close').addEventListener('click',()=>productDialog.close());
productDialog.querySelector('.detail-add').addEventListener('click',()=>{addProduct(detailProductId);productDialog.close();});
productDialog.addEventListener('click',event=>{
 if(event.target!==productDialog)return;
 const rect=productDialog.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)productDialog.close();
});
function suggestNight() {
 const mood=document.querySelector('#night-mood').value;
 const people=Number(document.querySelector('#night-people').value);
 const budget=Number(document.querySelector('#night-budget').value);
 const matches=products.filter(product=>product.mood===mood&&product.serves>=people&&product.price<=budget).sort((a,b)=>a.price-b.price);
 const result=document.querySelector('.planner-result');result.replaceChildren();
 if(!matches.length){
  const title=document.createElement('h3');title.textContent='Let’s adjust the plan.';
  const text=document.createElement('p');text.textContent='No single bundle fits this occasion, group size and budget. Try a larger budget, fewer people or a different kind of night.';
  result.append(title,text);return;
 }
 const product=matches[0];
 const title=document.createElement('h3');title.textContent=product.name;
 const text=document.createElement('p');text.textContent=`${money(product.price)} total · ${money(Math.ceil(product.price/people))} per person. ${product.contents.join(' + ')}.`;
 const button=document.createElement('button');button.className='button';button.dataset.detail=product.id;button.textContent='See my pick ↗';
 result.append(title,text,button);
}
if(document.querySelector('#night-planner')){
 ['night-mood','night-people','night-budget'].forEach(id=>document.getElementById(id).addEventListener('change',suggestNight));suggestNight();
}
function updateJourney(){
 if(!document.querySelector('.order-journey'))return;
 const count=Object.values(cart).reduce((sum,qty)=>sum+qty,0);
 document.querySelector('.journey-bag').textContent=count?`${count} ${count===1?'bundle':'bundles'} · ${money(subtotal())}`:'Choose something for the night';
 document.querySelector('.journey-dorm').textContent=form.elements.dorm.value?`Dorm ${form.elements.dorm.value} · ${money(deliveryFees[form.elements.dorm.value])} delivery`:'Select your dorm below';
 document.querySelector('.journey-time').textContent=form.elements.time.value?`${form.elements.time.value} · ${form.elements.quiet.checked?'Quiet knock':'Standard knock'}`:'Choose a night-time slot';
 const steps=document.querySelectorAll('.journey-step');steps[0].classList.toggle('active',count>0);steps[1].classList.toggle('active',Boolean(form.elements.dorm.value));steps[2].classList.toggle('active',Boolean(form.elements.time.value));
}
document.addEventListener('cartupdated',updateJourney);form?.addEventListener('input',updateJourney);form?.addEventListener('change',updateJourney);updateJourney();
const requestedMood=new URLSearchParams(location.search).get('mood');
if(['deadline','hungry','roommates','reset'].includes(requestedMood))setOccasion(requestedMood);
window.addEventListener('storage',event=>{if(event.key==='midnight-saved-picks'){savedPicks=new Set(loadSavedPicks());renderCatalog();}});

// A short, contextual campus-desk form replaces repeated full checkouts.
const desk=document.querySelector('.desk-dialog');
document.querySelector('.open-desk')?.addEventListener('click',()=>desk.showModal());
document.querySelector('.close-desk')?.addEventListener('click',()=>desk.close());
const deskForm=document.querySelector('.desk-form');
if(deskForm) deskForm.addEventListener('submit',event=>{
 event.preventDefault();let valid=true;
 for(const field of deskForm.querySelectorAll('[required]')){
 let error='';const value=field.value.trim();
 if(!value) error='Please complete this field.';
 else if(field.name==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))error='Enter a valid email address.';
 else if(field.name==='name'&&(value.length<2||value.length>60))error='Use 2–60 characters.';
 else if(field.name==='message'&&(value.length<10||value.length>500))error='Write 10–500 characters.';
 field.setAttribute('aria-invalid',String(Boolean(error)));deskForm.querySelector('#desk-'+field.name+'-error').textContent=error;if(error)valid=false;
 }
 if(!valid){deskForm.querySelector('[aria-invalid="true"]').focus();return;}
 deskForm.reset();deskForm.querySelectorAll('[aria-invalid]').forEach(f=>f.removeAttribute('aria-invalid'));
 desk.querySelector('.desk-success').textContent='Demo request completed. Nothing was sent; your details have been cleared.';
});
