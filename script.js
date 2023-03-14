const myLibrary = [];
const form = document.querySelector('.container');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  if (this.read.checked) {
    this.read = 'read';
  } else {
    this.read = 'not read yet';
  }
}

function addToBookshelf() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read');
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(read);
}

Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

function openForm() {
  document.getElementById('myForm').style.display = 'block';
  document.querySelector('.add').style.display = 'none';
  document.querySelector('.display').style.display = 'none';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.querySelector('.add').style.display = 'block';
  document.querySelector('.display').style.display = 'block';
}

function openLibrary() {
  document.querySelector('.add').style.display = 'none';
  document.querySelector('.display').style.display = 'none';
  document.querySelector('#myTable').style.display = 'flex';
  document.querySelector('#closeLibrary').style.display = 'flex';
}

function closeLibrary() {
  document.querySelector('.add').style.display = 'block';
  document.querySelector('.display').style.display = 'block';
  document.querySelector('#myTable').style.display = 'none';
  document.querySelector('#closeLibrary').style.display = 'none';
}

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function read(cell) {
  cell.parentNode.innerHTML = 'read';
}

function createTable() {
  const table = document.createElement('TABLE');
  const headers = ['Title', 'Author', 'Number of Pages', 'Read?'];
  const info = document.getElementById('myTable');
  if (myLibrary.length > 0) {
    for (let i = 0; i < myLibrary.length; i++) {
      const row = table.insertRow(i);
      row.insertCell(0).innerHTML = myLibrary[i].title;
      row.insertCell(1).innerHTML = myLibrary[i].author;
      row.insertCell(2).innerHTML = myLibrary[i].pages;
      row.insertCell(3).innerHTML = myLibrary[i].read;
      if (row.cells[3].innerHTML === 'not read yet') {
        row.cells[3].innerHTML += '<button class="read" onclick="read(this)">I read it.</button>';
      }
      row.insertCell(4).innerHTML += '<button class="delete-button" onclick="deleteRow(this)">x</button>'; '<button class="read" onclick="read()">I read it.</button>';
    }
  }
  const header = table.createTHead();
  const headerRow = header.insertRow(0);
  for (let i = 0; i < headers.length; i++) {
    headerRow.insertCell(i).outerHTML = `<th>${headers[i]}</th>`;
  }
  headerRow.insertCell(4).outerHTML = '<th>Delete Book</th>';
  info.innerHTML = '';
  info.appendChild(table);
  console.log(table);
}

createTable();

form.onsubmit = function (e) {
  e.preventDefault();
  addToBookshelf();
  form.reset();
  createTable();
};
