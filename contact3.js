const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  fetch("https://formspree.io/f/mjkwvgvr", {
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
        // Close modal if you want
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
