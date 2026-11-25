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

  // ===== Inquiry form -> velcura.top inquiry Worker (Cloudflare Email Routing), same as the original site =====
  // Sends straight to info@velcura.top. If the service can't be reached, falls back to the visitor's email app.
  var f = document.getElementById('rfq');
  if (f) (function () {
    var ENDPOINT = 'https://inquiry.velcura.top', INBOX = 'info@velcura.top';
    var lang = (document.documentElement.lang || 'en').slice(0, 2);
    var M = {
      en: { req: 'Please complete the required fields (*).', mail: 'Please enter a valid email address.', tel: 'Please enter a valid phone number, including country code.', sending: 'Sending…', ok: 'Thank you – your inquiry has been sent. We will reply within one business day.', fb: 'Our form service is not reachable right now. We have opened your email app with your inquiry filled in – or <a href="{h}">click here</a> to send it to ' + INBOX + '.' },
      de: { req: 'Bitte füllen Sie die Pflichtfelder (*) aus.', mail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', tel: 'Bitte geben Sie eine gültige Telefonnummer mit Ländervorwahl ein.', sending: 'Wird gesendet…', ok: 'Vielen Dank – Ihre Anfrage wurde gesendet. Wir antworten innerhalb eines Werktags.', fb: 'Unser Formulardienst ist gerade nicht erreichbar. Ihr E-Mail-Programm wurde mit Ihrer Anfrage geöffnet – oder <a href="{h}">klicken Sie hier</a>, um sie an ' + INBOX + ' zu senden.' },
      fr: { req: 'Veuillez remplir les champs obligatoires (*).', mail: 'Veuillez saisir une adresse e-mail valide.', tel: 'Veuillez saisir un numéro de téléphone valide, avec l\u2019indicatif du pays.', sending: 'Envoi…', ok: 'Merci – votre demande a été envoyée. Nous répondons sous un jour ouvré.', fb: 'Notre service de formulaire est momentanément indisponible. Votre messagerie s\u2019est ouverte avec votre demande – ou <a href="{h}">cliquez ici</a> pour l\u2019envoyer à ' + INBOX + '.' },
      ja: { req: '必須項目（*）をご入力ください。', mail: '有効なメールアドレスをご入力ください。', tel: '国番号を含む有効な電話番号をご入力ください。', sending: '送信中…', ok: 'ありがとうございます。お問い合わせを送信しました。1営業日以内にご返信します。', fb: '現在フォームを送信できません。お問い合わせ内容を入れたメールソフトを開きました。<a href="{h}">こちらをクリック</a>して ' + INBOX + ' へ送信することもできます。' },
      zh: { req: '请填写所有必填项（*）。', mail: '请输入有效的邮箱地址。', tel: '请输入有效的电话号码（含国家区号）。', sending: '正在发送…', ok: '谢谢！您的询盘已发送，我们将在一个工作日内回复。', fb: '表单服务暂时无法连接，已为您打开邮件程序并填好询盘内容；也可<a href="{h}">点击这里</a>发送到 ' + INBOX + '。' }
    }, T = M[lang] || M.en;
    var msg = document.getElementById('form-msg'), btn = f.querySelector('button[type="submit"]'), btnHTML = btn.innerHTML, timer;
    function el(n) { return f.elements[n]; }
    function clearOk() { if (msg.classList.contains('success')) { msg.className = 'full form-msg'; msg.textContent = ''; } }
    f.addEventListener('input', clearOk);
    f.querySelectorAll('[required]').forEach(function (x) { x.addEventListener('input', function () { x.classList.remove('invalid'); }); });
    function payload() {
      var sizes = [];
      f.querySelectorAll('.chips input:checked').forEach(function (c) { sizes.push(c.parentNode.textContent.trim()); });
      var bt = el('btype') ? el('btype').value : '';
      return { name: el('name').value.trim(), company: el('company').value.trim(), email: el('email').value.trim(), country: el('country').value.trim(),
        phone: el('phone').value.trim(), product: 'Washable underpads' + (bt ? ' – ' + bt : ''), sku: sizes.join(', '), quantity: el('quantity').value.trim(),
        message: el('message').value.trim() + '\n\nBusiness type: ' + bt + '\nSizes: ' + (sizes.join(', ') || '-') + '\nSite language: ' + lang,
        website: el('website').value.trim(), sourcePage: location.href };
    }
    function fallback(d) {
      var body = ['Name: ' + d.name, 'Company: ' + d.company, 'Email: ' + d.email, 'Country / market: ' + d.country, 'Phone / WhatsApp: ' + d.phone, 'Product: ' + d.product, 'Sizes: ' + d.sku, 'Quantity: ' + d.quantity, '', d.message].join('\n');
      var h = 'mailto:' + INBOX + '?subject=' + encodeURIComponent('Inquiry from velcura.top – ' + d.name) + '&body=' + encodeURIComponent(body);
      msg.className = 'full form-msg error'; msg.innerHTML = T.fb.replace('{h}', h); location.href = h;
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null, email = el('email'), phone = el('phone');
      var telOk = function (v) { return /^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, '').length >= 6; };
      f.querySelectorAll('[required]').forEach(function (x) {
        var v = x.value.trim();
        var bad = !v || (x === email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || (x === phone && !telOk(v));
        x.classList.toggle('invalid', bad); if (bad && !first) first = x;
      });
      if (first) { msg.className = 'full form-msg error'; msg.textContent = first === email && email.value.trim() ? T.mail : first === phone && phone.value.trim() ? T.tel : T.req; first.focus(); return; }
      var d = payload();
      btn.disabled = true; btn.textContent = T.sending; msg.className = 'full form-msg'; msg.textContent = '';
      var ctrl = window.AbortController ? new AbortController() : null, t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
      fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d), signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json().then(function (j) { return r.ok && j && j.ok; }); })
        .then(function (ok) {
          if (ok) { msg.className = 'full form-msg success'; msg.textContent = T.ok; f.reset(); clearTimeout(timer); timer = setTimeout(clearOk, 180000); }
          else fallback(d);
        })
        .catch(function () { fallback(d); })
        .then(function () { clearTimeout(t); btn.disabled = false; btn.innerHTML = btnHTML; });
    });
  })();

  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();

// Language dropdown: click to open/close, click outside or Esc to close
(function () {
  var dd = document.querySelector('.lang-dd'); if (!dd) return;
  var btn = dd.querySelector('.lang-btn');
  function set(open) { dd.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); set(!dd.classList.contains('open')); });
  document.addEventListener('click', function (e) { if (!dd.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
