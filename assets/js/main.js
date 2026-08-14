/*=============== FORCE SCROLL TOP BEFORE ANYTHING ELSE ===============*/
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
});

/*=============== HOME SPLIT TEXT ===============*/
  const { animate, splitText, stagger } = anime;

  const { chars: chars1 } = splitText('.home__profession-1', { chars: true });
  const { chars: chars2 } = splitText('.home__profession-2', { chars: true });

  anime.animate(chars1, {
    y: [
      { to: ['100%', '0%'] },
      { to: '-100%', delay: 4000, ease: 'in(3)' }
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(88),
    loop: true,
  });

  anime.animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(88),
  loop: true,
  });

/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 1400,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('work-active')) return;

    const targetSelector = tab.dataset.target;
    const targetContent = document.querySelector(targetSelector);

    const activeContent = document.querySelector('[data-content].work-active');

    if (activeContent) {
      // Start fade out
      activeContent.classList.add('fade-out');

      // Wait for fade out duration
      setTimeout(() => {
        // Hide all contents and remove fade-out
        tabContents.forEach((content) => {
          content.classList.remove('work-active', 'fade-out');
        });

        // Remove active class from all tabs
        tabs.forEach((t) => t.classList.remove('work-active'));

        // Activate clicked tab
        tab.classList.add('work-active');

        // Start fade-in for new content
        targetContent.classList.add('work-active');
        targetContent.classList.add('fade-out'); // start from 0 opacity
        targetContent.offsetWidth; // force reflow
        targetContent.classList.remove('fade-out'); // triggers fade-in
      }, 300); // match CSS transition
    } else {
      // If no active content, just show immediately
      tab.classList.add('work-active');
      targetContent.classList.add('work-active');
    }
  });
});


/*=============== TITLE TABS ===============*/
function switchTitle(showId, hideId) {
  const show = document.getElementById(showId);
  const hide = document.getElementById(hideId);

  // Fade out current
  hide.classList.add("title__fade-out");

  setTimeout(() => {
    // Fully hide old
    hide.classList.remove("title__fade-out");
    hide.classList.add("title__inactive");

    // Prepare new title for fade-in
    show.classList.remove("title__inactive");
    show.classList.add("title__fade-out"); // start invisible
    show.offsetWidth; // force reflow
    show.classList.remove("title__fade-out"); // triggers fade-in
  }, 300); // match CSS transition
}

function educationButton() {
  switchTitle("education2", "work2");
}

function experienceButton() {
  switchTitle("work2", "education2");
}


/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button');

servicesButtons.forEach(button => {
  // Add your height to services info
  const heightInfo = document.querySelector('.services__info');
  heightInfo.style.height = heightInfo.scrollHeight + 'px';

  button.addEventListener('click', () => {
    const servicesCards = document.querySelectorAll('.services__card'),
          currentCard = button.parentNode,
          currentInfo = currentCard.querySelector('.services__info'),
          isCardOpen = currentCard.classList.contains('services-open');

    // Close all other services info
    servicesCards.forEach(card => {
      card.classList.replace('services-open', 'services-close');

      const info = card.querySelector('.services__info')
            info.style.height = '0';
    });

    // Open only if not already open
    if (!isCardOpen) {
      currentCard.classList.replace('services-close', 'services-open');
      currentInfo.style.height = currentInfo.scrollHeight + 'px';
    };
  });
});


/*=============== SEND EMAIL IN CONTACT ===============*/
document.getElementById("contact-btn").onclick = function () {
  window.location.href = "mailto:dionusisgeorgantopoulos@gmail.com";
};

/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear();

textYear.textContent = currentYear;

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;
  const isLargeScreen = window.innerWidth > 1150; // large screen condition

  sections.forEach(section => {
    const id = section.id,
          top = section.offsetTop - 50,
          height = section.offsetHeight,
          link = document.querySelector('.nav__menu a[href*=' + id + ']');

    if (!link) return;

    let condition;

    if (id === "contact") {
      if (isLargeScreen) {
        condition = windowHeight + scrollY >= documentHeight - 150;
      } else {
        condition = scrollY > top && scrollY <= top + height;
      }
    } else {
      condition = scrollY > top && scrollY <= top + height;
    }

    link.classList.toggle('active-link', condition);
  });
};

window.addEventListener('scroll', scrollActive);

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0 // Store mouse position

const cursorMove = () => {
  // Position the cursor
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
  cursor.style.transform = 'translate(-45%, -45%)';

  // Update the cursor animation
  requestAnimationFrame(cursorMove);
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

cursorMove();

/* Hide custom cursor on certain areas */
const a = document.querySelectorAll('a');
const button = document.querySelectorAll('button');
const dion = document.querySelectorAll('.footer__copy span');
const tooltip = document.querySelectorAll('.info__tooltip');
const topbutton = document.querySelectorAll('.top__button');
const container = document.querySelectorAll('.reload__container');


a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor');
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor');
  })
});

button.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor');
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor');
  })
});

tooltip.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor');
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor');
  })
});

dion.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor');
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor');
  })
});

topbutton.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor');
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor');
  })
});

container.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor');
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor');
  })
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '0px',
  duration: 2000,
  delay: 300,
  reset: false
});

// Reveal main sections (without titles)
sr.reveal(
  `.home__image, 
   .projects__container, 
   .work__container,
   .technologies__content,
   .contact__container`
);

// Reveal home data with custom delays
sr.reveal(`.home__data`, { delay: 900, origin: 'bottom', distance: '60px' });
sr.reveal(`.home__info`, { delay: 1200, origin: 'bottom', distance: '60px' });
sr.reveal(`.home__social, .home__cv`, { delay: 1500 });

// Reveal about section elements
sr.reveal(`.about__data`, { origin: 'left', distance: '60px', threshold: 0.5 });
sr.reveal(`.about__image`, { origin: 'right', distance: '60px', threshold: 0.5 });

// Reveal service cards one by one
sr.reveal(`.services__card`, { interval: 100, distance: '60px' });


/*=============== RELOAD ANIMATION ===============*/
const navEntries = performance.getEntriesByType("navigation");

if (navEntries.length > 0 && (navEntries[0].type === "reload" || navEntries[0].type === "navigate")) {

  // Disable scrolling
  document.body.style.overflow = "hidden";

  const container = document.getElementById("reload-container");
  const logo = document.getElementById("logo-image");
  const main = document.getElementById("mainContent");

  container.style.display = "flex";

  setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        logo.style.opacity = 1;
      });
    });
  }, 100);

  setTimeout(() => {
    logo.style.opacity = 0;

    setTimeout(() => {
      container.style.opacity = 0;
      main.style.visibility = "visible";
    }, 450);

    setTimeout(() => {
      container.style.display = "none";

      // Re-enable scrolling
      document.body.style.overflow = "";

    }, 1000);

  }, 900);

  // Restore scroll restoration behavior after scroll-to-top
  setTimeout(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
  }, 500);
}

/*=============== SKIP TO TOP BUTTON ===============*/
const topButton = document.querySelector(".top__button");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topButton.classList.add("show");
  } else {
    topButton.classList.remove("show");
  }
});

// Scroll to Top
document.querySelector('.top__button').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});