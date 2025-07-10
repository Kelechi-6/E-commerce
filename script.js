// Cart functionality
const cart = []
let cartCount = 0

// DOM Elements
const cartCountElement = document.getElementById("cartCount")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const signupForm = document.getElementById("signupForm")

// Add to cart function
function addToCart(productName, price) {
  const product = {
    name: productName,
    price: price,
    id: Date.now(), // Simple ID generation
  }

  cart.push(product)
  cartCount++
  updateCartDisplay()
  showSuccessMessage(`${productName} added to cart!`)
}

// Update cart display
function updateCartDisplay() {
  cartCountElement.textContent = cartCount

  // Add animation to cart icon
  cartCountElement.parentElement.style.transform = "scale(1.2)"
  setTimeout(() => {
    cartCountElement.parentElement.style.transform = "scale(1)"
  }, 200)
}

// Show success message
function showSuccessMessage(message) {
  // Create success message element if it doesn't exist
  let successMsg = document.querySelector(".success-message")
  if (!successMsg) {
    successMsg = document.createElement("div")
    successMsg.className = "success-message"
    document.body.appendChild(successMsg)
  }

  successMsg.textContent = message
  successMsg.classList.add("show")

  // Hide message after 3 seconds
  setTimeout(() => {
    successMsg.classList.remove("show")
  }, 3000)
}

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")

  if (mobileMenu.classList.contains("active")) {
    icon.className = "fas fa-times"
  } else {
    icon.className = "fas fa-bars"
  }
})

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    mobileMenuBtn.querySelector("i").className = "fas fa-bars"
  })
})

// Smooth scrolling for anchor links
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

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Form submission
signupForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  // Simulate form submission
  this.classList.add("loading")

  setTimeout(() => {
    this.classList.remove("loading")
    showSuccessMessage("Thank you for signing up! We'll keep you updated with our latest deals.")
    this.reset()
  }, 1500)
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe product cards for animation
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
})

// Add loading state to buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...'
    this.disabled = true

    setTimeout(() => {
      this.innerHTML = originalText
      this.disabled = false
    }, 1000)
  })
})

// Search functionality (basic)
function searchProducts(query) {
  const products = document.querySelectorAll(".product-card")
  const searchTerm = query.toLowerCase()

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase()
    if (productName.includes(searchTerm)) {
      product.style.display = "block"
    } else {
      product.style.display = "none"
    }
  })
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Press 'C' to focus on cart
  if (e.key.toLowerCase() === "c" && !e.target.matches("input, textarea")) {
    document.querySelector(".cart-icon").focus()
  }

  // Press 'S' to focus on signup form
  if (e.key.toLowerCase() === "s" && !e.target.matches("input, textarea")) {
    document.querySelector(".signup-form input").focus()
  }
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}



// Cart functionality
const cart = []
let cartCount = 0

// DOM Elements
const cartCountElement = document.getElementById("cartCount")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const signupForm = document.getElementById("signupForm")
const backToTopButton = document.getElementById("backToTop")
const newsletterForm = document.getElementById("newsletterForm")

// Add to cart function
function addToCart(productName, price) {
  const product = {
    name: productName,
    price: price,
    id: Date.now(), // Simple ID generation
  }

  cart.push(product)
  cartCount++
  updateCartDisplay()
  showSuccessMessage(`${productName} added to cart!`)
}

// Update cart display
function updateCartDisplay() {
  cartCountElement.textContent = cartCount

  // Add animation to cart icon
  cartCountElement.parentElement.style.transform = "scale(1.2)"
  setTimeout(() => {
    cartCountElement.parentElement.style.transform = "scale(1)"
  }, 200)
}

// Show success message
function showSuccessMessage(message) {
  // Create success message element if it doesn't exist
  let successMsg = document.querySelector(".success-message")
  if (!successMsg) {
    successMsg = document.createElement("div")
    successMsg.className = "success-message"
    document.body.appendChild(successMsg)
  }

  successMsg.textContent = message
  successMsg.classList.add("show")

  // Hide message after 3 seconds
  setTimeout(() => {
    successMsg.classList.remove("show")
  }, 3000)
}

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")

  if (mobileMenu.classList.contains("active")) {
    icon.className = "fas fa-times"
  } else {
    icon.className = "fas fa-bars"
  }
})

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    mobileMenuBtn.querySelector("i").className = "fas fa-bars"
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Back to top button
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

