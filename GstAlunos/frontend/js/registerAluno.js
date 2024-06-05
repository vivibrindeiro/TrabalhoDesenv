document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nome = document.getElementById('name').value;
  const curso = document.getElementById('curso').value;
  const turno = document.getElementById('turno').value;

  // Generate a temporary matriculation number (replace with actual generation logic or placeholder value)
  const tempMatricula = 'MAT-' + Math.random().toString(36).substr(2, 9); // Replace with actual generation logic

  try {
    const response = await axios.post('http://localhost:3000/api/alunos', {
      nome,
      curso,
      turno,
      matricula: tempMatricula // Add the 'matricula' field with a temporary value
    });
    alert('Aluno cadastrado com sucesso!');
    window.location.href = 'admin.html'; // Redireciona para a página de admin após o cadastro bem-sucedido
  } catch (error) {
    console.error('Erro durante o cadastro do aluno', error);
    alert('Erro durante o cadastro do aluno: ' + (error.response ? error.response.data.message : error.message));
  }
});
