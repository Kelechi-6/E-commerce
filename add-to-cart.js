// Guard against ethereum property redefinition
;(function patchEthereumRedefinition() {
  const { defineProperty } = Object

  Object.defineProperty = (obj, prop, descriptor) => {
    if (obj === window && prop === "ethereum") {
      const current = Object.getOwnPropertyDescriptor(window, "ethereum")
      if (current && current.configurable === false) {
        return window.ethereum
      }
    }
    return defineProperty.call(Object, obj, prop, descriptor)
  }
})()

// Shopping Cart Class - Enhanced version of your existing cart
class KeeceeCart {
  constructor() {
    // Use existing cart data or initialize empty
    this.cart = JSON.parse(localStorage.getItem("keeceeCart")) || []
    this.deliveryFee = 2500
    this.promoCodes = {
      KEECEE10: 0.1,
      WELCOME: 0.05,
      SAVE15: 0.15,
      NEWUSER: 0.2,
    }
    this.appliedPromo = null

    this.init()
  }

  init() {
    this.updateCartCount()
    this.renderCart()
    this.bindEvents()
    this.initMobileMenu()
    this.initScrollEffects()
    this.initAnimations()
  }

  bindEvents() {
    // Clear cart
    const clearCartBtn = document.getElementById("clearCartBtn")
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        this.clearCart()
      })
    }

    // Checkout
    const checkoutBtn = document.getElementById("checkoutBtn")
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        this.showCheckoutModal()
      })
    }

    // Promo code
    const applyPromoBtn = document.getElementById("applyPromoBtn")
    if (applyPromoBtn) {
      applyPromoBtn.addEventListener("click", () => {
        this.applyPromoCode()
      })
    }

    // Modal events
    const closeModalBtn = document.getElementById("closeModalBtn")
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        this.hideCheckoutModal()
      })
    }

    const cancelBtn = document.getElementById("cancelBtn")
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.hideCheckoutModal()
      })
    }

    // Checkout form
    const checkoutForm = document.getElementById("checkoutForm")
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.processOrder()
      })
    }

    // Continue shopping
    const continueShoppingBtn = document.getElementById("continueShoppingBtn")
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener("click", () => {
        this.hideSuccessModal()
        this.clearCart()
        window.location.href = "categories.html"
      })
    }

    // Close modals on overlay click
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show")
        }
      })
    })

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.show").forEach((modal) => {
          modal.classList.remove("show")
        })
      }
    })
  }

  // Add item to cart (enhanced version of your existing function)
  addToCart(productName, price, image = "image/default.jpg") {
    const existingItem = this.cart.find((item) => item.name === productName)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({
        id: Date.now(),
        name: productName,
        price: price,
        image: image,
        quantity: 1,
      })
    }

    this.saveCart()
    this.updateCartCount()
    this.renderCart()
    this.showSuccessMessage(`${productName} added to cart!`)
  }

  // Remove item from cart
  removeFromCart(id) {
    this.cart = this.cart.filter((item) => item.id !== id)
    this.saveCart()
    this.updateCartCount()
    this.renderCart()
    this.showNotification("Item removed from cart", "error")
  }

  // Update item quantity
  updateQuantity(id, quantity) {
    const item = this.cart.find((item) => item.id === id)
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(id)
      } else {
        item.quantity = quantity
        this.saveCart()
        this.renderCart()
      }
    }
  }

  // Clear entire cart
  clearCart() {
    if (this.cart.length === 0) {
      this.showNotification("Cart is already empty", "error")
      return
    }

    if (confirm("Are you sure you want to clear your cart?")) {
      this.cart = []
      this.appliedPromo = null
      this.saveCart()
      this.updateCartCount()
      this.renderCart()
      this.showNotification("Cart cleared successfully", "success")
    }
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem("keeceeCart", JSON.stringify(this.cart))
  }

  // Update cart count in header (compatible with your existing code)
  updateCartCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0)
    const cartCountElement = document.getElementById("cartCount")
    if (cartCountElement) {
      cartCountElement.textContent = count

      // Add animation like your existing code
      const cartIcon = cartCountElement.parentElement
      if (cartIcon) {
        cartIcon.style.transform = "scale(1.2)"
        setTimeout(() => {
          cartIcon.style.transform = "scale(1)"
        }, 200)
      }
    }
  }

  // Render cart items
  renderCart() {
    const emptyCart = document.getElementById("emptyCart")
    const cartContent = document.getElementById("cartContent")
    const cartItems = document.getElementById("cartItems")
    const itemsCount = document.getElementById("itemsCount")

    if (!cartItems) return // Not on cart page

    if (this.cart.length === 0) {
      if (emptyCart) emptyCart.style.display = "block"
      if (cartContent) cartContent.style.display = "none"
      return
    }

    if (emptyCart) emptyCart.style.display = "none"
    if (cartContent) cartContent.style.display = "block"

    // Update items count
    const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0)
    if (itemsCount) {
      itemsCount.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`
    }

    // Render cart items
    cartItems.innerHTML = this.cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='image/default.jpg'">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">₦${item.price.toLocaleString()}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="keeceeCart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="keeceeCart.updateQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="keeceeCart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="item-total">₦${(item.price * item.quantity).toLocaleString()}</div>
                <button class="remove-item" onclick="keeceeCart.removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `,
      )
      .join("")

    this.updateSummary()
  }

  // Update order summary
  updateSummary() {
    const subtotal = this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    let discount = 0

    if (this.appliedPromo) {
      discount = subtotal * this.promoCodes[this.appliedPromo]
    }

    const total = subtotal + this.deliveryFee - discount

    const subtotalEl = document.getElementById("subtotal")
    const deliveryEl = document.getElementById("delivery")
    const totalEl = document.getElementById("total")
    const discountRow = document.getElementById("discountRow")
    const discountEl = document.getElementById("discount")

    if (subtotalEl) subtotalEl.textContent = `₦${subtotal.toLocaleString()}`
    if (deliveryEl) deliveryEl.textContent = `₦${this.deliveryFee.toLocaleString()}`
    if (totalEl) totalEl.textContent = `₦${total.toLocaleString()}`

    // Show/hide discount row
    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = "flex"
        discountEl.textContent = `-₦${discount.toLocaleString()}`
      } else {
        discountRow.style.display = "none"
      }
    }
  }

  // Apply promo code
  applyPromoCode() {
    const promoInput = document.getElementById("promoCode")
    const code = promoInput.value.trim().toUpperCase()

    if (!code) {
      this.showPromoMessage("Please enter a promo code", "error")
      return
    }

    if (this.promoCodes[code]) {
      if (this.appliedPromo === code) {
        this.showPromoMessage("This promo code is already applied", "error")
        return
      }

      this.appliedPromo = code
      const discount = this.promoCodes[code] * 100
      this.showPromoMessage(`Promo code applied! You saved ${discount}%`, "success")
      this.updateSummary()
      promoInput.value = ""
    } else {
      this.showPromoMessage("Invalid promo code", "error")
    }
  }

  // Show promo message
  showPromoMessage(message, type) {
    const promoMessage = document.getElementById("promoMessage")
    if (promoMessage) {
      promoMessage.textContent = message
      promoMessage.className = `promo-message ${type}`

      setTimeout(() => {
        promoMessage.textContent = ""
        promoMessage.className = "promo-message"
      }, 3000)
    }
  }

  // Show checkout modal
  showCheckoutModal() {
    if (this.cart.length === 0) {
      this.showNotification("Your cart is empty", "error")
      return
    }

    const modal = document.getElementById("checkoutModal")
    const summaryItems = document.getElementById("modalSummaryItems")
    const modalTotal = document.getElementById("modalTotal")

    if (!modal) return

    // Populate order summary in modal
    if (summaryItems) {
      summaryItems.innerHTML = this.cart
        .map(
          (item) => `
              <div class="modal-summary-item">
                  <span>${item.name} x ${item.quantity}</span>
                  <span>₦${(item.price * item.quantity).toLocaleString()}</span>
              </div>
          `,
        )
        .join("")
    }

    const subtotal = this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    let discount = 0
    if (this.appliedPromo) {
      discount = subtotal * this.promoCodes[this.appliedPromo]
    }
    const total = subtotal + this.deliveryFee - discount

    if (modalTotal) {
      modalTotal.textContent = `₦${total.toLocaleString()}`
    }

    modal.classList.add("show")
  }

  // Hide checkout modal
  hideCheckoutModal() {
    const modal = document.getElementById("checkoutModal")
    if (modal) {
      modal.classList.remove("show")
    }
  }

  // Show success modal
  showSuccessModal() {
    const modal = document.getElementById("successModal")
    const orderId = document.getElementById("orderId")
    const orderTotal = document.getElementById("orderTotal")

    if (!modal) return

    // Generate order ID
    const orderNumber = "KC-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6)
    if (orderId) {
      orderId.textContent = "#" + orderNumber
    }

    const subtotal = this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    let discount = 0
    if (this.appliedPromo) {
      discount = subtotal * this.promoCodes[this.appliedPromo]
    }
    const total = subtotal + this.deliveryFee - discount

    if (orderTotal) {
      orderTotal.textContent = `₦${total.toLocaleString()}`
    }

    modal.classList.add("show")
  }

  // Hide success modal
  hideSuccessModal() {
    const modal = document.getElementById("successModal")
    if (modal) {
      modal.classList.remove("show")
    }
  }

  // Process order
  processOrder() {
    const form = document.getElementById("checkoutForm")
    if (!form) return

    // Basic form validation
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    // Show loading state
    const submitBtn = form.querySelector(".place-order-btn")
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<div class="spinner"></div> Processing...'
    submitBtn.disabled = true

    // Simulate order processing
    setTimeout(() => {
      this.hideCheckoutModal()
      this.showSuccessModal()

      // Reset form
      form.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  }

  // Show success message (compatible with your existing function)
  showSuccessMessage(message) {
    let successMsg = document.querySelector(".success-message")
    if (!successMsg) {
      successMsg = document.createElement("div")
      successMsg.className = "success-message"
      successMsg.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 300px;
    `
      document.body.appendChild(successMsg)
    }

    successMsg.textContent = message
    successMsg.classList.add("show")
    successMsg.style.transform = "translateX(0)"

    setTimeout(() => {
      successMsg.classList.remove("show")
      successMsg.style.transform = "translateX(400px)"
    }, 3000)
  }

  // Show notification (enhanced version of your existing function)
  showNotification(message, type = "success") {
    let notification = document.querySelector(".notification")
    if (!notification) {
      notification = document.createElement("div")
      notification.className = "notification"
      notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 300px;
      color: white;
    `
      document.body.appendChild(notification)
    }

    notification.style.background = type === "error" ? "#e74c3c" : "#28a745"
    notification.textContent = message
    notification.classList.add("show")
    notification.style.transform = "translateX(0)"

    setTimeout(() => {
      notification.classList.remove("show")
      notification.style.transform = "translateX(400px)"
    }, 3000)
  }

  // Initialize mobile menu (from your existing code)
  initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const mobileMenu = document.getElementById("mobileMenu")

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("show")
        const icon = mobileMenuBtn.querySelector("i")

        if (mobileMenu.classList.contains("show")) {
          icon.className = "fas fa-times"
          mobileMenu.style.display = "flex"
        } else {
          icon.className = "fas fa-bars"
          mobileMenu.style.display = "none"
        }
      })

      // Close mobile menu when clicking on links
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("show")
          mobileMenu.style.display = "none"
          mobileMenuBtn.querySelector("i").className = "fas fa-bars"
        })
      })
    }
  }

  // Initialize scroll effects (from your existing code)
  initScrollEffects() {
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar")
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.style.background = "rgba(255, 255, 255, 0.98)"
          navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
        } else {
          navbar.style.background = "rgba(255, 255, 255, 0.95)"
          navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
        }
      }
    })

    // Back to top button
    const backToTopButton = document.getElementById("backToTop")
    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add("show")
        } else {
          backToTopButton.classList.remove("show")
        }
      })

      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }

    // Scroll progress indicator
    this.initScrollProgress()
  }

  // Initialize scroll progress (from your existing code)
  initScrollProgress() {
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>'

    const style = document.createElement("style")
    style.textContent = `
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255, 255, 255, 0.2);
        z-index: 999;
      }
      
      .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0%;
        transition: width 0.1s ease;
      }
    `

    document.head.appendChild(style)
    document.body.appendChild(progressBar)

    const progressBarFill = progressBar.querySelector(".scroll-progress-bar")

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      progressBarFill.style.width = scrollPercent + "%"
    })
  }

  // Initialize animations (from your existing code)
  initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(".cart-item, .cart-summary, .payment-methods")
    animatedElements.forEach((el, index) => {
      el.classList.add("fade-in")
      el.style.transitionDelay = `${index * 0.1}s`
      observer.observe(el)
    })
  }
}

