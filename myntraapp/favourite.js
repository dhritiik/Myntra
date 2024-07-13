// favourites.js

//adding in favourite.html
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


//adding and removing from favourites from favourite.html
document.addEventListener('DOMContentLoaded', () => {
    const favouritesGrid = document.getElementById('favourites-grid');

    function loadFavourites() {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        displayFavourites(favourites);
    }

    function displayFavourites(favourites) {
        favouritesGrid.innerHTML = '';
        favourites.forEach((src, index) => {
            const favouriteItem = document.createElement('div');
            favouriteItem.className = 'favourite-item';
            favouriteItem.innerHTML = `
                <img src="${src}" alt="Favourite Image">
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            favouritesGrid.appendChild(favouriteItem);
        });
    }

    function removeFavourite(index) {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        favourites.splice(index, 1);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        displayFavourites(favourites);
    }

    favouritesGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            removeFavourite(index);
        }
    });

    loadFavourites();
});
