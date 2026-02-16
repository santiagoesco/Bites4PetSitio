// Product Data (Mock)
const products = [
    {
        id: 1,
        name: "ROKETAS",
        price: 10000,
        category: "Galletas Artesanales",
        image: "roketas.png",
        description: "Galletas artesanales naturales con hígado, pollo y avena. Premio saludable que apoya la digestión"
    },
    {
        id: 2,
        name: "Mix Deshidratados",
        price: 10000,
        category: "Deshidratados",
        image: "Mix Deshidratados.png",
        description: "Snack natural de res, pollo y cerdo, rico en proteína y energía para tu perro."
    },
    {
        id: 3,
        name: "Callo de Res Deshidratado",
        price: 10000,
        category: "Proteína",
        image: "Callo de Res Deshidratado.png", // Placeholder
        description: "Snack natural bajo en grasa, rico en enzimas que favorecen una digestión saludable."
    },
    {
        id: 4,
        name: "Oreja Deshidratada",
        price: 10000,
        category: "Mix",
        image: "Oreja Deshidratada.png", // Placeholder
        description: "Snack natural y crujiente que ayuda a limpiar los dientes y aporta colágeno para articulaciones fuertes."
    },
    {
        id: 5,
        name: "Traquea Deshidratada",
        price: 10000,
        category: "Deshidratados",
        image: "tra.png",
        description: "Snack natural rico en colágeno, ideal para apoyar articulaciones y encías mientras disfrutan masticando."
    },
    {
        id: 6,
        name: "Patas de Pollo Deshidratadas",
        price: 10000,
        category: "Deshidratados",
        image: "ppdh.png",
        description: "Snack crujiente rico en glucosamina, ideal para apoyar la salud articular y dental."
    },
    {
        id: 7,
        name: "Piel de Cerdo Deshidratada",
        price: 10000,
        category: "Deshidratados",
        image: "pcd.png",
        description: "Snack natural rico en colágeno que apoya articulaciones y encías."
    },
    {
        id: 8,
        name: "Hueso Res y Cerdo Deshidratados",
        price: 10000,
        category: "Huesos Recreativos",
        image: "hrcd.png",
        description: "Snack natural ideal para masticación intensa, ayuda a limpiar los dientes y aporta calcio para huesos fuertes."
    },
    {
        id: 9,
        name: "Chorirricos",
        price: 10000,
        category: "Snacks",
        image: "Cho.png",
        description: "Snack 100% carne de res, alto en proteína y perfecto como premio de entrenamiento."
    }
];

