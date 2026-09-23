const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));

    const choice = document.getElementById('bread-choice');
    const qty = document.getElementById('qty');
    const message = document.getElementById('message');
    const status = document.getElementById('copy-status');

    function updateMessage() {
      const count = Number(qty.value);
      const product = choice.value;
      const unit = product.includes('Cinnamon Rolls') ? (count === 1 ? 'order' : 'orders') : (count === 1 ? 'loaf' : 'loaves');
      message.value = `Hi! I’d like to order ${count} ${product} ${unit} from the next available drop.`;
      status.textContent = '';
    }

    document.getElementById('minus').addEventListener('click', () => {
      qty.value = Math.max(1, Number(qty.value) - 1);
      updateMessage();
    });
    document.getElementById('plus').addEventListener('click', () => {
      qty.value = Math.min(6, Number(qty.value) + 1);
      updateMessage();
    });
    choice.addEventListener('change', updateMessage);

    document.querySelectorAll('.bread-row').forEach(row => {
      row.querySelector('.pick').addEventListener('click', () => {
        choice.value = row.dataset.bread;
        document.querySelectorAll('.pick').forEach(button => button.setAttribute('aria-pressed', 'false'));
        row.querySelector('.pick').setAttribute('aria-pressed', 'true');
        updateMessage();
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
      });
    });

    document.getElementById('copy').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(message.value);
        status.textContent = 'Message copied.';
      } catch {
        message.focus();
        message.select();
        const copied = document.execCommand('copy');
        status.textContent = copied ? 'Message copied.' : 'Select the message and copy it.';
      }
    });