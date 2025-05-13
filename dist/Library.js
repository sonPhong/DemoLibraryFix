"use strict";
var BookStatus;
(function (BookStatus) {
    BookStatus["Available"] = "Available";
    BookStatus["Borrowed"] = "Borrowed"; //1
})(BookStatus || (BookStatus = {}));
// tạo class xử lý
class Book {
    constructor(id, name, status = BookStatus.Available) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
    // tạo hàm kiểm tra đã mượn xong gán lại status nếu chưa đc mượn
    borrow() {
        if (this.status === BookStatus.Borrowed) {
            console.log(`Sách ${this.name} đã có người mượn`);
            return false;
        }
        this.status = BookStatus.Borrowed;
        console.log(`Sách ${this.name} đã được mượn thành công`);
        return true;
    }
    // hàm kiểm tra trả sách
    returnBook() {
        if (this.status === BookStatus.Available) {
            console.log(`Sách ${this.name} chưa có người mượn`);
            return false;
        }
        this.status = BookStatus.Available;
        console.log(`Sách ${this.name} đã được trả`);
        return true;
    }
}
// có thể mở rộng việc đk sách 
class Borrower {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }
}
class LibraryManager {
    constructor() {
        this.books = [];
        this.borrowers = [];
    }
    // thêm book <==> mở rộng áp dung type guard thêm nhiều hoặc 1 đối tượng có 2 type
    addBook(book) {
        if (Array.isArray(book)) {
            book.forEach(b => {
                this.books.push(b);
                console.log(`Đã thêm sách: ${b.name}`);
            });
        }
        else {
            this.books.push(book);
            console.log(`Đã thêm sách: ${book.name}`);
        }
    }
    addBorrower(borrower) {
        if (Array.isArray(borrower)) {
            borrower.forEach(br => {
                this.borrowers.push(br);
                console.log(`Đã thêm người mượn: ${br.name}`);
            });
        }
        else {
            this.borrowers.push(borrower);
            console.log(`Đã thêm người mượn: ${borrower.name}`);
        }
    }
    // hàm cho mượn sách
    borrowBook(bookID, borrowerID) {
        const book = this.books.find(b => b.id === bookID);
        const borrower = this.borrowers.find(br => br.id === borrowerID);
        if (!book) {
            console.log(`Không tìm thấy sách`);
            return;
        }
        if (!borrower) {
            console.log(`Không tìm thấy người`);
            return;
        }
        const success = book.borrow();
        if (success) {
            borrower.borrowedBooks.push(book);
        }
    }
    // hàm trả sách
    returnBook(bookID, borrowerID) {
        const book = this.books.find(b => b.id === bookID);
        const borrower = this.borrowers.find(br => br.id === borrowerID);
        if (!book) {
            console.log(`Không tìm thấy sách`);
            return;
        }
        if (!borrower) {
            console.log(`❌ Không tìm thấy người`);
            return;
        }
        const success = book.returnBook();
        if (success) {
            borrower.borrowedBooks = borrower.borrowedBooks.filter(b => b.id !== bookID);
        }
    }
    // hiện list book
    listBooks() {
        console.log(`Danh sách các sách trong thư viện`);
        this.books.forEach(book => {
            console.log(`- ${book.id} ++ ${book.name} ++ [${book.status}]`);
        });
    }
    listBorrowers() {
        console.log("Danh sách người mượn");
        this.borrowers.forEach(borrower => {
            console.log(`- ${borrower.id} ++ ${borrower.name}`);
        });
    }
    listBorrowedBooks(borrowerID) {
        const borrower = this.borrowers.find(br => br.id === borrowerID);
        if (!borrower) {
            console.log(`❌ Không tìm thấy người mượn`);
            return;
        }
        if (borrower.borrowedBooks.length === 0) {
            console.log(`📚 Người mượn ${borrower.name} chưa mượn sách nào.`);
            return;
        }
        console.log(`📚 Danh sách sách đã mượn của ${borrower.name}:`);
        borrower.borrowedBooks.forEach(book => {
            console.log(`- ${book.name}`);
        });
    }
}
const library = new LibraryManager();
// Thêm sách
const book1 = new Book("B003", "Clean Code");
const book2 = new Book("B001", "2 Con Vịt");
const book3 = new Book("B002", "Clean Code");
const book4 = new Book("B004", "Chill Chill");
library.listBooks();
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.listBooks();
// Thêm người mượn
const borrower1 = new Borrower("112", "paaalz");
const borrower2 = new Borrower("213", "Pro");
const borrower3 = new Borrower("214", "Proxxx");
const borrower4 = new Borrower("215", "Proaaaaaa");
const borrower5 = new Borrower("216", "Prwwwo");
const arrBr = [borrower3, borrower4, borrower5];
library.addBorrower(borrower1);
library.addBorrower(arrBr);
// Mượn sách
library.borrowBook("B001", "216");
library.borrowBook("B003", "216");
library.borrowBook("B004", "216");
library.borrowBook("B002", "216");
// Trả sách
//library.returnBook("B001");
// // Hiển thị danh sách
// //library.listBooks();
// library.listBorrowers();
// library.listBooks();
library.listBorrowedBooks("216");
