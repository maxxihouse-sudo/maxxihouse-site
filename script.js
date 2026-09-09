document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '70px';
    nav.style.right = '20px';
    nav.style.background = '#fff';
    nav.style.padding = '15px';
    nav.style.boxShadow = '0 4px 15px rgba(0,0,0,.1)';
    nav.style.borderRadius = '8px';
  });

  // Accordion FAQ
  document.querySelectorAll('.accordion-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const body = btn.nextElementSibling;
      const isOpen = body.style.maxHeight;
      document.querySelectorAll('.accordion-body').forEach(b => b.style.maxHeight = null);
      if (!isOpen) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
});
