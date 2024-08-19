document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Basic validation example
    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const companyName = event.target[2].value;
    const email = event.target[3].value;
    const phoneNumber = event.target[4].value;
    const message = event.target[5].value;

    if (!firstName || !lastName || !companyName || !email || !phoneNumber || !message) {
        alert('Please fill out all fields.');
        return;
    }
    
    alert('Form submitted successfully!');
});
