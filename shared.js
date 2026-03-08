// ── CURSOR
const dot=document.getElementById('cDot'),ring=document.getElementById('cRing');
if(dot&&ring){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function animRing(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
}

// ── NAV STICKY
const nav=document.getElementById('nav');
if(nav){window.addEventListener('scroll',()=>nav.classList.toggle('sticky',scrollY>50),{passive:true});}

// ── ACTIVE NAV LINK
(function(){
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path||(path===''&&href==='index.html')||(path==='index.html'&&href==='index.html'))
      a.classList.add('on');
  });
})();

// ── MOBILE MENU
const mv=document.getElementById('mVeil'),md=document.getElementById('mDrawer');
function openMob(){if(mv&&md){mv.classList.add('on');md.classList.add('on');document.body.style.overflow='hidden';}}
function closeMob(){if(mv&&md){mv.classList.remove('on');md.classList.remove('on');document.body.style.overflow='';}}

// ── MARQUEE BUILD
(function(){
  const t=document.getElementById('mqTrack');
  if(!t)return;
  const items=['Abertura de Empresa','Contabilidade Mensal','Planejamento Tributário','Folha de Pagamento','Simples Nacional','Lucro Presumido','Holdings Patrimoniais','SPEs e Consórcios','Certidões Negativas','Registro de Marca INPI','Certificado Digital','Compliance Regulatório','Departamento Pessoal','Lucro Real','Atuação Nacional'];
  const all=[...items,...items,...items];
  t.innerHTML=all.map(s=>`<span class="mq-item"><span class="mq-dot"></span>${s}</span>`).join('');
})();

// ── SCROLL REVEAL
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});
},{threshold:.07,rootMargin:'0px 0px -32px 0px'});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// ── FAQ
function faqToggle(btn){
  const item=btn.parentElement;
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!wasOpen)item.classList.add('open');
}

// ── FEE TABS
function showTab(idx){
  document.querySelectorAll('.fee-tab').forEach((t,i)=>t.classList.toggle('on',i===idx));
  document.querySelectorAll('.fee-panel').forEach((p,i)=>p.classList.toggle('on',i===idx));
}

// ── FORM
function sendForm(e){
  e.preventDefault();
  const btn=e.target.querySelector('button[type="submit"]');
  btn.textContent='Enviado — retorno em até 24h.';
  btn.style.background='#166534';btn.style.color='#fff';btn.disabled=true;
  setTimeout(()=>{window.open('https://wa.me/5531986220107?text='+encodeURIComponent('Olá, preenchi o formulário do site e gostaria do diagnóstico gratuito.'),'_blank');},900);
}
function prepareForm(e){
  // Monta o assunto: "Nome - Porte + Natureza"
  const form = e.target;
  const nome   = (form.querySelector('[name="Nome"]')||{}).value || '';
  const porte  = (form.querySelector('[name="Porte da Empresa"]')||{}).value || '';
  const nat    = (form.querySelector('[name="Natureza Jurídica"]')||{}).value || '';
  const partes = [porte, nat].filter(Boolean).join(' + ');
  const assunto = nome ? (partes ? nome+' — '+partes : nome) : (partes || 'Novo contato pelo site');
  const subField = document.getElementById('fSubject');
  if(subField) subField.value = assunto;
  // Deixar o form submeter normalmente (POST ao FormSubmit)
  return true;
}

// ── TESTIMONIAL SLIDER
(function(){
  const track=document.getElementById('tstTrack');
  if(!track)return;
  const cards=[...track.children];
  const dotsWrap=document.getElementById('tstDots');
  let cur=0;
  const perView=()=>window.innerWidth<768?1:window.innerWidth<900?2:3;
  const maxIdx=()=>Math.max(0,cards.length-perView());

  function update(){
    const w=track.parentElement.offsetWidth;
    const gap=24;
    const pv=perView();
    const cardW=(w-(gap*(pv-1)))/pv;
    track.style.transform=`translateX(-${cur*(cardW+gap)}px)`;
    if(dotsWrap){
      dotsWrap.innerHTML='';
      const total=Math.ceil(cards.length/pv);
      for(let i=0;i<total;i++){
        const d=document.createElement('div');
        d.className='tst-dot'+(i===Math.floor(cur/pv)?' on':'');
        d.onclick=()=>{cur=i*pv;cur=Math.min(cur,maxIdx());update();};
        dotsWrap.appendChild(d);
      }
    }
  }
  window.tsPrev=()=>{cur=Math.max(0,cur-1);update();};
  window.tsNext=()=>{cur=Math.min(maxIdx(),cur+1);update();};
  window.addEventListener('resize',update);
  update();
})();
