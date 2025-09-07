function Book(title, author, pages) {
    // Constructor that creates a book object
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages) {
    // Function that takes params, create a book then store it in the array
    myLibrary.push(new Book(title, author, pages))
}

function loopThroughBookArrayAndDisplayBooks() {
    // Function that creates a div for each book object and puts it in the DOM
    myLibrary.forEach(element => {
        const bookItemDiv = document.createElement("div");
        const bookItemDivTitle = document.createElement("div");
        const bookItemDivAuthor = document.createElement("div");
        const bookItemDivPages = document.createElement("div");

        bookItemDiv.className = "book-item";
        bookItemDiv.setAttribute("data-id", element.id)
        bookItemDivTitle.className = "book-item-title";
        bookItemDivAuthor.className = "book-item-author";
        bookItemDivPages.className = "book-item-pages";

        bookItemDivTitle.append(`${element.title}`);
        bookItemDivAuthor.append(`Author: ${element.author}`);
        bookItemDivPages.append(`Pages: ${element.pages}`);

        bookContainer.appendChild(bookItemDiv);
        bookItemDiv.appendChild(bookItemDivTitle);
        bookItemDiv.appendChild(bookItemDivAuthor);
        bookItemDiv.appendChild(bookItemDivPages);
        
        insertBookDivButtonsWithFunctionalities(bookItemDiv)
    });
}

function insertBookDivButtonsWithFunctionalities(div) {
    // Add "Read" and "Remove" buttons to argument div
    const bookItemButtonsDiv = document.createElement("div");
    const bookItemRemoveButton = document.createElement("button");
    const bookItemReadButton = document.createElement("button");

    bookItemButtonsDiv.className = "book-item-buttons"
    bookItemRemoveButton.className = "book-item-remove-button";
    bookItemReadButton.className = "book-item-read-button";

    bookItemRemoveButton.append("Remove");
    bookItemReadButton.append("Read");
    bookItemReadButton.style.backgroundColor = "rgba(201, 233, 201, 1)";
    bookItemReadButton.style.fontWeight = "bold";
    bookItemRemoveButton.style.fontWeight = "bold";

    div.appendChild(bookItemButtonsDiv);
    bookItemButtonsDiv.appendChild(bookItemRemoveButton);
    bookItemButtonsDiv.appendChild(bookItemReadButton);

    addEventListenersToReadButton(bookItemButtonsDiv);
}

function addEventListenersToReadButton(div) {
    // Add Event listener to "Read" and "Not Read" button
    const removeButton = div.querySelector(".book-item-remove-button");
    const readButton = div.querySelector(".book-item-read-button");

    
    readButton.addEventListener("click", function(event) {
        if (event.target.textContent === "Read") {
            event.target.textContent = "Not read";
            event.target.style.backgroundColor = "rgb(255, 186, 186)";
        } else {
            event.target.textContent = "Read";
            event.target.style.backgroundColor = "rgba(201, 233, 201, 1)";
        }
    })

    removeButton.addEventListener("click", () => {
        
    })



}

// Array that will contain different book objects through addBookToLibrary function
const myLibrary = [];   
addBookToLibrary("The Hobbit", "J. R. R. Tolkien", "320");
addBookToLibrary("Harry Potter and the Prisoner of Azkaban", "J. K. Rowling", "317 ");
addBookToLibrary("Of Mice and Men", "John Steinbeck", "107");

// Populate book container with objects found in myLibrary array
const bookContainer = document.getElementById("book-container");
loopThroughBookArrayAndDisplayBooks();

// Add an EventListener to the add book button that dislpay the modal
const addBookButton = document.getElementById("add-book-button");
const addBookButtonDialogue = document.getElementById("add-book-button-dialog");
addBookButton.addEventListener("click", () => {
    addBookButtonDialogue.showModal()
});

// Take the form results and create a new book item
const submitFormButton = document.getElementById("submit-form-button");
submitFormButton.addEventListener("click", () => {
    myLibrary.push(
        new Book(
            document.querySelector(".form-entry > #title").value,
            document.querySelector(".form-entry > #author").value,
            document.querySelector(".form-entry > #pages").value
        )
    )

    newBookItem = document.createElement("div");
    newBookItemTitle = document.createElement("div");
    newBookItemAuthor = document.createElement("div");
    newBookItemPages = document.createElement("div");
    
    newBookItem.className = "book-item";
    newBookItem.setAttribute("data-id", myLibrary[myLibrary.length - 1].id);
    newBookItemTitle.className = "book-item-title";
    newBookItemAuthor.className = "book-item-author";
    newBookItemPages.className = "book-item-pages";

    newBookItemTitle.append(myLibrary[myLibrary.length - 1].title);
    newBookItemAuthor.append(myLibrary[myLibrary.length - 1].author);
    newBookItemPages.append(myLibrary[myLibrary.length - 1].pages);

    bookContainer.appendChild(newBookItem);
    newBookItem.appendChild(newBookItemTitle);
    newBookItem.appendChild(newBookItemAuthor);
    newBookItem.appendChild(newBookItemPages);

    const originalButtons = document.querySelector(".book-item-buttons");
    const clonedButtons = originalButtons.cloneNode(true)

    newBookItem.appendChild(clonedButtons);
})

// // Add remove functionalities to the remove buttons
// const allRemoveItembuttonArray = document.querySelectorAll(".book-item-remove-button")
// allRemoveItembuttonArray.forEach(element => {
//     element.addEventListener("click", () => {
//         element.parentElement.parentElement .remove()
//     })
// });



