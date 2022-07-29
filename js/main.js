const form = document.getElementById('novoItem');
const list = document.getElementById('lista');
const itens = [];
function addElement(name, amount) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const numberItem = document.createElement('strong');
  numberItem.innerHTML = amount;

  newItem.appendChild(numberItem);
  newItem.innerHTML += name;

  list.appendChild(newItem);

  const itemCurrent = {
    name,
    amount,
  };
  itens.push(itemCurrent);
  localStorage.setItem('item', JSON.stringify(itens));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = e.target.elements.nome;
  const amount = e.target.elements.quantidade;

  addElement(name.value, amount.value);

  name.value = '';
  amount.value = '';
});
