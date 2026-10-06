// ===== Theme (light/dark, remembers your choice) =====
var root = document.documentElement;
var themeBtn = document.getElementById("theme");

function currentTheme() {
  return root.getAttribute("data-theme") || "light";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

var startTheme = null;
try { startTheme = localStorage.getItem("theme"); } catch (e) {}
if (!startTheme) {
  startTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
applyTheme(startTheme);

themeBtn.addEventListener("click", function () {
  var next = currentTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ===== Mobile menu =====
var nav = document.getElementById("nav");
var menuBtn = document.getElementById("menu");

menuBtn.addEventListener("click", function () {
  var open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

nav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// ===== Typing text in hero =====
var words = ["HTML & CSS", "JavaScript", "responsive websites", "web development"];
var typingEl = document.getElementById("typing-text");
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var w = 0, c = 0, deleting = false;

function type() {
  var word = words[w];
  typingEl.textContent = word.slice(0, c);
  var delay = deleting ? 45 : 90;

  if (!deleting && c === word.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && c === 0) {
    deleting = false;
    w = (w + 1) % words.length;
    delay = 400;
  } else {
    c += deleting ? -1 : 1;
  }
  setTimeout(type, delay);
}

if (typingEl && !reduceMotion) {
  type();
}

// Contact form: sent by Formspree (action in index.html), so no JS needed.
