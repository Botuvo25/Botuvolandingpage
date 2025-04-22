// Carousel Text Animation
const carouselTexts = ["Increase conversions", "Save time", "Solve problems"];
const carousel = document.getElementById("carousel");
let currentIndex = 0;

function updateCarousel() {
  carousel.style.opacity = 0;
  
  setTimeout(() => {
    carousel.innerHTML = `<span>${carouselTexts[currentIndex]}</span>`;
    carousel.style.opacity = 1;
    currentIndex = (currentIndex + 1) % carouselTexts.length;
  }, 500);
}

setInterval(updateCarousel, 3000);

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    
    // Close all FAQ items
    faqItems.forEach((faq) => {
      faq.classList.remove("active");
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// Contact Form Modal
const modal = document.getElementById("contactModal");
const openModalBtn = document.getElementById("openContactForm");
const closeBtn = document.querySelector(".close");
const contactForm = document.getElementById("contactForm");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const formObject = {};
  
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  
  // Send form data to email
 fetch("https://formspree.io/f/mjkwvgvr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  })
    .then((response) => {
      if (response.ok) {
        alert("Thank you for your message! We'll get back to you soon.");
        contactForm.reset();
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Sticky Navigation
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.padding = "10px 0";
    nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    nav.style.padding = "15px 0";
    nav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navHeight = document.querySelector("nav").offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - navHeight,
        behavior: "smooth",
      });
    }
  });
});
