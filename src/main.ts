import { Book } from "./models/Book";
import { Borrower } from "./models/Borrower";
import { LibraryManager } from "./models/LibraryManager";

// Tạo thư viện với giới hạn số sách được mượn là 3
const library = new LibraryManager(5);

// Thêm sách
library.addBook([
    new Book("B001", "2 Con Vịt"),
    new Book("B002", "Clean Code"),
    new Book("B003", "Design Patterns"),
    new Book("B004", "Chill Chill"),
    new Book("B004", "Chill Chill")
]);

// Thêm người mượn
library.addBorrower([
    new Borrower("U001", "An"),
    new Borrower("U002", "Bình")
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
