document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
  
    const data = {
      nome: nome,
      email: email
    };
  
    fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      alert('Sucesso: ' + result);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });
  
  document.getElementById('fetchUsers').addEventListener('click', function() {
    fetch('/api/usuarios')
    .then(response => response.json())
    .then(users => {
      const tbody = document.querySelector('#userTable tbody');
      tbody.innerHTML = ''; // Limpar a tabela
  
      users.forEach(user => {
        const row = document.createElement('tr');
  
        const idCell = document.createElement('td');
        idCell.textContent = user.id;
        row.appendChild(idCell);
  
        const nomeCell = document.createElement('td');
        nomeCell.textContent = user.nome;
        row.appendChild(nomeCell);
  
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);
  
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });
  