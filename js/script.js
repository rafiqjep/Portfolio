// Greeting ikut masa
const greetingEl = document.getElementById("greeting");
if (greetingEl) {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  greetingEl.textContent = greeting + ", selamat datang ke portfolio saya!";
}

// Tahun semasa automatik
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}