const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

// Keep the right edge of the event date exactly aligned with the right edge
// of the word "avisan" at every responsive size.
function alignHeroDateToAvisan() {
  const heading = document.querySelector('.hero h1');
  const date = document.querySelector('.hero .date');
  if (!heading || !date || !heading.firstChild || heading.firstChild.nodeType !== Node.TEXT_NODE) return;

  const range = document.createRange();
  range.selectNodeContents(heading.firstChild);
  const wordRect = range.getBoundingClientRect();
  const headingRect = heading.getBoundingClientRect();
  date.style.width = `${wordRect.right - headingRect.left}px`;
  date.style.marginLeft = '0';
  date.style.textAlign = 'right';
}

window.addEventListener('load', alignHeroDateToAvisan);
window.addEventListener('resize', alignHeroDateToAvisan);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(alignHeroDateToAvisan);
}

// Mobile: visually align the right edge of the date with the right edge of the red "26".
function alignMobileHeroDateTo26() {
  const date = document.querySelector('.hero-lockup .date');
  const num = document.querySelector('.hero-lockup h1 span');
  if (!date || !num) return;
  date.style.transform = '';
  if (window.matchMedia('(max-width: 900px)').matches) {
    const dateRight = date.getBoundingClientRect().right;
    const numRight = num.getBoundingClientRect().right;
    date.style.transform = `translateX(${numRight - dateRight}px)`;
  }
}
window.addEventListener('load', alignMobileHeroDateTo26);
window.addEventListener('resize', alignMobileHeroDateTo26);
