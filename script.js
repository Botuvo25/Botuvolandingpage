// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Toggle FAQ answer
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

// Typing effect with cycling phrases - updated pause time
const phrases = ["Solve problems", "Save time", "Increase conversions"];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // typing speed in milliseconds
const deletingSpeed = 50; // deleting speed in milliseconds 
const pauseDelay = 7000; // 7 seconds

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = document.getElementById("dynamic-text").textContent;
  
  // If deleting
  if (isDeleting) {
    document.getElementById("dynamic-text").textContent = currentText.substring(0, currentText.length - 1);
    
    // If deleted everything
    if (currentText.length <= 1) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
      setTimeout(typeEffect, typingSpeed);
    } else {
      setTimeout(typeEffect, deletingSpeed);
    }
  } 
  // If typing
  else {
    document.getElementById("dynamic-text").textContent = currentPhrase.substring(0, currentText.length + 1);
    
    // If completed typing the phrase
    if (currentText.length >= currentPhrase.length - 1) {
      isDeleting = true;
      setTimeout(typeEffect, pauseDelay); // Pause before deleting
    } else {
      setTimeout(typeEffect, typingSpeed);
    }
  }
}

// Start the typing effect when page loads
window.addEventListener("load", function() {
  document.getElementById("static-text").textContent = "";
  setTimeout(typeEffect, 1000);
});

// Review rotation with star ratings
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

let currentReviewIndex = 0;

function showReview(index) {
  if (index < 0) index = reviews.length - 1;
  if (index >= reviews.length) index = 0;
  currentReviewIndex = index;

  const review = reviews[currentReviewIndex];
  const reviewDiv = document.getElementById('reviewDisplay');
  
  // Generate stars based on rating
  let starsHTML = '';
  const fullStars = Math.floor(review.rating);
  const hasHalfStar = review.rating % 1 !== 0;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i> ';
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i> ';
  }
  
  // Add empty stars to reach 5
  const emptyStars = 5 - Math.ceil(review.rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i> ';
  }

  reviewDiv.innerHTML = `
    <div style="font-size:1.5rem; color:#f5a623; margin-bottom:15px;">
      ${starsHTML}
    </div>
    <p style="font-size:1.125rem; margin-bottom:15px;">${review.text}</p>
    <div style="font-weight:600;">— ${review.name}</div>
  `;
}

// Initialize first review when page loads
window.onload = function() {
  showReview(currentReviewIndex);
};

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Send form data
  fetch(this.action, {
    method: 'POST',
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      document.getElementById('formSuccess').style.display = 'block';
      this.reset();
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  }).catch(() => {
    alert('Oops! There was a problem submitting your form.');
  });
});

// Modal controls
function openContact() {
  document.getElementById('contactModal').style.display = 'flex';
}
function closeContact() {
  document.getElementById('contactModal').style.display = 'none';
}
window.onclick = function(event) {
  const modal = document.getElementById('contactModal');
  if (event.target == modal) {
    closeContact();
  }
};
