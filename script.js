// Toggle Navbar for mobile view
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

// Optional: Smooth Scroll for anchor links
const smoothScrollLinks = document.querySelectorAll("a[href^='#']");
smoothScrollLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        document.querySelector(targetId).scrollIntoView({
            behavior: "smooth"
        });
    });
});
