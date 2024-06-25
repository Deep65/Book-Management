"use client";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./../../../lib/queries/book";
import Link from "next/link";
import EditButton from "@/app/components/EditButton";
import DeleteButton from "@/app/components/DeleteButton";
import Loading from "../loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

type Book = {
  _id: string;
  author: string;
  title: string;
  genre: string;
};

const BooksListPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_BOOKS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Loading />;
  if (error) {
    toast.error(error.message);
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Books List</h2>
        <Link href="/books/add">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add Book
          </span>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              {["Title", "Genre", "Author", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.books.map((book: Book) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <EditButton bookId={book._id} />
                    <DeleteButton bookId={book._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksListPage;
