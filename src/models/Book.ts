import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  IsNull
} from 'typeorm';
import BookCategory from '../enums/BookCategory';
import User from './User';

@Entity('books')
class Book {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  user_id: number | string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  price: string;

  @Column({
    type: "text", //To force the type
    default: null,
  })
  description: string;

  @Column()
  image: string;

  @Column({
    type: 'varchar' //To force the type
  })
  category: BookCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Book;