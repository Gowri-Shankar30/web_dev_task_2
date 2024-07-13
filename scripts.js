// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Product data
const products = [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 39.99 },
    { id: 3, name: 'Product 3', price: 49.99 }
];

// Cart data
let cart = [];

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = parseInt(this.parentElement.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        addToCart(product);
    });
});

// Function to add product to cart
function addToCart(product) {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });

    document.querySelector('.total-price').textContent = `Total: $${total.toFixed(2)}`;
}

// Checkout form submission
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    updateCart();
});
