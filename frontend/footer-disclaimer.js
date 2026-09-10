(function () {
  var DISCLAIMER_TEXT = 'EverQuest is a registered trademark of Daybreak Game Company LLC. This site is an unofficial fan project, not affiliated with or endorsed by Daybreak.';

  function injectDisclaimer() {
    document.querySelectorAll('.site-footer').forEach(function (footer) {
      if (footer.querySelector('.footer-disclaimer')) return;
      var p = document.createElement('p');
      p.className = 'footer-disclaimer';
      p.textContent = DISCLAIMER_TEXT;
      footer.appendChild(p);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectDisclaimer);
  } else {
    injectDisclaimer();
  }
})();
