"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrower = void 0;
class Borrower {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }
    // hàm kiểm tra sách có trong list sách đã mượn? 
    // some() duyệt hết mảng, trả về true nếu 1 phần tử thoả điều kiện
    hasBorrowed(bookID) {
        return this.borrowedBooks.some(book => book.id === bookID); // true -- false
    }
}
exports.Borrower = Borrower;
