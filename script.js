// Product Data (Mock)
const products = [
    {
        id: 10,
        name: "Barriga Llena Pollo 500g",
        price: 8000,
        category: "Alimento Natural",
        image: "barriga llena pollo.jpeg",
        description: "Alimento natural de 500 g, elaborado con proteína de pollo para una nutrición completa y sabrosa."
    },
    {
        id: 11,
        name: "Barriga Llena Res 500g",
        price: 8000,
        category: "Alimento Natural",
        image: "barriga llena Res 500.jpeg",
        description: "Alimento natural de 500 g, elaborado con proteína de res para aportar energía y bienestar diario."
    },
    {
        id: 1,
        name: "ROKETAS",
        price: 12000,
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
        id: 4,
        name: "Orejas Deshidratadas",
        price: 15000,
        category: "Mix",
        image: "orejas cambio.jpeg",
        description: "Snack natural y crujiente que ayuda a limpiar los dientes y aporta colágeno para articulaciones fuertes."
    },
    {
        id: 5,
        name: "Tráquea Deshidratada",
        price: 15000,
        category: "Deshidratados",
        image: "traquea para cambio.jpeg",
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
        id: 8,
        name: "Huesos de Res",
        price: 15000,
        category: "Huesos Recreativos",
        image: "huesos para cambio.jpeg",
        description: "Snack natural ideal para masticación intensa, ayuda a limpiar los dientes y aporta calcio para huesos fuertes."
    }
];

const formatCOP = (value) => new Intl.NumberFormat('es-CO').format(value);
const WHATSAPP_PHONE = '573006674990';

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
const checkoutWhatsappBtn = document.getElementById('checkout-whatsapp-btn');

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
                <span class="product-price">$${formatCOP(product.price)}</span>
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
    cartTotalPriceElement.textContent = `$${formatCOP(totalPrice)}`;

    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío 🐶</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${formatCOP(item.price)}</div>
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

function getValidatedCheckoutData() {
    if (cart.length === 0) {
        alert('Agrega productos antes de finalizar.');
        return null;
    }

    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const address = document.getElementById('client-address').value.trim();

    if (!name || !phone || !address) {
        alert('Por favor completa todos los datos de envío.');
        return null;
    }

    const dataAuth = document.getElementById('data-auth');
    if (!dataAuth.checked) {
        alert('Por favor, autoriza el tratamiento de tus datos personales para continuar.');
        return null;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
        name,
        phone,
        address,
        totalPrice,
        cart: JSON.parse(JSON.stringify(cart))
    };
}

function buildWhatsAppOrderMessage(orderData) {
    const itemsText = orderData.cart
        .map(item => `• ${item.quantity}x ${item.name} - $${formatCOP(item.price * item.quantity)}`)
        .join('\n');

    return `Hola Bites 4 Pet, quiero confirmar este pedido:\n\n` +
        `Cliente: ${orderData.name}\n` +
        `Celular: ${orderData.phone}\n` +
        `Dirección: ${orderData.address}\n\n` +
        `Pedido:\n${itemsText}\n\n` +
        `Total: $${formatCOP(orderData.totalPrice)}`;
}

