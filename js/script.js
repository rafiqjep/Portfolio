// ===== 1. Greeting based on time of day =====
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const greetingEl = document.getElementById("greeting");
if (greetingEl) {
  greetingEl.textContent = getGreeting() + ", welcome to my portfolio!";
}

// ===== 2. Automatic copyright year =====
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== 3. Typing effect =====
const phrases = [
  "Aspiring Industrial Electronics Technologist",
  "Web Developer in Training",
  "Problem Solver and Lifelong Learner"
];

const typingEl = document.getElementById("typing");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingEl) return;

  const current = phrases[phraseIndex];
  typingEl.textContent = current.substring(0, charIndex);

  let delay = 100;

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    delay = 50;
  } else if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    delay = 1500;
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 500;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// ===== 4. Mobile hamburger menu =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

// ===== 5. Dark / light mode toggle =====
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}