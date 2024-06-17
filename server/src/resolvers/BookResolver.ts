import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Book } from "../entities/Book";
import { BookInput } from "../types/BookInput";
import { authContext } from "../context/AuthContext";
import { ObjectId } from "mongodb";

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(@Ctx() { existingUser }: authContext): Promise<Book[]> {
    if (!existingUser) {
      throw new Error("User not authenticated");
    }

    const books = await Book.find({
      where: {
        user: existingUser, // Ensure existingUser.id is already in ObjectId format
      },
    });

    return books;
  }

  @Mutation(() => Book)
  async addBook(
    @Arg("args", () => BookInput) args: BookInput,
    @Ctx() { existingUser }: authContext
  ): Promise<Book> {
    if (!existingUser) {
      throw new Error("Not authenticated");
    }
    const book = Book.create({ ...args, user: existingUser });
    await book.save();
    return book;
  }

  @Mutation(() => Book)
  async updateBook(
    @Arg("id", () => ID) id: ObjectId,
    @Arg("args", () => BookInput) args: BookInput,
    @Ctx() { existingUser }: authContext
  ): Promise<Book | undefined> {
    if (!existingUser) {
      throw new Error("Not authenticated");
    }
    const book = await Book.findOne({ where: { id, user: existingUser } });
    if (!book) {
      throw new Error("Book not found or you're not authorized to update it");
    }
    Object.assign(book, args);
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(
    @Arg("ida", () => ID) id: ObjectId,
    @Ctx() { existingUser }: authContext
  ): Promise<Boolean> {
    if (!existingUser) {
      throw new Error("Not authenticated");
    }
    console.log("id", id);
    const findExistingBook = await Book.findOne({
      where: { id },
    });

    if (!findExistingBook) {
      throw new Error("Book not found or you're not authorized to delete it");
    }

    await findExistingBook.remove();
    return true;
  }
}
