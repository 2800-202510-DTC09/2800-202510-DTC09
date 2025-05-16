// Loads header and footer onto the current page
document.addEventListener('DOMContentLoaded', () => {
    // Load header
    const navbarPlaceholder = document.getElementById('navbarPlaceholder');
    if (navbarPlaceholder) {
        fetch('components/nav/header.html')
            .then((response) => response.text())
            .then((html) => {
                navbarPlaceholder.innerHTML = html;
                // Load user greeting and initial icon
                fetch('/users')
                    .then((response) => {
                        if (!response.ok) {
                            return null;
                        }
                        return response.json();
                    })
                    .then((data) => {
                        const welcomeMessage =
                            document.getElementById('welcome-message');
                        const userInitial =
                            document.getElementById('user-initial');
                        if (
                            data &&
                            data.user &&
                            data.user.username &&
                            welcomeMessage
                        ) {
                            welcomeMessage.textContent = `Welcome, ${data.user.username}`;
                            userInitial.textContent = `${data.user.username[0]}`;
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                    });

                // Once header is loaded begin loading the mobile menu
                const mobileMenuButton =
                    document.getElementById('mobile-menu-button');
                if (mobileMenuButton) {
                    mobileMenuButton.addEventListener('click', () => {
                        const mobileMenu =
                            document.getElementById('mobile-menu');
                        mobileMenu.classList.toggle('hidden');
                    });
                }
            });
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footerPlaceholder');
    if (footerPlaceholder) {
        fetch('components/nav/footer.html')
            .then((response) => response.text())
            .then((html) => {
                footerPlaceholder.innerHTML = html;
            });
    }
});
