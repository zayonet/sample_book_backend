import BookCategory from "../enums/BookCategory";

export default interface ICreateBookDTO {
  title: string;
  user_id: string;
  image?: string;
  price: string;
  description: string;
  category: BookCategory;
}