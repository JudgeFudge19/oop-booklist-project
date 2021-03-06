// Book Constructor 
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor 
function UI() {}

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);
}

UI.prototype.showAlert = function(message, className){
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent to add div to 
  const container = document.querySelector('.container');
  // Get form
  const form = document.getElementById('book-form');
  // Insert alter
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target){
  if(target.className = 'delete'){
    target.parentElement.parentElement.remove(); 
  }
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = ''; 
}

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Getting form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiating book 
  const book = new Book(title, author, isbn);

  // Instantiating UI
  const ui = new UI();

  // Validate 
  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all fields', 'error')
    
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book added successfully!', 'success');
    
    // Clear fields after submit
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
});