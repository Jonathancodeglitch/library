//array of books
let library=[

]

library=JSON.parse(localStorage.getItem("library"))|| []
//Book constructor

class Book{
   constructor(title,author,pages,read){
      this.title=title;
      this.author=author;
      this.pages=pages;
       this.read=read;
   }

   
}

//UI functions

class UI{
 //iterate libray 
  
     static display(){

        document.querySelector(".your-library").innerHTML=""
        localStorage.setItem("library",JSON.stringify(library))
          library.forEach((book,index) => {
                UI.CreateElement(book,index)
          });
     }
      //clear User input fields
      static clearField(){
            document.querySelector(".title").value="";
            document.querySelector(".Author").value="";
            document.querySelector(".pages").value="";
            document.querySelector(".read").value=""
      }
    //display books from library
    static CreateElement(book,index){
          const yourLibrary=document.querySelector(".your-library");
          const card=document.createElement('div');
            card.classList.add("card");
            card.id=index
            card.innerHTML=`
                <span>Title: ${book.title}</span>
                <span>Author: ${book.author}</span>
                <span>Pages:${book.pages}</span>
                <button class='opt'>${book.read}</button>
                <button class="del">Remove Book</button>
            `    
            yourLibrary.appendChild(card);
          
         //readStatus
         card.addEventListener('click',(e)=>{
                UI.ReadStatus(book,e.target)
                UI.delete(card,e.target)
         })
    }
    //delete user
    static delete(card,e){
      
              if(e.classList.contains("del")) {
              library.splice(card.id,1);
              loadBook() 
              }
        
    }

    //toggle Read Status
     static ReadStatus(book,event){

            if(event.classList.contains("opt")){
                  if(book.read==="Not Read"){
                      event.innerHTML=book.read="Read"
                      loadBook() 
                  }
                  else if(book.read==="Read"){
                    event.innerHTML=book.read="Not Read"
                    loadBook() 
                  }
              } 
      }
}

//local storage

//users inputs


function addBookToLibrary(title,author,pages,read) {
  // do stuff here
  const newBook=new Book(title,author,pages,read)
  library.push(newBook)
 UI.CreateElement(newBook)
 loadBook()

}


//form events
document.querySelector(".form").addEventListener("submit",(e)=>{
   
     const title=document.querySelector(".title").value;
     const author=document.querySelector(".Author").value;
     const pages=document.querySelector(".pages").value;
     const read=document.querySelector(".read").value;
       if(title!=="" || author!=="" || pages!==""){
        e.preventDefault();
        //add book to library
        addBookToLibrary(title,author,pages,read)
        //close modal
        modal.classList.remove('open-modal')
        //clear input field
         UI.clearField()
       }
})
//load library to Dom as page loads
function loadBook(){
  
  window.addEventListener("DOMContentLoaded",UI.display())
}

loadBook()
//del button event



//modal overlay//
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

  