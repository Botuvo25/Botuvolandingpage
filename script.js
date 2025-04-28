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

// 2. Modal triggers only on specific buttons/links
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

// 4. Review dots functionality
let currentReviewIndex = 0;
const dots = document.querySelectorAll('.dot');
const reviewCards = document.querySelectorAll('.review-card');

// Initially show all reviews (for desktop)
function showAllReviews() {
  reviewCards.forEach(card => {
    card.style.display = 'block';
  });
}

// For mobile, show only one review at a time
function showSingleReview(index) {
  reviewCards.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
  
  // Update active dot
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Function to handle dot clicks
function currentReview(index) {
  currentReviewIndex = index;
  
  // If on mobile, show only the selected review
  if (window.innerWidth <= 1024) {
    showSingleReview(index);
  }
}

// Check screen size and adjust review display
function checkScreenSize() {
  if (window.innerWidth <= 1024) {
    showSingleReview(currentReviewIndex);
  } else {
    showAllReviews();
  }
}

// Initialize reviews
checkScreenSize();

// Listen for window resize
window.addEventListener('resize', checkScreenSize);

// 5. FAQ toggle
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

// 6. Contact form submission
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

// 7. Typing animation
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
