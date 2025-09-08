// Functional programming only

function Book({title, author, pages}) {
    // Constructor that creates a book object
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID()
}

function addBookToLibrary({title, author, pages}) {
    // Function that takes params, create a book then store it in the array
    myLibrary.push(new Book({
        title: title,
        author: author, 
        pages: pages
    }))
}

function loopThroughBookArrayAndDisplayBooks(bookContainer) {
    // Function that creates a div for each book object and puts it in the DOM
    myLibrary.forEach(book => {

        const bookItemDiv = renderBook(book)

        const {
            bookItemDiv: newBookItemDiv, 
            bookItemButtonsDiv: newBookItemButtonsDiv
        } = insertBookDivButtonsWithFunctionalities(bookItemDiv)

        addEventListenerToRemoveButton(newBookItemDiv);
        addEventListenersToReadButton(newBookItemButtonsDiv);
    });
}

function renderBook(book) {
    const bookItemDiv = document.createElement("div");
    const bookItemDivTitle = document.createElement("div");
    const bookItemDivAuthor = document.createElement("div");
    const bookItemDivPages = document.createElement("div");

    bookItemDiv.className = "book-item";
    bookItemDiv.setAttribute("data-id", book.id)
    bookItemDivTitle.className = "book-item-title";
    bookItemDivAuthor.className = "book-item-author";
    bookItemDivPages.className = "book-item-pages";

    bookItemDivTitle.textContent = `${book.title}`;
    bookItemDivAuthor.textContent = `Author: ${book.author}`;
    bookItemDivPages.textContent = `Pages: ${book.pages}`;

    bookContainer.appendChild(bookItemDiv);
    bookItemDiv.appendChild(bookItemDivTitle);
    bookItemDiv.appendChild(bookItemDivAuthor);
    bookItemDiv.appendChild(bookItemDivPages);
    
    return bookItemDiv;
}

function insertBookDivButtonsWithFunctionalities(bookItemDiv) {
    // Add "Read" and "Remove" buttons to argument div
    const bookItemButtonsDiv = document.createElement("div");
    const bookItemRemoveButton = document.createElement("button");
    const bookItemReadButton = document.createElement("button");

    bookItemButtonsDiv.className = "book-item-buttons"
    bookItemRemoveButton.className = "book-item-remove-button";
    bookItemReadButton.className = "book-item-read-button";

    bookItemRemoveButton.textContent = "Remove";
    bookItemReadButton.textContent = "Read";
    bookItemReadButton.style.backgroundColor = "rgba(201, 233, 201, 1)";
    bookItemReadButton.style.fontWeight = "bold";
    bookItemRemoveButton.style.fontWeight = "bold";

    bookItemDiv.appendChild(bookItemButtonsDiv);
    bookItemButtonsDiv.appendChild(bookItemRemoveButton);
    bookItemButtonsDiv.appendChild(bookItemReadButton);

    return {bookItemDiv, bookItemButtonsDiv};
}

function addEventListenersToReadButton(buttonsDiv) {
    // Add Event listener to the "Read" / "Not Read" button
    const readButton = buttonsDiv.querySelector(".book-item-read-button");
    readButton.addEventListener("click", function(event) {
        if (event.target.textContent === "Read") {
            event.target.textContent = "Not read";
            event.target.style.backgroundColor = "rgb(255, 186, 186)";
        } else {
            event.target.textContent = "Read";
            event.target.style.backgroundColor = "rgba(201, 233, 201, 1)";
        }
    })
}

function addEventListenerToRemoveButton(bookItemDiv) {
    // Add Event listener to the "Remove" button
    const currentDivId = bookItemDiv.dataset.id
    const removeButton = bookItemDiv.querySelector(".book-item-remove-button");
    removeButton.addEventListener("click", () => {
        myLibrary.splice(
            myLibrary.findIndex(book => book.id === currentDivId),
            1
        )

        bookItemDiv.remove()
    })
}

// Array that will contain current book objects at all given times
let myLibrary = [];   
addBookToLibrary({
    title: "The Hobbit", 
    author: "J. R. R. Tolkien", 
    pages: "320"
});
addBookToLibrary({
    title: "Harry Potter and the Prisoner of Azkaban", 
    author: "J. K. Rowling", 
    pages: "317"
});
addBookToLibrary({
    title: "Of Mice and Men", 
    author: "John Steinbeck", 
    pages: "107"
});
addBookToLibrary({
    title: "Le Mage du Kremlin", 
    author: "Roman de Giuliano da Empoli", 
    pages: "320"
});
addBookToLibrary({
    title: "Au sud de la frontière, à l'ouest du soleil", 
    author: "Roman de Giuliano da Empoli", 
    pages: "264"
});
addBookToLibrary({
    title: "Introduction to Graph Theory", 
    author: "Richard J Trudeau", 
    pages: "222"
});

// Populate book container with objects found in myLibrary array
const bookContainer = document.getElementById("book-container");
loopThroughBookArrayAndDisplayBooks(bookContainer);

// Add an EventListener to the add book button that dislpay the modal
const dialog = document.querySelector("#add-book-button-dialog");
const addBookButton = document.getElementById("add-book-button");
const addBookButtonDialogue = document.getElementById("add-book-button-dialog");
addBookButton.addEventListener("click", () => {
    addBookButtonDialogue.showModal()
});

// Take the form results and create a new book item
const submitFormButton = document.getElementById("submit-form-button");
submitFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    myLibrary.push(
        new Book({
            title: document.querySelector(".form-entry > #title").value,
            author: document.querySelector(".form-entry > #author").value,
            pages: document.querySelector(".form-entry > #pages").value
        })
    )

    const newBookItem = document.createElement("div");
    const newBookItemTitle = document.createElement("div");
    const newBookItemAuthor = document.createElement("div");
    const newBookItemPages = document.createElement("div");
    
    newBookItem.className = "book-item";
    newBookItem.setAttribute("data-id", myLibrary[myLibrary.length - 1].id);
    newBookItemTitle.className = "book-item-title";
    newBookItemAuthor.className = "book-item-author";
    newBookItemPages.className = "book-item-pages";

    const addedBook = myLibrary[myLibrary.length - 1];
    newBookItemTitle.textContent = addedBook.title;
    newBookItemAuthor.textContent = `Author: ${addedBook.author}`;
    newBookItemPages.textContent = `Pages: ${addedBook.pages}`;

    bookContainer.appendChild(newBookItem);
    newBookItem.appendChild(newBookItemTitle);
    newBookItem.appendChild(newBookItemAuthor);
    newBookItem.appendChild(newBookItemPages);

    const {
        bookItemDiv: newBookItemDiv, 
        bookItemButtonsDiv: newBookItemButtonsDiv
    } = insertBookDivButtonsWithFunctionalities(newBookItem)

    addEventListenerToRemoveButton(newBookItemDiv);
    addEventListenersToReadButton(newBookItemButtonsDiv);

    dialog.close()

})