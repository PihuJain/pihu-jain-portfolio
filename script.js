const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation?.classList.toggle('open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

// Sticker board: pointer drag works with mouse and touch. Arrow keys provide
// a keyboard alternative. Positions reset naturally when the page is reloaded.
document.querySelectorAll('.sticker').forEach((sticker) => {
  let drag = null;

  sticker.addEventListener('pointerdown', (event) => {
    drag = { x: event.clientX, y: event.clientY, left: sticker.offsetLeft, top: sticker.offsetTop };
    sticker.classList.add('dragging');
    sticker.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  sticker.addEventListener('pointermove', (event) => {
    if (!drag) return;
    const board = sticker.parentElement;
    const maxLeft = Math.max(0, board.clientWidth - sticker.offsetWidth);
    const maxTop = Math.max(0, board.clientHeight - sticker.offsetHeight);
    sticker.style.left = `${Math.min(maxLeft, Math.max(0, drag.left + event.clientX - drag.x))}px`;
    sticker.style.top = `${Math.min(maxTop, Math.max(0, drag.top + event.clientY - drag.y))}px`;
    sticker.style.right = 'auto';
    sticker.style.bottom = 'auto';
  });

  const stopDrag = () => {
    drag = null;
    sticker.classList.remove('dragging');
  };
  sticker.addEventListener('pointerup', stopDrag);
  sticker.addEventListener('pointercancel', stopDrag);

  sticker.addEventListener('keydown', (event) => {
    const steps = { ArrowUp: [0, -10], ArrowDown: [0, 10], ArrowLeft: [-10, 0], ArrowRight: [10, 0] };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    const board = sticker.parentElement;
    const left = sticker.offsetLeft + step[0];
    const top = sticker.offsetTop + step[1];
    sticker.style.left = `${Math.min(board.clientWidth - sticker.offsetWidth, Math.max(0, left))}px`;
    sticker.style.top = `${Math.min(board.clientHeight - sticker.offsetHeight, Math.max(0, top))}px`;
    sticker.style.right = 'auto';
    sticker.style.bottom = 'auto';
  });
});
