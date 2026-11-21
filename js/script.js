// ===== 1. Greeting based on time of day (index) =====
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

// ===== 2. Automatic copyright year (all pages) =====
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== 3. Typing effect (index) =====
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

// ===== 4. Mobile hamburger menu (all pages) =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

// ===== 5. Dark / light mode toggle (all pages) =====
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// ===== 6. Read more toggle (about) =====
const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

if (readMoreBtn && moreText) {
  readMoreBtn.addEventListener("click", () => {
    const isHidden = moreText.classList.toggle("hidden");
    readMoreBtn.textContent = isHidden ? "Read more" : "Show less";
  });
}

// ===== 7. Skill tabs and animated skill bars (skills) =====
const tabBtns = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll(".tab-panel");

// Animate bars inside one panel, starting from 0%
function animateBars(panel) {
  if (!panel) return;
  panel.querySelectorAll(".skill-fill").forEach((bar) => {
    bar.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = bar.dataset.level + "%";
      });
    });
  });
}

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    tabPanels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.id !== btn.dataset.tab);
    });

    animateBars(document.getElementById(btn.dataset.tab));
  });
});

if (tabPanels.length > 0) {
  animateBars(document.querySelector(".tab-panel:not(.hidden)"));
}

// ===== 8. Project filter and modal (projects) =====
const filterBtns = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

const modal = document.getElementById("projectModal");

if (modal) {
  const modalTitle = document.getElementById("modalTitle");
  const modalProblem = document.getElementById("modalProblem");
  const modalRole = document.getElementById("modalRole");
  const modalTools = document.getElementById("modalTools");
  const modalOutcome = document.getElementById("modalOutcome");
  const modalLink = document.getElementById("modalLink");
  const modalClose = document.getElementById("modalClose");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Links starting with # scroll to a section on this page instead of opening the popup
      if (card.dataset.link.startsWith("#")) {
        document.querySelector(card.dataset.link).scrollIntoView({ behavior: "smooth" });
        return;
      }

      modalTitle.textContent = card.dataset.title;
      modalProblem.textContent = card.dataset.problem;
      modalRole.textContent = card.dataset.role;
      modalTools.textContent = card.dataset.tools;
      modalOutcome.textContent = card.dataset.outcome;
      modalLink.href = card.dataset.link;
      modal.classList.remove("hidden");
    });
  });

  modalClose.addEventListener("click", () => modal.classList.add("hidden"));

  // Close when clicking outside the box
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Close with the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
  });
}

// ===== 9. Contact form validation (contact) =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const successMsg = document.getElementById("successMsg");

  const rules = [
    {
      id: "name",
      check: (v) => v.length >= 2,
      message: "Name must be at least 2 characters."
    },
    {
      id: "email",
      check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Please enter a valid email address."
    },
    {
      id: "subject",
      check: (v) => v.length >= 3,
      message: "Subject must be at least 3 characters."
    },
    {
      id: "message",
      check: (v) => v.length >= 10,
      message: "Message must be at least 10 characters."
    }
  ];

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;

    rules.forEach((rule) => {
      const input = document.getElementById(rule.id);
      const errorEl = document.getElementById(rule.id + "Error");
      const value = input.value.trim();
      const isValid = rule.check(value);

      input.classList.toggle("invalid", !isValid);
      errorEl.textContent = isValid ? "" : rule.message;

      if (!isValid) allValid = false;
    });

    if (allValid) {
      successMsg.classList.remove("hidden");
      contactForm.reset();
    } else {
      successMsg.classList.add("hidden");
    }
  });

  // Clear error as the user starts typing again
  rules.forEach((rule) => {
    const input = document.getElementById(rule.id);
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
      document.getElementById(rule.id + "Error").textContent = "";
    });
  });
}

// ===== 10. Interactive web calculator (projects page) =====
const calcGrid = document.querySelector(".calc-grid");
const calcExpressionEl = document.getElementById("calcExpression");
const calcResultEl = document.getElementById("calcResult");