// State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalCountElement = document.getElementById('cart-total-count');
const cartTotalPriceElement = document.getElementById('cart-total-price');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <article class="product-card animate-on-scroll">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-price">$${product.price.toLocaleString()}</span>
                <button class="btn btn-secondary btn-block" onclick="addToCart(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        </article>
    `).join('');

    // Oberve new elements
    observeElements();
}

// Cart Logic
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
};

window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

window.updateQuantity = (productId, change) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
};

function updateCartUI() {
    // Update Counts
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCountElement.textContent = totalItems;
    cartTotalCountElement.textContent = `(${totalItems})`;
    cartTotalPriceElement.textContent = `$${totalPrice.toLocaleString()}`;

    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío 🐶</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// UI Interactions
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Checkout mocked
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Agrega productos antes de finalizar.');
        return;
    }

    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const address = document.getElementById('client-address').value;

    if (!name || !phone || !address) {
        alert('Por favor completa todos los datos de envío.');
        return;
    }

    const dataAuth = document.getElementById('data-auth');
    if (!dataAuth.checked) {
        alert('Por favor, autoriza el tratamiento de tus datos personales para continuar.');
        return;
    }

    // Google Sheets Submission
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz4Kx04ibw6Jq33CgC94du4JFSJH7TRSugH2OL_5c7UePMRwh9toyqK8Dy1AbgAUQgEZA/exec";

    if (SCRIPT_URL === "TU_URL_AQUI") {
        alert("⚠️ FALTA CONFIGURACIÓN: Debes configurar la URL del script de Google en el archivo script.js.");
        console.error("Falta URL del Script de Google Apps. Ver instrucciones en SETUP_DRIVE_ORDERS.md");
        return;
    }

    const submitBtn = document.getElementById('checkout-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Enviando pedido...";
    submitBtn.disabled = true;

    // Prepare data for Google Sheets
    // Mapping keys to match Sheet headers: Fecha, Cliente, Teléfono, Dirección, Total, Detalles del Pedido
    let orderDetails = "";
    cart.forEach(item => {
        orderDetails += `${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})\n`;
    });

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const formData = new FormData();
    formData.append("Cliente", name);
    formData.append("Telefono", phone);
    formData.append("Direccion", address);
    formData.append("Total", `$${totalPrice.toLocaleString()}`);
    formData.append("Detalles", orderDetails);

    fetch(SCRIPT_URL, {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                alert("✅ ¡Pedido recibido! Nos pondremos en contacto contigo pronto.");
                cart = [];
                updateCartUI();
                closeCart();
                // Clear form
                document.getElementById('client-name').value = "";
                document.getElementById('client-phone').value = "";
                document.getElementById('client-address').value = "";
                document.getElementById('data-auth').checked = false;
            } else {
                throw new Error("Error en la respuesta del servidor");
            }
        })
        .catch(error => {
            console.error("Error!", error.message);
            alert("Hubo un error al enviar el pedido. Por favor intenta de nuevo o contáctanos por WhatsApp.");
        })
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
});

// Scroll Animations
// Scroll Animations (Refactored for dynamic content)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function observeElements() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initial observation for static elements
// Initial observation for static elements
observeElements();

// --- Coverage Map Logic ---
let map;
let coveragePolygon;
const baseLat = 4.745;
const baseLng = -74.060;

document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

function initMap() {
    // Initialize Map
    map = L.map('map').setView([baseLat, baseLng], 14);

    // Tile Layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Icon (Paw)
    const pawIcon = L.divIcon({
        className: 'custom-paw-icon',
        html: '<div style="font-size: 24px; color: #F47A20; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"><i class="fa-solid fa-paw"></i></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    // Marker at Base (Generic Popup)
    L.marker([baseLat, baseLng], { icon: pawIcon }).addTo(map)
        .bindPopup("<b>Bites 4 Pet</b><br>Centro de Distribución")
        .openPopup();

    // Coverage Rectangle
    // Increased to ~30 blocks N/S (~3km). 
    // 1 deg lat ~= 110km. 3km ~= 0.027 deg.
    const latDelta = 0.027;
    const lngDelta = 0.027;

    const bounds = [
        [baseLat - latDelta, baseLng - lngDelta], // South-West
        [baseLat + latDelta, baseLng + lngDelta]  // North-East
    ];

    coveragePolygon = L.rectangle(bounds, {
        color: "#7A9B5D",       // Stronger green border
        weight: 3,
        fillColor: "#7A9B5D",   // Soft green interior
        fillOpacity: 0.2
    }).addTo(map);

    // Fit map to bounds initially
    map.fitBounds(bounds);

    // Map Reset Logic
    const resetBtn = document.getElementById('reset-map-btn');

    if (resetBtn) {
        // Show button when map moves away from center
        map.on('moveend', () => {
            const center = map.getCenter();
            const dist = map.distance(center, [baseLat, baseLng]);
            // If distance > 500 meters, show button
            if (dist > 500) {
                resetBtn.classList.add('visible');
            } else {
                resetBtn.classList.remove('visible');
            }
        });

        // Reset functionality
        resetBtn.addEventListener('click', () => {
            map.flyTo([baseLat, baseLng], 14); // Return to base zoom
            resetBtn.classList.remove('visible');
        });
    }

    // Address Check Logic
    const addressInput = document.getElementById('user-address');
    const checkBtn = document.getElementById('check-address-btn');
    const resultContainer = document.getElementById('coverage-result');

    checkBtn.addEventListener('click', () => {
        const address = addressInput.value.trim();
        if (!address) return;

        checkBtn.disabled = true;
        checkBtn.textContent = 'Verificando...';
        resultContainer.className = 'coverage-result';
        resultContainer.textContent = '';

        checkAddressCoverage(address, (isInside, lat, lon, error) => {
            checkBtn.disabled = false;
            checkBtn.textContent = 'Consultar mi dirección';

            if (error) {
                resultContainer.textContent = error;
                resultContainer.classList.add('warning');
                return;
            }

            if (isInside) {
                resultContainer.textContent = "Tu domicilio es GRATIS 🎉";
                resultContainer.classList.add('success');
            } else {
                resultContainer.textContent = "Tu zona tiene recargo adicional. Te confirmaremos el valor antes del envío.";
                resultContainer.classList.add('warning');
            }

            // Fly to location
            if (lat && lon) {
                map.flyTo([lat, lon], 14);
            }
        });
    });
}

// Reusable Coverage Check Function
function checkAddressCoverage(address, callback) {
    // Use Nominatim API for geocoding
    // We limit to Colombia to avoid ambiguity
    // Restrict to Bogota bounds: West, North, East, South
    // Approx Bounds: -74.25, 4.84, -73.90, 4.45
    const viewbox = "-74.25,4.84,-73.90,4.45";
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ", Bogota, Colombia")}&limit=1&viewbox=${viewbox}&bounded=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                // Simple bounds check since we know the rectangle props
                // 1 deg lat ~= 110km. 3km ~= 0.027 deg.
                const latDelta = 0.027;
                const lngDelta = 0.027;
                const south = baseLat - latDelta;
                const north = baseLat + latDelta;
                const west = baseLng - lngDelta;
                const east = baseLng + lngDelta;

                const isInside = (lat >= south && lat <= north && lon >= west && lon <= east);

                callback(isInside, lat, lon, null);

            } else {
                callback(false, null, null, "No pudimos encontrar esa dirección. Intenta ser más específico.");
            }
        })
        .catch(err => {
            console.error(err);
            callback(false, null, null, "Error al consultar. Intenta de nuevo.");
        });
}

// Cart Coverage Check Logic
function initCartCoverageCheck() {
    const cartAddressInput = document.getElementById('client-address');
    if (!cartAddressInput) return;

    // Create a warning message element for the cart
    const warningMsg = document.createElement('div');
    warningMsg.id = 'cart-coverage-warning';
    warningMsg.style.fontSize = '0.85rem';
    warningMsg.style.marginTop = '5px';
    warningMsg.style.fontWeight = '600';
    warningMsg.style.display = 'none';

    // Insert after the input
    cartAddressInput.parentNode.insertBefore(warningMsg, cartAddressInput.nextSibling);

    cartAddressInput.addEventListener('blur', () => {
        const address = cartAddressInput.value.trim();
        if (address.length < 5) {
            warningMsg.style.display = 'none';
            return;
        }

        warningMsg.style.display = 'block';
        warningMsg.textContent = 'Verificando cobertura...';
        warningMsg.style.color = 'var(--color-text-light)';

        checkAddressCoverage(address, (isInside, lat, lon, error) => {
            if (error) {
                warningMsg.textContent = "📍 " + error;
                warningMsg.style.color = 'var(--color-primary-dark)'; // Warning color
                return;
            }

            if (isInside) {
                warningMsg.textContent = "🎉 Domicilio Gratis en tu zona.";
                warningMsg.style.color = 'var(--color-accent)'; // Green
            } else {
                warningMsg.textContent = "⚠️ Zona con recargo adicional. Te confirmaremos el valor.";
                warningMsg.style.color = 'var(--color-primary-dark)'; // Warning color
            }
        });
    });
}

