// Typing animation
const typingTexts = ["Save time", "Solve problems", "Increase conversions"];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedSpan = document.getElementById("typing");
function type() {
  const currentText = typingTexts[typingIndex];
  if (isDeleting) {
    typedSpan.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 50);
    }
  } else {
    typedSpan.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      setTimeout(() => {
        isDeleting = true;
        setTimeout(type, 50);
      }, 5000);
    } else {
      setTimeout(type, 50);
    }
  }
}
type();

// Review scroll
let reviewIdx = 0;
const reviewsContainer = document.getElementById("reviewsContainer");
const reviewCards = reviewsContainer.children;
function scrollReviews(direction) {
  reviewIdx += direction;
  if (reviewIdx < 0) reviewIdx = 0;
  if (reviewIdx > reviewCards.length - 3) reviewIdx = reviewCards.length - 3; // show 3 at a time
  reviewsContainer.scrollTo({
    left: reviewCards[reviewIdx].offsetLeft,
    behavior: "smooth"
  });
}

// FAQ toggle
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const arrow = btn.querySelector('.arrow');
  if (answer.style.display === "block") {
    answer.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  } else {
    answer.style.display = "block";
    arrow.style.transform = "rotate(90deg)";
  }
}

// Modal controls
const modal = document.getElementById("contactModal");
document.getElementById("openModal").onclick = () => { modal.style.display = "block"; };
document.getElementById("closeModal").onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Form submission to Formspree
document.getElementById("contactForm").onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  fetch("https://formspree.io/f/mjkwvgvr", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    const msgDiv = document.getElementById("formMessage");
    if (response.ok) {
      form.reset();
      msgDiv.textContent = "Thank you for getting in contact! A member of the Botuvo team will be in contact.";
      setTimeout(() => {
        document.getElementById("contactModal").style.display = "none";
        msgDiv.textContent = "";
      }, 3000);
    } else {
      response.json().then(data => {
        msgDiv.textContent = "There was an error submitting the form. Please try again.";
      });
    }
  }).catch(() => {
    document.getElementById("formMessage").textContent = "There was an error submitting the form. Please try again.";
  });
};
