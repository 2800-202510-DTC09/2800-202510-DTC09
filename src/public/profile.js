document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/user/profile', {
            credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch user');

        const user = await res.json();

        document.getElementById('profileUsername').textContent =
            user.username || 'User';
        document.getElementById('profileEmail').textContent = user.email || '';
        document.getElementById('profileScore').textContent = user.score || 0;
        document.getElementById('profileInitial').textContent =
            user.username?.[0]?.toUpperCase() || 'U';
    } catch (err) {
        console.error('Error loading profile:', err);
    }
});
