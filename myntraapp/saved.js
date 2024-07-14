document.addEventListener('DOMContentLoaded', () => {
    const savedMoodboardContainer = document.getElementById('saved-moodboard-container');

    function loadSavedMoodboard() {
        const savedMoodboardData = localStorage.getItem('savedMoodboard');
        
        if (savedMoodboardData) {
            try {
                const { backgroundColor, backgroundImage, content } = JSON.parse(savedMoodboardData);
                
                savedMoodboardContainer.style.backgroundColor = backgroundColor;
                savedMoodboardContainer.style.backgroundImage = backgroundImage;
                savedMoodboardContainer.innerHTML = content;
                savedMoodboardContainer.style.width = '400px'; // Set fixed width
                savedMoodboardContainer.style.height = '400px'; // Set fixed height
                savedMoodboardContainer.style.backgroundSize = 'cover'; // Ensure background covers the container
            } catch (error) {
                console.error('Error parsing saved moodboard data:', error);
                savedMoodboardContainer.innerHTML = '<p>Error loading saved moodboard.</p>';
            }
        } else {
            savedMoodboardContainer.innerHTML = '<p>No moodboards saved yet.</p>';
        }
    }

    loadSavedMoodboard();
});





    // function loadSavedMoodboard() {
    //     const savedMoodboardData = localStorage.getItem('savedMoodboard');

    //     if (savedMoodboardData && isValidBase64(savedMoodboardData)) {
    //         const decodedContent = decodeURIComponent(escape(atob(savedMoodboardData))); // Decode Base64 content
    //         savedMoodboardContainer.innerHTML = decodedContent;

    //         const items = savedMoodboardContainer.querySelectorAll('.moodboard-item, .shape');
    //         items.forEach(item => makeResizableDraggable(item));
    //     } else {
    //         savedMoodboardContainer.innerHTML = '<p>No moodboards saved yet.</p>';
    //     }
    // }

    // function makeResizableDraggable(element) {
    //     interact(element)
    //         .draggable({
    //             onmove: dragMoveListener,
    //         })
    //         .resizable({
    //             edges: { left: true, right: true, bottom: true, top: true }
    //         })
    //         .on('resizemove', (event) => {
    //             let { x, y } = event.target.dataset;

    //             x = (parseFloat(x) || 0) + event.deltaRect.left;
    //             y = (parseFloat(y) || 0) + event.deltaRect.top;

    //             Object.assign(event.target.style, {
    //                 width: `${event.rect.width}px`,
    //                 height: `${event.rect.height}px`,
    //                 transform: `translate(${x}px, ${y}px)`
    //             });

    //             Object.assign(event.target.dataset, { x, y });
    //         });
    // }

    // function dragMoveListener(event) {
    //     const target = event.target;
    //     const x = (parseFloat(target.dataset.x) || 0) + event.dx;
    //     const y = (parseFloat(target.dataset.y) || 0) + event.dy;

    //     target.style.transform = `translate(${x}px, ${y}px)`;

    //     target.dataset.x = x;
    //     target.dataset.y = y;
    // }

    // loadSavedMoodboard();

