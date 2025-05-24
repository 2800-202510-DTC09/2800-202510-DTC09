async function fetchUserProfile() {
    const response = await fetch('/api/user/profile', {
        credentials: 'include',
    });

    if (!response.ok)
        throw new Error('User not logged in or error fetching profile');

    return await response.json();
}

function populateUserFormFields(user) {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (usernameInput && user.username) {
        usernameInput.value = user.username;
    }

    if (emailInput && user.email) {
        emailInput.value = user.email;
    }

    if (passwordInput) {
        passwordInput.placeholder = 'Enter current password';
        passwordInput.value = '';
    }

    if (newPasswordInput) {
        newPasswordInput.placeholder = 'Enter new password';
        newPasswordInput.value = '';
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.placeholder = 'Confirm new password';
        confirmPasswordInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await fetchUserProfile();
        populateUserFormFields(user);
    } catch (error) {
        console.error('Failed to populate user settings:', error);
    }
});
