import BookStatus from "../enums/BookStatus";

export default interface ICreateBookDTO {
    title: string;
    user_id: string;
    image?: string;
    price: string;
    description: string;
    status: BookStatus;
  }