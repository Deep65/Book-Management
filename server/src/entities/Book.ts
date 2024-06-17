import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Length } from "class-validator";
import { User } from "./User";

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field((type) => String)
  @Column("text")
  @Length(1, 255)
  title: string;

  @Field((type) => String)
  @Column("text")
  @Length(1, 50)
  author: string;

  @Field((type) => String)
  @Column("text")
  @Length(1, 20)
  genre: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
