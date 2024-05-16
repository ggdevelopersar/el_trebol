document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const productos = document.querySelectorAll('.producto');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      const selectedCategories = Array.from(document.querySelectorAll('input[data-category]:checked')).map(function(checkbox) {
        return checkbox.getAttribute('data-category');
      });
      const selectedBrands = Array.from(document.querySelectorAll('input[data-brand]:checked')).map(function(checkbox) {
        return checkbox.getAttribute('data-brand');
      });

      productos.forEach(function(producto) {
        const category = producto.querySelector('.imagenes').getAttribute('data-category');
        const brand = producto.querySelector('.imagenes').getAttribute('data-brand');

        if ((selectedCategories.length === 0 || selectedCategories.includes(category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(brand))) {
          producto.style.display = 'block';
        } else {
          producto.style.display = 'none';
        }
      });
    });
  });
});
