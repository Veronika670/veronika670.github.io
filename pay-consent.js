/* Кнопка «Купить» активна только после галочки согласия на обработку ПДн.
   30.09.2026: плюс необязательное поле почты рядом с кнопкой (.js-pay-email):
   заполнено и похоже на адрес - подставляется в ссылку как ?email=, и после
   оплаты человеку уходит письмо со входом (bot/course_mail.py). Пусто - ссылка
   без почты, всё как раньше. Не похоже на адрес - подсветка, переход не идёт.
   Общий файл для kurs.html и programma.html. */
(function(){
  var boxes=[].slice.call(document.querySelectorAll('.js-pay-consent'));
  var btns=[].slice.call(document.querySelectorAll('.js-pay-btn'));
  if(!boxes.length||!btns.length)return;
  var EMAIL_RE=/^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  function apply(on){
    boxes.forEach(function(b){b.checked=on});
    btns.forEach(function(a){if(on){a.removeAttribute('aria-disabled');a.removeAttribute('tabindex')}else{a.setAttribute('aria-disabled','true');a.setAttribute('tabindex','-1')}});
  }
  function flash(el){if(!el)return;el.classList.add('hint');setTimeout(function(){el.classList.remove('hint')},1400)}
  function baseHref(a){return (a.getAttribute('href')||'').split('?')[0]}
  boxes.forEach(function(b){b.addEventListener('change',function(){apply(b.checked)})});
  btns.forEach(function(a){a.addEventListener('click',function(e){
    var box=a.parentNode;
    if(a.getAttribute('aria-disabled')==='true'){
      e.preventDefault();
      flash(box.querySelector('.pay-consent'));
      return;
    }
    var field=box.querySelector('.js-pay-email');
    var v=field?field.value.trim():'';
    if(!v){a.setAttribute('href',baseHref(a));return}
    if(v.length>254||!EMAIL_RE.test(v)){
      e.preventDefault();
      flash(box.querySelector('.pay-email'));
      field.focus();
      return;
    }
    a.setAttribute('href',baseHref(a)+'?email='+encodeURIComponent(v));
  })});
  apply(false);
})();
