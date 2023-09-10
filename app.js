/* 


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


 */

//display books from the array on page load
//add new book to the array and display the current array content
//delete book from array

const bookContainer = document.getElementById('library');

class BookLibrary {
  #library = [
    {
      title: 'Ohwevwo cronicles',
      author: 'jonathan',
      page: '999',
      read: 'read',
    },
    {
      title: 'Ohwevwo cronicles',
      author: 'jonathan',
      page: '999',
      read: 'read',
    },
    {
      title: 'Ohwevwo cronicles',
      author: 'jonathan',
      page: '999',
      read: 'read',
    },
  ];

  constructor(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
  }

  static createHtml(book) {
    let bookHtml = `
      <div class="book" data-index="" id="book">
        <div class="item">Title : <span>${book.title}</span></div>
        <div class="item">Author : <span>${book.author}</span></div>
        <div class="item">Page : <span>${book.page} Pages</span></div>
        <div class="button"  style="background-color: ${
          book.read ? '#A1CCD1' : 'rgb(241, 116, 116)'
        }">${book.read ? 'Read' : 'Not Read'}</div>
        <div class="button"  id="del-btn">REMOVE</div>
      </div>
    `;
    return bookHtml;
  }

  render() {
    let bookHtml = this.#library
      .map((book) => BookLibrary.createHtml(book))
      .join('');
    bookContainer.innerHTML = bookHtml;
  }

  addBookToLibrary = (e) => {
    e.preventDefault();

    //inputs values
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let page = document.getElementById('page').value;
    let read = document.getElementById('read').checked;

    if (title !== '' && author !== '' && page !== '') {
      let newBook = new BookLibrary(title, author, page, read);
      this.#library.push(newBook);
      this.render();
      closeModal();
      //reset modal input form
      document.getElementById('modal-content').reset();
    }
  };
}

const form = document.getElementById('modal-content');

//add book to library
form.addEventListener('submit', (e) => {
  booKLibrary.addBookToLibrary(e);
});

let booKLibrary = new BookLibrary();
//render books to dom
booKLibrary.render();

//modal functionalites
const showModalBtn = document.getElementById('show-modal-btn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');

function showModal() {
  modal.showModal();
}
showModalBtn.addEventListener('click', showModal);

function closeModal() {
  modal.close();
}
closeModalBtn.addEventListener('click', closeModal);
