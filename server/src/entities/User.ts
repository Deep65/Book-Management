import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { Book } from "./Book";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field((type) => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field((type) => String) // Specify GraphQL type explicitly
  @Column("text")
  @Length(1, 255)
  name: string;

  @Field((type) => String) // Specify GraphQL type explicitly
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
  books?: Book[];
}
