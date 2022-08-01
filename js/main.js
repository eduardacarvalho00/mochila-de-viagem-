const form = document.getElementById('novoItem');
const list = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

function addElement(item) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const numberItem = document.createElement('strong');
  numberItem.innerHTML = item.amount;
  numberItem.dataset.id = item.id;
  newItem.appendChild(numberItem);
  newItem.innerHTML += item.name;

  list.appendChild(newItem);
}

// recarregar a pagina e continuar a lista
itens.forEach((element) => {
  addElement(element);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = e.target.elements.nome;
  const amount = e.target.elements.quantidade;
  const itemCurrent = {
    name: name.value,
    amount: amount.value,
  };
  const exists = itens.find((element) => element.name === name.value);

  function updateElement(item) {
    // eslint-disable-next-line prefer-template
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.amount;
  }

  if (exists) {
    itemCurrent.id = exists.id;
    updateElement(itemCurrent);
  } else {
    itemCurrent.id = itens.length;
    addElement(itemCurrent);
    itens.push(itemCurrent);
  }

  localStorage.setItem('itens', JSON.stringify(itens));

  name.value = '';
  amount.value = '';
});
