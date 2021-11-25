const menu = document.getElementById('menu');

class MobileMenu {
  constructor(menu) {
    this.menu = menu;
  }

  #closeMenu(btnHamburger, btnClose) {
    btnClose.classList.add('hidden');
    btnHamburger.classList.remove('hidden');
    this.menu.classList.add('translated');
  }

  #openMenu(btnHamburger, btnClose) {
    btnHamburger.classList.add('hidden');
    btnClose.classList.remove('hidden');
    this.menu.classList.remove('translated');
  }

  init(btnHamburger, btnClose, mobileLinks) {
    btnHamburger.addEventListener('click', () => this.#openMenu(btnHamburger, btnClose));
    btnClose.addEventListener('click', () => this.#closeMenu(btnHamburger, btnClose));
    mobileLinks.forEach((link) => link.addEventListener('click', () => this.#closeMenu(btnHamburger, btnClose)));
  }
}

const mobileMenu = new MobileMenu(menu);
export default mobileMenu;
