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

// 4. Manual Review Slider
const reviews = Array.from(document.querySelectorAll('.review-card'));
const reviewsContainer = document.getElementById('reviewsCarousel');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Set up the slider
function setupSlider() {
  // Make all reviews visible
  reviews.forEach(review => {
    review.style.display = 'block';
  });
  
  // Add event listeners for drag/touch
  reviewsContainer.addEventListener('mousedown', dragStart);
  reviewsContainer.addEventListener('touchstart', dragStart);
  reviewsContainer.addEventListener('mouseup', dragEnd);
  reviewsContainer.addEventListener('touchend', dragEnd);
  reviewsContainer.addEventListener('mousemove', drag);
  reviewsContainer.addEventListener('touchmove', drag);
  reviewsContainer.addEventListener('mouseleave', dragEnd);
}

function dragStart(e) {
  if (e.type === 'mousedown') {
    e.preventDefault();
  }
  startPos = getPositionX(e);
  isDragging = true;
  reviewsContainer.style.cursor = 'grabbing';
}

function drag(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
    
    // Add boundaries to prevent sliding too far
    const maxTranslate = 0;
    const minTranslate = -(reviewsContainer.scrollWidth - reviewsContainer.clientWidth);
    
    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate;
    } else if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate;
    }
    
    setSliderPosition();
  }
}

function dragEnd() {
  isDragging = false;
  prevTranslate = currentTranslate;
  reviewsContainer.style.cursor = 'grab';
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function setSliderPosition() {
  reviewsContainer.style.transform = `translateX(${currentTranslate}px)`;
}

// Initialize slider
setupSlider();

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
