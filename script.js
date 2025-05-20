const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-right a");

const openCtss = document.getElementById('open-ctss');
const openSp = document.getElementById('open-sp');
const openAccenture = document.getElementById('open-accenture');

const modalCtss = document.getElementById('modal-ctss');
const modalSp = document.getElementById('modal-sp');
const modalAccenture = document.getElementById('modal-accenture');

const closeCtss = document.getElementById('close-ctss');
const closeSp = document.getElementById('close-sp');
const closeAccenture = document.getElementById('close-accenture');

const container = document.getElementById('auto-scroll');

//navbar scroll spy
const thresholdValue = window.innerWidth <= 1199 ? 0.4 : 0.5;
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => link.classList.remove("active"));

        const activeLink = document.querySelector(`.navbar-right a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    root: null,
    threshold: thresholdValue,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

//hamburger menu
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navbarRight = document.querySelector('.navbar-right');
  const navLinks = document.querySelectorAll('.navbar-right a');

  function setActiveLink() {
    const currentHash = window.location.hash;

    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    if (currentHash) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
          link.classList.add('active');
        }
      });
    } else {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#home' || link.getAttribute('href') === '/') {
          link.classList.add('active');
        }
      });
    }
  }

  setActiveLink();
  window.addEventListener('hashchange', setActiveLink);

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navbarRight.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navbarRight.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  document.addEventListener('click', function (event) {
    if (!hamburger.contains(event.target) && !navbarRight.contains(event.target)) {
      hamburger.classList.remove('active');
      navbarRight.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
});

//modal
//click content box to open
openCtss.addEventListener('click', () => {
  modalCtss.classList.add('show');
})

openSp.addEventListener('click', () => {
  modalSp.classList.add('show');
})

openAccenture.addEventListener('click', () => {
  modalAccenture.classList.add('show');
})

//click button to close
closeCtss.addEventListener('click', () => {
  modalCtss.classList.remove('show');
})

closeSp.addEventListener('click', () => {
  modalSp.classList.remove('show');
})

closeAccenture.addEventListener('click', () => {
  modalAccenture.classList.remove('show');
})

//click outside to close
modalCtss.addEventListener('click', (e) => {
  if (e.target === modalCtss) {
    modalCtss.classList.remove('show');
  }
});
modalSp.addEventListener('click', (e) => {
  if (e.target === modalSp) {
    modalSp.classList.remove('show');
  }
});
modalAccenture.addEventListener('click', (e) => {
  if (e.target === modalAccenture) {
    modalAccenture.classList.remove('show');
  }
});

//drag and auto scroll pictures
let isDown = false;
let startX;
let scrollLeft;
let scrollInterval;
let isDragging = false;
function cloneImages() {
  const images = Array.from(container.children);
  images.forEach(img => {
    const clone = img.cloneNode(true);
    container.appendChild(clone);
  });
}

// Start auto-scrolling
function startAutoScroll() {
  stopAutoScroll(); // Clear previous
  scrollInterval = setInterval(() => {
    if (!isDragging) {
      container.scrollLeft += 1;
      const scrollMax = container.scrollWidth / 2;
      if (container.scrollLeft >= scrollMax) {
        container.scrollLeft = 0;
      }
    }
  }, 20);
}

function stopAutoScroll() {
  clearInterval(scrollInterval);
}

// Mouse down - start dragging
container.addEventListener('mousedown', (e) => {
  isDown = true;
  isDragging = true;
  stopAutoScroll();
  startX = e.pageX;
  scrollLeft = container.scrollLeft;
  container.style.cursor = 'grabbing';
});

// Mouse up - stop dragging
container.addEventListener('mouseup', () => {
  isDown = false;
  isDragging = false;
  container.style.cursor = 'grab';
  startAutoScroll();
});

// Mouse leave - stop dragging
container.addEventListener('mouseleave', () => {
  if (isDown) {
    isDown = false;
    isDragging = false;
    container.style.cursor = 'grab';
    startAutoScroll();
  }
});

// Drag move
container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = (x - startX) * -1;
  container.scrollLeft = scrollLeft + walk;

  // Looping logic
  const scrollMax = container.scrollWidth / 2;
  if (container.scrollLeft <= 0) {
    container.scrollLeft += scrollMax;
    scrollLeft = container.scrollLeft;
    startX = x;
  } else if (container.scrollLeft >= scrollMax) {
    container.scrollLeft -= scrollMax;
    scrollLeft = container.scrollLeft;
    startX = x;
  }
});

// Disable image dragging for better UX
container.querySelectorAll('img').forEach(img => {
  img.setAttribute('draggable', false);
});

// Init
cloneImages();
startAutoScroll();
container.style.cursor = 'grab';