export enum BookStatus {
    Available,
    Borrowed
}

export class Book implements Book {
    constructor(
        public id: string,
        public title: string,
        public status: BookStatus = BookStatus.Available
    ) {}

    borrow(): boolean {
        if (this.status === BookStatus.Borrowed) {
            console.log(`Sách "${this.title}" đã được mượn.`);
            return false;
        }
        this.status = BookStatus.Borrowed;
        console.log(`Mượn thành công sách "${this.title}".`);
        return true;
    }

    returnBook(): boolean {
        if (this.status === BookStatus.Available) {
            console.log(`Sách "${this.title}" chưa được mượn.`);
            return false;
        }
        this.status = BookStatus.Available;
        console.log(`Trả thành công sách "${this.title}".`);
        return true;
    }
}
