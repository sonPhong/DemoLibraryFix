"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookStatus = void 0;
var BookStatus;
(function (BookStatus) {
    BookStatus[BookStatus["Available"] = 0] = "Available";
    BookStatus[BookStatus["Borrowed"] = 1] = "Borrowed";
})(BookStatus || (exports.BookStatus = BookStatus = {}));
class Book {
    constructor(id, title, status = BookStatus.Available) {
        this.id = id;
        this.title = title;
        this.status = status;
    }
    borrow() {
        if (this.status === BookStatus.Borrowed) {
            console.log(`Sách "${this.title}" đã được mượn.`);
            return false;
        }
        this.status = BookStatus.Borrowed;
        console.log(`Mượn thành công sách "${this.title}".`);
        return true;
    }
    returnBook() {
        if (this.status === BookStatus.Available) {
            console.log(`Sách "${this.title}" chưa được mượn.`);
            return false;
        }
        this.status = BookStatus.Available;
        console.log(`Trả thành công sách "${this.title}".`);
        return true;
    }
}
exports.Book = Book;
