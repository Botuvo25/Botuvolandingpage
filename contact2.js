// Modal logic
const modal = document.getElementById("contactModal");
const openModalBtn = document.getElementById("openContactForm");
const closeBtn = document.querySelector(".close");
const contactForm = document.getElementById("contactForm");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Form submission logic
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Replace 'yourFormID' with your actual Formspree form ID!
  fetch("https://formspree.io/f/yourFormID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
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
