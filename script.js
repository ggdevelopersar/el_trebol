document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const images = document.querySelectorAll('.imagenes');
  
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        const selectedCategories = Array.from(document.querySelectorAll('input[data-category]:checked')).map(function(checkbox) {
          return checkbox.getAttribute('data-category');
        });
        const selectedBrands = Array.from(document.querySelectorAll('input[data-brand]:checked')).map(function(checkbox) {
          return checkbox.getAttribute('data-brand');
        });
  
        images.forEach(function(image) {
          const category = image.getAttribute('data-category');
          const brand = image.getAttribute('data-brand');
  
          if ((selectedCategories.length === 0 || selectedCategories.includes(category)) &&
              (selectedBrands.length === 0 || selectedBrands.includes(brand))) {
            image.style.display = 'block';
          } else {
            image.style.display = 'none';
          }
        });
      });
    });
  });