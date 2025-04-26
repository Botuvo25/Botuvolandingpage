<script>
  // Existing functions...

  // Toggle review text
  document.querySelectorAll('.review-card').forEach(card => {
    const reviewText = card.querySelector('.collapsible');
    // Add click event to the entire card or a specific arrow if you add one
    card.addEventListener('click', () => {
      reviewText.classList.toggle('show');
    });
  });
</script>
