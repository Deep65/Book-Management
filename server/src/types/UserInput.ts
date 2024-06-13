import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisteration {
  @Field((type) => String)
  @Length(1, 255)
  name: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Length(1, 255)
  password: string;
}

@InputType()
export class UserLogin {
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Length(1, 255)
  password: string;
}
