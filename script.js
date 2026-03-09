 // ========= Smooth scroll for in-page links =========
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href === "#") return;

  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});


// ========= Reveal-on-scroll (fade + slide up) =========
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));


// ========= Active nav link on scroll =========
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav ul a[href^='#']");

function setActiveNav() {
  let currentId = null;
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offsetTop = scrollY + rect.top;
    const height = rect.height;

    if (
      scrollY >= offsetTop - height * 0.3 &&
      scrollY < offsetTop + height * 0.6
    ) {
      currentId = "#" + section.id;
    }
  });

  navLinks.forEach((link) => {
    if (currentId && link.getAttribute("href") === currentId) {
      link.classList.add("nav-active");
    } else {
      link.classList.remove("nav-active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);


// ========= Contact form helper (CONTACT PAGE ONLY) =========
const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const name = contactForm.querySelector("#name")?.value.trim();
    const message = contactForm.querySelector("#message")?.value.trim();

    if (!name || !message) {
      alert("Please fill in your name and project details before sending.");
      e.preventDefault();
    }
  });
}


// ==================================================
// QUOTE FORMS LOGIC (FINAL & CLEAN)
// ==================================================

const whatsappNumber = "919385371983";

const powerPlantModal = document.getElementById("powerPlantQuoteModal");
const simpleQuoteModal = document.getElementById("simpleQuoteModal");

const closePowerPlantQuote = document.getElementById("closePowerPlantQuote");
const closeSimpleQuote = document.getElementById("closeSimpleQuote");

const powerPlantTypeInput = document.getElementById("powerPlantType");

// ========= Open correct form =========
document.querySelectorAll(".get-quote-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const product = btn.dataset.product || "";

    if (product.includes("Solar Power Plant")) {
      powerPlantTypeInput.value = product;
      powerPlantModal.style.display = "flex";
    } else {
      document.getElementById("simpleProductName").value = product;
      document.getElementById("simpleQuoteTitle").textContent =
        `Get Quote – ${product}`;
      simpleQuoteModal.style.display = "flex";
    }
  });
});

// ========= Close buttons =========
closePowerPlantQuote?.addEventListener("click", () => {
  powerPlantModal.style.display = "none";
});

closeSimpleQuote?.addEventListener("click", () => {
  simpleQuoteModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === powerPlantModal) powerPlantModal.style.display = "none";
  if (e.target === simpleQuoteModal) simpleQuoteModal.style.display = "none";
});


// ========= Power Plant Form Submit =========
document
  .getElementById("powerPlantQuoteForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const capacity = document.getElementById("plantCapacity").value.trim();
    const location = document.getElementById("plantLocation").value.trim();
    const roof = document.getElementById("roofType").value;

    if (!capacity || !location || !roof) {
      alert("Please fill in all required fields before sending.");
      return;
    }

    const message =
      `Hello VR Electrotech,%0A%0A` +
      `Solar Power Plant Enquiry%0A` +
      `Type: ${powerPlantTypeInput.value}%0A` +
      `Capacity: ${capacity}%0A` +
      `Location: ${location}%0A` +
      `Roof Type: ${roof}%0A` +
      `Phase: ${document.getElementById("phaseType").value}%0A` +
      `Panel Preference: ${document.getElementById("panelPreference").value}%0A` +
      `Notes: ${document.getElementById("plantNotes").value || "None"}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    powerPlantModal.style.display = "none";
  });


// ========= Simple Product Form Submit =========
document
  .getElementById("simpleQuoteForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const quantity = document.getElementById("simpleQuantity").value.trim();
    const location = document.getElementById("simpleLocation").value.trim();

    if (!quantity || !location) {
      alert("Please fill in required fields before sending.");
      return;
    }

    const message =
      `Hello VR Electrotech,%0A%0A` +
      `Product Enquiry%0A` +
      `Product: ${document.getElementById("simpleProductName").value}%0A` +
      `Quantity / Capacity: ${quantity}%0A` +
      `Location: ${location}%0A` +
      `Usage: ${document.getElementById("simpleUsage").value || "Not specified"}%0A` +
      `Notes: ${document.getElementById("simpleNotes").value || "None"}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    simpleQuoteModal.style.display = "none";
  });


// ========= Simple Product Form Submit =========
document
  .getElementById("simpleQuoteForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const quantity = document.getElementById("simpleQuantity").value.trim();
    const location = document.getElementById("simpleLocation").value.trim();

    if (!quantity || !location) {
      alert("Please fill in required fields before sending.");
      return;
    }

    const message =
      `Hello VR Electrotech,%0A%0A` +
      `Product Enquiry%0A` +
      `Product: ${document.getElementById("simpleProductName").value}%0A` +
      `Quantity / Capacity: ${quantity}%0A` +
      `Location: ${location}%0A` +
      `Usage: ${document.getElementById("simpleUsage").value || "Not specified"}%0A` +
      `Notes: ${document.getElementById("simpleNotes").value || "None"}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    simpleQuoteModal.style.display = "none";
  });

/* ===== Mobile nav dropdown toggle (ADD THIS) ===== */
document.addEventListener("DOMContentLoaded", () => {
  const dropdownParents = document.querySelectorAll(".nav-has-dropdown > a");

  dropdownParents.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // first tap opens/closes dropdown instead of navigating
        const li = link.parentElement;
        li.classList.toggle("open");
      }
    });
  });
});

