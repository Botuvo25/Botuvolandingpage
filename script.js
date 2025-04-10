// Smooth scrolling for "Contact Us" link
document.querySelector('.contact-link').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#contact').scrollIntoView({
    behavior: 'smooth',
  });
});
