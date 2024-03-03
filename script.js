document.addEventListener('DOMContentLoaded', function () {
  const brandSelect = document.getElementById('brand');
  const categorySelect = document.getElementById('category');
  const cards = document.querySelectorAll('.card');

  function filterCards() {
    const urlParams = new URLSearchParams(window.location.search);
    let selectedBrand = urlParams.has('brand') ? urlParams.get('brand') : 'all';
    let selectedCategory = urlParams.has('category')
      ? urlParams.get('category')
      : 'all';

    // Check if user has made a selection in the dropdown, if yes, update selected values
    if (brandSelect.value !== 'all') {
      selectedBrand = brandSelect.value;
      urlParams.set('brand', selectedBrand);
    } else {
      selectedBrand = 'all'; // Set brand to 'all' even if 'all' is selected from the dropdown
      urlParams.set('brand', 'all');
    }

    if (categorySelect.value !== 'all') {
      selectedCategory = categorySelect.value;
      urlParams.set('category', selectedCategory);
    } else {
      selectedCategory = 'all'; // Set category to 'all' even if 'all' is selected from the dropdown
      urlParams.set('category', 'all');
    }

    // Update URL with the new parameters
    const newUrl = `${location.pathname}${
      urlParams.toString() ? '?' : ''
    }${urlParams.toString()}`;

    history.pushState({}, '', newUrl);

    brandSelect.value = selectedBrand;
    categorySelect.value = selectedCategory;

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

  // Call initially to apply filters based on query params
  filterCards();
});
