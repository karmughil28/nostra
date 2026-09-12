// ========================================
// NOSTRA - PRODUCT DATA
// ========================================

const products = [
    {
        id: 1,
        name: "Luna Satin Dress",
        category: "Dresses",
        price: 3490,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 2,
        name: "Solace Linen Dress",
        category: "Dresses",
        price: 2890,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 3,
        name: "Mira Tailored Top",
        category: "Tops",
        price: 1790,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 4,
        name: "Noir Studio Blazer",
        category: "Outerwear",
        price: 4290,
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 5,
        name: "Aurelia Knit Top",
        category: "Tops",
        price: 1590,
        image: "https://images.unsplash.com/photo-1564257577054-9e5f9d3c0f17?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 6,
        name: "Eden Long Coat",
        category: "Outerwear",
        price: 4990,
        image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 7,
        name: "Muse Shoulder Bag",
        category: "Accessories",
        price: 2490,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 8,
        name: "Sora Evening Dress",
        category: "Dresses",
        price: 3890,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 9,
        name: "Elara Minimal Top",
        category: "Tops",
        price: 1890,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 10,
        name: "Vela Structured Bag",
        category: "Accessories",
        price: 2790,
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 11,
        name: "Arden Overshirt",
        category: "Outerwear",
        price: 3290,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 12,
        name: "Clara Midi Dress",
        category: "Dresses",
        price: 3190,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85"
    }
];


// ========================================
// CART AND WISHLIST
// ========================================

// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("nostraCart")) || [];

// Get wishlist data from localStorage
let wishlist = JSON.parse(localStorage.getItem("nostraWishlist")) || [];


// ========================================
// FORMAT PRICE
// ========================================

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}


// ========================================
// SAVE CART AND WISHLIST
// ========================================

function saveData() {
    localStorage.setItem("nostraCart", JSON.stringify(cart));
    localStorage.setItem("nostraWishlist", JSON.stringify(wishlist));
}


// ========================================
// SHOW TOAST MESSAGE
// ========================================

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}


// ========================================
// CREATE PRODUCT CARD
// ========================================

function createProductCard(product) {

    const isLiked = wishlist.includes(product.id);

    return `
        <article class="product-card">

            <div class="product-image">

                <button 
                    class="product-heart ${isLiked ? "active" : ""}"
                    data-wish="${product.id}"
                    aria-label="Add to wishlist"
                >
                    ${isLiked ? "♥" : "♡"}
                </button>

                <img 
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <button 
                    class="add-btn"
                    data-add="${product.id}"
                >
                    Add to bag
                </button>

            </div>

            <div class="product-meta">

                <h3>${product.name}</h3>

                <p>
                    ${product.category}
                    ·
                    ${formatPrice(product.price)}
                </p>

            </div>

        </article>
    `;
}


// ========================================
// DISPLAY PRODUCTS ON HOME PAGE
// ========================================

function renderHomeProducts() {

    const homeProducts = document.getElementById("homeProducts");

    if (!homeProducts) {
        return;
    }

    // Show only first 4 products on home page
    const homeProductList = products.slice(0, 4);

    homeProducts.innerHTML = homeProductList
        .map(function (product) {
            return createProductCard(product);
        })
        .join("");
}


// ========================================
// DISPLAY PRODUCTS ON COLLECTION PAGE
// ========================================

