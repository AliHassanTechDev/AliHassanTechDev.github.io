// ================= THEME =================

var root = document.documentElement;
var themeBtn = document.getElementById("theme");

function isDark() {

    var theme = root.getAttribute("data-theme");

    if (theme) {
        return theme === "dark";
    }

    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
}


function updateThemeIcon() {

    if (isDark()) {
        themeBtn.textContent = "🌙";
    } else {
        themeBtn.textContent = "☀️";
    }
}


// Save theme preference

try {

    var savedTheme =
        localStorage.getItem("theme");

    if (savedTheme) {
        root.setAttribute(
            "data-theme",
            savedTheme
        );
    }

} catch (error) {}


// Theme button

themeBtn.addEventListener(
    "click",
    function () {

        var nextTheme =
            isDark()
                ? "light"
                : "dark";

        root.setAttribute(
            "data-theme",
            nextTheme
        );

        try {

            localStorage.setItem(
                "theme",
                nextTheme
            );

        } catch (error) {}

        updateThemeIcon();

    }
);


updateThemeIcon();


// ================= MOBILE MENU =================

var nav =
    document.getElementById("nav");

var menuBtn =
    document.getElementById("menu");


menuBtn.addEventListener(
    "click",
    function () {

        var isOpen =
            nav.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);


// Close menu when a link is clicked

nav.addEventListener(
    "click",
    function () {

        nav.classList.remove("open");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }
);


// ================= TYPING EFFECT =================

var words = [

    "HTML, CSS and JavaScript",

    "responsive websites",

    "web development",

    "real projects"

];


var typingEl =
    document.getElementById(
        "typing-text"
    );


var wordIndex = 0;

var charIndex = 0;

var deleting = false;


var reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


function typeText() {

    var word =
        words[wordIndex];


    // Accessibility:
    // If user prefers reduced motion,
    // don't run animation.

    if (reduceMotion) {

        typingEl.textContent =
            word;

        return;

    }


    typingEl.textContent =
        word.slice(
            0,
            charIndex
        );


    var delay =
        deleting
            ? 45
            : 90;


    // Finished typing

    if (
        !deleting &&
        charIndex === word.length
    ) {

        deleting = true;

        delay = 1400;

    }


    // Finished deleting

    else if (
        deleting &&
        charIndex === 0
    ) {

        deleting = false;

        wordIndex =
            (wordIndex + 1)
            % words.length;

        delay = 400;

    }


    else {

        charIndex +=
            deleting
                ? -1
                : 1;

    }


    setTimeout(
        typeText,
        delay
    );

}


typeText();
