const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');

function addElement(nome, quantidade) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const numberItem = document.createElement('strong');
  numberItem.innerHTML = quantidade;

  newItem.appendChild(numberItem);
  newItem.innerHTML += nome;

  lista.appendChild(newItem);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addElement(e.target.elements.nome.value, e.target.elements.quantidade.value);
});
