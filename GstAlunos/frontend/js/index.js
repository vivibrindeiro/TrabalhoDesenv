document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            window.location.href = 'admin.html';
        } else {
            alert('Falha no login: ' + response.data.message);
        }
    } catch (error) {
        console.error('Erro durante o login', error);
        alert('Erro durante o login: ' + (error.response ? error.response.data.message : error.message));
    }
});

document.getElementById('cadastroButton').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'register.html';
});
