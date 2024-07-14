document.addEventListener('DOMContentLoaded', () => {
    const moodboard = document.getElementById('moodboard');
    const favouritesGrid = document.getElementById('favourites-grid');
    const bgColorPicker = document.getElementById('bg-color-picker');
    const bgImageUpload = document.getElementById('bg-image-upload');
    const removeBgImageBtn = document.getElementById('remove-bg-image');
    const shapeSelector = document.getElementById('shape-selector');
    const shapeColorPicker = document.getElementById('shape-color-picker');
    const addShapeBtn = document.getElementById('add-shape');
    const saveMoodboardBtn = document.getElementById('save-moodboard');

    function loadFavourites() {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        favouritesGrid.innerHTML = '';
        favourites.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('favourite-item');
            img.addEventListener('click', () => addToMoodboard(src));
            favouritesGrid.appendChild(img);
        });
    }

    function addToMoodboard(src) {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('moodboard-item');
        img.style.position = 'absolute';
        img.style.left = '50px';  // Default position
        img.style.top = '50px';   // Default position
        makeResizableDraggable(img);
        moodboard.appendChild(img);
    }

    function makeResizableDraggable(element) {
        interact(element)
            .draggable({
                onmove: dragMoveListener,
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true }
            })
            .on('resizemove', (event) => {
                let { x, y } = event.target.dataset;

                x = (parseFloat(x) || 0) + event.deltaRect.left;
                y = (parseFloat(y) || 0) + event.deltaRect.top;

                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                });

                Object.assign(event.target.dataset, { x, y });
            });
    }

    function dragMoveListener(event) {
        const target = event.target;
        const x = (parseFloat(target.dataset.x) || 0) + event.dx;
        const y = (parseFloat(target.dataset.y) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.dataset.x = x;
        target.dataset.y = y;
    }

    bgColorPicker.addEventListener('input', (e) => {
        moodboard.style.backgroundColor = e.target.value;
    });

    bgImageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                moodboard.style.backgroundImage = `url(${event.target.result})`;
                moodboard.style.backgroundSize = 'cover'; // Ensure background covers the moodboard
                moodboard.style.width = '400px'; // Set fixed width
                moodboard.style.height = '400px'; // Set fixed height
            };
            reader.readAsDataURL(file);
        }
    });

    removeBgImageBtn.addEventListener('click', () => {
        moodboard.style.backgroundImage = '';
        moodboard.style.backgroundSize = ''; // Reset background size
        moodboard.style.width = ''; // Reset width
        moodboard.style.height = ''; // Reset height
    });

    addShapeBtn.addEventListener('click', () => {
        const shape = shapeSelector.value;
        const color = shapeColorPicker.value;
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape', shape);
        shapeElement.style.backgroundColor = color;
        shapeElement.style.left = '50px';  // Default position
        shapeElement.style.top = '50px';   // Default position
        makeResizableDraggable(shapeElement);
        moodboard.appendChild(shapeElement);
    });

    saveMoodboardBtn.addEventListener('click', () => {
        const moodboardContent = moodboard.innerHTML;
        const moodboardData = { content: moodboardContent }; // Wrap HTML content in an object
        localStorage.setItem('savedMoodboard', JSON.stringify(moodboardData));
        alert('Mood board saved!');
    });

    loadFavourites();
});
