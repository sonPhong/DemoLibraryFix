import { Book, BookStatus } from "./Book";
import { Borrower } from "./Borrower";

export class LibraryManager {
    private books: Book[] = [];
    private borrowers: Borrower[] = [];
    private maxBooksCanBorrow: number;

    constructor(maxBooksCanBorrow: number = 3) {
        this.maxBooksCanBorrow = maxBooksCanBorrow;
    }

    // Các hàm tìm kiếm <==> trả về type cần hoặc underfined (Union Type)
    private findBookById(bookID: string): Book | undefined {
        return this.books.find(b => b.id === bookID);
    }

    private findBorrowerById(borrowerID: string): Borrower | undefined {
        return this.borrowers.find(br => br.id === borrowerID);
    }

    // Thêm sách
    addBook(book: Book | Book[]): void {
        if (Array.isArray(book)) {
            book.forEach(b => {
                this.addSingleBook(b);
            });
        } else {
            this.addSingleBook(book);
        }
    }

    // hàm thêm sách có condition 
    private addSingleBook(book: Book): void {
        const exist = this.books.some(b => b.id === book.id);
        if (exist) {
            console.log(`Sách ${book.title} với id: ${book.id} đã tồn tại`);
            return;
        }
        this.books.push(book);
        console.log(`Đã thêm ${book.title} với id: ${book.id} vào thư viện`);
    }

    // Thêm người mượn
    addBorrower(borrower: Borrower | Borrower[]): void {
        const borrowersToAdd = Array.isArray(borrower) ? borrower : [borrower];
        borrowersToAdd.forEach(br => {
            this.borrowers.push(br);
            console.log(`Thêm người mượn: "${br.name}"`);
        });
    }

    // Mượn sách
    borrowBook(bookID: string, borrowerID: string): void {
        const book = this.findBookById(bookID);
        const borrower = this.findBorrowerById(borrowerID);

        if (!book) return console.log(`Không tìm thấy sách.`);
        if (!borrower) return console.log(`Không tìm thấy người mượn.`);

        if (borrower.borrowedBooks.length >= this.maxBooksCanBorrow) {
            return console.log(`${borrower.name} đã mượn tối đa ${this.maxBooksCanBorrow} sách.`);
        }

        if (borrower.hasBorrowed(bookID)) {
            return console.log(`${borrower.name} đã mượn sách "${book.title}" rồi.`);
        }

        const success = book.borrow(); // quay về bên Book kiểm tra
        if (success) {
            borrower.borrowedBooks.push(book); // true thì thêm list mượn
        }
    }

    // Trả sách
    returnBook(bookID: string, borrowerID: string): void {
        const book = this.findBookById(bookID);
        const borrower = this.findBorrowerById(borrowerID);

        if (!book) return console.log(`Không tìm thấy sách.`);
        if (!borrower) return console.log(`Không tìm thấy người mượn.`);

        const success = book.returnBook(); // về Book check
        if (success) {
            borrower.borrowedBooks = borrower.borrowedBooks.filter(b => b.id !== bookID); // chưa được mượn =Available, != Available thì trả - đổi status
        }
    }

    listBooks(): void {
        console.log(`Danh sách sách:`);
        this.books.forEach(book => {
            console.log(`- [${book.status}] ${book.id}: ${book.title}`);
        });
    }

    listBorrowers(): void {
        console.log(`Danh sách người mượn:`);
        this.borrowers.forEach(borrower => {
            console.log(`- ${borrower.id}: ${borrower.name}`);
        });
    }

    listBorrowedBooks(borrowerID: string): void {
        const borrower = this.findBorrowerById(borrowerID);
        if (!borrower) {
            return console.log(`Không tìm thấy người mượn.`);
        }

        if (borrower.borrowedBooks.length === 0) {
            return console.log(`${borrower.name} chưa mượn sách nào.`);
        }

        console.log(`Sách ${borrower.name} đã mượn:`);
        borrower.borrowedBooks.forEach(book => {
            console.log(`- ${book.title}`);
        });
    }
}
