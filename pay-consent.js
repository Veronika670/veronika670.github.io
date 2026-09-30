/* Кнопка «Купить» активна только после галочки согласия на обработку ПДн.
   Тот же код, что инлайном на kurs.html (26.09). Вынесен в файл 30.09 для
   programma.html, где инлайн-скриптов нет. Логика не менялась. */
(function(){
  var boxes=[].slice.call(document.querySelectorAll('.js-pay-consent'));
  var btns=[].slice.call(document.querySelectorAll('.js-pay-btn'));
  if(!boxes.length||!btns.length)return;
  function apply(on){
    boxes.forEach(function(b){b.checked=on});
    btns.forEach(function(a){if(on){a.removeAttribute('aria-disabled');a.removeAttribute('tabindex')}else{a.setAttribute('aria-disabled','true');a.setAttribute('tabindex','-1')}});
  }
  boxes.forEach(function(b){b.addEventListener('change',function(){apply(b.checked)})});
  btns.forEach(function(a){a.addEventListener('click',function(e){
    if(a.getAttribute('aria-disabled')!=='true')return;
    e.preventDefault();
    var lab=a.parentNode.querySelector('.pay-consent');
    if(lab){lab.classList.add('hint');setTimeout(function(){lab.classList.remove('hint')},1400)}
  })});
  apply(false);
})();
