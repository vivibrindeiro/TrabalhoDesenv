async function loadAlunos() {
  try {
    const response = await axios.get('http://localhost:3000/api/alunos');
    const alunos = response.data;
    const alunosTableBody = document.getElementById('alunosTableBody');
    alunosTableBody.innerHTML = '';

    alunos.forEach(aluno => {
      const row = `
        <tr>
          <th class="d-none">${aluno._id}</th>  <td>${aluno.matricula || '--'}</td>  <td>${aluno.nome}</td>
          <td>${aluno.curso}</td>
          <td>${aluno.turno}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="editAluno('${aluno._id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteAluno('${aluno._id}')">Excluir</button>
          </td>
        </tr>
      `;
      alunosTableBody.innerHTML += row;
    });
  } catch (error) {
    console.error('Erro ao carregar alunos', error);
    alert('Erro ao carregar alunos');
  }
}

// Adicionar Aluno
document.getElementById('addAlunoBtn').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = 'cadastroaluno.html';
});

// Sair
document.getElementById('logoutBtn').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = 'index.html';
});

// Editar aluno
async function editAluno(alunoId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/alunos/${alunoId}`);
    const aluno = response.data;
    document.getElementById('alunoId').value = aluno._id;
    document.getElementById('alunoMatricula').value = aluno.matricula;
    document.getElementById('alunoNome').value = aluno.nome;
    document.getElementById('alunoCurso').value = aluno.curso;
    document.getElementById('alunoTurno').value = aluno.turno;
    const alunoModal = new bootstrap.Modal(document.getElementById('alunoModal'));
    alunoModal.show();
  } catch (error) {
    console.error('Erro ao editar aluno', error);
    alert('Erro ao editar aluno');
  }
}

// Salvar as alterações do aluno
async function saveAluno() {
  const alunoId = document.getElementById('alunoId').value;
  const matricula = document.getElementById('alunoMatricula').value;
  const nome = document.getElementById('alunoNome').value;
  const curso = document.getElementById('alunoCurso').value;
  const turno = document.getElementById('alunoTurno').value;

  try {
    const response = await axios.put(`http://localhost:3000/api/alunos/${alunoId}`, {
      matricula,
      nome,
      curso,
      turno
    });
    alert(response.data.message);
    const alunoModal = bootstrap.Modal.getInstance(document.getElementById('alunoModal'));
    alunoModal.hide();
    loadAlunos();
  } catch (error) {
    console.error('Erro ao salvar aluno', error);
    alert('Erro ao salvar aluno');
  }
}

// Função para excluir um aluno
async function deleteAluno(alunoId) {
  try {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      const response = await axios.delete(`http://localhost:3000/api/alunos/${alunoId}`);
      alert(response.data.message);
      loadAlunos();
    }
  } catch (error) {
    console.error('Erro ao excluir aluno', error);
    alert('Erro ao excluir aluno');
  }
}

// Evento onload para carregar a tabela de alunos quando a página é carregada
window.onload = function() {
  loadAlunos();
};

// Adicionar evento de envio do formulário do modal para salvar alterações
document.getElementById('alunoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  saveAluno();
});
