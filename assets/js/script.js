//--- Toggle menu ------- 
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('show');
}

// query selector for link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    // Check if it's an internal anchor link (starts with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }

    // For mobile: hide menu after selection
    document.getElementById('nav-links').classList.remove('show');
  });
});