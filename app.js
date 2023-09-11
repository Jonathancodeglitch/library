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
  library = JSON.parse(localStorage.getItem('library')) || [];

  // create html for book
  static createBookHtml(book, index) {
    return `
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
  }

  //create greeting html
  static createGreetingHtml() {
    return `<div class="greeting">
              Hey there scholar, your library is empty add a book!!
            </div>`;
  }

  // render all books currently in the #library array to the Dom
  render() {
    let bookhtml = this.library
      .map((book, index) => Library.createBookHtml(book, index))
      .join('');

    //check if library is empty and display the correct html
    bookContainer.innerHTML =
      this.library.length > 0 ? bookhtml : Library.createGreetingHtml();
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
      modalController.closeModal();
      //reset modal input form
      form.reset();
      //save current data to localStorage
      Library.saveLibraryToLocalStorage();
      //update
      this.render();
    }
  };

  static saveLibraryToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(bookLibrary.library));
  }

  //remove book from #librarys
  removeBook = (e) => {
    let target = e.target;
    if (target.id == 'del-btn') {
      let bookIndex = target.parentNode.dataset.index;
      this.library.splice(bookIndex, 1);
      Library.saveLibraryToLocalStorage();
      this.render();
      console.log(this.library.length);
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

      Library.saveLibraryToLocalStorage();
      this.render();
    }
  };
}

//class instance
let bookLibrary = new Library();

//remove book button event
bookContainer.addEventListener('click', bookLibrary.removeBook);

//add new book to library on form submit
form.addEventListener('submit', (e) => {
  bookLibrary.addBookToLibrary(e);
});

//toggle readStatus when read button is clicked
bookContainer.addEventListener('click', bookLibrary.toggleReadStatus);

//render books to dom
bookLibrary.render();

//modal functionalite
const modalController = (() => {
  const modal = document.getElementById('modal');

  function showModal() {
    modal.showModal();
  }
  function closeModal() {
    modal.close();
  }
  return {
    showModal,
    closeModal,
  };
})();

//modal btns
const showModalBtn = document.getElementById('show-modal-btn');
const closeModalBtn = document.getElementById('close-modal');

showModalBtn.addEventListener('click', modalController.showModal);
closeModalBtn.addEventListener('click', modalController.closeModal);
