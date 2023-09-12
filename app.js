
class BookToLibrary {
  //store  books
  library = JSON.parse(localStorage.getItem('library')) || [];

  //catch Dom
  bookContainer = document.getElementById('library');
  modalForm = document.getElementById('modal-content');

  constructor(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
  }

  //initialize
  init() {
    BookToLibrary.eventBinding();
    this.render();
  }

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
      .map((book, index) => BookToLibrary.createBookHtml(book, index))
      .join('');

    //check if library is empty and display the correct html
    this.bookContainer.innerHTML =
      this.library.length > 0 ? bookhtml : BookToLibrary.createGreetingHtml();
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
      let newBook = new BookToLibrary(title, author, page, read);
      this.library.push(newBook);
      modalController.closeModal();
      //reset modal input form
      this.modalForm.reset();
      //save current data to localStorage
      BookToLibrary.saveLibraryToLocalStorage();
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
      BookToLibrary.saveLibraryToLocalStorage();
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

      BookToLibrary.saveLibraryToLocalStorage();
      this.render();
    }
  };

  ///add eventListner to buttons
  static eventBinding = () => {
    bookLibrary.bookContainer.addEventListener('click', bookLibrary.removeBook);
    bookLibrary.bookContainer.addEventListener(
      'click',
      bookLibrary.toggleReadStatus
    );
    bookLibrary.modalForm.addEventListener(
      'submit',
      bookLibrary.addBookToLibrary
    );
  };
}

//class instance
let bookLibrary = new BookToLibrary();

//initialize class
bookLibrary.init();

//modal functionalite
const modalController = (() => {
  const modal = document.getElementById('modal');
  //modal btns
  const showModalBtn = document.getElementById('show-modal-btn');
  const closeModalBtn = document.getElementById('close-modal');

  const showModal = () => {
    modal.showModal();
  };
  const closeModal = () => {
    modal.close();
  };

  const modalEvents = () => {
    showModalBtn.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', closeModal);
  };

  modalEvents();
  return {
    closeModal,
  };
})();