function openWhatsAppWithOrder(orderData) {
    const message = buildWhatsAppOrderMessage(orderData);
    const whatsappURL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

if (checkoutWhatsappBtn) {
    checkoutWhatsappBtn.addEventListener('click', () => {
        const orderData = getValidatedCheckoutData();
        if (!orderData) return;
        openWhatsAppWithOrder(orderData);
    });
}

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
const baseLng = -74.075; // Centrado entre Cra 7 y Cra 78

document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

function initMap() {
    // Initialize Map
    map = L.map('map').setView([baseLat, baseLng], 13);

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
    // Latitud: mantener delta actual (~3km norte-sur)
    const latDelta = 0.027;
    // Longitud: Carrera 7 ≈ -74.030 (este) | Carrera 78 ≈ -74.120 (oeste)
    const lngEste = -74.030;  // Carrera 7
    const lngOeste = -74.120; // Carrera 78

    const bounds = [
        [baseLat - latDelta, lngOeste], // South-West (Cra 78)
        [baseLat + latDelta, lngEste]   // North-East (Cra 7)
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
                // Simple bounds check matching the coverage rectangle
                // Latitud: baseLat ± 0.027 | Longitud: Cra 78 a Cra 7
                const latDelta = 0.027;
                const south = baseLat - latDelta;
                const north = baseLat + latDelta;
                const west = -74.120;  // Carrera 78
                const east = -74.030;  // Carrera 7

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

// =====================
// CALCULADORA NUTRICIONAL PRO (RER + MER + Contextura)
// =====================
const KCAL_POR_GRAMO = 2.16; // 216 kcal / 100g de Bites 4 Pet

function calcularNutricion(peso, factorActividad, factorContextura) {
    // Paso 1: RER
    const rer = 70 * Math.pow(peso, 0.75);
    // Paso 2: MER
    let mer = rer * factorActividad;
    // Paso 3: Ajuste por contextura corporal
    mer = mer * factorContextura;
    // Paso 4: Convertir a gramos
    const gramosExactos = mer / KCAL_POR_GRAMO;
    // Paso 5: Redondeo estratégico al múltiplo de 50 más cercano hacia arriba
    const gramosDiarios = Math.ceil(gramosExactos / 50) * 50;
    const gramosMensuales = gramosDiarios * 30;
    const porciones = Math.ceil(gramosMensuales / 500);
    return {
        rer: Math.round(rer),
        mer: Math.round(mer),
        gramosDiarios,
        gramosMensuales,
        porciones
    };
}

function initCalculadora() {
    const inputNombre = document.getElementById('nombre-perro');
    const inputPeso = document.getElementById('peso-perro');
    const selectActividad = document.getElementById('nivel-actividad');
    const selectContextura = document.getElementById('contextura');
    const btnCalcular = document.getElementById('btn-calcular');
    const resultContainer = document.getElementById('calculator-result');
    const btnComprar = document.getElementById('btn-comprar');
    const sobrepesoAlert = document.getElementById('sobrepeso-alert');
    const resultTitle = document.getElementById('result-title');
    const resultTagline = document.getElementById('result-tagline');

    if (!inputPeso || !btnCalcular || !selectActividad || !selectContextura) return;

    btnCalcular.addEventListener('click', () => {
        const nombre = (inputNombre ? inputNombre.value.trim() : '') || '';
        const peso = parseFloat(inputPeso.value);
        const factorActividad = parseFloat(selectActividad.value);
        const factorContextura = parseFloat(selectContextura.value);

        // Validación
        inputPeso.classList.remove('error');
        if (!peso || peso < 2 || peso > 40) {
            inputPeso.classList.add('error');
            resultContainer.classList.remove('visible');
            setTimeout(() => inputPeso.classList.remove('error'), 600);
            return;
        }

        const resultado = calcularNutricion(peso, factorActividad, factorContextura);

        // Personalizar título y mensaje con el nombre
        if (resultTitle) {
            resultTitle.textContent = nombre
                ? `🐶 Plan nutricional para ${nombre}`
                : 'Recomendación para tu peludo';
        }
        if (resultTagline) {
            resultTagline.innerHTML = nombre
                ? `Con <strong>Bites 4 Pet</strong>, <strong>${nombre}</strong> recibe nutrición real basada en ciencia.`
                : 'Nutrición real basada en ciencia.';
        }

        document.getElementById('kcal-diarias').textContent = resultado.mer + ' kcal';
        document.getElementById('gramos-diarios').textContent = resultado.gramosDiarios + ' g';
        document.getElementById('gramos-mensuales').textContent = resultado.gramosMensuales.toLocaleString('es-CO') + ' g';
        document.getElementById('porciones-mes').textContent = resultado.porciones;

        // Mostrar/ocultar alerta de sobrepeso
        if (sobrepesoAlert) {
            sobrepesoAlert.classList.toggle('visible', factorContextura === 0.85);
        }

        // Actualizar botón comprar con la cantidad
        if (btnComprar) {
            const actividadText = selectActividad.options[selectActividad.selectedIndex].text.trim();
            const contexturaText = selectContextura.options[selectContextura.selectedIndex].text.trim();
            const nombreMsg = nombre ? ` para ${nombre}` : ' para mi perro';
            const msg = `Hola! Quiero comprar ${resultado.porciones} porciones de 500g de Bites 4 Pet${nombreMsg} de ${peso}kg (actividad: ${actividadText}, contextura: ${contexturaText}).`;
            btnComprar.href = `https://wa.me/573006674990?text=${encodeURIComponent(msg)}`;
        }

        resultContainer.classList.add('visible');
    });

    // Permitir calcular con Enter
    inputPeso.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            btnCalcular.click();
        }
    });
}

// Inicializar calculadora al cargar
document.addEventListener('DOMContentLoaded', initCalculadora);

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