if (calcGrid && calcExpressionEl && calcResultEl) {
  let expression = "";
  const MAX_LENGTH = 20;
  const OPERATORS = ["+", "-", "*", "/"];
  const SYMBOLS = { "*": "×", "/": "÷", "-": "−", "+": "+" };

  const isOperator = (ch) => OPERATORS.includes(ch);

  // Format a number without floating-point noise and without scientific notation
  const formatNumber = (n) =>
    parseFloat(n.toFixed(10)).toLocaleString("en-US", {
      maximumFractionDigits: 10,
      useGrouping: false
    });

  // Evaluate the expression. Returns a number, an error message, or null if empty.
  // Multiplication and division are done first, then addition and subtraction.
  const evaluate = (expr) => {
    // Remove a trailing operator or decimal point so the live result still works
    const text = expr.replace(/[+\-*/]+$/, "").replace(/\.$/, "");
    if (text === "") return null;

    const tokens = text.match(/\d+\.?\d*|\.\d+|[+\-*/]/g) || [];

    // Handle a leading minus sign (negative first number)
    if (tokens[0] === "-") {
      tokens[1] = "-" + tokens[1];
      tokens.shift();
    }

    // Pass 1: multiplication and division
    const nums = [parseFloat(tokens[0])];
    const adds = [];

    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const n = parseFloat(tokens[i + 1]);

      if (op === "*") {
        nums[nums.length - 1] *= n;
      } else if (op === "/") {
        if (n === 0) return "Cannot divide by zero";
        nums[nums.length - 1] /= n;
      } else {
        adds.push(op);
        nums.push(n);
      }
    }

    // Pass 2: addition and subtraction
    let result = nums[0];
    adds.forEach((op, idx) => {
      result = op === "+" ? result + nums[idx + 1] : result - nums[idx + 1];
    });

    return result;
  };

  // Show the expression and the live result
  const render = () => {
    calcExpressionEl.textContent = expression
      .split("")
      .map((ch) => SYMBOLS[ch] || ch)
      .join("");

    if (expression === "") {
      calcResultEl.textContent = "0";
      calcResultEl.classList.remove("error");
      return;
    }

    const value = evaluate(expression);

    if (value === null) {
      calcResultEl.textContent = "0";
      calcResultEl.classList.remove("error");
    } else if (typeof value === "string") {
      calcResultEl.textContent = value;
      calcResultEl.classList.add("error");
    } else {
      calcResultEl.textContent = formatNumber(value);
      calcResultEl.classList.remove("error");
    }
  };

  // Add a digit or decimal point
  const addDigit = (d) => {
    if (expression.length >= MAX_LENGTH) return;

    const lastNumber = expression.split(/[+\-*/]/).pop();

    // Only one decimal point per number
    if (d === "." && lastNumber.includes(".")) return;

    // Start with "0." when a decimal point comes first
    if (d === "." && lastNumber === "") {
      expression += "0";
    }

    // Avoid leading zeros such as 007
    if (lastNumber === "0" && d !== ".") {
      expression = expression.slice(0, -1);
    }

    expression += d;
    render();
  };

  // Add an operator. A new operator replaces the previous one.
  const addOperator = (op) => {
    if (expression === "") return;   // No operator at the start
    if (expression === "-") return;  // Only a single minus at the start is allowed

    const last = expression.slice(-1);

    if (isOperator(last)) {
      expression = expression.slice(0, -1) + op;
    } else {
      if (expression.length >= MAX_LENGTH) return;
      expression += op;
    }
    render();
  };

  // Allow a leading minus for negative numbers
  const addMinusAtStart = () => {
    if (expression === "") {
      expression = "-";
      render();
    }
  };

  const backspace = () => {
    expression = expression.slice(0, -1);
    render();
  };

  const clearAll = () => {
    expression = "";
    render();
  };

  const calculate = () => {
    const value = evaluate(expression);
    if (value === null) return;

    if (typeof value === "string") {
      calcResultEl.textContent = value;
      calcResultEl.classList.add("error");
      return;
    }

    // Replace the expression with the result so the user can keep calculating
    expression = formatNumber(value);
    render();
  };

  // Button clicks (event delegation: one listener for all buttons)
  calcGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.dataset.action === "clear") return clearAll();
    if (btn.dataset.action === "backspace") return backspace();
    if (btn.dataset.action === "equals") return calculate();

    const value = btn.dataset.value;
    if (value === "-" && expression === "") {
      addMinusAtStart();
    } else if (/^[0-9.]$/.test(value)) {
      addDigit(value);
    } else {
      addOperator(value);
    }
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (/^[0-9]$/.test(e.key) || e.key === ".") {
      addDigit(e.key);
    } else if (e.key === "-" && expression === "") {
      addMinusAtStart();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
      if (e.key === "/") e.preventDefault();
      addOperator(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      calculate();
    } else if (e.key === "Backspace") {
      backspace();
    } else if (e.key === "Escape") {
      clearAll();
    }
  });

  render();
}