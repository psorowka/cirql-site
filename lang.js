/* Site-wide DE/EN switch. Content blocks carry class "en" or "de". */
(function () {
  var d = document.documentElement, KEY = 'cirql-lang';
  function initial() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'de' || q === 'en') return q;
    try { var s = localStorage.getItem(KEY); if (s === 'de' || s === 'en') return s; } catch (e) {}
    return (navigator.language || '').slice(0, 2).toLowerCase() === 'de' ? 'de' : 'en';
  }
  function apply(l, save) {
    d.setAttribute('data-lang', l); d.lang = l;
    if (save) { try { localStorage.setItem(KEY, l); } catch (e) {} }
    var t = document.querySelector('title');
    if (t && t.getAttribute('data-' + l)) document.title = t.getAttribute('data-' + l);
    var bs = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < bs.length; i++) {
      var on = bs[i].getAttribute('data-set-lang') === l;
      bs[i].classList.toggle('on', on); bs[i].setAttribute('aria-pressed', on);
    }
  }
  apply(initial(), false);
  document.addEventListener('DOMContentLoaded', function () {
    apply(d.getAttribute('data-lang'), false);
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-set-lang]');
      if (b) apply(b.getAttribute('data-set-lang'), true);
    });
  });
})();
