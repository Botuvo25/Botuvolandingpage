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

// Reviews data
const reviews = [
  {
    text: "BOTUVO significantly boosted our lead generation efforts. Their strategies helped us attract more qualified prospects, resulting in a noticeable increase in conversions. Highly recommended!",
    name: "Mark D., Founder & CEO of a Fitness Studio",
    rating: 5
  },
  {
    text: "Thanks to BOTUVO, our website now converts visitors into customers more effectively. Their expertise in lead gen has made a real difference for our dental practice.",
    name: "Lisa K., Dental Practice Owner",
    rating: 5
  },
  {
    text: "The team at BOTUVO helped us optimize our sales funnel and improve our conversion rates. We've seen a steady growth in leads and sales since working with them.",
    name: "Tom S., Marketing Director at a Cosmetic Clinic",
    rating: 4
  },
  {
    text: "BOTUVO's lead generation solutions are top-notch. They helped us identify new opportunities and turn more visitors into paying clients.",
    name: "Rachel P., Owner of a Fitness Center",
    rating: 5
  },
  {
    text: "Since partnering with BOTUVO, our lead quality has improved dramatically, and our conversion rates are up. Their insights and strategies are game-changers.",
    name: "Daniel H., Manager of a Wellness Spa",
    rating: 4.5
  },
  {
    text: "Thanks to BOTUVO, our customer support is now faster and more efficient. Clients get instant answers, and we've seen a measurable drop in bounce rates. The automation has freed up hours every week.",
    name: "Sarah L., E-commerce Brand Owner",
    rating: 5
  }
];

let currentReviewIdx = 0;

function showReview(idx) {
  if (idx < 0) idx = reviews.length - 1;
  if (idx >= reviews.length) idx = 0;
  currentReviewIdx = idx;

  const review = reviews[idx];
  const display = document.getElementById('reviewDisplay');

  // Generate stars
  let starsHTML = '';
  const fullStars = Math.floor(review.rating);
  const hasHalf = review.rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i> ';
  }
  if (hasHalf) {
    starsHTML += '<i class="fas fa-star-half-alt"></i> ';
  }
  const emptyStars = 5 - Math.ceil(review.rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i> ';
  }

  display.innerHTML = `
    <div style="font-size:1.5rem; color:#f5a623; margin-bottom:15px;">${starsHTML}</div>
    <p style="font-size:1.125rem; margin-bottom:15px;">${review.text}</p>
    <div style="font-weight:600;">— ${review.name}</div>
  `;
}

// Initialize first review
window.onload = () => {
  showReview(currentReviewIdx);
};
  
// Contact form
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
