// Loads header and footer onto the current page
document.addEventListener('DOMContentLoaded', function () {
  
  // Load header
  const navbarPlaceholder = document.getElementById('navbarPlaceholder');
  if (navbarPlaceholder) {
    fetch('/components/nav/header.html')
      .then(response => response.text())
      .then(html => {
        navbarPlaceholder.innerHTML = html;

        // Once header is loaded begin loading the mobile menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        if (mobileMenuButton) {
          mobileMenuButton.addEventListener('click', function () {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
          });
        }
      });
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footerPlaceholder');
  if (footerPlaceholder) {
    fetch('/components/nav/footer.html')
      .then(response => response.text())
      .then(html => {
        footerPlaceholder.innerHTML = html;
      });
  }
});