// Newsletter form
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = e.target.querySelector('input[type="email"]').value

  // Simulate form submission
  const button = e.target.querySelector("button")
  const originalText = button.innerHTML

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-check"></i> Subscribed!'
    button.style.background = "#27ae60"

    setTimeout(() => {
      button.innerHTML = originalText
      button.style.background = "#ff6b35"
      button.disabled = false
      e.target.reset()
    }, 2000)
  }, 1500)
})

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".feature-card, .category-card, .section-header")

  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero")
  const speed = scrolled * 0.5

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Dynamic typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80)
    }, 1000)
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Preloader
document.addEventListener("DOMContentLoaded", () => {
  // Create preloader
  const preloader = document.createElement("div")
  preloader.className = "preloader"
  preloader.innerHTML = `
      <div class="preloader-content">
          <div class="spinner"></div>
          <h2>Keecee Collection</h2>
          <p>Loading amazing products...</p>
      </div>
  `

  // Add preloader styles
  const style = document.createElement("style")
  style.textContent = `
      .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s ease;
      }
      
      .preloader-content {
          text-align: center;
          color: white;
      }
      
      .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
      }
      
      @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      }
      
      .preloader h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
      }
      
      .preloader p {
          opacity: 0.8;
      }
  `

  document.head.appendChild(style)
  document.body.appendChild(preloader)

  // Remove preloader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.remove()
      }, 500)
    }, 1000)
  })
})

// Add scroll progress indicator
document.addEventListener("DOMContentLoaded", () => {
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
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 9999;
      }
      
      .scroll-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ff6b35, #f7931e);
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
})




// DOM Elements
const backToTopButton = document.getElementById("backToTop")
const newsletterForm = document.querySelector(".newsletter-form")
const searchInput = document.querySelector(".search-input")
const cartIcon = document.querySelector(".cart-icon")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

// Cart functionality
const cartCount = 0
const cartCountElement = document.querySelector(".cart-count")

// Back to top button functionality
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

// Newsletter form submission
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = e.target.querySelector('input[type="email"]').value

  // Simulate form submission
  const button = e.target.querySelector("button")
  const originalText = button.innerHTML

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-check"></i> Subscribed!'
    button.style.background = "#27ae60"

    setTimeout(() => {
      button.innerHTML = originalText
      button.style.background = "#ff6b35"
      button.disabled = false
      e.target.reset()
      showNotification("Successfully subscribed to newsletter!")
    }, 2000)
  }, 1500)
})

// Search functionality
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchTerm = e.target.value.trim()
    if (searchTerm) {
      // Simulate search - in real app, this would redirect to search results
      showNotification(`Searching for "${searchTerm}"...`)
      setTimeout(() => {
        window.location.href = `categories.html?search=${encodeURIComponent(searchTerm)}`
      }, 1000)
    }
  }
})

// Search button functionality
document.querySelector(".search-btn").addEventListener("click", () => {
  const searchTerm = searchInput.value.trim()
  if (searchTerm) {
    showNotification(`Searching for "${searchTerm}"...`)
    setTimeout(() => {
      window.location.href = `categories.html?search=${encodeURIComponent(searchTerm)}`
    }, 1000)
  }
})

// Cart icon click
cartIcon.addEventListener("click", () => {
  showNotification("Cart functionality coming soon!")
})

// Show notification function
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector(".notification")
  if (!notification) {
    notification = document.createElement("div")
    notification.className = "notification"
    document.body.appendChild(notification)

    // Add notification styles
    const style = document.createElement("style")
    style.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification.success {
        background: #27ae60;
      }
      
      .notification.error {
        background: #e74c3c;
      }
    `
    document.head.appendChild(style)
  }

  notification.textContent = message
  notification.classList.add("show")

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
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

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements
  const animatedElements = document.querySelectorAll(
    ".category-card, .featured-text, .featured-image, .benefits-text, .brand-card, .section-header",
  )

  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  // Add stagger animation to category cards
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Category card click tracking
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (!e.target.closest(".category-btn")) {
      // If not clicking the button, trigger the button click
      const button = card.querySelector(".category-btn")
      if (button) {
        button.click()
      }
    }
  })
})

// Add hover sound effect (optional)
document.querySelectorAll(".category-card, .cta-button, .brand-cta").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    // Add subtle scale effect
    element.style.transform = "scale(1.02)"
  })

  element.addEventListener("mouseleave", () => {
    element.style.transform = "scale(1)"
  })
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Press 'S' to focus on search
  if (e.key.toLowerCase() === "s" && !e.target.matches("input, textarea")) {
    e.preventDefault()
    searchInput.focus()
  }

  // Press 'C' to focus on cart
  if (e.key.toLowerCase() === "c" && !e.target.matches("input, textarea")) {
    e.preventDefault()
    cartIcon.focus()
  }

  // Press 'Escape' to clear search
  if (e.key === "Escape" && e.target === searchInput) {
    searchInput.value = ""
    searchInput.blur()
  }
})

// Add scroll progress indicator
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>'

  const style = document.createElement("style")
  style.textContent = `
    .scroll-progress {
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.2);
      z-index: 999;
    }
    
    .scroll-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #ff6b35, #f7931e);
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
})
