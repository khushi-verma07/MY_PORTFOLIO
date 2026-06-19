document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DYNAMIC TYPING EFFECT ---
    const typingElement = document.getElementById('typingText');
    const phrases = ["Responsive Web Apps.", "Scalable Database Systems.", "Interactive Interfaces.", "MERN Stack Solutions."];
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            typingElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle typing state transitions
        if (!isDeleting && characterIndex === currentPhrase.length) {
            // Full phrase is typed, wait before starting to delete
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Small delay before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingElement) {
        typeEffect();
    }


    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on init


    // --- 3. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu on link click (mobile)
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }


    // --- 4. SCROLL FADE-IN ANIMATIONS (INTERSECTION OBSERVER) ---
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });


    // --- 5. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 6. SKILLS FILTERING LOGIC ---
    const skillCategoryBtns = document.querySelectorAll('.skills-category-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillCategoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            skillCategoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation reset
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = null;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- 7. PROJECTS FILTERING LOGIC ---
    const projectFilterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                
                if (filterValue === 'all' || cardType === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = null;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- 8. RESUME MODAL HANDLER ---
    const resumeModal = document.getElementById('resumeModal');
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');

    if (viewResumeBtn && resumeModal && closeResumeBtn) {
        viewResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop page scroll
        });

        const closeModalFunc = () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = ''; // Resume scroll
        };

        closeResumeBtn.addEventListener('click', closeModalFunc);
        
        // Close modal when clicking outside contents
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModalFunc();
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeModalFunc();
            }
        });
    }


    // --- 9. CONTACT FORM HANDLER WITH CUSTOM NOTIFICATION ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Simple validation helper
            function validateField(input) {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            }

            validateField(nameInput);
            validateField(emailInput);
            validateField(subjectInput);
            validateField(messageInput);

            // Simple email structure match
            if (emailInput.value.trim() && !emailInput.value.includes('@')) {
                emailInput.style.borderColor = '#ef4444';
                isValid = false;
            }

            if (isValid) {
                // Mocking submit success visual alert
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending Message <i class="fa-solid fa-spinner fa-spin"></i>';

                fetch("https://formsubmit.co/ajax/khushivrma07@gmail.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: nameInput.value,
                        email: emailInput.value,
                        subject: subjectInput.value,
                        message: messageInput.value
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Create beautiful success banner alert
                    const alertBanner = document.createElement('div');
                    alertBanner.style.position = 'fixed';
                    alertBanner.style.bottom = '24px';
                    alertBanner.style.right = '24px';
                    alertBanner.style.background = '#10b981';
                    alertBanner.style.color = '#ffffff';
                    alertBanner.style.padding = '16px 24px';
                    alertBanner.style.borderRadius = '8px';
                    alertBanner.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    alertBanner.style.zIndex = '9999';
                    alertBanner.style.fontSize = '14px';
                    alertBanner.style.fontWeight = '600';
                    alertBanner.style.display = 'flex';
                    alertBanner.style.alignItems = 'center';
                    alertBanner.style.gap = '10px';
                    alertBanner.style.transform = 'translateY(100px)';
                    alertBanner.style.transition = 'transform 0.4s ease';
                    alertBanner.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Message sent successfully.';
                    
                    document.body.appendChild(alertBanner);
                    
                    // Trigger slide in
                    setTimeout(() => {
                        alertBanner.style.transform = 'translateY(0)';
                    }, 50);

                    // Reset form
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;

                    // Remove banner
                    setTimeout(() => {
                        alertBanner.style.transform = 'translateY(150px)';
                        setTimeout(() => {
                            alertBanner.remove();
                        }, 500);
                    }, 4000);
                })
                .catch(error => {
                    console.error("Error sending message:", error);
                    // Create error banner alert
                    const errorBanner = document.createElement('div');
                    errorBanner.style.position = 'fixed';
                    errorBanner.style.bottom = '24px';
                    errorBanner.style.right = '24px';
                    errorBanner.style.background = '#ef4444';
                    errorBanner.style.color = '#ffffff';
                    errorBanner.style.padding = '16px 24px';
                    errorBanner.style.borderRadius = '8px';
                    errorBanner.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    errorBanner.style.zIndex = '9999';
                    errorBanner.style.fontSize = '14px';
                    errorBanner.style.fontWeight = '600';
                    errorBanner.style.display = 'flex';
                    errorBanner.style.alignItems = 'center';
                    errorBanner.style.gap = '10px';
                    errorBanner.style.transform = 'translateY(100px)';
                    errorBanner.style.transition = 'transform 0.4s ease';
                    errorBanner.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Error sending message. Please try again.';
                    
                    document.body.appendChild(errorBanner);
                    
                    setTimeout(() => {
                        errorBanner.style.transform = 'translateY(0)';
                    }, 50);

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;

                    setTimeout(() => {
                        errorBanner.style.transform = 'translateY(150px)';
                        setTimeout(() => {
                            errorBanner.remove();
                        }, 500);
                    }, 4000);
                });
            }
        });

        // Reset error outline when user types
        contactForm.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    }

    // --- 10. CUSTOM INTERACTIVE CURSOR ---
    const cursorDot = document.getElementById('cursorDot');
    const cursorCircle = document.getElementById('cursorCircle');

    if (cursorDot && cursorCircle) {
        let mouseX = 0;
        let mouseY = 0;
        let circleX = 0;
        let circleY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor elements on first move
            cursorDot.style.opacity = '1';
            cursorCircle.style.opacity = '1';

            // Positioning dot immediately
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Animation frame loop for smooth trailing effect
        function animateCursor() {
            // Interpolation factor (0.15 creates a soft glide trail)
            const lerpFactor = 0.15;
            circleX += (mouseX - circleX) * lerpFactor;
            circleY += (mouseY - circleY) * lerpFactor;

            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCursor);
        }

        // Start the loop
        animateCursor();

        // Hide cursors when leaving viewport
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorCircle.style.opacity = '0';
        });

        // Add hover effects on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .social-link, .skills-category-btn, .filter-btn, .resume-close-btn');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovered');
                cursorCircle.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovered');
                cursorCircle.classList.remove('hovered');
            });
        });
    }
});
