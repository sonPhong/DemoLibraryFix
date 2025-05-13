"use strict";
var BookStatus;
(function (BookStatus) {
    BookStatus["Available"] = "Available";
    BookStatus["Borrowed"] = "Borrowed"; //1
})(BookStatus || (BookStatus = {}));
var MemberRank;
(function (MemberRank) {
    MemberRank["Silver"] = "Silver";
    MemberRank["Gold"] = "Gold";
    MemberRank["Platinum"] = "Platinum"; // 2
})(MemberRank || (MemberRank = {}));
// tạo class xử lý
class Book {
    constructor(id, name, status = BookStatus.Available) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
    // tạo hàm kiểm tra đã mượn
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
    constructor(id, name, rank = MemberRank.Silver) {
        this.id = id;
        this.name = name;
        this.rank = rank;
    }
}
class LibraryManager {
    constructor() {
        this.books = [];
        this.borrowers = [];
    }
    // thêm book
    addBook(book) {
        this.books.push(book);
        console.log(`Sách ${book.name} đã được thêm`);
    }
    addBorrower(borrower) {
        this.borrowers.push(borrower);
        console.log(`Người mượn ${borrower.name} đã được thêm`);
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
        book.borrow();
    }
    // hàm trả sách
    returnBook(bookID) {
        const book = this.books.find(b => b.id === bookID);
        if (!book) {
            console.log(`Không tìm thấy sách`);
            return;
        }
        book.returnBook();
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
            console.log(`- ${borrower.id} ++ ${borrower.name} ++ [${borrower.rank}]`);
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
library.listBooks();
// Thêm người mượn
const borrower1 = new Borrower("112", "paaalz");
const borrower2 = new Borrower("213", "Pro");
library.addBorrower(borrower1);
library.addBorrower(borrower2);
// Mượn sách
library.borrowBook("B001", "213");
// Trả sách
//library.returnBook("B001");
// Hiển thị danh sách
//library.listBooks();
library.listBorrowers();
library.listBooks();
