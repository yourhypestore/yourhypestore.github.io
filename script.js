document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded...');
  const brandSelect = document.getElementById('brand');
  const categorySelect = document.getElementById('category');
  const cards = document.querySelectorAll('.card');

  function filterCards() {
    const selectedBrand = brandSelect.value;
    const selectedCategory = categorySelect.value;

    cards.forEach((card) => {
      const brand =
        card.getAttribute('data-brand') === selectedBrand ||
        selectedBrand === 'all';
      const category =
        card.getAttribute('data-category') === selectedCategory ||
        selectedCategory === 'all';

      if (brand && category) {
        card.style.display = ''; // Show the card
      } else {
        card.style.display = 'none'; // Hide the card
      }
    });
  }
  brandSelect.addEventListener('change', filterCards);
  categorySelect.addEventListener('change', filterCards);
});
