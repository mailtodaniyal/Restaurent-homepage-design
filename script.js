    // script.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Menu tab functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItemsContainer = document.querySelector('.menu-items');
    
    // Sample menu data (in a real app, this would come from an API or CMS)
    const menuData = [
        {
            id: 1,
            name: "Vitello Tonnato",
            name_en: "Vitello Tonnato",
            description: "Fettine di vitello con salsa al tonno e capperi",
            description_en: "Veal slices with tuna sauce and capers",
            price: "€14",
            category: "starters",
            image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 2,
            name: "Agnolotti del Plin",
            name_en: "Agnolotti del Plin",
            description: "Ripieni di arrosto con burro e salvia",
            description_en: "Stuffed with roast meat with butter and sage",
            price: "€16",
            category: "pasta",
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
        },
        {
            id: 3,
            name: "Pizza Astesana",
            name_en: "Asti-style Pizza",
            description: "Mozzarella, salsiccia, funghi e tartufo nero",
            description_en: "Mozzarella, sausage, mushrooms and black truffle",
            price: "€12",
            category: "pizza",
            image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80"
        },
        {
            id: 4,
            name: "Bunet",
            name_en: "Bunet",
            description: "Dolce al cioccolato e amaretti tipico piemontese",
            description_en: "Traditional Piedmont chocolate and amaretti dessert",
            price: "€8",
            category: "desserts",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80"
        },
        {
            id: 5,
            name: "Insalata di Farro",
            name_en: "Spelt Salad",
            description: "Farro con verdure grigliate e pesto di basilico",
            description_en: "Spelt with grilled vegetables and basil pesto",
            price: "€10",
            category: "vegan",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
        },
        {
            id: 6,
            name: "Pasta al Pomodoro",
            name_en: "Tomato Pasta",
            description: "Pasta con salsa di pomodoro fresco e basilico",
            description_en: "Pasta with fresh tomato sauce and basil",
            price: "€8",
            category: "kids",
            image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
        }
    ];

    // Function to render menu items
    function renderMenuItems(category = 'all') {
        menuItemsContainer.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === category);
        
        filteredItems.forEach((item, index) => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.style.animationDelay = `${0.1 * (index + 1)}s`;
            
            menuItem.innerHTML = `
                <div class="menu-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h4 data-translate="menu_item_${item.id}">${item.name}</h4>
                        <span>${item.price}</span>
                    </div>
                    <p data-translate="menu_item_desc_${item.id}">${item.description}</p>
                </div>
            `;
            
            menuItemsContainer.appendChild(menuItem);
        });
    }
    
    // Initialize menu with all items
    renderMenuItems();
    
    // Add click event to menu tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Render items for selected category
            renderMenuItems(category);
        });
    });
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Add click event to testimonial dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let nextTestimonial = currentTestimonial + 1;
        if (nextTestimonial >= testimonials.length) {
            nextTestimonial = 0;
        }
        showTestimonial(nextTestimonial);
    }, 5000);
    
    // Form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const guests = document.getElementById('guests').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const notes = document.getElementById('notes').value;
            
            // In a real app, you would send this data to your server
            console.log('Booking submitted:', {
                name, email, phone, guests, date, time, notes
            });
            
            // Show success message
            alert('Grazie per la tua prenotazione! Ti contatteremo a breve per confermare.');
            
            // Reset form
            bookingForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real app, you would send this to your server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Grazie per esserti iscritto alla nostra newsletter!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Language switcher functionality
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // In a real app, you would implement actual translation logic here
            console.log('Language changed to:', selectedLanguage);
            
            // For demo purposes, we'll just show an alert
            alert(`Language switched to ${selectedLanguage === 'it' ? 'Italian' : 'English'}. In a real app, this would translate all text.`);
        });
    }
    
    // Cookie consent functionality
    const cookieConsent = document.querySelector('.cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    
    // Check if cookie consent was already given
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'block';
    }
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            cookieConsent.style.display = 'none';
        });
    }
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.menu-item, .highlight-card, .event-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
