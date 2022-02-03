import BookStatus from "../enums/BookStatus";

export default interface ICreateBookDTO {
    title: string;
    user_id: number | string;
    image?: string;
    price: string;
    description: string;
    status: BookStatus;
  }