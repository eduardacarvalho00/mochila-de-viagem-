const form = document.getElementById('novoItem');
const list = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

// função para remover o item
function deleteElement(tag, id) {
  tag.remove();
  itens.splice(itens.findIndex((element) => element.id === id), 1);
  localStorage.setItem('itens', JSON.stringify(itens));
}

// botão de deletar
function deleteButton(id) {
  const elementButton = document.createElement('button');
  elementButton.innerText = 'X';
  // eslint-disable-next-line func-names
  elementButton.addEventListener('click', function () {
    deleteElement(this.parentNode, id);
  });
  return elementButton;
}

// criar novo item
function addElement(item) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');

  const numberItem = document.createElement('strong');
  numberItem.innerHTML = item.amount;
  numberItem.dataset.id = item.id;

  newItem.appendChild(numberItem);
  newItem.innerHTML += item.name;
  newItem.appendChild(deleteButton(item.id));

  list.appendChild(newItem);
}

// recarregar a pagina e continuar a lista (localStorage)
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
    itens[itens.findIndex((element) => element.id === exists.id)] = itemCurrent;
  } else {
    itemCurrent.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
    addElement(itemCurrent);
    itens.push(itemCurrent);
  }

  localStorage.setItem('itens', JSON.stringify(itens));

  name.value = '';
  amount.value = '';
});
