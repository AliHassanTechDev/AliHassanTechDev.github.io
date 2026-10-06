// ===============================
// Ali Hassan Tech - Script.js
// ===============================


// 1. Theme Button
var root = document.documentElement;
var themeBtn = document.getElementById("theme");


// Check saved theme
var savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");

    if (themeBtn) {
        themeBtn.textContent = "☀️";
    }
} else {
    root.removeAttribute("data-theme");

    if (themeBtn) {
        themeBtn.textContent = "🌙";
    }
}


// Theme button click
if (themeBtn) {
    themeBtn.addEventListener("click", function () {

        var currentTheme = root.getAttribute("data-theme");

        if (currentTheme === "dark") {

            // Dark → Light
            root.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";

        } else {

            // Light → Dark
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";
        }

    });
}



// ===============================
// 2. Mobile Menu
// ===============================

var menuBtn = document.getElementById("menu");
var nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });


    // Close menu after clicking a link
    var navLinks = nav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            nav.classList.remove("open");
        });

    });

}



// ===============================
// 3. Typing Effect
// ===============================

var typingText = document.getElementById("typing");

if (typingText) {

    var words = [
        "HTML, CSS and JavaScript",
        "responsive websites",
        "web development",
        "real projects"
    ];

    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;


    function typeEffect() {

        var currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex === words.length) {
                    wordIndex = 0;
                }

            }

        }

        setTimeout(typeEffect, deleting ? 50 : 90);
    }


    typeEffect();
}
