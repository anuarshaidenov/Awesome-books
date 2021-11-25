const sections = document.querySelectorAll('.section');
const links = document.querySelectorAll('.nav__item a');

class Sections {
  constructor(sections, links) {
    this.sections = sections;
    this.links = links;
  }

  #displayCurrent(sectionBooks, sectionAdd, sectionContact) {
    const { hash } = window.location;

    this.links.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add('current');
      } else {
        link.classList.remove('current');
      }
    });

    if (hash === '') {
      this.displaySection(sectionBooks);
    }
    if (hash === '#add') {
      this.displaySection(sectionAdd);
    }
    if (hash === '#contact') {
      this.displaySection(sectionContact);
    }
  }

  displaySection(section) {
    this.sections.forEach((s) => {
      s.classList.add('hidden');
    });

    section.classList.remove('hidden');
  }

  init(sectionBooks, sectionAdd, sectionContact) {
    this.#displayCurrent(sectionBooks, sectionAdd, sectionContact);
    window.addEventListener('hashchange', () => {
      this.#displayCurrent(sectionBooks, sectionAdd, sectionContact);
    });
  }
}

const sectionsEl = new Sections(sections, links);

export default sectionsEl;
