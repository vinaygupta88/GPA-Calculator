//--- Toggle menu ------- 
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('show');
}

// query selector for link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }

    document.getElementById('nav-links').classList.remove('show');
  });
});

// email validation
function validateGmail() {
    let emailInput = document.getElementById("email").value.trim();
    let gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let message = document.getElementById("message");

    if (emailInput === "") {
        message.innerHTML = "Email is required!";
        return false; 
    } 
    else if (!gmailRegex.test(emailInput)) {
        message.innerHTML = "Please enter a valid Gmail address (e.g., example@gmail.com)";
        return false; 
    } 
    else {
        message.innerHTML = ""; 
        return true;  
    }
}