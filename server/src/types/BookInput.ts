import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class BookInput {
  @Field((type) => String)
  @Length(1, 255)
  title: string;

  @Field((type) => String)
  @Length(1, 50)
  author: string;

  @Field((type) => String)
  @Length(1, 20)
  genre: string;
}
