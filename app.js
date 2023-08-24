const bookContainer = document.getElementById('library');

const library = JSON.parse(localStorage.getItem('library')) || [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let title = document.getElementById('title');
let author = document.getElementById('author');
let page = document.getElementById('page');
let read = document.getElementById('read');

function saveBookToLocalStorage() {
  localStorage.setItem('library', JSON.stringify(library));
}

function addBookToLibrary(e) {
  let titleValue = title.value;
  let authorValue = author.value;
  let pageValue = page.value;
  let readStatus = read.checked;

  if (titleValue !== '' && authorValue !== '' && pageValue !== '') {
    let book = new Book(titleValue, authorValue, pageValue, readStatus);
    library.push(book);
    closeModal();
    saveBookToLocalStorage();
    displayBooks(library);

    //clear user inputs
    /*  title.value = '';
    author.value = '';
    page.value = '';
    read.checked = false; */
  }
}

const addBookBtn = document.getElementById('add-book');
addBookBtn.addEventListener('click', addBookToLibrary);

function toggleReadStatus(e) {
  // toggle the read button from 'read' to 'not read' vise versa
  let target = e.target;
  if (target.id == 'read') {
    let bookIndex = target.parentNode.dataset.index;
    if (library[bookIndex].read) {
      library[bookIndex].read = false;
      target.textContent = 'Not Read';
      target.style.backgroundColor = 'rgb(241, 116, 116)';
    } else {
      library[bookIndex].read = true;
      target.textContent = 'Read';
      target.style.backgroundColor = '#A1CCD1';
    }
    saveBookToLocalStorage();
  }
}

bookContainer.addEventListener('click', toggleReadStatus);

function displayBooks(library) {
  let bookHtml = library
    .map((book, index) => {
      return `
      <div class="book" data-index="${index}" id="book">
        <div class="item">Title : <span>${book.title}</span></div>
        <div class="item">Author : <span>${book.author}</span></div>
        <div class="item">Page : <span>${book.pages} Pages</span></div>
        <div class="button" id="read" style="background-color: ${
          book.read ? '#A1CCD1' : 'rgb(241, 116, 116)'
        }">${book.read ? 'Read' : 'Not Read'}</div>
        <div class="button"  id="del-btn">REMOVE</div>
      </div>
      `;
    })
    .join('');

  let greetingHtml = `<div class="greeting">
                        Hey there scholar, your library is empty add a book!!
                      </div>
                       `;

  if (library.length > 0) {
    //check if library is empty or not and display the appropraite html
    bookContainer.innerHTML = bookHtml;
  } else {
    bookContainer.innerHTML = greetingHtml;
  }
}

displayBooks(library);

function deleteBookFromLibrary(e) {
  //delete book from library when the del button is clicked
  let target = e.target;
  if (target.id == 'del-btn') {
    let bookIndex = target.parentNode.dataset.index;
    library.splice(bookIndex, 1);
    saveBookToLocalStorage();
    displayBooks(library);
  }
}

bookContainer.addEventListener('click', deleteBookFromLibrary);

//modal functionalites

const showModalBtn = document.getElementById('show-modal-btn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');

showModalBtn.addEventListener('click', showModal);
function showModal() {
  modal.showModal();
}

closeModalBtn.addEventListener('click', closeModal);
function closeModal() {
  modal.close();
}
