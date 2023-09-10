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
const form = document.getElementById('modal-content');

class Book {
  constructor(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
  }
}

class Library {
  //store  books
  library = [
    {
      title: 'cronicles 1',
      author: 'jonathan',
      page: '999',
      read: 'read',
    },
    {
      title: 'cronicles 2',
      author: 'jonathan',
      page: '999',
      read: 'read',
    },
    {
      title: 'Ohwevwo cronicles 3',
      author: 'jonathan',
      page: '999',
      read: 'read',
    },
  ];

  // create html for book
  static createHtml(book, index) {
    let bookHtml = `
      <div class="book" data-index="${index}" id="book">
        <div class="item">Title : <span>${book.title}</span></div>
        <div class="item">Author : <span>${book.author}</span></div>
        <div class="item">Page : <span>${book.page} Pages</span></div>
        <div class="button" id="read-status" style="background-color: ${
          book.read ? '#A1CCD1' : 'rgb(241, 116, 116)'
        }">${book.read ? 'Read' : 'Not Read'}</div>
        <div class="button"  id="del-btn">REMOVE</div>
      </div>
    `;
    return bookHtml;
  }

  // render all books currently in the #library array to the Dom
  render() {
    let bookHtml = this.library
      .map((book, index) => Library.createHtml(book, index))
      .join('');
    bookContainer.innerHTML = bookHtml;
  }

  //add book to #library array
  addBookToLibrary = (e) => {
    e.preventDefault();

    //inputs values
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let page = document.getElementById('page').value;
    let read = document.getElementById('read').checked;

    if (title !== '' && author !== '' && page !== '') {
      let newBook = new Book(title, author, page, read);
      this.library.push(newBook);
      this.render();
      closeModal();
      //reset modal input form
      form.reset();

      //save current data to localStorage
      Library.saveLibraryToLocalStorage();
    }
  };

  static saveLibraryToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(this.library));
  }

  //remove book from #librarys
  removeBook = (e) => {
    let target = e.target;
    if (target.id == 'del-btn') {
      let bookIndex = target.parentNode.dataset.index;
      this.library.splice(bookIndex, 1);
      this.render();
    }
  };

  //toggle read status
  toggleReadStatus = (e) => {
    let target = e.target;
    if (target.id == 'read-status') {
      let bookIndex = target.parentNode.dataset.index;
      //check if book was read if it was change it to not read
      // on click event and update the library
      //and render the updated library to the dom

      if (this.library[bookIndex].read) {
        this.library[bookIndex].read = false;
        target.textContent = 'Not Read';
        target.style.backgroundColor = 'rgb(241, 116, 116)';
      } else {
        this.library[bookIndex].read = true;
        target.textContent = 'Read';
        target.style.backgroundColor = '#A1CCD1';
      }

      this.render();
    }
  };
}

//class instance
let bookLibrary = new Library();

//remove book button event
bookContainer.addEventListener('click',  bookLibrary.removeBook);

//add new book to library on form submit
form.addEventListener('submit', (e) => {
  bookLibrary.addBookToLibrary(e);
});

//toggle readStatus when read button is clicked
bookContainer.addEventListener('click', bookLibrary.toggleReadStatus);

//render books to dom
bookLibrary.render();

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