function renderCollections(productsToShow = products) {

    const collectionProducts =
        document.getElementById("collectionProducts");

    if (!collectionProducts) {
        return;
    }

    collectionProducts.innerHTML = productsToShow
        .map(function (product) {
            return createProductCard(product);
        })
        .join("");


    // Update product count
    const resultCount =
        document.getElementById("resultCount");

    if (resultCount) {

        if (productsToShow.length === 1) {
            resultCount.textContent = "Showing 1 product";
        } else {
            resultCount.textContent =
                `Showing ${productsToShow.length} products`;
        }
    }


    // Show no-result message
    const noResults =
        document.getElementById("noResults");

    if (noResults) {

        if (productsToShow.length === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }
}


// ========================================
// RENDER CART
// ========================================

function renderCart() {

    // Update cart count in header
    const cartCountElements =
        document.querySelectorAll(".cart-count");

    let totalQuantity = 0;

    cart.forEach(function (item) {
        totalQuantity += item.qty;
    });

    cartCountElements.forEach(function (element) {
        element.textContent = totalQuantity;
    });


    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) {
        return;
    }


    // If cart is empty
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-state">
                Your bag is empty.
            </p>
        `;

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }


    // Display cart items
    cartItems.innerHTML = cart
        .map(function (item) {

            return `
                <div class="cart-row">

                    <img 
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>

                        <h4>${item.name}</h4>

                        <p>
                            ${item.qty} ×
                            ${formatPrice(item.price)}
                        </p>

                    </div>

                    <button 
                        class="remove-item"
                        data-remove="${item.id}"
                    >
                        Remove
                    </button>

                </div>
            `;
        })
        .join("");


    // Calculate total price
    let totalPrice = 0;

    cart.forEach(function (item) {
        totalPrice += item.price * item.qty;
    });


    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }
}


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart(productId) {

    const product = products.find(function (item) {
        return item.id === productId;
    });


    if (!product) {
        return;
    }


    // Check whether product already exists
    const existingProduct = cart.find(function (item) {
        return item.id === productId;
    });


    if (existingProduct) {

        // Increase quantity
        existingProduct.qty++;

    } else {

        // Add new product
        cart.push({
            ...product,
            qty: 1
        });
    }


    saveData();

    renderCart();

    showToast(
        `${product.name} added to your bag`
    );
}


// ========================================
// TOGGLE WISHLIST
// ========================================

function toggleWishlist(productId) {

    const product = products.find(function (item) {
        return item.id === productId;
    });


    if (!product) {
        return;
    }


    // Check whether product is already in wishlist
    const isAlreadyLiked =
        wishlist.includes(productId);


    if (isAlreadyLiked) {

        // Remove from wishlist
        wishlist = wishlist.filter(function (id) {
            return id !== productId;
        });

        showToast("Removed from wishlist");

    } else {

        // Add to wishlist
        wishlist.push(productId);

        showToast(
            `${product.name} saved to wishlist`
        );
    }


    saveData();

    // Refresh product cards
    renderHomeProducts();

    renderCollections();
}


// ========================================
// SETUP BUTTON INTERACTIONS
// ========================================

function setupInteractions() {

    document.addEventListener("click", function (event) {

        // --------------------------------
        // ADD TO CART
        // --------------------------------

        const addButton =
            event.target.closest("[data-add]");

        if (addButton) {

            const productId =
                Number(addButton.dataset.add);

            addToCart(productId);

            return;
        }


        // --------------------------------
        // WISHLIST
        // --------------------------------

        const wishlistButton =
            event.target.closest("[data-wish]");

        if (wishlistButton) {

            const productId =
                Number(wishlistButton.dataset.wish);

            toggleWishlist(productId);

            return;
        }


        // --------------------------------
        // REMOVE FROM CART
        // --------------------------------

        const removeButton =
            event.target.closest("[data-remove]");

        if (removeButton) {

            const productId =
                Number(removeButton.dataset.remove);

            cart = cart.filter(function (item) {
                return item.id !== productId;
            });

            saveData();

            renderCart();

            return;
        }


        // --------------------------------
        // OPEN CART
        // --------------------------------

        const cartButton =
            event.target.closest(".cart-toggle");

        if (cartButton) {

            const cartPanel =
                document.getElementById("cartPanel");

            const overlay =
                document.querySelector(".panel-overlay");


            if (cartPanel) {
                cartPanel.classList.add("open");
            }

            if (overlay) {
                overlay.classList.add("open");
            }
        }


        // --------------------------------
        // CLOSE CART
        // --------------------------------

        const closeButton =
            event.target.closest(".close-panel");

        const overlayClicked =
            event.target.classList.contains("panel-overlay");


        if (closeButton || overlayClicked) {

            const cartPanel =
                document.getElementById("cartPanel");

            const overlay =
                document.querySelector(".panel-overlay");


            if (cartPanel) {
                cartPanel.classList.remove("open");
            }

            if (overlay) {
                overlay.classList.remove("open");
            }
        }


        // --------------------------------
        // MOBILE MENU
        // --------------------------------

        const menuButton =
            event.target.closest(".menu-btn");

        if (menuButton) {

            const mobileNav =
                document.querySelector(".mobile-nav");

            if (mobileNav) {
                mobileNav.classList.toggle("open");
            }
        }


        // --------------------------------
        // WISHLIST HEADER BUTTON
        // --------------------------------

        const wishlistToggle =
            event.target.closest(".wishlist-toggle");

        if (wishlistToggle) {

            if (wishlist.length > 0) {

                showToast(
                    `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} in your wishlist`
                );

            } else {

                showToast("Your wishlist is empty");
            }
        }


        // --------------------------------
        // CHECKOUT
        // --------------------------------

        const checkoutButton =
            event.target.closest("#checkoutBtn");

        if (checkoutButton) {

            if (cart.length > 0) {

                showToast(
                    "Checkout is ready for integration"
                );

            } else {

                showToast("Your bag is empty");
            }
        }

    });
}


// ========================================
// SEARCH AND FILTER
// ========================================

function setupCollectionFilters() {

    const searchInput =
        document.getElementById("productSearch");


    // This function only runs on collections page
    if (!searchInput) {
        return;
    }


    let selectedCategory = "all";


    // --------------------------------
    // APPLY SEARCH + FILTER
    // --------------------------------

    function applyFilters() {

        const searchText =
            searchInput.value.trim().toLowerCase();


        const filteredProducts =
            products.filter(function (product) {

                // Check category
                const categoryMatches =
                    selectedCategory === "all" ||
                    product.category === selectedCategory;


                // Check search
                const searchMatches =
                    product.name
                        .toLowerCase()
                        .includes(searchText) ||

                    product.category
                        .toLowerCase()
                        .includes(searchText);


                return categoryMatches && searchMatches;
            });


        renderCollections(filteredProducts);
    }


    // --------------------------------
    // CATEGORY FILTER BUTTONS
    // --------------------------------

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove active class
            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });


            // Add active class
            button.classList.add("active");


            // Get selected category
            selectedCategory =
                button.dataset.filter;


            // Apply filter
            applyFilters();
        });
    });


    // --------------------------------
    // SEARCH INPUT
    // --------------------------------

    searchInput.addEventListener(
        "input",
        function () {
            applyFilters();
        }
    );


    // --------------------------------
    // CLEAR FILTERS
    // --------------------------------

    const clearButton =
        document.getElementById("clearFilters");


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                // Clear search
                searchInput.value = "";


                // Reset category
                selectedCategory = "all";


                // Reset active button
                filterButtons.forEach(function (button) {

                    if (button.dataset.filter === "all") {
                        button.classList.add("active");
                    } else {
                        button.classList.remove("active");
                    }

                });


                // Show all products
                applyFilters();
            }
        );
    }
}


// ========================================
// NEWSLETTER AND CONTACT FORMS
// ========================================

function setupForms() {

    // --------------------------------
    // NEWSLETTER FORM
    // --------------------------------

    const newsletterForm =
        document.getElementById("newsletterForm");


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const emailInput =
                    document.getElementById("newsletterEmail");

                const message =
                    document.getElementById("newsletterMessage");


                if (message) {

                    message.textContent =
                        "You're on the list. Welcome to Nostra.";
                }


                if (emailInput) {
                    emailInput.value = "";
                }
            }
        );
    }


    // --------------------------------
    // CONTACT FORM
    // --------------------------------

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const status =
                    document.getElementById(
                        "contactMessageStatus"
                    );


                if (status) {

                    status.textContent =
                        "Thank you. Your message has been received.";
                }


                contactForm.reset();
            }
        );
    }
}


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

function setupRevealAnimation() {

    const revealElements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");
                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        observer.observe(element);
    });
}


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Display products
        renderHomeProducts();

        renderCollections();

        // Display cart
        renderCart();

        // Setup buttons
        setupInteractions();

        // Setup search and filters
        setupCollectionFilters();

        // Setup forms
        setupForms();

        // Setup animations
        setupRevealAnimation();
    }
);