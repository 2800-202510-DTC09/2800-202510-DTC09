window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the badges from the backend
        const res = await fetch('/api/user/show-badges', {
            credentials: 'include',
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        // Find the badge container in the HTML
        const { badges = [] } = await res.json();
        const container = document.getElementById('badge-container');
        if (!container) {
            console.error('Badge container not found in HTML');
            return;
        }
        // Create a card for each badge
        for (const badge of badges) {
            const card = document.createElement('div');
            card.className =
                'w-16 h-16 rounded-lg overflow-hidden shadow relative';

            // Create the elements of a badge
            const img = document.createElement('img');
            img.src = badge.icon;
            img.alt = badge.name;
            img.title = badge.description;
            img.className = 'w-full h-full object-cover';

            card.appendChild(img);
            container.appendChild(card);
        }
    } catch (err) {
        console.error('Failed to load badges:', err);
    }
});
