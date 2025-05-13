"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("./models/Book");
const Borrower_1 = require("./models/Borrower");
const LibraryManager_1 = require("./models/LibraryManager");
// Tạo thư viện với giới hạn số sách được mượn là 3
const library = new LibraryManager_1.LibraryManager(5);
// Thêm sách
library.addBook([
    new Book_1.Book("B001", "2 Con Vịt"),
    new Book_1.Book("B002", "Clean Code"),
    new Book_1.Book("B003", "Design Patterns"),
    new Book_1.Book("B004", "Chill Chill"),
    new Book_1.Book("B004", "Chill Chill")
]);
// Thêm người mượn
library.addBorrower([
    new Borrower_1.Borrower("U001", "An"),
    new Borrower_1.Borrower("U002", "Bình")
]);
// Mượn sách
library.borrowBook("B001", "U001");
library.borrowBook("B002", "U001");
library.borrowBook("B003", "U001");
library.borrowBook("B004", "U001");
// Trả sách
library.returnBook("B002", "U001");
// Hiển thị danh sách
library.listBooks();
library.listBorrowers();
library.listBorrowedBooks("U001");
