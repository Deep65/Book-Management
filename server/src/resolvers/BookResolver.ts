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
        user: existingUser,
      },
    });

    return books;
  }

  @Query(() => Book)
  async findBookById(
    @Arg("_id", () => ID) _id: ObjectId,
    @Ctx() { existingUser }: authContext
  ): Promise<Book> {
    if (!existingUser) {
      throw new Error("User not authenticated");
    }
    const objectId = new ObjectId(_id);

    const book = await Book.findOne({
      where: {
        _id: objectId,
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
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
    @Arg("_id", () => ID) _id: ObjectId,
    @Arg("args", () => BookInput) args: BookInput,
    @Ctx() { existingUser }: authContext
  ): Promise<Book | undefined> {
    if (!existingUser) {
      throw new Error("Not authenticated");
    }
    const objectId = new ObjectId(_id);

    const book = await Book.findOne({
      where: { _id: objectId, user: existingUser },
    });
    if (!book) {
      throw new Error("Book not found or you're not authorized to update it");
    }
    Object.assign(book, args);
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(
    @Arg("_id", () => ID) _id: ObjectId,
    @Ctx() { existingUser }: authContext
  ): Promise<Boolean> {
    if (!existingUser) {
      throw new Error("Not authenticated");
    }

    const objectId = new ObjectId(_id);
    const findExistingBook = await Book.findOne({
      where: { _id: objectId, user: existingUser },
    });

    if (!findExistingBook) {
      throw new Error("Book not found or you're not authorized to delete it");
    }

    await findExistingBook.remove();
    return true;
  }
}
