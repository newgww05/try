// VELCURA site scripts — no dependencies
(function () {
  // Mobile menu
  var t = document.querySelector('.menu-toggle'), n = document.querySelector('nav.main');
  if (t && n) t.addEventListener('click', function () {
    n.classList.toggle('open');
    t.setAttribute('aria-expanded', n.classList.contains('open'));
  });

  // Reveal on scroll + animate bars
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.bar-fill[data-w]').forEach(function (b) { b.style.width = b.dataset.w + '%'; });
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.rv').forEach(function (el) {
    if (io) io.observe(el); else {
      el.classList.add('in');
      el.querySelectorAll('.bar-fill[data-w]').forEach(function (b) { b.style.width = b.dataset.w + '%'; });
    }
  });

  // Unit toggle (in / cm) for spec tables
  document.querySelectorAll('.unit-toggle').forEach(function (tg) {
    var target = document.getElementById(tg.dataset.target);
    tg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        tg.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        target.querySelectorAll('[data-in]').forEach(function (c) {
          c.textContent = b.dataset.unit === 'cm' ? c.dataset.cm : c.dataset.in;
        });
      });
    });
  });

  // Cost calculator
  var calc = document.getElementById('calc');
  if (calc) {
    var ids = ['changes', 'dispPrice', 'reuPrice', 'reuQty', 'wash', 'years'];
    var L = {
      en: { changes: ' / day', reuQty: ' pads', years: ' year(s)', lower: '% lower total cost', cheaper: 'Disposable is cheaper at these inputs', be: function (c, d) { return c + ' changes (≈ ' + d + ' days)'; }, na: 'n/a' },
      de: { changes: ' / Tag', reuQty: ' Unterlagen', years: ' Jahr(e)', lower: ' % geringere Gesamtkosten', cheaper: 'Bei diesen Werten ist Einweg günstiger', be: function (c, d) { return c + ' Wechsel (≈ ' + d + ' Tage)'; }, na: 'k. A.' },
      fr: { changes: ' / jour', reuQty: ' alèses', years: ' an(s)', lower: ' % de coût total en moins', cheaper: 'Le jetable est moins cher avec ces valeurs', be: function (c, d) { return c + ' changes (≈ ' + d + ' jours)'; }, na: 'n/d' },
      ja: { changes: ' 回/日', reuQty: ' 枚', years: ' 年', lower: '% 総コスト削減', cheaper: 'この条件では使い捨てのほうが安くなります', be: function (c, d) { return c + ' 回（約 ' + d + ' 日）'; }, na: '該当なし' },
      zh: { changes: ' 次/天', reuQty: ' 张', years: ' 年', lower: '% 总成本降低', cheaper: '在这些条件下一次性产品更便宜', be: function (c, d) { return c + ' 次更换（约 ' + d + ' 天）'; }, na: '不适用' }
    };
    var T = L[(document.documentElement.lang || 'en').slice(0, 2)] || L.en;
    var fmt = function (v) { return '$' + Math.round(v).toLocaleString('en-US'); };
    var run = function () {
      var v = {};
      ids.forEach(function (id) {
        var el = document.getElementById(id); v[id] = parseFloat(el.value);
        var o = document.querySelector('output[for="' + id + '"]');
        if (o) o.textContent = el.dataset.prefix ? el.dataset.prefix + v[id].toFixed(el.step < 1 ? 2 : 0) : v[id] + (T[id] || el.dataset.suffix || '');
      });
      var uses = v.changes * 365 * v.years;
      var disp = uses * v.dispPrice;
      // reusable: each pad rated 300 washes -> replacement sets as needed
      var sets = Math.max(1, Math.ceil(uses / (v.reuQty * 300)));
      var reu = sets * v.reuQty * v.reuPrice + uses * v.wash;
      var save = disp - reu;
      var be = v.reuQty * v.reuPrice / Math.max(0.01, (v.dispPrice - v.wash));
      document.getElementById('rDisp').textContent = fmt(disp);
      document.getElementById('rReu').textContent = fmt(reu);
      document.getElementById('rSave').textContent = save > 0 ? fmt(save) : '—';
      document.getElementById('rPct').textContent = save > 0 ? Math.round(save / disp * 100) + T.lower : T.cheaper;
      document.getElementById('rBe').textContent = v.dispPrice > v.wash ? T.be(Math.ceil(be), Math.ceil(be / v.changes)) : T.na;
      document.getElementById('rWaste').textContent = Math.round(uses * 0.07) + ' kg';
    };
    ids.forEach(function (id) { document.getElementById(id).addEventListener('input', run); });
    run();
  }

  // RFQ form (static site: compose an email; replace with your CRM endpoint)
  var f = document.getElementById('rfq');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!f.reportValidity()) return;
    var d = new FormData(f), lines = [];
    d.forEach(function (val, key) { if (val) lines.push(key + ': ' + val); });
    var body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:info@velcura.top?subject=' + encodeURIComponent('RFQ – Washable Underpads – ' + (d.get('Company') || '')) + '&body=' + body;
    document.querySelector('.form-ok').style.display = 'block';
  });

  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