// Hide toast function (global)
function hideToast() {
  const toast = document.getElementById("toast")
  if (toast) {
    toast.classList.remove("show")
  }
}

// Global addToCart function (enhanced version of your existing function)
function addToCart(productName, price, image) {
  if (typeof keeceeCart !== "undefined") {
    keeceeCart.addToCart(productName, price, image)
  } else {
    // If cart not initialized, store in localStorage temporarily
    const tempCart = JSON.parse(localStorage.getItem("keeceeCart")) || []
    const existingItem = tempCart.find((item) => item.name === productName)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      tempCart.push({
        id: Date.now(),
        name: productName,
        price: price,
        image: image || "image/default.jpg",
        quantity: 1,
      })
    }

    localStorage.setItem("keeceeCart", JSON.stringify(tempCart))

    // Update cart count if element exists
    const cartCount = document.getElementById("cartCount")
    if (cartCount) {
      const count = tempCart.reduce((total, item) => total + item.quantity, 0)
      cartCount.textContent = count

      // Add animation
      const cartIcon = cartCount.parentElement
      if (cartIcon) {
        cartIcon.style.transform = "scale(1.2)"
        setTimeout(() => {
          cartIcon.style.transform = "scale(1)"
        }, 200)
      }
    }

    // Show success message
    showSuccessMessage(`${productName} added to cart!`)
  }
}

