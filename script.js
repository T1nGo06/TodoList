document.getElementById('add').addEventListener('click', add);
document.getElementById('clear').addEventListener('click', clear);

window.addEventListener('load', load);

document.getElementById('list').addEventListener('click', function(event) {    
    if (event.target.className === 'delete') {
      deleteItem(event.target);
    } else if (event.target.className === 'checkbox') {
      completed(event.target);
    }
  });


function add() {
  const input = document.getElementById('input');
  const value = input.value.trim();

  if (value === '') return;

  const list = document.getElementById('list');
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox'
  checkbox.className = 'checkbox'

  const text = document.createElement('span');
  text.textContent = value;
  text.className = 'text';

  const deleteButton = document.createElement('span');
  deleteButton.textContent = 'X';
  deleteButton.className = 'delete';

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(deleteButton);
  list.appendChild(li);

  input.value = '';
  save();
}

function clear() {
  const confirmation = confirm("Are you sure you want to clear the entire list?");
  if (confirmation) {
    document.getElementById('list').innerHTML = '';
    localStorage.removeItem('items');
  }
}

function deleteItem(deleteButton) {
    deleteButton.parentElement.remove();
    save();
}
  

function completed(checkbox) {
  const text = checkbox.nextSibling;
  if (checkbox.checked) {
    text.style.textDecoration = 'line-through';
    text.style.color = 'gray';
  } else {
    text.style.textDecoration = 'none';
    text.style.color = 'black';
  }
  save();
}

function save() {
  const items = [];
  const list = document.getElementById('list').children;
  
  for (let i = 0; i < list.length; i++) {
    const text = list[i].children[1].textContent;
    const completed = list[i].children[0].checked ? '1' : '0';
    items.push(`${completed}|${text}`);
  }

  localStorage.setItem('items', items.join('\n'));
}

function load() {
  const saved = localStorage.getItem('items');
  if (!saved) return;

  const list = document.getElementById('list');
  const items = saved.split('\n');

  items.forEach(item => {
    const [completed, textValue] = item.split('|');
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.className = 'checkbox'
    checkbox.checked = completed === '1';

    const text = document.createElement('span');
    text.textContent = textValue;
    if (completed === '1') {
      text.style.textDecoration = 'line-through';
      text.style.color = 'gray';
    }
    text.className = 'text';

    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete';

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}
