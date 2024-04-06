document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        // Make a request to validate login credentials
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            // Show pop-up message for incorrect credentials
            alert('Identifiants incorrects. Veuillez réessayer.');
        } else {
            // Redirect to home page if login successful
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});