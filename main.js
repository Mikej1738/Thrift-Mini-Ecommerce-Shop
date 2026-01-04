// Theme toggle
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", current);
      localStorage.setItem("theme", current);
    });
  }
})();

// Cart count
(function initCart() {
  const countEl = document.getElementById("cart-count");
  const getCount = () => parseInt(localStorage.getItem("cartCount") || "0", 10);
  const setCount = (n) => {
    localStorage.setItem("cartCount", String(n));
    if (countEl) countEl.textContent = n;
  };
  setCount(getCount());

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;
    const newCount = getCount() + 1;
    setCount(newCount);
    btn.classList.add("added");
    setTimeout(() => btn.classList.remove("added"), 400);
  });
})();

// Greeting + date (homepage)
(function initGreeting() {
  const greetEl = document.getElementById("greeting");
  const dateEl = document.getElementById("today-date");
  if (!greetEl && !dateEl) return;

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" : "Good evening";

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const today = now.toLocaleDateString(undefined, options);

  if (greetEl) greetEl.textContent = greeting;
  if (dateEl) dateEl.textContent = today;
})();

// Contact form validation
(function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameEl = form.querySelector("#name");
  const emailEl = form.querySelector("#email");
  const messageEl = form.querySelector("#message");
  const errorEl = form.querySelector("#form-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
      errorEl.textContent = "Please fill in all fields.";
      return;
    }
    if (!email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
      errorEl.textContent = "Please enter a valid email address containing '@'.";
      return;
    }

    // Simulate success
    form.reset();
    alert("Thanks for reaching out! We'll get back to you soon.");
  });
})();
