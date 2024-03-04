// constants
const BRAND = 'brand';
const CATEGORY = 'category';
const ALL = 'all';

document.addEventListener('DOMContentLoaded', function () {
  const brandSelect = document.getElementById(BRAND);
  const categorySelect = document.getElementById(CATEGORY);
  const cards = document.querySelectorAll('.card');

  function filterCards() {
    const urlParams = new URLSearchParams(window.location.search);
    let selectedBrand = urlParams.has(BRAND) ? urlParams.get(BRAND) : ALL;
    let selectedCategory = urlParams.has(CATEGORY)
      ? urlParams.get(CATEGORY)
      : ALL;

    // Update select elements based on URL parameters
    brandSelect.value = selectedBrand;
    categorySelect.value = selectedCategory;

    cards.forEach((card) => {
      const brand =
        card.getAttribute('data-brand') === selectedBrand ||
        selectedBrand === ALL;
      const category =
        card.getAttribute('data-category') === selectedCategory ||
        selectedCategory === ALL;

      if (brand && category) {
        card.style.display = ''; // Show the card
      } else {
        card.style.display = 'none'; // Hide the card
      }
    });
  }

  brandSelect.addEventListener('change', function () {
    const selectedBrand = brandSelect.value;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(BRAND, selectedBrand);
    const newUrl = `${location.pathname}${
      urlParams.toString() ? '?' : ''
    }${urlParams.toString()}`;
    history.pushState({}, '', newUrl);
    filterCards();
  });

  categorySelect.addEventListener('change', function () {
    const selectedCategory = categorySelect.value;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(CATEGORY, selectedCategory);
    const newUrl = `${location.pathname}${
      urlParams.toString() ? '?' : ''
    }${urlParams.toString()}`;
    history.pushState({}, '', newUrl);
    filterCards();
  });

  filterCards(); // Call initially to apply filters based on query params
});
