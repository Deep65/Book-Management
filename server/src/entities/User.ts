import { Entity, ObjectIdColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { Book } from "./Book";
import { ObjectId } from "mongodb";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => String)
  @Column("text")
  @Length(1, 255)
  name: string;

  @Field(() => String)
  @Column("text")
  @IsEmail()
  email: string;

  @Column("text")
  password: string;

  @Field(() => [Book], {
    nullable: true,
    description: "Books possessed by a user",
  })
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
