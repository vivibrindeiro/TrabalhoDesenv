document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
        if (response.data.success) {
            alert('Usuário registrado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Falha no registro: ' + response.data.message);
        }
    } catch (error) {
        console.error('Erro durante o registro', error);
        alert('Erro durante o registro: ' + (error.response ? error.response.data.message : error.message));
    }
});

document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html';
});
