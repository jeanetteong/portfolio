const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-right a");

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