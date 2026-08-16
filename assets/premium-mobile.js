/* ЛУНА ПР СНГ · premium mobile layer: tab-bar + прогресс чтения */
(function(){
  'use strict';

  /* линия прогресса чтения */
  var bar = document.createElement('div');
  bar.className = 'pm-progress';
  bar.setAttribute('aria-hidden','true');
  document.body.appendChild(bar);

  /* нижний tab-bar */
  var tabs = [
    ['agency.html','Агентство'],
    ['services.html','Услуги'],
    ['cases.html','Кейсы'],
    ['contacts.html','Контакты']
  ];
  var here = (location.pathname.split('/').pop() || 'index.html');
  var nav = document.createElement('nav');
  nav.className = 'pm-tabbar';
  nav.setAttribute('aria-label','Быстрая навигация');
  tabs.forEach(function(t){
    var a = document.createElement('a');
    a.href = t[0];
    a.textContent = t[1];
    if (here === t[0] || (t[0] === 'services.html' && here.indexOf('service-') === 0)) a.className = 'pm-active';
    nav.appendChild(a);
  });
  document.body.appendChild(nav);

  /* прогресс + скрытие tab-bar при скролле вниз, возврат при скролле вверх */
  var lastY = window.scrollY, ticking = false;
  function onScroll(){
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
    var y = window.scrollY;
    if (y > lastY + 14 && y > 160) nav.classList.add('pm-hide');
    else if (y < lastY - 6 || y < 160) nav.classList.remove('pm-hide');
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if (!ticking){ ticking = true; requestAnimationFrame(onScroll); }
  }, {passive:true});
  onScroll();
})();
