// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  if (link.id !== 'navGetInContact') {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});

// Modal controls
const modal = document.getElementById('contactModal');
const closeBtn = document.getElementById('closeModal');

function openModal() {
  modal.style.display = 'flex';
}
function closeModal() {
  modal.style.display = 'none';
}

// Attach event listeners to buttons
document.getElementById('navGetInContact').addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});
document.getElementById('getStartedBtn').addEventListener('click', () => {
  openModal();
});
document.getElementById('footerGetInContact').addEventListener('click', () => {
  openModal();
});
document.getElementById('missionCTA').addEventListener('click', () => {
  openModal();
});

// Close modal on clicking close button or outside modal
closeBtn.onclick = closeModal;
window.onclick = (e) => {
  if (e.target === modal) closeModal();
};

// Contact form submission
document.getElementById('contactForm').onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const messageDiv = document.getElementById('formMessage');

  // Basic validation
  const email = form.querySelector('input[type="email"]');
  if (!email.value || !email.value.includes('@')) {
    messageDiv.textContent = 'Please enter a valid email.';
    messageDiv.style.color = 'red';
    return;
  }

  fetch('https://formspree.io/f/mjkwvgvr', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      form.reset();
      messageDiv.textContent = 'Thank you for getting in contact! A member of the Botuvo team will be in contact.';
      messageDiv.style.color = 'green';
      setTimeout(() => {
        closeModal();
        messageDiv.textContent = '';
      }, 3000);
    } else {
      response.json().then(data => {
        messageDiv.textContent = 'There was an error submitting the form. Please try again.';
        messageDiv.style.color = 'red';
      });
    }
  }).catch(() => {
    messageDiv.textContent = 'There was an error submitting the form. Please try again.';
    messageDiv.style.color = 'red';
  });
};

// Typing animation
const typingTexts = ["Save time", "Solve problems", "Increase conversions"];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedSpan = document.getElementById("typed");
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
// FAQ Toggle Function
function toggleFaq(buttonElement) {
  // The .faq-answer div is the next element sibling to the button
  const answer = buttonElement.nextElementSibling;
  // The arrow span is the first child of the button
  const arrow = buttonElement.querySelector('.arrow');

  if (answer) { // Make sure the answer element exists
    // Check if the answer is currently displayed (as 'block')
    // Using getComputedStyle is more robust than checking inline style directly
    // if you might set display via CSS classes in the future.
    const isAnswerVisible = getComputedStyle(answer).display === "block";

    if (isAnswerVisible) {
      answer.style.display = "none";
      if (arrow) arrow.innerHTML = "&#9654;"; // Pointing right arrow (>)
      buttonElement.setAttribute('aria-expanded', 'false');
    } else {
      answer.style.display = "block";
      if (arrow) arrow.innerHTML = "&#9660;"; // Pointing down arrow (v)
      buttonElement.setAttribute('aria-expanded', 'true');
    }
  } else {
    console.error("Could not find the answer element for this FAQ button:", buttonElement);
  }
}

// It's good practice to ensure all answers are hidden on page load
// and ARIA attributes are set correctly.
document.addEventListener('DOMContentLoaded', () => {
  const allFaqQuestions = document.querySelectorAll('.faq-question');
  allFaqQuestions.forEach(questionButton => {
    const answer = questionButton.nextElementSibling;
    if (answer && answer.classList.contains('faq-answer')) {
      // Initially hide the answer (CSS is better for this, see below)
      // answer.style.display = 'none'; // Can be done here or in CSS
      questionButton.setAttribute('aria-expanded', 'false');

      // Ensure the arrow is initially correct if answers are hidden by default
      const arrow = questionButton.querySelector('.arrow');
      if (arrow) {
        arrow.innerHTML = "&#9654;";
      }
    }
  });
});
type();
