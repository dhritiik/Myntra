// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle explore now button
    document.querySelector('.explore-now').addEventListener('click', () => {
        document.getElementById('trending').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Handle create mood board button
    document.querySelector('.create-mood-board').addEventListener('click', () => {
        // Redirect to mood board creation page or handle the action
        alert('Mood board creation page is not implemented yet.');
    });
});


document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        // Perform the search action, e.g., redirect to search results page
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
    } else {
        alert('Please enter a search term');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const overlayElements = document.querySelectorAll('.overlay');
    const favouritesIcon = document.getElementById('favourites-icon');

    overlayElements.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            const gridItem = overlay.parentElement;
            const imageSrc = gridItem.querySelector('img').src;
            addToFavourites(imageSrc);
        });
    });

    function addToFavourites(imageSrc) {
        let favourites = localStorage.getItem('favourites');
        if (favourites) {
            favourites = JSON.parse(favourites);
        } else {
            favourites = [];
        }
        
        if (!favourites.includes(imageSrc)) {
            favourites.push(imageSrc);
        }

        localStorage.setItem('favourites', JSON.stringify(favourites));
        updateFavouritesIcon(favourites.length);
    }

    function updateFavouritesIcon(count) {
        favouritesIcon.innerHTML = `
            <span>${count}</span>
            <img src="./images/heart.png" alt="Favourite">
        `;
        favouritesIcon.style.fontSize="10px";
        favouritesIcon.style.transform="translateY(-10px)";
    }

    function loadFavourites() {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        updateFavouritesIcon(favourites.length);
    }

    loadFavourites();
});


