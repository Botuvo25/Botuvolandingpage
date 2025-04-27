// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// FAQ toggle
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  answer.classList.toggle('show');
  const icon = element.querySelector('i');
  if (answer.classList.contains('show')) {
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else {
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
}

// Typing effect
const phrases = ["Solve problems", "Save time", "Increase conversions"];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingSpeed = 100;
const deleteSpeed = 50;
const pauseDelay = 7000; // 7 seconds pause

function type() {
  const staticSpan = document.getElementById('static-text');
  const dynamicSpan = document.getElementById('dynamic-text');
  const currentPhrase = phrases[phraseIdx];

  if (!isDeleting) {
    // Typing
    dynamicSpan.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx >= currentPhrase.length) {
      // Pause before deleting
      isDeleting = true;
      setTimeout(type, pauseDelay);
      return;
    }
    setTimeout(type, typingSpeed);
  } else {
    // Deleting
    dynamicSpan.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx <= 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, typingSpeed);
      return;
    }
    setTimeout(type, deleteSpeed);
  }
}

// Start typing on load
window.addEventListener('load', () => {
  document.getElementById('static-text').textContent = '';
  setTimeout(type, 1000);
});

// Review data and functions (keep your existing review code here)

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  fetch(this.action, {
    method: 'POST',
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  }).then(res => {
    if (res.ok) {
      document.getElementById('formSuccess').style.display = 'block';
      this.reset();
    } else {
      alert('Error submitting form.');
    }
  }).catch(() => {
    alert('Error submitting form.');
  });
});

// Modal functions
function openContact() {
  document.getElementById('contactModal').style.display = 'flex';
}
function closeContact() {
  document.getElementById('contactModal').style.display = 'none';
}
window.onclick = (e) => {
  if (e.target === document.getElementById('contactModal')) {
    closeContact();
  }
};
