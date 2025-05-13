import { Book } from "./Book";

export class Borrower {
    public borrowedBooks: Book[] = [];

    constructor(
        public id: string,
        public name: string
    ) {}


    // hàm kiểm tra sách có trong list sách đã mượn? 
    // some() duyệt hết mảng, trả về true nếu 1 phần tử thoả điều kiện
    hasBorrowed(bookID: string): boolean {
        return this.borrowedBooks.some(book => book.id === bookID); // true -- false
    }
}
