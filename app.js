
  let myLibrary=[];

/* localstorage */
  
myLibrary=JSON.parse(localStorage.getItem("myLibrary"))|| []
 
 /* book prototype */
function Book(title,author, pages,read){
        this.title=title
        this.author=author
        this.pages=pages
        this.read=read   
}


/* inputs variable */
const Title=document.querySelector('.title');
const Author=document.querySelector('.Author');
const Pages=document.querySelector('.pages');
const Read=document.querySelector('.read');

//add books to my library
function addBookToLibrary() {
  // do stuff here
  let book=new Book(Title.value,Author.value,Pages.value,Read.value);
  myLibrary.push(book);
 //reder book to the page
  renderBook()
}; 

//create bookItems
const yourLibrary=document.querySelector('.your-library');
function CreateDisplayElement(book,indx){
     //create bookItems
    let card=document.createElement('div');
    card.setAttribute('class',"card");
    card.setAttribute("id",indx)
    let titles=document.createElement('span');
    let authors=document.createElement('span');
    let pagess=document.createElement('span');
    let reads=document.createElement('button');
    let removeBtn=document.createElement('button');
      card.append(titles,authors,pagess,reads,removeBtn);
      yourLibrary.appendChild(card);
      removebook(removeBtn,card);

  /* giving Dom contents */
  let caseTitle=book.title.charAt(0).toUpperCase() +book.title.slice(1).toLowerCase();
  let authorTitle=book.author.charAt(0).toUpperCase() + book.author.slice(1).toLowerCase();
   titles.innerText=`Tittle: ${caseTitle}`;
   authors.innerText=`Author: ${authorTitle}`;
   pagess.innerText=`Pages: ${book.pages}`;
   reads.innerText=book.read;
    removeBtn.innerHTML="Remove Book";

    /* raed staus */
    reads.addEventListener('click',(e)=>{
        if(book.read==="Read"){
         reads.innerHTML=book.read="Not Read";
         renderBook()
        
        }
        else if(book.read==="Not Read"){
            card.classList.remove("reading")
            reads.innerHTML=book.read="Read"
            renderBook()
           
           }
    });

            /* add border if book is read */
            if(book.read!=="Read"){
                card.style.borderLeft="10px solid #950101"
            // card.style.borderTop="10px solid #950101"
            }
            else if(book.read==="Read"){
                card.style.borderLeft="10px solid #1E5128"
            // card.style.borderTop="10px solid #1E5128"
            };

          
};

/* delete book from array on click */
function removebook(btn,card){
    btn.addEventListener("click",(e)=>{
        myLibrary.splice(card.id,1)
        renderBook()
    });
};

/* render items in array to page */
function renderBook(){
    yourLibrary.innerHTML=""
    localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
    myLibrary.forEach((book,index)=>{
        
        CreateDisplayElement(book,index)
    });
};

renderBook()



/* form submit */
const submitBtn=document.querySelector('.submit');

submitBtn.addEventListener('click',(e)=>{

        if(Title.value && Author.value && Pages.value && Read.value!==" "){
            e.preventDefault()
            addBookToLibrary() 
            modal.classList.remove('open-modal');
            Title.value=""
            Author.value=""
            Pages.value=""
        };

}); 




/* modal overlay  */
  const modal=document.querySelector('.modal');
  const modalContent=document.querySelector('.modal-content');
  const closeBtn=document.querySelector('.close-btn');
  const addBook=document.querySelector('.add-btn');
  

  addBook.addEventListener('click',()=>{
    modal.classList.add('open-modal')
  });

  closeBtn.addEventListener('click',()=>{
    modal.classList.remove('open-modal')
  });
  window.addEventListener('click',(e)=>{

   if(e.target==modalContent){
    modal.classList.remove('open-modal')
   }
  
  });

  