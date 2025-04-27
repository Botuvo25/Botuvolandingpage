// 1. Smooth scroll for nav links
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

// 2. Open modal only on specific triggers
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

// 3. Modal controls
const modal = document.getElementById('contactModal');
const closeBtn = document.getElementById('closeModal');

function openModal() {
  modal.style.display = 'flex';
}
function closeModal() {
  modal.style.display = 'none';
}
closeBtn.onclick = closeModal;
window.onclick = (e) => {
  if (e.target === modal) closeModal();
}

// 4. Reviews carousel: auto slide every 4 seconds
const reviews = Array.from(document.querySelectorAll('.review-card'));
const reviewsPerView = 3;
let reviewIndex = 0;
let reviewInterval = null;

function showReviews() {
  reviews.forEach((review, idx) => {
    review.style.display = (idx >= reviewIndex && idx < reviewIndex + reviewsPerView) ? 'block' : 'none';
  });
}

function slideNext() {
  reviewIndex += reviewsPerView;
  if (reviewIndex > reviews.length - reviewsPerView) {
    reviewIndex = 0; // loop back
  }
  showReviews();
}

function slidePrev() {
  reviewIndex -= reviewsPerView;
  if (reviewIndex < 0) {
    reviewIndex = Math.max(0, reviews.length - reviewsPerView);
  }
  showReviews();
}

// Initialize reviews display
showReviews();

// Auto slide
reviewInterval = setInterval(slideNext, 4000);

// Manual controls
document.getElementById('nextReview').addEventListener('click', () => {
  slideNext();
  resetInterval();
});
document.getElementById('prevReview').addEventListener('click', () => {
  slidePrev();
  resetInterval();
});

function resetInterval() {
  clearInterval(reviewInterval);
  reviewInterval = setInterval(slideNext, 4000);
}

// 5. Toggle review details (accordion)
function toggleReview(header) {
  const item = header.parentElement;
  const isExpanded = item.classList.contains('expanded');
  // Collapse all
  reviews.forEach(r => r.classList.remove('expanded'));
  // Expand clicked if it was not expanded
  if (!isExpanded) {
    item.classList.add('expanded');
  }
}

// 6. FAQ toggle
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const arrow = btn.querySelector('.arrow');
  if (answer.style.display === 'block') {
    answer.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    answer.style.display = 'block';
    arrow.style.transform = 'rotate(90deg)';
  }
}

// 7. Contact form submission
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

// 8. Typing animation
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
type();
