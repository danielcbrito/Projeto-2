document.querySelector('.btn-abrir-menu').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.toggle('abrir-menu');
    document.querySelector('.overlay-menu').classList.toggle('abrir-menu');
});
document.querySelector('.btn-fechar').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.remove('abrir-menu');
    document.querySelector('.overlay-menu').classList.remove('abrir-menu');
});

document.querySelector('.btn-abrir-menu').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.toggle('abrir-menu');
    document.querySelector('.overlay-menu').classList.toggle('abrir-menu');
});
document.querySelector('.btn-fechar').addEventListener('click', function() {
    document.querySelector('.menu-mobile').classList.remove('abrir-menu');
    document.querySelector('.overlay-menu').classList.remove('abrir-menu');
});

document.addEventListener('DOMContentLoaded', function() {
    const btnMenu = document.getElementById('btn-menu');
    const menuMobile = document.getElementById('menu-mobile');
    const overlayMenu = document.getElementById('overlay-menu');
    const btnFecharMenu = document.querySelector('.btn-fechar-menu'); // Seleciona pela classe

    function toggleMenu() {
        menuMobile.classList.toggle('abrir');
        overlayMenu.classList.toggle('abrir');
        document.body.classList.toggle('menu-aberto'); // Adiciona ou remove classe no body
    }

    btnMenu.addEventListener('click', toggleMenu);

    overlayMenu.addEventListener('click', toggleMenu);

    btnFecharMenu.addEventListener('click', toggleMenu);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Mobile Logic ---
    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-mobile');
    const overlay = document.getElementById('overlay-menu');
    const btnFecharMenu = menu?.querySelector('.btn-fechar-menu'); // Use optional chaining
    const menuLinks = menu?.querySelectorAll('nav ul li a');

    function fecharMenu() {
        menu?.classList.remove('abrir');
        overlay?.classList.remove('abrir');
    }

    if (btnMenu && menu && overlay) {
        btnMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering overlay click if menu icon is inside overlay area
            menu.classList.add('abrir');
            overlay.classList.add('abrir');
        });

        overlay.addEventListener('click', fecharMenu);
    }
    if (btnFecharMenu) {
        btnFecharMenu.addEventListener('click', fecharMenu);
    }
    if (menuLinks) {
        menuLinks.forEach(link => {
            link.addEventListener('click', fecharMenu); // Close menu on link click
        });
    }

    // --- Carousel Logic ---
    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrossel = document.getElementById('cursosCarrossel');
    const cursos = carrossel?.querySelectorAll('.curso-card'); // Select cards inside carousel
    const indicadoresContainer = document.getElementById('carrosselIndicators');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProximo = document.getElementById('btnProximo');

    if (!carrossel || !cursos || cursos.length === 0) {
        console.warn("Carousel elements not found or empty.");
        // Optionally hide controls if carousel is empty
        if (carrosselContainer) carrosselContainer.style.display = 'none';
        return; // Exit if carousel doesn't exist or has no items
    }

    let currentIndex = 0;
    let cardWidth = 0; // Includes margin
    let totalCards = cursos.length;
    let isMobile = false;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationFrameID = null; // For optimized dragging

    function calculateDimensions() {
        isMobile = window.innerWidth <= 768;

        // Get the first card for measurements
        const firstCard = cursos[0];
        if (!firstCard) return;

        // Calculate the full width including margin-right
        const style = window.getComputedStyle(firstCard);
        const marginRight = parseFloat(style.marginRight) || 0;

        if (isMobile) {
             // On mobile, card width might be percentage based, use offsetWidth
             // And add margin calculation based on CSS (% of container or fixed)
             // Let's assume the flex basis % calculation works, use offsetWidth directly
             cardWidth = firstCard.offsetWidth + marginRight; // Might need adjustment if margins are complex %
             // For the mobile CSS: flex: 0 0 88%; margin-left: 6%; margin-right: 6%;
             // Width = 88% of container. Margin-right = 6% of container.
             // A more precise calculation might be needed if this isn't consistent.
        } else {
             // On desktop, use the fixed width + margin
             cardWidth = firstCard.offsetWidth + marginRight; // Should be 300 + 20 = 320
        }


        // Reset drag variables and initial position
        currentTranslate = currentIndex * cardWidth * -1; // Initial position based on index
        prevTranslate = currentTranslate;
        carrossel.style.transform = `translateX(${currentTranslate}px)`; // Set initial position without animation

        // Debugging
        // console.log(`Recalculated - Mobile: ${isMobile}, Card Width: ${cardWidth}, Index: ${currentIndex}, Translate: ${currentTranslate}`);

        createIndicators();
        updateNavButtons();
    }

    function createIndicators() {
        if (!indicadoresContainer || !isMobile) {
            if(indicadoresContainer) indicadoresContainer.innerHTML = ''; // Clear if not mobile
            return;
        }
        indicadoresContainer.innerHTML = ''; // Clear existing
        for (let i = 0; i < totalCards; i++) {
            const indicador = document.createElement('div');
            indicador.className = 'indicador';
            indicador.addEventListener('click', () => goToCard(i));
            indicadoresContainer.appendChild(indicador);
        }
        updateIndicators();
    }

    function updateIndicators() {
        if (!indicadoresContainer || !isMobile) return;
        const indicadores = indicadoresContainer.querySelectorAll('.indicador');
        indicadores.forEach((ind, i) => {
            ind.classList.toggle('ativo', i === currentIndex);
        });
    }

    function updateNavButtons() {
        if (!btnAnterior || !btnProximo) return;
        btnAnterior.disabled = currentIndex === 0;
        // Disable next if the *last* card is already the last one visible
        // This logic depends on how many cards fit. Let's simplify: disable if index is last card.
        // A more complex logic would check if (currentIndex + cardsPerPage >= totalCards)
        btnProximo.disabled = currentIndex === totalCards - 1; // Can't go past the last card
    }

    function setPosition(animate = true) {
        // Calculate the target translation
        const targetTranslate = currentIndex * cardWidth * -1;

        if (animate) {
            carrossel.style.transition = 'transform 0.4s ease-in-out'; // Use CSS transition
            carrossel.style.transform = `translateX(${targetTranslate}px)`;
        } else {
            carrossel.style.transition = 'none'; // Disable transition for immediate set (like drag)
            carrossel.style.transform = `translateX(${targetTranslate}px)`;
        }
        currentTranslate = targetTranslate; // Update current position tracker

        // Update controls after position is set
        updateIndicators();
        updateNavButtons();
    }


    function nextCard() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            setPosition(true); // Animate to new position
        }
         // console.log("Next -> Index:", currentIndex);
    }

    function prevCard() {
        if (currentIndex > 0) {
            currentIndex--;
            setPosition(true); // Animate to new position
        }
         // console.log("Prev -> Index:", currentIndex);
    }

    function goToCard(index) {
        if (index >= 0 && index < totalCards) {
            currentIndex = index;
            setPosition(true); // Animate to new position
        }
         // console.log("GoTo -> Index:", currentIndex);
    }

    // --- Touch Event Handling ---
    function touchStart(index) {
        return function(event) {
            if (!isMobile) return; // Only handle touch on mobile per design
            isDragging = true;
            startX = event.touches[0].clientX;
            prevTranslate = currentTranslate; // Store position before drag starts
            carrossel.style.transition = 'none'; // Disable animation during drag
            animationFrameID = requestAnimationFrame(animationTick); // Start drag animation loop
            // console.log("Touch Start");
        }
    }

    function touchMove(event) {
        if (!isDragging || !isMobile) return;
        const currentX = event.touches[0].clientX;
        const moveDiff = currentX - startX;
        currentTranslate = prevTranslate + moveDiff; // Calculate new position based on drag start
        // No need to update style here, animationTick handles it
    }

    function animationTick() {
        if (!isDragging) return;
        // Apply transform smoothly during drag using rAF
        carrossel.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(animationTick); // Continue loop
    }


    function touchEnd() {
        if (!isDragging || !isMobile) return;

        cancelAnimationFrame(animationFrameID); // Stop the animation loop
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // Determine swipe direction and threshold
        const threshold = cardWidth / 4; // Example threshold: 1/4th card width

        if (movedBy < -threshold && currentIndex < totalCards - 1) {
            // Swiped left (Next)
            currentIndex++;
        } else if (movedBy > threshold && currentIndex > 0) {
            // Swiped right (Previous)
            currentIndex--;
        }
        // Else: Snap back to the original currentIndex if swipe wasn't enough

        setPosition(true); // Animate to the final determined index
        // console.log("Touch End -> Moved:", movedBy.toFixed(2), "New Index:", currentIndex);
    }


    // --- Initialization ---
    // Initial calculation
    calculateDimensions();

    // Add listeners for buttons
    if (btnProximo) btnProximo.addEventListener('click', nextCard);
    if (btnAnterior) btnAnterior.addEventListener('click', prevCard);

    // Add listeners for touch events (only active on mobile via isMobile check inside handlers)
    carrossel.addEventListener('touchstart', touchStart(currentIndex), { passive: true });
    carrossel.addEventListener('touchmove', touchMove, { passive: true });
    carrossel.addEventListener('touchend', touchEnd);
    carrossel.addEventListener('touchcancel', touchEnd); // Handle cancel same as end

    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        // Debounce resize event
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            calculateDimensions();
        }, 250); // Wait 250ms after last resize event
    });

    // Recalculate after a short delay to ensure layout stability
    setTimeout(calculateDimensions, 100);

}); // End DOMContentLoaded