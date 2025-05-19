const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-right a");

const open_ctss = document.getElementById('open-ctss');
const open_sp = document.getElementById('open-sp');
const open_accenture = document.getElementById('open-accenture');

const modal_ctss = document.getElementById('modal-ctss');
const modal_sp = document.getElementById('modal-sp');
const modal_accenture = document.getElementById('modal-accenture');

const close_ctss = document.getElementById('close-ctss');
const close_sp = document.getElementById('close-sp');
const close_accenture = document.getElementById('close-accenture');

//navbar scroll spy
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
        threshold: 0.5,
    }
);

sections.forEach((section) => {
    observer.observe(section);
});

//modal
//click content box to open
open_ctss.addEventListener('click', () => {
    modal_ctss.classList.add('show');
})

open_sp.addEventListener('click', () => {
    modal_sp.classList.add('show');
})

open_accenture.addEventListener('click', () => {
    modal_accenture.classList.add('show');
})

//click button to close
close_ctss.addEventListener('click', () => {
    modal_ctss.classList.remove('show');
})

close_sp.addEventListener('click', () => {
    modal_sp.classList.remove('show');
})

close_accenture.addEventListener('click', () => {
    modal_accenture.classList.remove('show');
})

//click outside to close
modal_ctss.addEventListener('click', (e) => {
  if (e.target === modal_ctss) {
    modal_ctss.classList.remove('show');
  }
});
modal_sp.addEventListener('click', (e) => {
  if (e.target === modal_sp) {
    modal_sp.classList.remove('show');
  }
});
modal_accenture.addEventListener('click', (e) => {
  if (e.target === modal_accenture) {
    modal_accenture.classList.remove('show');
  }
});