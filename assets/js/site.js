/* The Serendib Endowment — shared behaviour */

function toggleNav() {
  var d = document.getElementById('navDrawer');
  var b = document.querySelector('.nav-toggle');
  if (!d) return;
  var open = d.classList.toggle('open');
  if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function closeNav() {
  var d = document.getElementById('navDrawer');
  var b = document.querySelector('.nav-toggle');
  if (d) d.classList.remove('open');
  if (b) b.setAttribute('aria-expanded', 'false');
}

/* Accordion (FAQ) */
function toggleAcc(btn) {
  var item = btn.parentElement;
  var body = item.querySelector('.acc-body');
  var isOpen = item.classList.contains('open');
  if (isOpen) {
    item.classList.remove('open');
    body.style.maxHeight = null;
    btn.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* Legacy anchor migration.
   The previous site was a single page. Links already shared by board members and
   donors point at hashes on the root URL. Static hosting cannot issue a 301, so
   these are redirected client-side on arrival. */
(function () {
  var p = window.location.pathname;
  if (!(p === '/' || /\/index\.html$/.test(p))) return;
  var map = {
    '#what-is': 'how-it-works.html',
    '#how-it-works': 'how-it-works.html',
    '#projections': 'projections.html',
    '#impact-calc': 'projections.html#impact',
    '#past-giving': 'what-we-fund.html#track-record',
    '#faq': 'faq.html',
    '#board': 'governance.html#board',
    '#contribute': 'give.html',
    '#commitments': 'give.html#commitments'
  };
  var target = map[window.location.hash];
  if (target) window.location.replace(target);
})();

/* Open an FAQ item if it is linked directly */
document.addEventListener('DOMContentLoaded', function () {
  var hash = window.location.hash;
  if (!hash) return;
  var el = document.querySelector(hash + '.acc-item');
  if (el) {
    var btn = el.querySelector('.acc-btn');
    if (btn) toggleAcc(btn);
  }
});

/* Click-to-play video. The iframe is only created when the visitor presses
   play, so no request reaches YouTube on page load. youtube-nocookie.com is
   used so that playback itself sets no tracking cookies. */
function loadVideo(box) {
  var id = box.getAttribute('data-video');
  var title = box.getAttribute('data-title') || 'Video';
  if (!id) return;
  var frame = document.createElement('iframe');
  frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
  frame.title = title;
  frame.loading = 'lazy';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.allowFullscreen = true;
  frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  box.innerHTML = '';
  box.appendChild(frame);
}
