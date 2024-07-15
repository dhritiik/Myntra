
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    // Perform search functionality here
    alert('Searching for: ' + query);
});

// function filterItems(filter) {
//     const items = document.querySelectorAll('.grid-item');

//     items.forEach(item => {
//         if (filter === 'all') {
//             item.style.display = 'block';
//         } else {
//             if (item.classList.contains(filter)) {
//                 item.style.display = 'block';
//             } else {
//                 item.style.display = 'none';
//             }
//         }
//     });
// }

function filterItems() {
    const genderFilter = document.getElementById('gender-filter').value;
    const aestheticsFilter = document.getElementById('aesthetics-filter').value;
    const items = document.querySelectorAll('.grid-item');

    items.forEach(item => {
        let matches = true;

        if (genderFilter !== 'all') {
            matches = item.getAttribute('data-gender') === genderFilter;
        }

        // Add additional conditions for aestheticsFilter if needed
        // if (aestheticsFilter !== 'all') {
        //     matches = matches && item.getAttribute('data-aesthetic') === aestheticsFilter;
        // }

        if (matches) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

//favourite section

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
