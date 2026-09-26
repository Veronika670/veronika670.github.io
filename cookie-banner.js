/* Куки-баннер сайта kariernay-kalibrovka.ru
   - показывается один раз, до нажатия «Понятно»
   - ответ хранится в localStorage (ключ kk_cookie_ok) и дублируется в cookie cookie_ok на 1 год
   - счётчики аналитики подключаются в спящем виде:
       <script type="text/plain" data-analytics src="https://..."></script>
       <script type="text/plain" data-analytics>...inline код...</script>
     и оживают только после согласия (window.kkAnalyticsAllowed() === true)
   Подключение: <script src="/cookie-banner.js" defer></script> перед </body> */
(function(){
  var KEY='kk_cookie_ok';
  function stored(){
    try{if(localStorage.getItem(KEY)==='1')return true}catch(e){}
    return /(^|;\s*)cookie_ok=1(;|$)/.test(document.cookie);
  }
  function remember(){
    try{localStorage.setItem(KEY,'1')}catch(e){}
    try{document.cookie='cookie_ok=1; max-age=31536000; path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'')}catch(e){}
  }
  var activated=false;
  function activate(){
    if(activated)return;activated=true;
    var list=document.querySelectorAll('script[type="text/plain"][data-analytics]');
    for(var i=0;i<list.length;i++){
      var old=list[i],s=document.createElement('script');
      if(old.src){s.src=old.src;s.async=true}else{s.text=old.text}
      old.parentNode.replaceChild(s,old);
    }
    document.dispatchEvent(new CustomEvent('kk:analytics-allowed'));
  }
  window.kkAnalyticsAllowed=function(){return stored()};

  if(stored()){activate();return}

  var css='.kk-cookie{position:fixed;left:16px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9000;margin:0 auto;max-width:720px;box-sizing:border-box;padding:16px 18px;border-radius:16px;background:#1c1c22;color:#f2eee5;box-shadow:0 18px 48px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.08) inset;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:14px;line-height:1.5;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px}'
   +'.kk-cookie p{margin:0;flex:1 1 260px}'
   +'.kk-cookie a{color:#f2eee5;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}'
   +'.kk-cookie button{flex:0 0 auto;border:0;border-radius:999px;padding:11px 22px;background:#f2eee5;color:#1c1c22;font:inherit;font-weight:700;cursor:pointer;min-height:44px}'
   +'.kk-cookie button:hover{background:#fff}'
   +'.kk-cookie button:focus-visible,.kk-cookie a:focus-visible{outline:2px solid #e2825d;outline-offset:3px}'
   +'@media(prefers-reduced-motion:no-preference){.kk-cookie{animation:kk-in .5s cubic-bezier(.23,1,.32,1)}@keyframes kk-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}}'
   +'@media(max-width:480px){.kk-cookie{padding:14px 16px;font-size:13px}.kk-cookie button{width:100%}}';

  function mount(){
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var box=document.createElement('div');
    box.className='kk-cookie';box.setAttribute('role','region');box.setAttribute('aria-label','Уведомление о cookie');
    box.innerHTML='<p>Сайт использует cookie для работы и аналитики. <a href="/policy">Подробнее</a></p><button type="button">Понятно</button>';
    box.querySelector('button').addEventListener('click',function(){
      remember();activate();
      box.parentNode&&box.parentNode.removeChild(box);
    });
    document.body.appendChild(box);
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',mount)}else{mount()}
})();
