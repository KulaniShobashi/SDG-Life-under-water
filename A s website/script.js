// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = {}

      // Convert FormData to object
      for (const [key, value] of formData.entries()) {
        if (data[key]) {
          // Handle multiple values (checkboxes)
          if (Array.isArray(data[key])) {
            data[key].push(value)
          } else {
            data[key] = [data[key], value]
          }
        } else {
          data[key] = value
        }
      }

      // Simulate form submission
      console.log("[v0] Form submitted with data:", data)

      // Show success message
      showNotification("Message sent successfully! We'll get back to you soon.", "success")

      // Reset form
      this.reset()
    })
  }

  // Table row hover effects
  const tableRows = document.querySelectorAll(".species-table tbody tr")
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)"
      this.style.transition = "transform 0.2s ease"
    })

    row.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
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

  // Card hover animations
  const cards = document.querySelectorAll(".info-card, .service-card, .team-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
      this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    })
  })

  // Form validation feedback
  const inputs = document.querySelectorAll("input[required], textarea[required]")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value.trim() === "") {
        this.style.borderColor = "#ef4444"
      } else {
        this.style.borderColor = "#10b981"
      }
    })

    input.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.style.borderColor = "#10b981"
      }
    })
  })

  // Interactive topic cards
  const topicCards = document.querySelectorAll(".topic-card")
  const contentSections = document.querySelectorAll(".content-section")

  topicCards.forEach((card) => {
    const learnMoreBtn = card.querySelector(".learn-more-btn")

    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", (e) => {
        e.preventDefault()

        const topic = card.getAttribute("data-topic")
        const targetContent = document.getElementById(`${topic}-content`)

        // Hide all content sections
        contentSections.forEach((section) => {
          section.classList.remove("active")
        })

        // Show target content section
        if (targetContent) {
          targetContent.classList.add("active")

          // Smooth scroll to content
          setTimeout(() => {
            targetContent.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }, 100)
        }

        console.log(`[v0] Showing content for topic: ${topic}`)
      })
    }
  })

  // Enhanced card interactions for topic cards
  topicCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
      this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    })
  })

  // Close content sections when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".topic-card") && !e.target.closest(".content-section")) {
      contentSections.forEach((section) => {
        section.classList.remove("active")
      })
    }
  })
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    color: "white",
    fontWeight: "600",
    zIndex: "1000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    backgroundColor: type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
  })

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

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

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".info-card, .service-card, .team-card, .stat-card, .topic-card, .goal-item, .species-card, .fact-card",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
