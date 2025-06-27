document.addEventListener('DOMContentLoaded', () => {

    // --- DYNAMIC FOOTER YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- ACCORDION FUNCTIONALITY (for .pillar-item on index.html) ---
    const accordionItems = document.querySelectorAll('.pillar-item'); // Targets items in "Pillars of Obscura"

    accordionItems.forEach(item => {
        const title = item.querySelector('.pillar-title');
        const content = item.querySelector('.pillar-content');

        if (title && content) { // Ensure both elements exist
            title.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Optional: Close other active items if you want only one open at a time
                // accordionItems.forEach(otherItem => {
                //     if (otherItem !== item && otherItem.classList.contains('active')) {
                //         otherItem.classList.remove('active');
                //         const otherContent = otherItem.querySelector('.pillar-content');
                //         if (otherContent) {
                //            otherContent.style.maxHeight = null;
                //            otherContent.style.paddingTop = null;
                //            otherContent.style.paddingBottom = null;
                //         }
                //     }
                // });

                item.classList.toggle('active');

                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.paddingTop = "15px"; // Consistent with CSS transition
                    content.style.paddingBottom = "20px"; // Consistent with CSS transition
                } else {
                    content.style.maxHeight = null;
                    content.style.paddingTop = null;
                    content.style.paddingBottom = null;
                }
            });
        }
    });

    // --- SCROLL-IN ANIMATIONS ---
    // Updated selector to match all animatable elements defined in CSS
    const animatedElements = document.querySelectorAll(
        '.focus-card, .pillar-item, .section-title, .manifesto-title, .manifesto-text, .join-vision-section > .container > *, .detail-content-wrapper > *, .downloads-form-container, .download-item'
    );

    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observerInstance.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.1 }); // Adjust threshold: 0.1 means 10% of element is visible

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers or if no elements to animate: make them visible
        animatedElements.forEach(el => {
            el.classList.add('animate-in'); // Or just remove opacity/transform if that's easier
        });
    }


    // --- HERO TEXT GLITCH (for H1/H2 on index.html) ---
    const heroH1 = document.querySelector('.hero-section .hero-content h1');
    const heroH2 = document.querySelector('.hero-section .hero-content h2');
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________'; // Characters for glitch

    function randomChar() {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }

    function applyTextGlitch(element, intensity = 0.1, duration = 50) {
        if (!element || !element.dataset.originalText) return;

        const originalText = element.dataset.originalText;
        let iteration = 0;
        const interval = setInterval(() => {
            element.textContent = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration || Math.random() > intensity) {
                        return originalText[index];
                    }
                    return randomChar();
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText; // Ensure it settles on original
            }
            iteration += 1 / 2; // Speed of reveal (1/3 is slower, 1 is faster)
        }, duration);
    }

    // Apply initial glitch to hero H1 and H2 if they exist
    if (heroH1) applyTextGlitch(heroH1, 0.3, 30);
    if (heroH2) applyTextGlitch(heroH2, 0.25, 35);


    // Optional: Re-glitch hero text periodically for a "live" effect
    // This can be performance-intensive, use with caution or on specific interactions
    // function liveHeroGlitches() {
    //     if (heroH1) {
    //         setInterval(() => applyTextGlitch(heroH1, 0.3, 30), 7000 + Math.random() * 3000); // Random interval
    //     }
    //     if (heroH2) {
    //         setInterval(() => applyTextGlitch(heroH2, 0.25, 35), 8000 + Math.random() * 3000); // Random interval
    //     }
    // }
    // setTimeout(liveHeroGlitches, 5000); // Start live glitches after an initial pause

});