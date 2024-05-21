document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const productos = document.querySelectorAll('.producto');
  const searchBar = document.getElementById('searchBar');

  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', filterProducts);
  });

  searchBar.addEventListener('input', filterProducts);

  function filterProducts() {
      const selectedCategories = Array.from(document.querySelectorAll('input[data-category]:checked')).map(function(checkbox) {
          return checkbox.getAttribute('data-category');
      });
      const selectedBrands = Array.from(document.querySelectorAll('input[data-brand]:checked')).map(function(checkbox) {
          return checkbox.getAttribute('data-brand');
      });
      const searchText = searchBar.value.toLowerCase();

      productos.forEach(function(producto) {
          const image = producto.querySelector('img');
          const category = image.getAttribute('data-category');
          const brand = image.getAttribute('data-brand');
          const description = producto.querySelector('p').textContent.toLowerCase();

          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
          const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
          const matchesSearch = searchText === '' || description.includes(searchText);

          if (matchesCategory && matchesBrand && matchesSearch) {
              producto.style.display = 'block';
          } else {
              producto.style.display = 'none';
          }
      });
  }
});
