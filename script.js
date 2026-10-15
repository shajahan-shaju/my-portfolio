
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Typing effect in the hero
  var el = document.getElementById('typed');
  var roles = ['Python Developer', 'Backend Engineer', 'API Builder', 'Automation Fan'];
  var r = 0, c = 0, del = false;
  function tick() {
    var word = roles[r];
    el.textContent = word.slice(0, c);
    if (!del && c < word.length) { c++; setTimeout(tick, 90); }
    else if (!del) { del = true; setTimeout(tick, 1400); }
    else if (c > 0) { c--; setTimeout(tick, 45); }
    else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
  }
  if (el && !reduce) tick();

  // 2. Scroll reveal + active nav link
  var links = document.querySelectorAll('nav ul a');
  if ('IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('show'); reveal.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('section .wrap').forEach(function (w) {
      w.classList.add('reveal');
      reveal.observe(w);
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });
  }

  // 3. Copy email button
  var btn = document.getElementById('copy');
  var email = 'you@example.com';
  btn.addEventListener('click', function () {
    function done() {
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = 'Copy Email'; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, function () { btn.textContent = email; });
    } else {
      btn.textContent = email;
    }
  });

  // 4. Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
