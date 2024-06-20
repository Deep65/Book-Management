"use client";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS } from "./../../../lib/queries/book";
import { DELETE_BOOK } from "./../../../lib/mutations/book";
import { useRouter } from "next/navigation";
import { getCookie } from 'cookies-next';
import Link from "next/link";
import EditButton from "@/app/components/EditButton";
import DeleteButton from "@/app/components/DeleteButton";

const BooksListPage = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_BOOKS, {
    context: {
      headers: {
        authorization: `Bearer ${getCookie('token')}`, // Pass the token in headers
      },
    },
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleEdit = (id: string) => {
    router.push(`/books/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook({ variables: { id } });
    } catch (err) {
      console.error("Delete book error", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.books.map((book: any) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <EditButton bookId={book._id}/>
                    <DeleteButton  bookId={book._id}/>
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
