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

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    const products = document.querySelectorAll('.producto');
    const checkboxes = document.querySelectorAll('#filters input[type="checkbox"]');
    const radios = document.querySelectorAll('#filters input[type="radio"]');
    const cart = document.querySelector('.carrito-productos');
    const cartTitle = document.querySelector('.carrito-titulo');
    const cartTotal = document.querySelector('.carrito-total');
    const cartButton = document.querySelector('.boton-comprar');

    let cartItems = [];
    let total = 0;

    searchBar.addEventListener('input', filterProducts);
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
    radios.forEach(radio => radio.addEventListener('change', filterProducts));

    function filterProducts() {
        const searchText = searchBar.value.toLowerCase();
        const activeCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked && checkbox.dataset.category)
            .map(checkbox => checkbox.dataset.category);
        const activeBrands = Array.from(radios)
            .filter(radio => radio.checked && radio.dataset.brand)
            .map(radio => radio.dataset.brand);

        products.forEach(product => {
            const category = product.querySelector('img').dataset.category;
            const brand = product.querySelector('img').dataset.brand;
            const name = product.querySelector('p').textContent.toLowerCase();
            
            const categoryMatch = !activeCategories.length || activeCategories.includes(category);
            const brandMatch = !activeBrands.length || activeBrands.includes(brand);
            const searchMatch = !searchText || name.includes(searchText);

            if (categoryMatch && brandMatch && searchMatch) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }

    products.forEach(product => {
        product.querySelector('button').addEventListener('click', () => {
            const productName = product.querySelector('p').textContent;
            const productPrice = parseFloat(product.querySelector('.precio').textContent.replace('Precio: $', '').replace(',', ''));
            const productTalle = product.querySelector('.talle').value;
            const productColor = product.querySelector('.color').value;

            const existingProduct = cartItems.find(item => item.name === productName && item.talle === productTalle && item.color === productColor);

            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
            } else {
                cartItems.push({ name: productName, price: productPrice, talle: productTalle, color: productColor, quantity: 1, subtotal: productPrice });
            }

            total += productPrice;
            updateCart();
        });
    });

    function updateCart() {
        cart.innerHTML = cartItems.map(item => `
            <div class="carrito-item">
                <span class="nombre-producto">${item.name}</span>
                <span class="talle-producto">Talle: ${item.talle}</span>
                <span class="color-producto">Color: ${item.color}</span>
                <span class="cantidad">${item.quantity} unidad(es)</span>
                <span class="subtotal">$${item.subtotal.toFixed(2)}</span>
                <button class="eliminar">Eliminar</button>
            </div>
        `).join('');

        cart.querySelectorAll('.eliminar').forEach((button, index) => {
            button.addEventListener('click', () => {
                total -= cartItems[index].subtotal;
                cartItems.splice(index, 1);
                updateCart();
            });
        });

        cartTitle.textContent = `Carrito (${cartItems.length} producto${cartItems.length !== 1 ? 's' : ''})`;
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        // Deshabilitar botón si el total es menor a 70,000
        cartButton.disabled = total <= 70000;

        // Agregar mensajes de depuración
        console.log('Total:', total);
        console.log('Botón deshabilitado:', cartButton.disabled);
    }

    cartButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Por favor agregue productos antes de comprar por el Whatsapp de Lenceria El Trebol. Muchas Gracias.');
            return;
        }

        const cartMessage = cartItems.map(item => `${item.name} - Talle: ${item.talle} - Color: ${item.color} - ${item.quantity} unidad(es) - $${item.subtotal.toFixed(2)}`).join('\n');
        const totalMessage = `Total: $${total.toFixed(2)}`;
        const whatsappMessage = `Hola, me gustaría hacer el siguiente pedido:\n${cartMessage}\n${totalMessage}`;
        
        const whatsappNumber = '541131669168'; // Reemplaza con WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    });
});
