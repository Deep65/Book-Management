import { Entity, ObjectIdColumn, ObjectId, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Length, IsEmail } from "class-validator";

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

  // You might want to omit @Field() for sensitive fields like 'password'

  @Column("text")
  password: string;
}