// Show success message function (global, from your existing code)
function showSuccessMessage(message) {
  let successMsg = document.querySelector(".success-message")
  if (!successMsg) {
    successMsg = document.createElement("div")
    successMsg.className = "success-message"
    successMsg.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 300px;
    `
    document.body.appendChild(successMsg)
  }

  successMsg.textContent = message
  successMsg.classList.add("show")
  successMsg.style.transform = "translateX(0)"

  setTimeout(() => {
    successMsg.classList.remove("show")
    successMsg.style.transform = "translateX(400px)"
  }, 3000)
}

// Smooth scrolling for anchor links (from your existing code)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Initialize cart when page loads
let keeceeCart
document.addEventListener("DOMContentLoaded", () => {
  keeceeCart = new KeeceeCart()

  // Add loading animation (from your existing code)
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})

// Keyboard shortcuts (from your existing code)
document.addEventListener("keydown", (e) => {
  // Press 'C' to focus on cart
  if (e.key.toLowerCase() === "c" && !e.target.matches("input, textarea")) {
    e.preventDefault()
    const cartIcon = document.querySelector(".cart-icon")
    if (cartIcon) {
      cartIcon.click()
    }
  }

  // Press 'S' to focus on search
  if (e.key.toLowerCase() === "s" && !e.target.matches("input, textarea")) {
    e.preventDefault()
    const searchInput = document.querySelector(".search-input")
    if (searchInput) {
      searchInput.focus()
    }
  }

  // Press 'Escape' to close modals
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.show").forEach((modal) => {
      modal.classList.remove("show")
    })
  }
})

// Export for use in other pages
if (typeof module !== "undefined" && module.exports) {
  module.exports = { KeeceeCart, addToCart }
}
